import * as actionTypes from "./actionTypes";
import Axios from "axios";
import AxiosClient from "../../axiosClient";
import { refreshUsersLists } from "./chat"

const instance = AxiosClient();

export const userLogout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("userDisplayName");
  return {
    type: actionTypes.USER_LOGOUT
  };
};
export const userLogin = (userDisplayName) => {
  sessionStorage.setItem("userDisplayName", userDisplayName);
  return {
    type: actionTypes.USER_LOGIN,
    userDisplayName: userDisplayName
  };
};


export const setUserId = userId => {
  return {
    type: actionTypes.SET_USER_ID,
    userId: userId
  };
};

export const onConnectUser = () => {
    return (dispatch) => {
      const instance = AxiosClient();
        instance
        .get("api/chats/connect")
        .then(res => {
          sessionStorage.setItem("userId", res.data.user);
          dispatch(setUserId(res.data));
          dispatch(refreshUsersLists());
        })
        .catch(err => {
          console.log(err);
        });
    };
};


export const onLogin = (loginObj) => {
  return (dispatch) => {
      Axios
      .post("https://chatbox-node.herokuapp.com/api/auth/token", loginObj)
      .then(res => {
        sessionStorage.setItem("token", res.data.token.toString());
        dispatch(userLogin(loginObj.login));
      })
      .catch(err => {
        console.log(err);
      });
  };
};


export const onCreateUser = (userObj, props) => {
  return (dispatch) => {
      Axios
      .post("https://chatbox-node.herokuapp.com/api/users", userObj)
      .then(res => {
        props.history.push("/login");
      })
      .catch(err => {
        console.log(err);
      });
  };
};