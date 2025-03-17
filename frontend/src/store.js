import {configureStore,combineReducers} from '@reduxjs/toolkit'
import { eventDetailsReducer, eventReducer } from './reducers/eventReducer'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducer } from './reducers/userReducer'
import { shippingAddressReducer } from './reducers/shippingAddressReducer'


const rootReducer=combineReducers({
    eventList : eventReducer,
    eventDetails: eventDetailsReducer,
    selectedEvents:cartReducer,
    userLogin:userLoginReducer,
    shippingAddress:shippingAddressReducer
})

const loadedEvents=localStorage.getItem('cartEvents')?JSON.parse(localStorage.getItem('cartEvents')):[]
const userInfoFromLocalStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const sAddressFromLocalStorage=localStorage.getItem('sAddress')?JSON.parse(localStorage.getItem('sAddress')):null
const initialState={
    selectedEvents:{cartEvents:loadedEvents},
    userLogin:{userInfo:userInfoFromLocalStorage},
    shippingAddress:{address:sAddressFromLocalStorage}
}

const store=configureStore({
    reducer:rootReducer,
    preloadedState:initialState
})


export default store