import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
export default function Header(){
    return <div className='d-flex justify-content-between'>
    <div className="title">
          <h1>List Users</h1>
    </div>
    <div className="d-flex justify-content-end">
          <Link to="/create-user" className="btn btn-danger" style={{height:'40px',fontSize:'17px'}}>
                <FontAwesomeIcon icon={faPlus}/> </Link>
    </div>
</div>
}