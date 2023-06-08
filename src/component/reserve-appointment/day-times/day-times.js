import React, { useEffect, useState } from "react";
import './day-times.css';
import ModalToReserve from "./modal-to-reserve/modal";
import ModalReservedAppointment from './modal-reserved-appointment/modal'
import { connect } from "react-redux";
import { getReservesAction } from "../../../redux/reserve-appointment/create/reserve-appointment-action";
import { useNavigate } from "react-router-dom";
import { getSettingAction } from "../../../redux/settings/settings-action";

function DayTimes(props) {
    const doctor = props.doctor;
    const [appsetting, setAppSetting] = useState({startHour: 0, endHour: 0, howManyPatientInHour: 0, hasBreak: false, breakStartHour: 0})
    const [isOpen, setIsOpen] = useState(false);
    const [isReservedModalOpen, setIsReservedModalOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState(0);
    const history = useNavigate();
    useEffect(() => {
        props.getReservation(props.selectedDate, props.doctor._id, history);
        const appSettings = async () => {
            await props.getSetting();
            const { loading, data, error } = props.setting;
            if (data != undefined) {
                setAppSetting({
                    startHour: data.startHour, endHour: data.endHour, howManyPatientInHour: data.howManyPatientInHour,
                    hasBreak: data.hasBreak, breakStartHour: data.whichHour
                })
            }
        }
        appSettings();
    }, [props.selectedDate])

    const getFinalHour = (num) => {
        var hours = Math.floor(num / 1);
        var minutes = num % 1 * 60;
        if (minutes == 0)
            minutes = "00"
        return hours + ":" + minutes;
    }

    const toggleModal = (item) => {
        if (!isReservedFunc(item))
            setIsOpen(!isOpen);
        else
            setIsReservedModalOpen(!isReservedModalOpen);
    }

    const isReservedFunc = (item) => {
        let isReserved = false;
        for (let i = 0; i < props.reservations.data?.length; i++) {
            if (item === props.reservations.data[i].appointmentTime) {
                isReserved = true;
                break;
            }
        }
        return isReserved;
    }

    const isThisHourBreak = (hour) => {
        let isBreak = false;
        if (!appsetting.hasBreak)
            isBreak = false;
        else
            if (hour == appsetting.breakStartHour)
                isBreak = true;
        return isBreak;
    }

    return (<div className="container">
        <ModalToReserve isOpen={isOpen} setIsOpen={setIsOpen} doctor={doctor} time={selectedTime} modalSelectedDate={props.selectedDate} />
        <ModalReservedAppointment isReservedModalOpen={isReservedModalOpen} setIsReservedModalOpen={setIsReservedModalOpen} doctor={doctor} time={selectedTime} modalSelectedDate={props.selectedDate} />
        {props.setting.loading ?
            <h3>Loading ...</h3> : props.setting.error ? <h3>Error</h3> :
                <div className="row">
                    {props.setting.data && props.setting.data.endHour && props.setting.data.startHour && props.setting.data.howManyPatientInHour &&
                        Array.from(Array((props.setting.data.endHour - props.setting.data.startHour) * props.setting.data.howManyPatientInHour), (item, i) => {
                            return !isThisHourBreak(getFinalHour(props.setting.data.startHour + (i) * (1 * 60) / (props.setting.data.howManyPatientInHour * 60))) &&
                                <div className="col-md-3 " key={i}>
                                    <div className="box" style={{
                                        color: isReservedFunc(getFinalHour(props.setting.data.startHour + (i) * (1 * 60) / (props.setting.data.howManyPatientInHour * 60))) ? 'white' : '#2d3e50', cursor: 'pointer',
                                        background: isReservedFunc(getFinalHour(props.setting.data.startHour + (i) * (1 * 60) / (props.setting.data.howManyPatientInHour * 60))) ? '#2d3e50' : null
                                    }} onClick={() => {
                                        toggleModal(getFinalHour(props.setting.data.startHour + (i) * (1 * 60) / (props.setting.data.howManyPatientInHour* 60)));
                                        setSelectedTime(getFinalHour(props.setting.data.startHour + (i) * (1 * 60) / (props.setting.data.howManyPatientInHour * 60)))
                                    }}>
                                        {getFinalHour(props.setting.data.startHour + (i) * (1 * 60) / (props.setting.data.howManyPatientInHour * 60))}
                                    </div>
                                </div>
                        })
                    }
                </div>
        }
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        reservations: state.reservations,
        setting: state.settings
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getReservation: (appointmentDate, doctor, history) => dispatch(getReservesAction({ appointmentDate: appointmentDate, doctor: doctor }, history)),
        getSetting: () => dispatch(getSettingAction())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DayTimes)
