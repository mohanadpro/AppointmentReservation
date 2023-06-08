import { GET_RESERVATION_FAILURE,GET_RESERVATION_SUCCESS,GET_RESERVATION_REQUEST,
      CREATE_RESERVATION_REQUEST, CREATE_RESERVATION_SUCCESS,
      CREATE_RESERVATION_FAILURE,DELETE_RESERVATION_REQUEST,
      DELETE_RESERVATION_SUCCESS,DELETE_RESERVATION_FAILURE,
      GET_SPECIFIC_RESERVATION_REQUEST,GET_SPECIFIC_RESERVATION_SUCCESS,GET_SPECIFIC_RESERVATION_FAILURE, GET_PATIENT_RESERVATION_REQUEST, GET_PATIENT_RESERVATION_SUCCESS, GET_PATIENT_RESERVATION_FAILURE

} from "../../../constants/redux-constant";
import axios from 'axios';
import { SERVER_URL } from "../../../constants/server-url";

// get reserves **********************************
const getReserveRequest=()=>{
    return {
          type:GET_RESERVATION_REQUEST
    }
}

const getReserveSuccess=reserves=>{
    return {
          type:GET_RESERVATION_SUCCESS,
          payload:reserves
    }
}

const getReserveFailure=(error)=>{
    return {
          type:GET_RESERVATION_FAILURE,
          payload:error
    }
}

export const getReservesAction= ({appointmentDate,doctor},history)=>{

    if(JSON.parse(localStorage.getItem('user'))==undefined)
      history('/')
    else
    {
    const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'JWT '+JSON.parse(localStorage.getItem('user')).token
        }
    return async(dispatch)=>{
        const body={
            appointmentDate:appointmentDate,
            doctor:doctor
        }
          dispatch(getReserveRequest());
          axios.post(SERVER_URL+'/appointments/getReservations',body,{headers:headers})
          .then(res=>{
                const reserves=res.data.appointments;                
                dispatch(getReserveSuccess(reserves))
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
                      dispatch(getReserveFailure(err))
                }        
          })
    } 
    }     
}
// *************************************************


const getSpecificReserveRequest=()=>{
      return {
            type:GET_SPECIFIC_RESERVATION_REQUEST
      }
  }
  
  const getSpecificReserveSuccess=reserves=>{
      return {
            type:GET_SPECIFIC_RESERVATION_SUCCESS,
            payload:reserves
      }
  }
  
  const getSpecificReserveFailure=(error)=>{
      return {
            type:GET_SPECIFIC_RESERVATION_FAILURE,
            payload:error
      }
  }
  
  export const getSpecificReservesAction=({appointmentDate,doctor,appointmentTime},history)=>{
  
      const body={
            appointmentDate:appointmentDate,
            doctor:doctor,
            appointmentTime:appointmentTime
        }

      if(JSON.parse(localStorage.getItem('user'))==undefined)
        history('/')
      else
      {
      const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'JWT '+JSON.parse(localStorage.getItem('user')).token
          }
      return async(dispatch)=>{
            dispatch(getSpecificReserveRequest());
            axios.post(SERVER_URL+'/appointments/getSpecificReservation',body,{headers:headers})
            .then(res=>{
                  const reserves=res.data.appointments[0];   
          
                  dispatch(getSpecificReserveSuccess(reserves))
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
                        dispatch(getSpecificReserveFailure(err))
                  }        
            })
      } 
      }     
  }
  // *************************************************
  const getPatientReserveRequest=()=>{
      return {
            type:GET_PATIENT_RESERVATION_REQUEST
      }
  }
  
  const getPatientReserveSuccess=reserves=>{
      return {
            type:GET_PATIENT_RESERVATION_SUCCESS,
            payload:reserves
      }
  }
  
  const getPatientReserveFailure=(error)=>{
      return {
            type:GET_PATIENT_RESERVATION_FAILURE,
            payload:error
      }
  }


export const getPatientReservationAction=(patientId,history)=>{

    const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'JWT '+JSON.parse(localStorage.getItem('user')).token
        }
    return async(dispatch)=>{
      if(patientId==undefined)
      {
            dispatch(getPatientReserveFailure('EROOR'))

      }else
      {
          dispatch(getPatientReserveRequest());
          axios.get(SERVER_URL+'/appointments/getPatientReservations/'+patientId,{headers:headers})
          .then(res=>{
                const reserves=res.data.appointments;
                console.log(reserves);
                dispatch(getPatientReserveSuccess(reserves))
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
                      dispatch(getPatientReserveFailure(err))
                }        
          })
    }  }    
}

// Create Reserve **********************************
const createReserveRequest=()=>{
    return {
          type:CREATE_RESERVATION_REQUEST
    }
}

const createReserveSuccess=(message)=>{
    return {
          type:CREATE_RESERVATION_SUCCESS,
          payload:message
    }
}

const createReserveFailure=(error)=>{
    return {
          type:CREATE_RESERVATION_FAILURE,
          payload:error
    }
}

export const createReserveAction=({doctor,patient,appointmentDate,appointmentTime},history)=>{
      

      let reservation={
            doctor:doctor,
            patient:patient,
            appointmentDate:appointmentDate,
            appointmentTime:appointmentTime
      }
    const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'JWT '+JSON.parse(localStorage.getItem('user')).token
        }

    return async(dispatch)=>{
          dispatch(createReserveRequest());
          axios.post(SERVER_URL+'/appointments/',reservation,{headers:headers})
          .then(res=>{
                      dispatch(createReserveSuccess(res.data.message))
                      dispatch(getReservesAction({appointmentDate:appointmentDate,doctor:doctor}));               
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
                dispatch(createReserveFailure(err.response.data.message))
                }
          })
    }
}
//**********************************************************

// Delete Reserve *************************************

const deleteReserveRequest=()=>{
    return {
          type:DELETE_RESERVATION_REQUEST
    }
}

const deleteReserveSuccess=(message)=>{
    return {
          type:DELETE_RESERVATION_SUCCESS,
          payload:message
    }
}

const deleteReserveFailure=(error)=>{
    return{
          type:DELETE_RESERVATION_FAILURE,
          payload:error
    }
}

export const deleteReserveAction=({id,doctor,appointmentDate},history)=>{

    const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'JWT '+JSON.parse(localStorage.getItem('user')).token
        }

    return async dispatch=>{
          dispatch(deleteReserveRequest());
          axios.get(SERVER_URL+'/appointments/deleteAppointment/'+id,{
                headers:headers
          })
          .then(res=>{
                dispatch(deleteReserveSuccess(res.message));
                dispatch(getReservesAction({doctor:doctor._id,appointmentDate:appointmentDate}))
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
                dispatch(deleteReserveFailure(err))
                }
          })
    }
}
// **************************************************
