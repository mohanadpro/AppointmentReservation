import Modal from 'react-modal'
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { deleteReserveAction, getSpecificReservesAction } from '../../../../redux/reserve-appointment/create/reserve-appointment-action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import AlertClass from '../../../../utilities/alert-component';
import './modal-reserved-appointment.css'
function ModalReservedAppointment({ isReservedModalOpen, setIsReservedModalOpen, doctor, time, modalSelectedDate, ...props }) {
    let [reservationDate, setReservationDate] = useState('')
    useEffect(() => {
        props.getSpecificReservation(modalSelectedDate, doctor, time)
        if (modalSelectedDate != '')
            setReservationDate(modalSelectedDate.getDate() + '-' + parseInt(modalSelectedDate.getMonth() + 1) + '-' + modalSelectedDate.getFullYear());
    }, [isReservedModalOpen, modalSelectedDate])

    return <Modal
        isOpen={isReservedModalOpen}
        onRequestClose={() => setIsReservedModalOpen(!isReservedModalOpen)}
        contentLabel="My dialog"
        className="mymodal-modal-reserved-appointment"
        overlayClassName="myoverlay"
        ariaHideApp={false}
        closeTimeoutMS={100}>
        <form>
            <div className="form-group input-block-level mt-5 mb-2">
                <h3>DR. {doctor.name}</h3>
            </div>
            <div className="form-group input-block-level mt-5 mb-2">
                <h3>Date {reservationDate}</h3>
            </div>
            <div className="form-group input-block-level mt-5 mb-2">
                <h3>Time {time}</h3>
            </div>
            <div className="form-group input-block-level mt-5 mb-2">
                {
                    props.specificReservation
                    && props.specificReservation.data
                    && props.specificReservation.data.patient
                    && <div>
                        <h3>Patient {props.specificReservation.data.patient.name}</h3>
                        <h3 className='mt-5'>Number {props.specificReservation.data.patient.mobileNumber}</h3>

                    </div>}
            </div>

            <div className="form-group input-block-level d-flex justify-content-center">
                <button onClick={(e) => {
                    e.preventDefault();
                    // Swal.fire({
                    //     icon: 'warning',
                    //     title: 'Are you sure you want to delete this appointment?', showDenyButton: true,
                    //     confirmButtonText: 'Yes',
                    //     cancelButtonText: 'No',
                    //     confirmButtonColor: 'green',
                    //     cancelButtonColor: 'red',
                    // }).then((result) => {
                    //     if (result.isConfirmed) {
                    //         props.deleteReservation(props.specificReservation.data._id, doctor, modalSelectedDate);
                    //         setIsReservedModalOpen(false);
                    //     } else if (result.isDenied) {

                    //     }
                    // })
                    AlertClass.AlertDelete('Are you sure you want to delete patient this appointment?',()=>props.deleteReservation(props.specificReservation.data._id,doctor,modalSelectedDate))
                    setIsReservedModalOpen(false);
              
              }} className="btn btn-danger mt-3" style={{ borderRadius: "20px", width: '100px' }}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </form>
    </Modal>
}
const mapStateToProps = (state) => {
    return {
        specificReservation: state.getSpecificReservation,
        deleteReservationState: state.deleteReservation
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getSpecificReservation: (appointmentDate, doctor, appointmentTime) => dispatch(getSpecificReservesAction({ appointmentDate: appointmentDate, doctor: doctor, appointmentTime: appointmentTime })),
        deleteReservation: (id, doctor, appointmentDate) => dispatch(deleteReserveAction({ id: id, doctor: doctor, appointmentDate: appointmentDate }))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalReservedAppointment)
