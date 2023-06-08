import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,DELETE_USER_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_FAILURE,
    EDIT_USER_REQUEST,EDIT_USER_SUCCESS,EDIT_USER_FAILURE } from "../../../constants/redux-constant";
    import axios from 'axios';
    import { SERVER_URL } from "../../../constants/server-url";
    import { getUsersAction } from "../userlist/user-list-action";

const createUserRequest=()=>{
    return {
          type:CREATE_USER_REQUEST
    }
}

const createUserSuccess=(message)=>{
    return {
          type:CREATE_USER_SUCCESS,
          payload:message
    }
}

const createUserFailure=(error)=>{
    return {
          type:CREATE_USER_FAILURE,
          payload:error
    }
}


export const createUserAction=(user,history)=>{

    const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'JWT '+JSON.parse(localStorage.getItem('user')).token
        }
    return async(dispatch)=>{
          dispatch(createUserRequest());
          axios.post(SERVER_URL+'/users/createUserAccount',user,{headers:headers})
          .then(res=>{
                dispatch(createUserSuccess(res.data.message))
                dispatch(getUsersAction({history:history}));
                history('/users')
          })
          .catch(err=>{
                if(err.response.status==408)
                {
                      localStorage.removeItem('user')
                      history('/')
                      window.location.reload(false);                  
                }
                else
                {
                dispatch(createUserFailure(err.response.data.message))
                }
          })
    }
}
//**********************************************************

// Delete User *************************************

const deleteUserRequest=()=>{
    return {
          type:DELETE_USER_REQUEST
    }
}

const deleteUserSuccess=(message)=>{
    return {
          type:DELETE_USER_SUCCESS,
          payload:message
    }
}

const deleteUserFailure=(error)=>{
    return{
          type:DELETE_USER_FAILURE,
          payload:error
    }
}

export const deleteUserAction=(id,history)=>{
    const headers={
          "Authorization":"JWT "+JSON.parse(localStorage.getItem('user')).token
    }
    return async dispatch=>{
          dispatch(deleteUserRequest());
          axios.delete(SERVER_URL+'/users/'+id,{headers:headers})
          .then(res=>{
                dispatch(deleteUserSuccess(res.message));
                dispatch(getUsersAction())
          })
          .catch(err=>{
                if(err.response.status==408)
                {
                      localStorage.removeItem('user')
                      history('/')
                      window.location.reload(false);                  
                }
                else
                {
                      dispatch(deleteUserFailure(err))
                }
          })
    }
}
// **************************************************

const editUserRequest=()=>{
    return {
          type:EDIT_USER_REQUEST
    }
}

const editUserSuccess=(message)=>{
    return {
          type:EDIT_USER_SUCCESS,
          payload:message
    }
}

const editUserFailure=(err)=>{
    return {
          type:EDIT_USER_FAILURE,
          payload:err
    }
}

export const editUserAction=(user,history)=>{
    const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'JWT '+JSON.parse(localStorage.getItem('user')).token
        }
    return async(dispatch)=>{
          dispatch(editUserRequest());
          axios.patch(SERVER_URL+'/users/updateSystemUser/'+user._id,user,{headers:headers})
          .then(res=>{
                dispatch(editUserSuccess(res.message));
                dispatch(getUsersAction());
                history.push('/users')
          })
          .catch(err=>{
                if(err.response.status==408)
                {
                      localStorage.removeItem('user')
                      history('/')
                      window.location.reload(false);                  
                }
                else
                {
                        dispatch(editUserFailure(err))
                }
          })
    }
}