import { AUTHENTICATION_REQUEST,AUTHENTICATION_SUCCESS, AUTHENTICATION_FAILURE} from "../../../constants/redux-constant";

const initialState={
      loading:false,
      data:{},
      error:''
}

export const authenticationReducer=(state=initialState,action)=>{
      switch(action.type)
      {
            case AUTHENTICATION_REQUEST:
                  return {
                        loading:true,
                  }
            case AUTHENTICATION_SUCCESS:
                  return {
                        loading:false,
                        data:action.payload,
                        error:''
                  }
            case AUTHENTICATION_FAILURE:
                  return {
                        loading:false,
                        data:{},
                        error:action.payload
                  }
            default:return state;
      }
}