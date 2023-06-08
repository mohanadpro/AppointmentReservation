import { GET_PATIENT_REQUEST,GET_PATIENT_SUCCESS,GET_PATIENT_FAILURE, CREATE_PATIENT_REQUEST,
      GET_PATIENT_BY_NAME_REQUEST,GET_PATIENT_BY_NAME_SUCCESS,GET_PATIENT_BY_NAME_FAILURE,
      CREATE_PATIENT_SUCCESS, CREATE_PATIENT_FAILURE,DELETE_PATIENT_REQUEST,DELETE_PATIENT_SUCCESS,DELETE_PATIENT_FAILURE, EDIT_PATIENT_REQUEST, EDIT_PATIENT_SUCCESS, EDIT_PATIENT_FAILURE } from "../../constants/redux-constant"

const dataPatient={
      loading:false,
      data:[],
      error:''
}

const patientReducer=(state=dataPatient,action)=>{
      switch(action.type){
            case GET_PATIENT_REQUEST:
                  return {
                        loading:true
                  }
            case GET_PATIENT_SUCCESS:
                  return {
                        loading:false,
                        data:action.payload,
                        error:''
                  }
            case GET_PATIENT_FAILURE:
                  return {
                        loading:false,
                        data:[],
                        error:action.payload
                  }
            default: return state;
      }
}


const dataPatientByName={
      loading:false,
      data:[],
      error:''
}

export const patientByNameReducer=(state=dataPatientByName,action)=>{
      switch(action.type){
            case GET_PATIENT_BY_NAME_REQUEST:
                  return {
                        loading:true
                  }
            case GET_PATIENT_BY_NAME_SUCCESS:
                  return {
                        loading:false,
                        data:action.payload,
                        error:''
                  }
            case GET_PATIENT_BY_NAME_FAILURE:
                  return {
                        loading:false,
                        data:[],
                        error:action.payload
                  }
            default: return state;
      }
}

const createPatient={
      loading:false,
      data:{},
      error:''
}
export const createPatientReducer=(state=createPatient,action)=>{
      switch(action.type){
            case CREATE_PATIENT_REQUEST:
                  return {
                        loading:true
                  }
            case CREATE_PATIENT_SUCCESS:
                  return {
                        loading:false,
                        data:action.payload,
                        error:''
                  }
            case CREATE_PATIENT_FAILURE:
                  return {
                        loading:false,
                        data:{},
                        error:action.payload
                  }
            default: return state;
      }
}


const deletePatient={
      loading:false,
      data:'',
      error:''
}

export const deletePatientReducer=(state=deletePatient,action)=>{
      switch(action.type){
            case DELETE_PATIENT_REQUEST:
                  return {
                        loading:true
                  }
            case DELETE_PATIENT_SUCCESS:
                  return{
                        loading:false,
                        data:action.payload
                  }
            case DELETE_PATIENT_FAILURE:
                  return{
                        loading:false,
                        data:'',
                        error:action.payload
                  }
            default: return state;
      }
}

const editPatient={
      loading:false,
      data:'',
      error:''
}

export const editPatientReducer=(state=editPatient,action)=>{
      switch(action.type){
            case EDIT_PATIENT_REQUEST:
                  return {
                        loading:true
                  }
            case EDIT_PATIENT_SUCCESS:
                  return {
                        loading:false,
                        data:action.payload
                  }
            case EDIT_PATIENT_FAILURE:
                  return {
                        loading:false,
                        data:'',
                        error:action.payload
                  }
            default:return state
      }
}

export default patientReducer