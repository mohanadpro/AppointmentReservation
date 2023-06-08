import React, { useEffect, useState } from "react";
import { faPlus, } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPatientsAction, deletePatientAction } from '../../../redux/patient/patient-action';

import Swal from 'sweetalert2';
import Header from "./header";
import Pagination from "./pagination";
import TableInfo from "./table-info";
import Loader from "../../loader/loader";
function PatientList(props) {

      const [pageNumber, setPageNumber] = useState(0);
      const history = useNavigate();
      useEffect(() => {
            props.getPatients(pageNumber, history);
      }, [pageNumber])
      return <div className="container">
            <Header />

            {props.patientData.loading ? <Loader /> : props.patientData.error ?
                  <div className="d-flex justify-content-center align-items-center error-msg">
                        <h1>{props.patientData.error.response && props.patientData.error.response.data.message}</h1>
                  </div>
                  :
                  <div className='d-flex flex-column justify-content-between' style={{ height: "65vh" }}>
                        {props.patientData && props.patientData.data.patients &&
                              <TableInfo patients={props.patientData.data.patients} pageNumber={pageNumber} history={history} />
                        }

                        {props.patientData && props.patientData.data.totalPages > 0 &&
                              <Pagination totalPages={props.patientData.data.totalPages} pageNumber={pageNumber} setPageNumber={setPageNumber} />
                        }
                  </div>
            }
      </div>
}
const mapStateToProps = (state) => {
      return {
            patientData: state.patient,
      }
}

const mapDispatchToProps = dispatch => {
      return {
            getPatients: (pageNumber, myhistory) => dispatch(getPatientsAction({ pageNumber: pageNumber, history: myhistory })),

      }
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientList)