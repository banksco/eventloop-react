import { SHIPPING_ADDRESS_DELETE, SHIPPING_ADDRESS_SAVE } from "../constants/shippingConstants";

export const shippingAddressReducer=(state={shippingAddress:{}},action)=>{
    switch(action.type){
        
        case SHIPPING_ADDRESS_SAVE:
            return {shippingAddress:action.payload}
        case SHIPPING_ADDRESS_DELETE:
            return {}
        default:
            return state

    }
}