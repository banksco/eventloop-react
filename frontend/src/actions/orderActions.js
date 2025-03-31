import axios from "axios"
import { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESSS, PAYPAL_KEY, PLACE_ORDER_FAIL, PLACE_ORDER_RESQUEST, PLACE_ORDER_SUCCESS, STRIPE_PAY_FAIL, STRIPE_PAY_REQUEST, STRIPE_PAY_SUCCESS } from "../constants/orderConstants"

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

export const getOrderDetailsActions=(id)=>async(dispatch,getState)=>{
    try{
    dispatch({
        type:ORDER_DETAILS_REQUEST

    })

    const {userInfo}=getState().userLogin
    const config={
        headers:{
            "Authorization":`Bearer ${userInfo.token}`
        }
    }

    const {data}=await axios.get(`/api/orders/${id}`,config)

    dispatch({
        type:ORDER_DETAILS_SUCCESS,
        payload:data
    })}
    catch(error){
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ?
            error.response.data.message:error.message

        })
    }
}

export const getPayPalKey = () => async (dispatch, getState) => {
    const {userInfo}=getState().userLogin
    const config={
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${userInfo.token}`
        }
    }
    const {data: clientId} = await axios.get('/api/config/paypal', config)
    dispatch({
        type: PAYPAL_KEY,
        payload: clientId
    })
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try{
        dispatch({
            type: ORDER_PAY_REQUEST
        })

        const {userInfo}=getState().userLogin
        const config={
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
        }

    }
    console.log("in dispatch payOrder")
    const {data} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult,
        config)

        dispatch({
            type: ORDER_PAY_SUCCESSS,
            payload: data
        })
        localStorage.removeItem('cartItems')

    }catch (error){
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: error.response && error.response.data.message
           ? error.response.data.message
           : error.message
      })
  }
}

export const stripePay = (orderId, paymentMethodId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: STRIPE_PAY_REQUEST,
        });

       const {userInfo}=getState().userLogin

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/orders/${orderId}/stripepay`, // Your backend endpoint for processing Stripe payment
            { orderId,paymentMethodId },
            config
        );

        dispatch({
            type: STRIPE_PAY_SUCCESS,
            payload: data, // Expecting data to contain payment details
        });
        localStorage.removeItem('cartItems')
        dispatch({
            type:ORDER_PAY_RESET
        })
    } catch (error) {
        dispatch({
            type: STRIPE_PAY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};