import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,DELETE_USER_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_FAILURE,
    EDIT_USER_REQUEST,EDIT_USER_SUCCESS,EDIT_USER_FAILURE } from "../../../constants/redux-constant";


const createUser={
      isLoading:false,
      data:'',
      error:''
}

export const createUserReducer=(state=createUser,action)=>{
    switch(action.type){
          case CREATE_USER_REQUEST:
                return {
                      loading:true
                }
          case CREATE_USER_SUCCESS:
                return {
                      loading:false,
                      data:action.payload,
                      error:''
                }
          case CREATE_USER_FAILURE:
                return {
                      loading:false,
                      data:{},
                      error:action.payload
                }
          default: return state;
    }
}

const editUser={
    loading:false,
    data:'',
    error:''
}

export const editUserReducer=(state=editUser,action)=>{
    switch(action.type){
          case EDIT_USER_REQUEST:
                return {
                      loading:true
                }
          case EDIT_USER_SUCCESS:
                return {
                      loading:false,
                      data:action.payload
                }
          case EDIT_USER_FAILURE:
                return {
                      loading:false,
                      data:'',
                      error:action.payload
                }
          default:return state
    }
}
