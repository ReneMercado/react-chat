import * as actionTypes from "./actionTypes";
import Axios from "axios";
import AxiosClient from "../../axiosClient";

// export const changeText = value => {
//   return { type: actionTypes.CHANGE_TEXT, value: value };
// };

const instance = AxiosClient();

export const setUsersList = users => {
  return {
    type: actionTypes.SET_USERS_LIST,
    users: users
  };
};

export const fetchUsersListFails = () => {
  return {
    type: actionTypes.FETCH_USERS_LIST_FAILS
  };
};

export const getUsersList = () => {
  return dispatch => {
    instance
      .get("/api/users")
      .then(res => {
        dispatch(setUsersList(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchUsersListFails());
      });
  };
};
