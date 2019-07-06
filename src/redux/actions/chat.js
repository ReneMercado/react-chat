import * as actionTypes from "./actionTypes";
import Axios from "axios";
import AxiosClient from "../../axiosClient";

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
    const instance = AxiosClient();
    //Validate if user is connected to chat.
    if (sessionStorage.getItem("userId")) {
      instance
        .get("/api/users")
        .then(res => {
          dispatch(setUsersList(res.data));
        })
        .catch(err => {
          console.log(err);
          dispatch(fetchUsersListFails());
        });
    }
  };
};

export const refreshUsersLists = () => {
  return dispatch => {
    const instance = AxiosClient();
    //Validate if user is connected to chat.
    if (sessionStorage.getItem("userId")) {
      instance
        .get("/api/users")
        .then(res => {
          dispatch(setUsersList(res.data));
        })
        .catch(err => {
          console.log(err);
          dispatch(fetchUsersListFails());
        });
      instance
        .get("/api/chats/connected")
        .then(res => {
          dispatch(setConnectedUsersList(res.data));
        })
        .catch(err => {
          console.log(err);
          dispatch(fetchConnectedUsersListFails());
        });
    }
  };
};

export const setConnectedUsersList = users => {
  return {
    type: actionTypes.SET_CONNECTED_USERS_LIST,
    users: users
  };
};

export const fetchConnectedUsersListFails = () => {
  return {
    type: actionTypes.FETCH_CONNECTED_USERS_LIST_FAILS
  };
};

export const getOnlineUsersList = () => {
  return dispatch => {
    const instance = AxiosClient();
    //Validate if user is connected to chat.
    if (sessionStorage.getItem("userId")) {
      instance
        .get("/api/chats/connected")
        .then(res => {
          dispatch(setConnectedUsersList(res.data));
        })
        .catch(err => {
          console.log(err);
          dispatch(fetchConnectedUsersListFails());
        });
    }
  };
};
export const setCurrentUserChat = user => {
  return {
    type: actionTypes.SET_CURRENT_USERCHAT,
    user: user
  };
};

export const setMessages = messages => {
  return {
    type: actionTypes.SET_MESSAGES,
    messages: messages
  };
};

export const fetchMessagesFails = () => {
  return {
    type: actionTypes.FETCH_MESSAGES_FAILS
  };
};

export const getMessages = () => {
  return (dispatch, getState) => {
    const instance = AxiosClient();

    const currentUserChat = getState().chat.currentUserChat;
    instance
      .get("/api/chats/conversation/" + currentUserChat._id + "?sort=message")
      .then(res => {
        dispatch(setMessages(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchMessagesFails());
      });
  };
};

export const userDisconnect = () => {
  return {
    type: actionTypes.USER_DISCONNECT
  };
};
