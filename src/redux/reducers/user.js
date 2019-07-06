import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userId: ''
};

const reducerUser = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGOUT:
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        return { }
    default:
      return state;
  }
};

export default reducerUser;
