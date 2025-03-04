import { EVENT_DETAILS_FAIL, EVENT_DETAILS_REQUEST, EVENT_DETAILS_SUCCESS, EVENT_LIST_FAIL, EVENT_LIST_REQUEST, EVENT_LIST_SUCCESS } from "../constants/eventConstants"
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

// Single Event Action
export const listEventDetails = (id) => async(dispatch) => {
    try{
        dispatch({
            type: EVENT_DETAILS_REQUEST
        })
        const {data} = await axios.get(`/api/events/${id}`)
        dispatch({
            type: EVENT_DETAILS_SUCCESS,
            payload: data
        })

    } catch(error){
        dispatch({
            type: EVENT_DETAILS_FAIL,
            payload:

            error.response && error.response.data.message?
            error.response.data.message:error.message
        })
}

} 