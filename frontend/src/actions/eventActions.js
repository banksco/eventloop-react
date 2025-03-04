import { EVENT_LIST_FAIL, EVENT_LIST_REQUEST, EVENT_LIST_SUCCESS } from "../constants/eventConstants"
import axios from 'axios'
export const fetchAllEvents=()=>async(dispatch)=>{
    try{

        dispatch({
            type:EVENT_LIST_REQUEST
        })

        const{data}=await axios.get('/api/events')

        dispatch({
            type:EVENT_LIST_SUCCESS,
            payload:data
        })

    }
    catch(error){
            dispatch({
                type:EVENT_LIST_FAIL,
                payload:

                error.response && error.response.data.message?
                error.response.data.message:error.message
            })
    }
}