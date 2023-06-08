import { GET_DOCTOR_FAILURE,GET_DOCTOR_SUCCESS,GET_DOCTOR_REQUEST, EDIT_DOCTOR_REQUEST
      , EDIT_DOCTOR_SUCCESS, EDIT_DOCTOR_FAILURE, CREATE_DOCTOR_REQUEST, CREATE_DOCTOR_SUCCESS, CREATE_DOCTOR_FAILURE
      , DELETE_DOCTOR_REQUEST, DELETE_DOCTOR_SUCCESS, DELETE_DOCTOR_FAILURE,
      GET_DOCTOR_WITH_PAGINATION_REQUEST,
      GET_DOCTOR_WITH_PAGINATION_SUCCESS,
      GET_DOCTOR_WITH_PAGEINATION_FAILURE

} from "../../constants/redux-constant";

const initialState={
      loading:false,
      data:[],
      error:''
}

export const getDoctorReducer=(state=initialState,action)=>{
      switch(action.type)
      {
            case GET_DOCTOR_REQUEST:
                  return {
                        loading:true
                  }
            case GET_DOCTOR_SUCCESS:
                  {
                  return {
                        loading:false,
                        data:action.payload,
                        error:''
                  }
            }
            case GET_DOCTOR_FAILURE:
                  return {
                        loading:false,
                        data:[],
                        error:action.payload
                  }
            default:return state;
      }
}

const initialStateDoctorPagination={
      loading:false,
      data:{},
      error:''
}

export const getDoctorWithPaginationReducer=(state=initialStateDoctorPagination,action)=>{
      switch(action.type)
      {
            case GET_DOCTOR_WITH_PAGINATION_REQUEST:
                  return {
                        loading:true
                  }
            case GET_DOCTOR_WITH_PAGINATION_SUCCESS:
                  {
                  return {
                        loading:false,
                        data:action.payload,
                        error:''
                  }
            }
            case GET_DOCTOR_WITH_PAGEINATION_FAILURE:
                  return {
                        loading:false,
                        data:[],
                        error:action.payload
                  }
            default:return state;
      }
}

const EditDoctor={
      loading:false,
      data:{},
      error:''
}
export const editDoctorReducer=(state=EditDoctor,action)=>{
      switch(action.type)
      {
            case EDIT_DOCTOR_REQUEST:
                  return {
                        loading:true
                  }
            case EDIT_DOCTOR_SUCCESS:
                  {
                  return {
                        loading:false,
                        data:action.payload
                  }
            }
            case EDIT_DOCTOR_FAILURE:
                  return {
                        loading:false,
                        data:[],
                        error:action.payload
                  }
            default:return state;
      }
}



const CreateDoctor={
      loading:false,
      data:{},
      error:''
}
export const createDoctorReducer=(state=CreateDoctor,action)=>{
      switch(action.type)
      {
            case CREATE_DOCTOR_REQUEST:
                  return {
                        loading:true
                  }
            case CREATE_DOCTOR_SUCCESS:
                  {
                  return {
                        loading:false,
                        data:action.payload
                  }
            }
            case CREATE_DOCTOR_FAILURE:
                  return {
                        loading:false,
                        data:[],
                        error:action.payload
                  }
            default:return state;
      }
}


const DeleteDoctor={
      loading:false,
      data:{},
      error:''
}
export const deleteDoctorReducer=(state=DeleteDoctor,action)=>{
      switch(action.type)
      {
            case DELETE_DOCTOR_REQUEST:
                  return {
                        loading:true
                  }
            case DELETE_DOCTOR_SUCCESS:
                  {
                  return {
                        loading:false,
                        data:action.payload
                  }
            }
            case DELETE_DOCTOR_FAILURE:
                  return {
                        loading:false,
                        data:[],
                        error:action.payload
                  }
            default:return state;
      }
}