import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../../redux/user/signin/signin-action';
import Loader from '../../loader/loader';

function Login(props) {
  const [user, setUser] = useState({ username: '', password: '' })
  const history = useNavigate();

  return (<div>
    {props.returnedUser && props.returnedUser.loading ? <Loader /> :
      <MDBContainer className="gradient-form">
        <MDBRow >
          <MDBCol col='2'></MDBCol>
          <MDBCol col='8' className="mb-5">
            <div className="d-flex flex-column ms-5">
              <div className="text-center">
                <img src="images/logo.png"
                  style={{ width: '185px' }} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1">Welcome To Reserve Appointment System</h4>
              </div>

              <p>Please login to your account</p>

              <div className='mb-3'>
                <MDBInput className='mb-4' id='form1' type='text' value={user.username}

                  onChange={e => setUser({ ...user, username: e.target.value })}
                />
              </div>
              <div className='mb-3'>

                <MDBInput className='mb-4' id='form2' type='password' value={user.password}
                  onChange={e => setUser({ ...user, password: e.target.value })}
                />
              </div>

              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-2" onClick={async (e) => {
                  e.preventDefault();
                  props.signInAction(user, history);
                }}  >Sign in</MDBBtn>
              </div>

            </div>

          </MDBCol>
          <MDBCol col='2'></MDBCol>
        </MDBRow>

      </MDBContainer>
    }
  </div>

  );
}

const mapStateToProps = (state) => {
  return {
    returnedUser: state.signIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signInAction: (user, myhistory) => dispatch(signIn(user, myhistory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);