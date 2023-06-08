import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './side-bar.css'
import { authenticationAction } from "../../redux/user/authentication/authentication-action";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faPersonBooth, faSignOutAlt, faStethoscope, faUserMd, faUsers } from "@fortawesome/free-solid-svg-icons";

function Sidebar(props) {
    const history=useNavigate();
    useEffect(() => {
        props.authenticationFunc();
    }, [])
    const linkStyle = {
        color: 'white',
        fontSize: '18px',
        marginLeft:'-40px'
    }
    return <div>
        {props.authenticationState && props.authenticationState.data && props.authenticationState.data.isAuth ?
            <div className="side-bar">
                <ul className="link-area d-flex flex-column justify-content-between">
                    <li>
                        <Link to='/home' style={linkStyle} className="d-flex flex-column align-items-center">
                            <FontAwesomeIcon icon={faStethoscope}/>
                            Doctors</Link>
                    </li>
                    <li >
                        <Link to='/patients' style={linkStyle} className="d-flex flex-column align-items-center">
                        <FontAwesomeIcon icon={faUserMd}/>
                            Patients</Link>
                    </li>
                    <li >
                        <Link to='/users' style={linkStyle} className="d-flex flex-column align-items-center">
                        <FontAwesomeIcon icon={faUsers}/>
                            
                            Users</Link>
                    </li>
                    <li >
                        <Link to='/settings' style={linkStyle} className="d-flex flex-column align-items-center">
                        <FontAwesomeIcon icon={faCog}/>
                            
                            Settings</Link>
                    </li>
                    <li >
                        <Link className="d-flex flex-column align-items-center" onClick={() => {
                            localStorage.removeItem('user')
                            history('/');
                            window.location.reload(false);

                        }} style={linkStyle}>
                        <FontAwesomeIcon icon={faSignOutAlt}/>
                            
                            Logout</Link>
                    </li>
                </ul>
            
            </div>

            : null
        }
    </div>

}
const mapStateToProps = (state) => {
    return {
        authenticationState: state.authentication
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticationFunc: () => dispatch(authenticationAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
