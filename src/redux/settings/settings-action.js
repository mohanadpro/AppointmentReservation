import axios from "axios";
import { GET_SETTINGS_FAILURE,GET_SETTINGS_SUCCESS,GET_SETTINGS_REQUEST,
        CREATE_SETTINGS_REQUEST, CREATE_SETTINGS_SUCCESS, CREATE_SETTINGS_FAILURE
      } from "../../constants/redux-constant";
import { SERVER_URL } from "../../constants/server-url";



const getSettingRequest=()=>{
    return {
          type:GET_SETTINGS_REQUEST
    }
}

const getSettingSuccess=(doctors)=>{
    return {
          type:GET_SETTINGS_SUCCESS,
          payload:doctors
    }
}

const getSettingFailure=(error)=>{
    return{
          type:GET_SETTINGS_FAILURE,
          payload:error
    }
}

export const getSettingAction=()=>{
    return (dispatch)=>{
          dispatch(getSettingRequest())
          axios.get(SERVER_URL+ '/appsettings')
          .then(res=>{
                dispatch(getSettingSuccess(res.data.settings[0]))
          })
          .catch(err=>{
                dispatch(getSettingFailure(err))
          })
    }
}





const createSettingRequest=()=>{
    return {
          type:CREATE_SETTINGS_REQUEST
    }
}

const createSettingSuccess=(doctor)=>{
    return {
          type:CREATE_SETTINGS_SUCCESS,
          payload:doctor
    }
}

const createSettingFailure=(err)=>{
    return {
          type:CREATE_SETTINGS_FAILURE,
          payload:err
    }
}

export const createSettingAction=(setting,history)=>{
    const headers={
          "Authorization":"JWT "+JSON.parse(localStorage.getItem('user')).token
    }

    return async(dispatch)=>{
          dispatch(createSettingRequest())
          axios.post(SERVER_URL+'/appsettings/',setting,{headers:headers})
          .then(res=>{
                dispatch(createSettingSuccess(res.data.message))
                dispatch(getSettingAction(history))
                history('/home')
          })
          .catch(err=>{
                if(err.response.status==408)
                {
                      localStorage.removeItem('user')
                      history('/')
                      window.location.reload(false)
                }
                else
                      dispatch(createSettingFailure(err.response.data.message))
          })
    }
}