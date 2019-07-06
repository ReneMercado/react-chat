import * as actionTypes from "./actionTypes";
import Axios from "axios";
import AxiosClient from "../../axiosClient";

const instance = AxiosClient();

export const userLogout = () => {
  return {
    type: actionTypes.USER_LOGOUT
  };
};
export const userLogin = (userDisplayName) => {
  return {
    type: actionTypes.USER_LOGIN,
    userDisplayName: userDisplayName
  };
};
