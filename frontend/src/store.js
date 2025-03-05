import {configureStore,combineReducers} from '@reduxjs/toolkit'
import { eventDetailsReducer, eventReducer } from './reducers/eventReducer'
import { cartReducer } from './reducers/cartReducer'

const rootReducer=combineReducers({
    eventList : eventReducer,
    eventDetails: eventDetailsReducer,
    selectedEvents:cartReducer
})

const loadedEvents=localStorage.getItem('cartEvents')?JSON.parse(localStorage.getItem('cartEvents')):[]

const initialState={
    selectedEvents:{cartEvents:loadedEvents}
}

const store=configureStore({
    reducer:rootReducer,
    preloadedState:initialState
})


export default store