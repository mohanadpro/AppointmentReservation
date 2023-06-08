import { useEffect, useState } from "react"
import DateRangePicker from "tw-daterange"
import Datepicker from "react-tailwindcss-datepicker";
import Calendar from "react-calendar";
import './Calendar.css';
function MyDateRangePicker({setSelectedDate}) {
    const [date, setDate] = useState(new Date())
    useEffect(()=>{
        setSelectedDate(date);        
    },[date])
    return (
        <div>
            <div className="calendar-container">
                <Calendar minDate={new Date(new Date().toISOString().split("T")[0])} 
                onChange={setDate}
                tileDisabled={({date}) => [0, 6].includes(date.getDay())}
                 value={date} />
            </div>
        </div>
    )
}

export default MyDateRangePicker