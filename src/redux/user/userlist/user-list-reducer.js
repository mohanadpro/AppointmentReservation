import { GET_USER_REQUEST,GET_USER_SUCCESS,GET_USER_FAILURE,
      DELETE_USER_FAILURE,DELETE_USER_SUCCESS,DELETE_USER_REQUEST} from "../../../constants/redux-constant"


const dataUser={
      loading:false,
      data:[],
      error:''
}



const userReducer=(state=dataUser,action)=>{
      switch(action.type){
            case GET_USER_REQUEST:
                  return {
                        loading:true
                  }
            case GET_USER_SUCCESS:
                  return {
                        loading:false,
                        data:action.payload,
                        error:''
                  }
            case GET_USER_FAILURE:
                  return {
                        loading:false,
                        data:[],
                        error:action.payload
                  }
            default: return state;

        }

}




const deleteUser={
      loading:false,
      data:'',
      error:''
}

export const deleteUserReducer=(state=deleteUser,action)=>{
      switch(action.type){
            case DELETE_USER_REQUEST:
                  return {
                        loading:true
                  }
            case DELETE_USER_SUCCESS:
                  return{
                        loading:false,
                        data:action.payload
                  }
            case DELETE_USER_FAILURE:
                  return{
                        loading:false,
                        data:'',
                        error:action.payload
                  }
            default: return state;
      }
}


export default userReducer