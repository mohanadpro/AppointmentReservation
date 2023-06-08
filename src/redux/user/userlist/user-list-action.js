import { GET_USER_FAILURE,GET_USER_SUCCESS,GET_USER_REQUEST,
      DELETE_USER_FAILURE,DELETE_USER_SUCCESS,DELETE_USER_REQUEST,
      GET_SYSTEM_USER_REQUEST,GET_SYSTEM_USER_SUCCESS,GET_SYSTEM_USER_FAILURE
} from "../../../constants/redux-constant";
import axios from 'axios';
import { SERVER_URL } from "../../../constants/server-url";

// get products **********************************
const getUserRequest=()=>{
      return {
            type:GET_USER_REQUEST
      }
}

const getUserSuccess=products=>{
      return {
            type:GET_USER_SUCCESS,
            payload:products
      }
}

const getUserFailure=(error)=>{
      return {
            type:GET_USER_FAILURE,
            payload:error
      }
}

export const getUsersAction=({history})=>{
      return (dispatch)=>{
            console.log(JSON.parse(localStorage.getItem('user')));
            if(JSON.parse(localStorage.getItem('user'))==null)
            {
                  dispatch(getUserFailure('error'))
                  history('/')
            }
            else
            {
      const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT '+JSON.parse(localStorage.getItem('user')).token
          }

            dispatch(getUserRequest());
            axios.get(SERVER_URL+'/users',{headers:headers})
            .then(res=>{
                  const users=res.data.users;
                  dispatch(getUserSuccess(users))
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
                        dispatch(getUserFailure(err))
                  }        
            })
      }      
}
}





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
            axios.get(SERVER_URL+'/users/deleteUser/'+id,{headers:headers})
            .then(res=>{
                  dispatch(deleteUserSuccess(res.message));
                  dispatch(getUsersAction({history:history}))
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
                        dispatch(deleteUserFailure(err.response.data.message))
                  }
            })
      }
}
