import { SIGNIN_REQUEST,SIGNIN_SUCCESS, SIGNIN_FAILURE} from "../../../constants/redux-constant";

const initialState={
      loading:false,
      data:{},
      error:''
}

export const signinReducer=(state=initialState,action)=>{
      console.log('from reducer '+ action.type);
      switch(action.type)
      {
            case SIGNIN_REQUEST:
                  return {
                        loading:true,
                  }
            case SIGNIN_SUCCESS:
                  return {
                        loading:false,
                        data:action.payload,
                        error:''
                  }
            case SIGNIN_FAILURE:
                  return {
                        loading:false,
                        data:{},
                        error:action.payload
                  }
            default:return state;
      }
}