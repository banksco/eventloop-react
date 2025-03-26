import { PAYMENT_METHOD_SAVE, PAYMENT_METHOD_DELETE} from "../constants/paymentMethodConstants";

export const paymentMethodReducer=(state={paymentMethod: ''},action)=>{

    switch(action.type){
        case PAYMENT_METHOD_SAVE:{
            return {loading:false,paymentMethod:action.payload}
        }
        case PAYMENT_METHOD_DELETE:{
            return {paymentMethod: ''}
        }
        default:
            return state
    }
}
