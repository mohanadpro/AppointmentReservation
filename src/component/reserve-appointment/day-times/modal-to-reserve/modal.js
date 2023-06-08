import Modal from 'react-modal'
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { searchAction } from '../../../../redux/search/search-action';
import { createReserveAction } from '../../../../redux/reserve-appointment/create/reserve-appointment-action';
import { useNavigate } from 'react-router-dom';

import './modal-to-reserve.css'

function ModalToReserve({ isOpen, setIsOpen, doctor, time, modalSelectedDate, ...props }) {
    const myhistory = useNavigate();
    const [search, setSearch] = useState({ typeOfSearch: 'Patients', searchLetters: '' });
    const [displaySearchContainer, setDisplaySearchContainer] = useState(false);
    const [patient, setPatient] = useState('');
    let [reservationDate, setReservationDate] = useState('')
    useEffect(() => {
        setReservationDate(modalSelectedDate);
        if (modalSelectedDate != '')
            setReservationDate(modalSelectedDate.getDate() + '-' + parseInt(modalSelectedDate.getMonth() + 1) + '-' + modalSelectedDate.getFullYear());
        if (search.searchLetters.length > 0) {
            props.search(search);
        }
    }, [search.searchLetters, modalSelectedDate])



    const HandelSubmit = (e) => {
        e.preventDefault();
        setSearch({ ...search, searchLetters: '' });
        setDisplaySearchContainer(false);
        props.createReservation({ doctor: doctor._id, patient: patient._id, appointmentDate: modalSelectedDate, appointmentTime: time }, myhistory);
        setIsOpen(false);
    }
    return <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(!isOpen)}
            contentLabel="My dialog"
            className="mymodal-modal-to-reserve"
            overlayClassName="myoverlay"
            ariaHideApp={false}
            closeTimeoutMS={100}>
            <form onSubmit={HandelSubmit} >
                <div className="form-group input-block-level mt-5 mb-2">
                    <h3>DR. {doctor.name}</h3>
                </div>
                <div className="form-group input-block-level mt-5 mb-2">
                    <h3>Date {reservationDate}</h3>
                </div>
                <div className="form-group input-block-level mt-5 mb-2">
                    <h3>Time {time}</h3>
                </div>
                <div className="form-group input-block-level mt-3 mb-2">
                    <input type="text" value={search.searchLetters} className="form-control" placeholder="Enter Patient Name"
                        onChange={e => {
                            if (e.target.value != '')
                                setDisplaySearchContainer(true);
                            else
                                setDisplaySearchContainer(false);
                            setSearch({ ...search, searchLetters: e.target.value })
                        }} />
                    {displaySearchContainer && props.searchData.data && props.searchData.data.results &&
                        <div className='col-sm-12 col-md-12 search-container'>
                            <ul>
                                {props.searchData.data.results.map((e, i) => <li key={i}
                                    style={{ textAlign: "start", color: 'black' }}
                                    onClick={() => {
                                        setSearch({ ...search, searchLetters: e.name.toString() });
                                        setPatient(e);
                                        setDisplaySearchContainer(false);
                                    }}>
                                    {e.name}
                                </li>)}
                            </ul>
                        </div>
                    }
                </div>
                <div className="form-group input-block-level">
                    <input type='submit' value="Reserve" className="btn btn-success btn-block mt-3" style={{ borderRadius: "20px" }} />
                </div>
            </form>
        </Modal>
}
const mapStateToProps = (state) => {
    return {
        searchData: state.search,
        createReservation: state.createReservation
    }
}
const mapDispatchToProps = dispatch => {
    return {
        search: (search) => dispatch(searchAction(search)),
        createReservation: (reservation, myhistory) => dispatch(createReserveAction(reservation, myhistory))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalToReserve)
