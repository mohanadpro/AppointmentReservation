import Modal from 'react-modal'
import React, { useEffect, useState } from "react";
import './patient-reservations-modal.css'
import { connect } from 'react-redux';
import { getPatientReservationAction, } from '../../../../redux/reserve-appointment/create/reserve-appointment-action';
import { useNavigate } from 'react-router-dom';
function ModalPatientReservedAppointment({ isOpen, setIsOpen, patient, ...props }) {
    const history = useNavigate();
    useEffect(() => {
        props.getPatientReservations(patient._id, history);
    }, [isOpen])
    return <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(!isOpen)}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        ariaHideApp={false}
        closeTimeoutMS={100}>
            {patient!=undefined &&
        <div style={{width:'100%'}}>
            <div className='d-flex justify-content-around'>
                <div> <span className='text-danger fw-bold p-3'>Patient Name: </span> {patient?.name}</div>
                {/* <div><span className='text-success fw-bold p-3'>Doctor: </span>{patient.doctor?.name}</div> */}
            </div>
            <div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Doctor</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.reservations && props.reservations.data &&
                            props.reservations.data.map((item, i) => <tr key={item._id}>
                                <td>{i+1}</td>
                                <td>{item.doctor.name}</td>
                                <td>{item.appointmentDate}</td>
                                <td>{item.appointmentTime}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>}
    </Modal>
}
const mapStateToProps = (state) => {
    return {
        reservations: state.patientReservations
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getPatientReservations: (patientId, history) => dispatch(getPatientReservationAction(patientId, history))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalPatientReservedAppointment)
