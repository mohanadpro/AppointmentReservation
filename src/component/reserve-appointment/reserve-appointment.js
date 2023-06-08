import React, { useEffect, useState } from "react";
import MyDateRangePicker from "./date-picker/date-picker";
import DayTimes from "./day-times/day-times";
import Header from "./header/header";
import { useLocation } from "react-router-dom";


function ReserveAppointment(props) {    

    const current = new Date();
    const [selectedDate,setSelectedDate]=useState(current);
    const {state}=useLocation();
    const doctor=state.doctor;

    return (<div className="container">
        <Header doctor={doctor}/>
        <div className="row">
            <div className="col-md-5">
                <MyDateRangePicker setSelectedDate={setSelectedDate}/>
            </div>
            <div className="col-md-7">
                <DayTimes doctor={doctor} selectedDate={selectedDate}/>
            </div>
        </div>
    </div>)
}

export default ReserveAppointment;