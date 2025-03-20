import { NEW_USER_REGISTER_FAIL, NEW_USER_REGISTER_REQUEST, NEW_USER_REGISTER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../constants/userConstants";

export const userLoginReducer=(state={},action)=>{
switch(action.type){
    case USER_LOGIN_REQUEST:return {loading:true}
    case USER_LOGIN_SUCCESS:return {loading:false,userInfo:action.payload}
    case USER_LOGIN_FAIL:return {loading:false,error:action.payload}
    case USER_LOGOUT:return{}
    default:return state
    }
}


export const newUserRegister=(state={},action)=>{
    switch(action.type){
        case NEW_USER_REGISTER_REQUEST:return{loading:true}
        case NEW_USER_REGISTER_SUCCESS:return {loading:false,userInfo:action.payload}
        case NEW_USER_REGISTER_FAIL:return {loading:false,error:action.payload}
        default:return state
    }
}
