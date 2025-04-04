import axios from "axios"
import { SHIPPING_ADDRESS_DELETE, SHIPPING_ADDRESS_REQUEST, SHIPPING_ADDRESS_SAVE } from "../constants/shippingConstants"

export const saveShippingAddress=({address,city,postalCode,country})=>async(dispatch,getState)=>{
    

    try{

        const {userInfo}=getState().userLogin
        const config={
            
            headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${userInfo.token}`
        
        }}
        const {data}=await axios.post('/api/users/saveAddress',
            {address,city,postalCode,country},
            config
        )

        dispatch({
            type:SHIPPING_ADDRESS_SAVE,
            payload:data
        })
    
        localStorage.setItem('sAddress',JSON.stringify(data))

    }
    catch(error){
        throw new Error('shipping address Fail')
    }

}

export const deleteShippingAddress=()=>(dispatch)=>{
    dispatch({
        type:SHIPPING_ADDRESS_DELETE,
        
    })

    localStorage.removeItem('sAddress')

}


export const getShippingAddress=()=>async(dispatch,getState)=>{
    console.log("data")
    const {userInfo}=getState().userLogin

    const config={
        headers:{
            "Authorization":`Bearer ${userInfo.token}`
        }
    }
const {data}= await axios.get('/api/users/getAddress',config)
console.log("data"+data)

dispatch({
    type:SHIPPING_ADDRESS_REQUEST,
    payload:data
    
})
localStorage.setItem('sAddress',JSON.stringify(data))

}