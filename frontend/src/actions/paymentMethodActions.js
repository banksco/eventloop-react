// action will get users payment information 

import axios from 'axios'
import { PAYMENT_METHOD_SAVE } from '../constants/paymentMethodConstants'

export const savePaymentMethod = (paymentMethod) => async(dispatch) => {
    try{
        dispatch({
            type: PAYMENT_METHOD_SAVE
        })

    }catch(error){
        throw new Error('Payment Method Fail')
}