import { SHIPPING_ADDRESS_DELETE, SHIPPING_ADDRESS_SAVE } from "../constants/shippingConstants";

export const shippingAddressReducer=(state={address:{}},action)=>{
    switch(action.type){
        
        case SHIPPING_ADDRESS_SAVE:
            return {address:action.payload}
        case SHIPPING_ADDRESS_DELETE:
            return {}

    }
}