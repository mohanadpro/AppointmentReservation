import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import { createUserAction, editUserAction } from '../../../redux/user/create-user/create-user-action'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function CreateUser(props) {
  const history = useNavigate();
  const [user, setUser] = useState({_id:'',username: '', password:''});
  const verification=()=>{
    var regExp=new RegExp('^[a-zA-Z0-9]{3,}$');
        if(!regExp.test(user.username))
              return 'User must be more than 3 Charachter'
        else
              return ''            
  }

  
  const handleCreateUserSubmit=(e)=>{
              e.preventDefault();
              // const isVerify=verification();
              // if(isVerify!='')
              //       Swal.fire({title:isVerify,icon:'error'})
              // else{
                    props.createUser(user,history);        
   //     }
      } 



  return (
    <MDBContainer className="my-5 gradient-form">

      <MDBRow>
      <MDBCol col='2'></MDBCol>
        <MDBCol col='8' className="mb-5">
          <div className="d-flex flex-column ms-5">

            <div className="text-center">
              <img src="images/logo.png"
                style={{width: '185px'}} alt="logo" />
            </div>

            <p>Create Admin User</p>

            <div className='mb-3'>
                 <MDBInput className='mb-4' id='form1' type='text' value={user.username}
                 
                 onChange={e=>setUser({...user,username:e.target.value})}
                 />
            </div>
            <div className='mb-3'>

                <MDBInput className='mb-4' id='form2' type='password' value={user.password}
                
                onChange={e=>setUser({...user,password:e.target.value})}
                
                />
            </div>

            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2 btn-success" onClick={handleCreateUserSubmit}>Create User</MDBBtn>
            </div>

          </div>

        </MDBCol>
        <MDBCol col='2'></MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}
const mapStateToProps = (state) => {
  return {
        createUserState: state.createUser,
        users:state.systemUsers
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
        createUser: (user,myhistory) => dispatch(createUserAction(user,myhistory)),
        editUser:(user,myhistory)=>dispatch(editUserAction(user,myhistory))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
