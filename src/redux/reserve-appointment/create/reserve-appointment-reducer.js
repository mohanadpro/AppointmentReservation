import { GET_RESERVATION_REQUEST,GET_RESERVATION_SUCCESS,GET_RESERVATION_FAILURE, CREATE_RESERVATION_REQUEST,
   
    CREATE_RESERVATION_SUCCESS, CREATE_RESERVATION_FAILURE,DELETE_RESERVATION_REQUEST
    ,DELETE_RESERVATION_SUCCESS,DELETE_RESERVATION_FAILURE,
    GET_SPECIFIC_RESERVATION_REQUEST,GET_SPECIFIC_RESERVATION_SUCCESS,GET_SPECIFIC_RESERVATION_FAILURE, GET_PATIENT_RESERVATION_REQUEST, GET_PATIENT_RESERVATION_SUCCESS, GET_PATIENT_RESERVATION_FAILURE,

} from "../../../constants/redux-constant"

const dataReserve={
    loading:false,
    data:[],
    error:''
}

const reserveReducer=(state=dataReserve,action)=>{
    switch(action.type){
          case GET_RESERVATION_REQUEST:
                return {
                      loading:true
                }
          case GET_RESERVATION_SUCCESS:
                return {
                      loading:false,
                      data:action.payload,
                      error:''
                }
          case GET_RESERVATION_FAILURE:
                return {
                      loading:false,
                      data:[],
                      error:action.payload
                }
          default: return state;
    }
}

const patientReservations={
      loading:false,
      data:[],
      error:''
  }
  
export const patientReservationsReducer=(state=patientReservations,action)=>{
      switch(action.type){
            case GET_PATIENT_RESERVATION_REQUEST:
                  return {
                        loading:true
                  }
            case GET_PATIENT_RESERVATION_SUCCESS:
                  return {
                        loading:false,
                        data:action.payload,
                        error:''
                  }
            case GET_PATIENT_RESERVATION_FAILURE:
                  return {
                        loading:false,
                        data:[],
                        error:action.payload
                  }
            default: return state;
      }
  }


const SpecificReserve={
      loading:false,
      data:[],
      error:''
  }
  
 export const getSpecificReservationReducer=(state=SpecificReserve,action)=>{
      switch(action.type){
            case GET_SPECIFIC_RESERVATION_REQUEST:
                  return {
                        loading:true
                  }
            case GET_SPECIFIC_RESERVATION_SUCCESS:
                  return {
                        loading:false,
                        data:action.payload,
                        error:''
                  }
            case GET_SPECIFIC_RESERVATION_FAILURE:
                  return {
                        loading:false,
                        data:[],
                        error:action.payload
                  }
            default: return state;
      }
  }
  


const createReserve={
    loading:false,
    data:{},
    error:''
}
export const createReserveReducer=(state=createReserve,action)=>{
    switch(action.type){
          case CREATE_RESERVATION_REQUEST:
                return {
                      loading:true
                }
          case CREATE_RESERVATION_SUCCESS:
                return {
                      loading:false,
                      data:action.payload,
                      error:''
                }
          case CREATE_RESERVATION_FAILURE:
                return {
                      loading:false,
                      data:{},
                      error:action.payload
                }
          default: return state;
    }
}


const deleteReserve={
    loading:false,
    data:'',
    error:''
}

export const deleteReserveReducer=(state=deleteReserve,action)=>{
    switch(action.type){
          case DELETE_RESERVATION_REQUEST:
                return {
                      loading:true
                }
          case DELETE_RESERVATION_SUCCESS:
                return{
                      loading:false,
                      data:action.payload
                }
          case DELETE_RESERVATION_FAILURE:
                return{
                      loading:false,
                      data:'',
                      error:action.payload
                }
          default: return state;
    }
}


export default reserveReducer