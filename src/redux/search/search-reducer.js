import { GET_SEARCH_REQUEST,GET_SEARCH_SUCCESS,GET_SEARCH_FAILURE } from "../../constants/redux-constant";
const dataSearch={
    loading:false,
    data:[],
    error:''
}

const searchReducer=(state=dataSearch,action)=>{
    switch(action.type){
          case GET_SEARCH_REQUEST:
                return {
                      loading:true
                }
          case GET_SEARCH_SUCCESS:
                return {
                      loading:false,
                      data:action.payload,
                      error:''
                }
          case GET_SEARCH_FAILURE:
                return {
                      loading:false,
                      data:[],
                      error:action.payload
                }
          default: return state;
    }
}

export default searchReducer;