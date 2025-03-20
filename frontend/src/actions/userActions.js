import axios from "axios";
import {
    NEW_USER_REGISTER_FAIL,
    NEW_USER_REGISTER_REQUEST,
  NEW_USER_REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";

export const Login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });


    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logOut = () => (dispatch) => {
 

  dispatch({
    type: USER_LOGOUT,
  });
};


export const newUserRegistration=({name,email,password})=>async(dispatch)=>{
    try{
    dispatch({
        type:NEW_USER_REGISTER_REQUEST
    })

    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }

    const {data}=await axios.post('/api/users/register',{name,email,password},config)

    dispatch({
        type:NEW_USER_REGISTER_SUCCESS,
        payload:data
    })
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({
        type:USER_LOGIN_SUCCESS,
        payload:data
    })

}
    
    catch(error){
        dispatch({
            type:NEW_USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message ?
            error.response.data.message:error.message

        })
    }
}
