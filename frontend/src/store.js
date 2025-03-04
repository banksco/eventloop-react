import {configureStore,combineReducers} from '@reduxjs/toolkit'
import { eventDetailsReducer, eventReducer } from './reducers/eventReducer'

const rootReducer=combineReducers({
    eventList : eventReducer,
    eventDetails: eventDetailsReducer
})


const store=configureStore({
    reducer:rootReducer,
    preloadedState:{}
})


export default store