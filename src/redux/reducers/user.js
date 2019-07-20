import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userDisplayName:  sessionStorage.getItem("userDisplayName") ? sessionStorage.getItem("userDisplayName") : "",
  isLogged: !!sessionStorage.getItem("token"),
  user: null,
  userId: sessionStorage.getItem("userId")
};

const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      return {
        ...state,
        userDisplayName: action.userDisplayName,
        isLogged: true
      };
      case actionTypes.SET_USER_ID:
        return {
          ...state,
          userId: action.userId
        };
    case actionTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default reducerUser;
