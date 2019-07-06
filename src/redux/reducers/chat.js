import * as actionTypes from "../actions/actionTypes";

const initialState = {
  usersList: [],
  onlineUsers: [],
  messages: [],
  currentUserChat: null
};

const reducerChat = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERS_LIST:
      return {
        ...state,
        usersList: action.users
      };
      case actionTypes.SET_CONNECTED_USERS_LIST:
      return {
        ...state,
        onlineUsers: action.users
      };
    case actionTypes.SET_CURRENT_USERCHAT:
      return {
        ...state,
        messages: [],
        currentUserChat: action.user
      };
    case actionTypes.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages
      };
    case actionTypes.USER_DISCONNECT:
      sessionStorage.removeItem("userId");
      return {
        ...state,
        usersList: [],
        onlineUsers: [],
        messages: [],
        currentUserChat: null,
      };
    default:
      return state;
  }
};

export default reducerChat;
