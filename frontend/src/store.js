import {configureStore,combineReducers} from '@reduxjs/toolkit'
import { eventDetailsReducer, eventReducer } from './reducers/eventReducer'
import { cartReducer } from './reducers/cartReducer'
import { newUserRegister, userLoginReducer } from './reducers/userReducer'
import { shippingAddressReducer } from './reducers/shippingAddressReducer'
import { paymentMethodReducer } from './reducers/paymentMethodReducer'



const rootReducer=combineReducers({
    eventList : eventReducer,
    eventDetails: eventDetailsReducer,
    selectedEvents:cartReducer,
    userLogin:userLoginReducer,
    userRegister:newUserRegister,
    shippingAddress:shippingAddressReducer,
    paymentMethod: paymentMethodReducer
})

const loadedEvents=localStorage.getItem('cartEvents')?JSON.parse(localStorage.getItem('cartEvents')):[]
const userInfoFromLocalStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const sAddressFromLocalStorage=localStorage.getItem('sAddress')?JSON.parse(localStorage.getItem('sAddress')):{}
const paymentMethodFromLocalStorage=localStorage.getItem('paymentMethod')?JSON.parse(localStorage.getItem('paymentMethod')):{}

const initialState={
    selectedEvents:{cartEvents:loadedEvents},
    userLogin:{userInfo:userInfoFromLocalStorage},
    shippingAddress:{shippingAddress:sAddressFromLocalStorage},
    paymnentMethod: {paymentMethod: paymentMethodFromLocalStorage}
}

const store=configureStore({
    reducer:rootReducer,
    preloadedState:initialState
})


export default store