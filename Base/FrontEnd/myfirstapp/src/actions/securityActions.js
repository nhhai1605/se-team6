import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";


export const createNewUser = (newUser, history) => async dispatch => {

    try{
        await axios.post("http://localhost:8080/api/users/register", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }
    catch (err){
        dispatch ({
            type: GET_ERRORS,
            payload: err.response.data
        });

    }

};

export const login = LoginRequest => async dispatch => {
  try {
    // post => Login Request
    const res = await axios.post("http://localhost:8080/api/users/login", LoginRequest);
    // extract token from res.data
    const  {token}  = res.data.response;
    // store the token0 in the localStorage
    localStorage.setItem("jwtToken", token);
    localStorage.setItem('currentUsername', LoginRequest.username)
    localStorage.setItem('currentDisplayName', res.data.displayname);
    // set our token in header ***
    setJWTToken(token);
    // decode token on React
    const decoded = jwt_decode(token);
    // dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
  
  export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("currentUsername");
    localStorage.removeItem("currentDisplayName");
    console.log("Logout");
      setJWTToken(false);
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
  };