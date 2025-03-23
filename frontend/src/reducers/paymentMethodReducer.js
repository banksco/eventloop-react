import { PAYMENT_METHOD_SAVE, PAYMENT_METHOD_DELETE} from "../constants/paymentMethodConstants";

export const paymentMethodReducer=(state={events:[]},action)=>{

    switch(action.type){
        case PAYMENT_METHOD_SAVE:{
            return {loading:false,events:action.payload}
        }
        case PAYMENT_METHOD_DELETE:{
            return {}
        }
        default:
            return state
    }
}
