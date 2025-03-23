import axios from "axios"
import { PLACE_ORDER_FAIL, PLACE_ORDER_RESQUEST, PLACE_ORDER_SUCCESS } from "../constants/orderConstants"

export const placeOrderActions=(order)=>async(dispatch,getState)=>{
    try{
    dispatch({
        type:PLACE_ORDER_RESQUEST

    })

    const {userInfo}=getState().userLogin
    const config={
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${userInfo.token}`
        }
    }

    const {data}=await axios.post('/api/orders/',order,config)

    dispatch({
        type:PLACE_ORDER_SUCCESS,
        payload:data
    })}
    catch(error){
        dispatch({
            type:PLACE_ORDER_FAIL,
            payload:error.response && error.response.data.message ?
            error.response.data.message:error.message

        })
    }
}