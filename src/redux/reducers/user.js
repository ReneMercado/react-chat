import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userDisplayName:  sessionStorage.getItem("userDisplayName") ? sessionStorage.getItem("userDisplayName") : "",
  isLogged: sessionStorage.getItem("token") ? true : false,
  user: null
};

const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
        sessionStorage.setItem("userDisplayName", action.userDisplayName);
      return {
        ...state,
        userDisplayName: action.userDisplayName
      };
    case actionTypes.USER_LOGOUT:
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("userDisplayName");
      return {};
    default:
      return state;
  }
};

export default reducerUser;
