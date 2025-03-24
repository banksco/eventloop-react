import { PLACE_ORDER_FAIL, PLACE_ORDER_RESQUEST, PLACE_ORDER_SUCCESS } from "../constants/orderConstants";
 
 export const createOrderReducer=(state={},action)=>{
     switch(action.type){
         case PLACE_ORDER_RESQUEST:{
             return {loading :true}
         }
         case PLACE_ORDER_SUCCESS:{
             return {loading :false,order:action.payload}
         }
         case PLACE_ORDER_FAIL:{
             return {loading :false,error:action.payload}
         }
 
         default:return state
 
         
     }
 }