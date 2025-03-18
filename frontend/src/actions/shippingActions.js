import { SHIPPING_ADDRESS_DELETE, SHIPPING_ADDRESS_SAVE } from "../constants/shippingConstants"

export const saveShippingAddress=(data)=>async(dispatch)=>{
    dispatch({
        type:SHIPPING_ADDRESS_SAVE,
        payload:data
    })

    localStorage.setItem('sAddress',JSON.stringify(data))

}

export const deleteShippingAddress=()=>(dispatch)=>{
    dispatch({
        type:SHIPPING_ADDRESS_DELETE,
        
    })

    localStorage.removeItem('sAddress')

}