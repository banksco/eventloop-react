import { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESSS, PAYPAL_KEY, PLACE_ORDER_FAIL, PLACE_ORDER_RESQUEST, PLACE_ORDER_SUCCESS, STRIPE_PAY_FAIL, STRIPE_PAY_REQUEST, STRIPE_PAY_SUCCESS } from "../constants/orderConstants";

export const createOrderReducer=(state={},action)=>{
    switch(action.type){
        case PLACE_ORDER_RESQUEST:{
            return {loading :true}
        }
        case PLACE_ORDER_SUCCESS:{
            return {loading :false,order:action.payload}
        }
        case PLACE_ORDER_FAIL:{
            return {loading :false,error:action.payload}
        }
        default:return state

        
    }
}

export const orderDetailsReducer = (
    state = {loading: true, orderItems: [], shippingAddress:{}}, action) =>
        { switch(action.type){
            case ORDER_DETAILS_REQUEST:
                return {
                    ...state,
                    loading: true
                }
            case ORDER_DETAILS_SUCCESS:
                return {
                    loading: false,
                    order: action.payload
                }
            case ORDER_DETAILS_FAIL:
                return {
                    loading: false,
                    error: action.payload
                }
            default:
                return state
        }
}

export const orderPayReducer = (state = {}, action) => {
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return {loading: true}
        case ORDER_PAY_SUCCESSS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case PAYPAL_KEY:
        return {
            loading: false,
            paypalKey: action.payload
    }
    case STRIPE_PAY_REQUEST:
            return {
                loading: true,
            };
        case STRIPE_PAY_SUCCESS:
            return {
                loading: false,
                success: true, 
                stripePayment: action.payload,
                order:action.payload,
            };
        case STRIPE_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
    case ORDER_PAY_RESET:
        return {}

    default:return state
}

}

