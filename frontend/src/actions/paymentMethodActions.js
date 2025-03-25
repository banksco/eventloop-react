// action will get users payment information 

import axios from 'axios'
import { PAYMENT_METHOD_DELETE, PAYMENT_METHOD_SAVE } from '../constants/paymentMethodConstants'

export const savePaymentMethod=({PayPal,Stripe})=>async(dispatch,getState)=>{

    try{

        const {userInfo}=getState().userLogin
        const config={
            
            headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${userInfo.token}`
        
        }}
        const {data}=await axios.post('/api/users/savePaymentMethod',
            {PayPal,Stripe},
            config
        )

        dispatch({
            type:PAYMENT_METHOD_SAVE,
            payload:data
        })
    







        localStorage.setItem('paymentMethod',JSON.stringify(data))

    }
    catch(error){
        throw new Error('Payment Method Fail')
    }

}

export const deletePaymentMethod=()=>(dispatch)=>{
    dispatch({
        type:PAYMENT_METHOD_DELETE,
        
    })

    localStorage.removeItem('paymentMethod')

}