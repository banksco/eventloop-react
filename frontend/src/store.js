import {configureStore,combineReducers} from '@reduxjs/toolkit'
import { eventDetailsReducer, eventReducer } from './reducers/eventReducer'
import { cartReducer } from './reducers/cartReducer'
import { userLoginReducer } from './reducers/userReducer'
import { userLogin } from './actions/userActions'

const rootReducer=combineReducers({
    eventList : eventReducer,
    eventDetails: eventDetailsReducer,
    selectedEvents:cartReducer,
    userLogin:userLoginReducer
})

const loadedEvents=localStorage.getItem('cartEvents')?JSON.parse(localStorage.getItem('cartEvents')):[]
const userInfoFromLocalStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):[]

const initialState={
    selectedEvents:{cartEvents:loadedEvents},
    userLogin:{userInfo:userInfoFromLocalStorage}
}

const store=configureStore({
    reducer:rootReducer,
    preloadedState:initialState
})


export default store