import React, { useState } from "react";
import { createDoctorAction, editDoctorAction } from '../../redux/doctor/doctor-action';
import {connect} from 'react-redux';
import { useNavigate } from "react-router-dom";
function CreateDoctor(props) {
    const [selectedImage, setSelectedImage] = useState(null);
    const history=useNavigate();
    const [doctor, setDoctor] = useState({});
    var fileSelectorHandler = event => {
        setSelectedImage(event.target.files[0]);
  }
    return <div className="mybody d-flex justify-content-center ">
        {props.createDoctorState && props.createDoctorState.loading ? <h1>Loading...</h1> :
            <form className="col-sm-12 col-md-4 " style={{marginTop:'100px'}}>
                {props.createDoctorState && props.createDoctorState.error &&
                    <div className="d-flex justify-content-end align-items-end error-msg">
                        <h3>{props.createDoctorState.error}</h3>
                    </div>}
                <div className="form-group input-block-level mt-5 mb-2" >
                     <h1 style={{color:'red'}}>{doctor._id ? "Edit Doctor" : "Create Doctor"}</h1>
                </div>                
                <div className="form-group input-block-level mt-5 mb-2">
                    <input type="text" value={doctor.name} className="form-control" placeholder="Enter Doctor Name" onChange={e => setDoctor({ ...doctor, name: e.target.value })} />
                </div>
                {
                    <div className="form-group input-block-level mt-4">
                        <input type="file" className="form-control" onChange={fileSelectorHandler}
                        />
                    </div>
                }
                <div className="input-block-level">
                    <button onClick={(e) => {
                        e.preventDefault();
                        props.createDoctor(selectedImage, doctor,history);
                    }} className="btn btn-success btn-block mt-3" style={{ borderRadius: "20px" }}>
                        {doctor._id ? "Edit Doctor" : "Create Doctor"}
                    </button>
                </div>
            </form>
        }
    </div>
}

const mapStateToProps=(state)=>{
    return{
          doctorRes:state.createDoctor
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
          createDoctor:(selectedImage,doctor,myhistory)=>dispatch(createDoctorAction(selectedImage,doctor,myhistory)),
          editDoctor:(doctor,myhistory,pageNumber)=>dispatch(editDoctorAction(doctor,myhistory,pageNumber)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateDoctor)