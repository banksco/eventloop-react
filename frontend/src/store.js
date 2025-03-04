import {configureStore,combineReducers} from '@reduxjs/toolkit'
import { eventReducer } from './reducers/eventReducer'

const rootReducer=combineReducers({
eventList : eventReducer
})


const store=configureStore({
    reducer:rootReducer,
    preloadedState:{}
})


export default store