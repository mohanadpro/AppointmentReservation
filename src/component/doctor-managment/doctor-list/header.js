import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return <div className="d-flex justify-content-between">

        <div className="title">
            <h1>List Doctors</h1>
        </div>
        <div className="d-flex justify-content-end">
            <Link to="/create-doctor" className="btn btn-danger" style={{ fontSize: '17px', height: '42px' }}><FontAwesomeIcon icon={faPlus} /> </Link>
        </div>
    </div>
}