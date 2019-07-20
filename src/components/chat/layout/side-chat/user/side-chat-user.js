import React from "react";
import "./side-chat-user.less";

const SideChatUser = props => {
  return props.users.map((user, idx) => {
    const objUser = user.user ? user.user : user;

    return (
      <li
        key={objUser._id}
        className="side-chat-user"
        onClick={() => props.onSetCurrentUserChat(objUser)}
      >
        <img
          className="side-chat-user__image"
          src={`https://loremflickr.com/320/240?random=${idx}`}
          alt="Not Found"
        />
        <div className="side-chat-user__info">
          <div className="side-chat-user__info__user">{objUser.name}</div>
          <div
            className={
              user.status === "ONLINE"
                ? "side-chat-user__info__status side-chat-user__info__status--on"
                : "side-chat-user__info__status side-chat-user__info__status--off"
            }
          >
            {objUser.status ? objUser.status.toLowerCase() : "no status"}
          </div>
        </div>
      </li>
    );
  });
};

export default SideChatUser;
