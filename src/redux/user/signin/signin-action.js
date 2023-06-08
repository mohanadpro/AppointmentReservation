import axios from "axios";
import {SIGNIN_REQUEST,SIGNIN_SUCCESS, SIGNIN_FAILURE} from '../../../constants/redux-constant'
import { SERVER_URL } from "../../../constants/server-url";

const signinRequest=()=>{
      return {
            type:SIGNIN_REQUEST
      }
}

const signinSuccess=(user)=>{
      return {
            type:SIGNIN_SUCCESS,
            payload:user,
      }
}

const signinFailure=(err)=>{
      return {
            type:SIGNIN_FAILURE,
            payload:err
      }
}

export const signIn=(user,history)=>{
      return async(dispatch)=>{
            dispatch(signinRequest());
            axios.post(SERVER_URL+'/users/adminLogin',user)
            .then(res=>{
                  if(res.status==200)
                  {
                        localStorage.setItem('user',JSON.stringify(res.data.user))
                        dispatch(signinSuccess(JSON.stringify(res.data.user)))
                       
                        history("/home");
                        window.location.reload(false);
                  }
            })
            .catch(err=>{             
                  dispatch(signinFailure(err.response.data.message));
            })
      }
}