import React, { useState } from "react";
import { getPatientsAction } from "../../../redux/patient/patient-action";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function Pagination(props) {

    const history = useNavigate();
    return <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
            <li className="page-item">
                <button className='page-link'
                    onClick={() => {
                        if (props.pageNumber > 0) {
                            props.setPageNumber(props.pageNumber - 1)
                            props.getPatients(props.pageNumber, history);
                        }
                    }}>
                    Privious
                </button>
            </li>
            {
                [...Array(props.totalPages)].map((x, i) => <button key={i} className='page-link'
                    onClick={() => {
                        props.setPageNumber(i)
                        props.getPatients(props.pageNumber, history);


                    }}>
                    {i + 1}
                </button>
                )
            }

            <li className="page-item">
                <button className='page-link'
                    onClick={() => {
                        if (props.pageNumber < props.totalPages-1) {
                            props.setPageNumber(props.pageNumber + 1)
                            props.getPatients(props.pageNumber, history);
                        }
                    }}>
                    Next
                </button>
            </li>
        </ul>
    </nav>
}


const mapStateToProps = (state) => {
    return {
        patientData: state.patient,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPatients: (pageNumber, myhistory) => dispatch(getPatientsAction({pageNumber: pageNumber, history: myhistory })),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination)