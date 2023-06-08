import axios from "axios";
import { GET_SETTINGS_FAILURE,GET_SETTINGS_SUCCESS,GET_SETTINGS_REQUEST,
        CREATE_SETTINGS_REQUEST, CREATE_SETTINGS_SUCCESS, CREATE_SETTINGS_FAILURE
      } from "../../constants/redux-constant";


const initialState={
    loading:false,
    data:[],
    error:''
}

export const getSettingReducer=(state=initialState,action)=>{
    switch(action.type)
    {
          case GET_SETTINGS_REQUEST:
                return {
                      loading:true
                }
          case GET_SETTINGS_SUCCESS:
                {
                return {
                      loading:false,
                      data:action.payload,
                      error:''
                }
          }
          case GET_SETTINGS_FAILURE:
                return {
                      loading:false,
                      data:[],
                      error:action.payload
                }
          default:return state;
    }
}



const CreateSetting={
    loading:false,
    data:{},
    error:''
}
export const createSettingReducer=(state=CreateSetting,action)=>{
    switch(action.type)
    {
          case CREATE_SETTINGS_REQUEST:
                return {
                      loading:true
                }
          case CREATE_SETTINGS_SUCCESS:
                {
                return {
                      loading:false,
                      data:action.payload
                }
          }
          case CREATE_SETTINGS_FAILURE:
                return {
                      loading:false,
                      data:[],
                      error:action.payload
                }
          default:return state;
    }
}
