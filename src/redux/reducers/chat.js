import * as actionTypes from "../actions/actionTypes";

const initialState = {
  usersList: [],
  messages: []
};

const reducerChat = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERS_LIST:
        return {
            ...state,
            usersList: action.users
        }
    default:
      return state;
  }
};

export default reducerChat;
