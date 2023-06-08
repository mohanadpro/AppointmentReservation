import { GET_SEARCH_REQUEST,GET_SEARCH_SUCCESS,GET_SEARCH_FAILURE } from "../../constants/redux-constant";
import axios from "axios";
import { SERVER_URL } from "../../constants/server-url";


const searchRequest=()=>{
    return {
        type:GET_SEARCH_REQUEST
    }
}

const searchSuccess=(searchResult)=>{
    return {
        type:GET_SEARCH_SUCCESS,
        payload:searchResult
    }
}

const searchFailure=(searchError)=>{
    return {
        type:GET_SEARCH_FAILURE,
        payload:searchError,
        
    }
}

export const searchAction=(searchObject)=>{
    return async(dispatch)=>{
        dispatch(searchRequest());
        axios.post(SERVER_URL+'/search',searchObject).then(res=>{
            dispatch(searchSuccess(res.data))
        })
        .catch(err=>dispatch(searchFailure(err)))
    }
}