import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './doctor-list.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt, faCalendarDay, faCalendarMinus, faCalendarPlus, faTicketAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteDoctorAction, getDoctorWithPagniationAction } from '../../../redux/doctor/doctor-action';
import { connect } from "react-redux";
import Header from "./header";
import AlertClass from "../../../utilities/alert-component";
import Swal from "sweetalert2";
import Loader from "../../loader/loader";

function DoctorList(props) {
  const history = useNavigate();
  useEffect(() => {
    props.getDoctors(history)
    return () => {
    }
  }, [])

  return (<div className="container mt-5">
    <Header />
    {
      props.doctor && props.doctor.loading ? <Loader /> :
        props.doctor && props.doctor.error ? <h1>{props.doctor.error}</h1> :
          <div className="doctors">
            <div className="row">
              {
                props.doctor && props.doctor.data && props.doctor.data.data && props.doctor.data.data.map((item, index) =>
                  <div className="col-md-4 mt-3" key={index}>
                    <div className="card " style={{ width: '18rem' }}>
                      <div className="d-flex justify-content-center ">
                        <img src={item.url} className="doc-image " alt="..." />
                      </div>
                      <div className="card-body">
                        <div className="d-flex justify-content-center ">

                          <h5 className="card-title">{item.name}</h5>
                        </div>
                        <div className="d-flex justify-content-between mt-5">
                          <Link to="/reserve-appointment" state={{ doctor: item }} className=" btn-primary-outline">
                            {/* <FontAwesomeIcon icon={faTicketAlt} /> */}
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </Link>
                          <button className="btn btn-primary-outline"
                            onClick={() => {
                              AlertClass.AlertDelete('Are you sure you want to delete patient ' + item.name + '?',()=>props.deleteDoctor(item._id,history))
                            }}>
                            <FontAwesomeIcon icon={faTrash} color="red" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>)
              }
            </div>
          </div>
    }
  </div>)
}
const mapStateToProps = (state) => {
  return {
    doctor: state.doctorWithPagination
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getDoctors: (myhistory) => dispatch(getDoctorWithPagniationAction({ history: myhistory })),
    deleteDoctor: (id, myhistory) => dispatch(deleteDoctorAction(id, myhistory))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DoctorList)
