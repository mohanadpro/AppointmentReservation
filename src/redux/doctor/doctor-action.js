import axios from "axios";
import { GET_DOCTOR_FAILURE,GET_DOCTOR_SUCCESS,GET_DOCTOR_REQUEST
      , CREATE_DOCTOR_REQUEST, CREATE_DOCTOR_SUCCESS, CREATE_DOCTOR_FAILURE,
       EDIT_DOCTOR_REQUEST, EDIT_DOCTOR_SUCCESS, EDIT_DOCTOR_FAILURE,
        DELETE_DOCTOR_REQUEST, DELETE_DOCTOR_SUCCESS, DELETE_DOCTOR_FAILURE,
      GET_DOCTOR_WITH_PAGINATION_REQUEST,
      GET_DOCTOR_WITH_PAGINATION_SUCCESS,
      GET_DOCTOR_WITH_PAGEINATION_FAILURE
      } from "../../constants/redux-constant";
import { SERVER_URL } from "../../constants/server-url";

const getDoctorRequest=()=>{
      return {
            type:GET_DOCTOR_REQUEST
      }
}

const getDoctorSuccess=(doctors)=>{
      return {
            type:GET_DOCTOR_SUCCESS,
            payload:doctors
      }
}

const getDoctorFailure=(error)=>{
      return{
            type:GET_DOCTOR_FAILURE,
            payload:error
      }
}

export const getDoctorAction=()=>{
      return (dispatch)=>{
            dispatch(getDoctorRequest())
            axios.get(SERVER_URL+ '/doctors')
            .then(res=>{
                  dispatch(getDoctorSuccess(res.data.data))
            })
            .catch(err=>{
                  dispatch(getDoctorFailure(err))
            })
      }
}


const getDoctorWithPaginationRequest=()=>{
      return {
            type:GET_DOCTOR_WITH_PAGINATION_REQUEST
      }
}

const getDoctorWithPaginationSuccess=(doctors)=>{
      return {
            type:GET_DOCTOR_WITH_PAGINATION_SUCCESS,
            payload:doctors
      }
}

const getDoctorWithPaginationFailure=(error)=>{
      return{
            type:GET_DOCTOR_WITH_PAGEINATION_FAILURE,
            payload:error
      }
}

export const getDoctorWithPagniationAction=({history})=>{

      return (dispatch)=>{
      if(JSON.parse(localStorage.getItem('user'))==null)
      {
            dispatch(getDoctorFailure('error'))
            history('/')
      }
      else
      {
      const headers={
            "Authorization":"JWT "+JSON.parse(localStorage.getItem('user')).token
      }      
      
            dispatch(getDoctorWithPaginationRequest())
            axios.get(SERVER_URL+ '/doctors',{headers:headers})
            .then(res=>{
                  dispatch(getDoctorWithPaginationSuccess(res.data))
            })
            .catch(err=>{
                  if(err.response.status==408)
                  {
                        localStorage.removeItem('user');
                        history('/');
                        window.location.reload(false);
                  }
                  else
                        dispatch(getDoctorWithPaginationFailure(err))
            })
      }
      }
}

export const getDoctorByNameAction=(name,history)=>{
      const headers={
            "Authorization":"JWT "+JSON.parse(localStorage.getItem('user')).token
      }      
      return (dispatch)=>{
            dispatch(getDoctorWithPaginationRequest())
            axios.get(SERVER_URL+ '/doctors/getDoctorByName/'+name,{headers:headers})
            .then(res=>{
                  dispatch(getDoctorWithPaginationSuccess(res.data.data))
            })
            .catch(err=>{
                  if(err.response.status==408)
                  {
                        localStorage.removeItem('user');
                        history('/');
                        window.location.reload(false);
                  }
                  else
                        dispatch(getDoctorWithPaginationFailure(err))
            })
      }
}


const createDoctorRequest=()=>{
      return {
            type:CREATE_DOCTOR_REQUEST
      }
}

const createDoctorSuccess=(doctor)=>{
      return {
            type:CREATE_DOCTOR_SUCCESS,
            payload:doctor
      }
}

const createDoctorFailure=(err)=>{
      return {
            type:CREATE_DOCTOR_FAILURE,
            payload:err
      }
}

export const createDoctorAction=(selectedImage,doctor,history)=>{
      const headers={
            "Authorization":"JWT "+JSON.parse(localStorage.getItem('user')).token
      }
      var fd=new FormData();
      fd.append('name',doctor.name);
      fd.append('image',selectedImage);
      return async(dispatch)=>{
            dispatch(createDoctorRequest())
            axios.post(SERVER_URL+'/doctors/',fd,{headers:headers})
            .then(res=>{
                  dispatch(createDoctorSuccess(res.data.message))
                  dispatch(getDoctorWithPagniationAction({history:history}))
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
                        dispatch(createDoctorFailure(err.response.data.message))
            })
      }
}


const editDoctorRequest=()=>{
      return {
            type:EDIT_DOCTOR_REQUEST
      }
}

const editDoctorSuccess=(doctor)=>{
      return {
            type:EDIT_DOCTOR_SUCCESS,
            payload:doctor
      }
}

const editDoctorFailure=(err)=>{
      return {
            type:EDIT_DOCTOR_FAILURE,
            payload:err
      }
}

export const editDoctorAction=(doctor,history,pageNumber)=>{
      const headers={
            "Authorization":"JWT "+JSON.parse(localStorage.getItem('user')).token
      }
      return async(dispatch)=>{
            dispatch(editDoctorRequest());
            axios.patch(SERVER_URL+'/doctors/'+doctor._id,doctor,{headers:headers})
            .then(res=>{
                  dispatch(editDoctorSuccess(res.data.message))
                  dispatch(getDoctorWithPagniationAction(pageNumber,history))
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
                        dispatch(editDoctorFailure(err))
            })
      }
}


const deleteDoctorRequest=()=>{
      return {
            type:DELETE_DOCTOR_REQUEST
      }
}

const deleteDoctorSuccess=(doctor)=>{
      return {
            type:DELETE_DOCTOR_SUCCESS,
            payload:doctor
      }
}

const deleteDoctorFailure=(err)=>{
      return{
            type:DELETE_DOCTOR_FAILURE,
            payload:err
      }
}


export const deleteDoctorAction=(id,history)=>{
      const headers={
            "Authorization":"JWT "+JSON.parse(localStorage.getItem('user')).token
      }
      return async(dispatch)=>{
            dispatch(deleteDoctorRequest());
            axios.get(SERVER_URL+'/doctors/deleteDoctor/'+id,{headers:headers})
            .then(res=>{
                  dispatch(deleteDoctorSuccess(res.data.message))
                  dispatch(getDoctorWithPagniationAction(history))
            }).catch(err=>{
                  if(err.response.status==408)
                  {
                        localStorage.removeItem('user')
                        history('/')
                        window.location.reload(false)
                  }
                  else
                        dispatch(deleteDoctorFailure(err));
            })
      }
}