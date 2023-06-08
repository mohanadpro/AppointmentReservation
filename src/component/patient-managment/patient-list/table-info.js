import React, { useEffect, useState } from "react";
import { faTicketAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { deletePatientAction } from "../../../redux/patient/patient-action";
import ModalPatientReservedAppointment from './patient-reservation-modal/patient-reservations-modal'
import AlertClass from "../../../utilities/alert-component";
function TableInfo(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [patient, setPatient] = useState({});
    return <div>
        {patient!=undefined && <ModalPatientReservedAppointment isOpen={isOpen} setIsOpen={setIsOpen} patient={patient} />}
        <table className="table" style={{marginTop:'130px'}}>
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Patient Name</th>
                    <th scope="col">Doctor</th>
                    <th scope="col">Insurance Number</th>
                    <th scope="col">File Number</th>
                    <th scope="col">Mobile Number</th>
                    <th scope="col">Email</th>
                    <th scope="col" className="d-flex justify-content-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.patients.map((item, i) => <tr key={item._id}>
                    <th scope="row">{i + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.doctor.name}</td>
                    <td>{item.insuranceNumber}</td>
                    <td>{item.fileNumber} </td>
                    <td>{item.mobileNumber} </td>
                    <td>{item.email}</td>
                    <td>
                        <div className="d-flex justify-content-around">
                            <button className="btn" style={{ backgroundColor: 'transparent' }}
                                onClick={() =>
                                    AlertClass.AlertDelete('Are you sure you want to delete patient ' + item.name + '?',()=>props.deletePatient(item._id,props.history))
                                }
                            >
                                <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                            </button>
                            <Link to='/edit-patient' state={{ patient: item }} className="btn" style={{ backgroundColor: 'transparent' }}>
                                <FontAwesomeIcon icon={faEdit} style={{ color: 'blue' }} />
                            </Link>
                            <button className="btn" style={{ backgroundColor: 'transparent' }}
                                onClick={() => {
                                    setPatient(item)
                                    setIsOpen(true);
                                }}
                            ><FontAwesomeIcon icon={faTicketAlt} style={{ color: 'teal' }} /></button>
                        </div>

                    </td>
                </tr>)}

            </tbody>
        </table>
    </div>
}

const mapStateToProps = (state) => {
    return {
        patientDeleted: state.deletePatient
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deletePatient: (id, pageNumber, myhistory) => dispatch(deletePatientAction(id, pageNumber, myhistory))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableInfo)