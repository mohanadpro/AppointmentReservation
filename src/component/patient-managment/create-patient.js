import React, { useEffect, useState } from "react";
import { getDoctorAction, getDoctorWithPagniationAction } from '../../redux/doctor/doctor-action';
import { createPatientAction, editPatientAction } from '../../redux/patient/patient-action'
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import './create-patient.css'
import Swal from "sweetalert2";
function CreatePatient(props) {
    const history = useNavigate();

    const [patient, setPatient] = useState({ name: '', doctor: '', fileNumber: '', insuranceNumber: '', mobileNumber: '', email: '' });
    const { state } = useLocation();
    const verification = () => {
        if (patient.name == '')
            return 'Please Input Name'
        else
            if (patient.doctor == '')
                return 'Please Choose Doctor'
            else
                return '';
    }
    useEffect(() => {
        props.getDoctors(history);
        if (state != null) {
            setPatient(state.patient);
        }
    }, [])

    return <div className="create-patient">
        <div className=" d-flex justify-content-center">
            {props.createPatientState && props.createPatientState.loading ? <h1>Loading...</h1> :

                <form className="col-sm-12 col-md-4 ">
                    <div className="d-flex justify-content-center title">
                        <h1>{patient._id ? "Edit Patient" : "Create Patient"}</h1>
                    </div>
                    {props.createPatientState && props.createPatientState.error &&
                        <div className="d-flex justify-content-end align-items-end error-msg">
                            <h3>{props.createPatientState.error}</h3>
                        </div>
                    }
                    <div className="form-group input-block-level mt-3 mb-2">
                        <input type="text" value={patient.name} className="form-control" placeholder="Enter Patient Name" onChange={e => setPatient({ ...patient, name: e.target.value })} />
                    </div>
                    {
                        props.doctor && props.doctor.data && props.doctor.data.data &&
                        <div className="form-group selectpicker mt-3 input-block-level">
                            <select className="form-control"
                                value={patient.doctor._id}
                                onChange={e => { setPatient({ ...patient, doctor: e.target.value }) }}>
                                {
                                    <option value=''>Please Select Doctor</option>}
                                {
                                    props.doctor.data.data.map(doctor =>
                                        <option key={doctor._id} value={doctor._id} style={{ color: 'black' }}>{doctor.name}</option>
                                    )
                                }
                            </select>
                        </div>
                    }
                    <div className="form-group input-block-level mt-3 mb-2">
                        <input type="text" value={patient.insuranceNumber} className="form-control" placeholder="Enter Patient Insurance Number" onChange={e => setPatient({ ...patient, insuranceNumber: e.target.value })} />
                    </div>
                    <div className="form-group input-block-level mt-3 mb-2">
                        <input type="text" value={patient.fileNumber} className="form-control" placeholder="Enter Patient File Number" onChange={e => setPatient({ ...patient, fileNumber: e.target.value })} />
                    </div>
                    <div className="form-group input-block-level mt-3 mb-2">
                        <input type="number" value={patient.mobileNumber} className="form-control" placeholder="Enter Patient Phone Number" onChange={e => setPatient({ ...patient, mobileNumber: e.target.value })} />
                    </div>

                    <div className="form-group input-block-level mt-3 mb-2">
                        <input type="text" value={patient.email} className="form-control" placeholder="Enter Patient Email" onChange={e => setPatient({ ...patient, email: e.target.value })} />
                    </div>
                    <div className="input-block-level">
                        <button onClick={async (e) => {
                            e.preventDefault();
                            const isVerify = verification();
                            if (isVerify != '') {
                                Swal.fire({ title: isVerify, icon: 'error' })
                            }
                            else {
                                patient._id ?
                                    props.editPatient(patient, 0, history)
                                    :
                                    props.createPatient(patient, 0, history);

                            }
                        }} className="btn btn-success btn-block mt-3" style={{ borderRadius: "20px" }}>
                            {patient._id ? "Edit Patient" : "Create Patient"}
                        </button>
                    </div>
                </form>
            }
        </div>
    </div>
}

const mapStateToProps = (state) => {
    return {
        createPatientState: state.createPatient,
        doctor: state.doctorWithPagination
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createPatient: (patient, pageNumber, myhistory) => dispatch(createPatientAction(patient, pageNumber, myhistory)),
        editPatient: (patient, pageNumber, myhistory) => dispatch(editPatientAction(patient, pageNumber, myhistory)),
        getDoctors: (history) => dispatch(getDoctorWithPagniationAction({ history: history })),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePatient)

