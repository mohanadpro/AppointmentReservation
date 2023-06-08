import React, { useState } from "react";
import './create-setting.css'
import { connect } from "react-redux";
import { createSettingAction } from "../../redux/settings/settings-action";
import { useNavigate } from "react-router-dom";
function Settings(props) {
    const [setting, setSetting] = useState({ startHour: 0, endHour: 0, howManyPatientInHour: 0, hasBreak: false, whichHour: '12:00', howMuch: 0 })
    const history = useNavigate();

    return <div className="d-flex create-setting">
        <div className="col-sm-12 col-md-4"></div>
        <form className="col-sm-12 col-md-4 ">
            <div className="form-group input-block-level mt-5 mb-2 d-flex justify-content-center">
                <h1>Settings</h1>
            </div>
            <div className="form-group input-block-level mt-3 mb-2 row">
                <div className="col-md-4">Start hour</div>
                <div className=" col-md-8">
                    <input type="number" value={setting.startHour} className="form-control" placeholder="Enter start hour" onChange={e => setSetting({ ...setting, startHour: e.target.value })} />
                </div>
            </div>
            <div className="form-group input-block-level mt-3 mb-2 row">
                <div className="col-md-4">End hour</div>
                <div className=" col-md-8">
                    <input type="number" value={setting.endHour} className="form-control" placeholder="Enter end hour" onChange={e => setSetting({ ...setting, endHour: e.target.value })} />
                </div>
            </div>
            <div className="form-group input-block-level mt-3 mb-2 row">
                <div className="col-md-4">Patients per hour</div>
                <div className=" col-md-8">
                    <input type="number" value={setting.howManyPatientInHour} className="form-control" placeholder="Enter end hour" onChange={e => setSetting({ ...setting, howManyPatientInHour: e.target.value })} />
                </div>
            </div>

            <div className="form-group input-block-level mt-3 mb-2 row">
                <div className="col-md-1"> <input type="checkbox" value={setting.hasBreak} onChange={e => setSetting({ ...setting, hasBreak: !setting.hasBreak })} /></div>
                <div className="col-md-11">

                    <div className="ml-4">Has a break</div>
                </div>
            </div>
            <div className="form-group input-block-level mt-3 mb-2 d-flex justify-content-between">
                <div className="col-md-4">Which hour?</div>
                <div className=" col-md-8">
                    <input type="time" value={setting.whichHour} disabled={!setting.hasBreak} className="form-control"
                        placeholder="Which hour start the break" onChange={e => setSetting({ ...setting, whichHour: e.target.value })} />
                </div>
            </div>
            <div className="form-group input-block-level">
                <button onClick={(e) => {
                    e.preventDefault();
                    props.createSetting(setting, history);

                }} className="btn btn-success btn-block mt-3" style={{ borderRadius: "20px" }}>
                    Save Setting
                </button>
            </div>
        </form>

    </div>
}


const mapStateToProps = (state) => {
    return {
        setting: state.Settings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createSetting: (setting, history) => dispatch(createSettingAction(setting, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);