import axios from "axios";
import {
    NEW_USER_REGISTER_FAIL,
    NEW_USER_REGISTER_REQUEST,
  NEW_USER_REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL

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
 localStorage.removeItem('sAddress')
 localStorage.removeItem('userInfo')
 localStorage.removeItem('cartEvents')


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

export const getUserProfileInfo=()=>async(dispatch,getState)=>{
  try{
  const {userInfo}=getState().userLogin
  dispatch({
    type:USER_PROFILE_REQUEST
  })
  console.log("entered"+userInfo.token)
  const config={
    headers:{
    "Authorization":`Bearer ${userInfo.token}`}
  }

  const {data}=await axios.get('/api/users/getProfileInfo',config)
  console.log("In actions data"+data.user)
  dispatch({
    type:USER_PROFILE_SUCCESS,
    payload:data
  })

  localStorage.setItem('profileInfo',JSON.stringify(data))
}
  catch(error){
    dispatch({
      type:USER_PROFILE_FAIL,
      payload:error.response && error.response.data.message?
      error.response.data.message:error.message
    })
  }

}

// Profile Update Actions 
export const updateUserProfile = (profileData) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { userInfo } = userLogin;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put('/api/users/profile', profileData, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
    
    localStorage.setItem('profileInfo', JSON.stringify(data));
    
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
