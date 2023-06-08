import React from "react";

function Header(props) {
    return <div className="row mt-3 mb-3">
        <div className="col-md-6 d-flex justify-content-start align-items-center div-height">
            <div>
                <h4>You can reserve an appointment</h4>
                <ol>
                    <li>Select The Day From The Left Side</li>
                    <li>Choose The Time From The Right Side </li>
                </ol>

            </div>
        </div>
        <div className="col-md-6 d-flex justify-content-between">
            <div className="d-flex align-items-center"> <h3>Dr. {props.doctor.name}</h3></div>
            <div><img src={props.doctor.url} width='150px' height='150px' /></div>

        </div>
    </div>
}
export default Header;


