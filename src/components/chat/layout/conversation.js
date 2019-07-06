import React, { useState, useEffect } from "react";
import MessageBox from "../messageBox/messageBox";
import AxiosClient from "../../../axiosClient";
import nicescroll from "nicescroll";
import * as actions from "../../../redux/actions/index";
import { connect } from "react-redux";
import { withPolling } from "../../../hoc/withPolling";
import { scrollToLastMessage } from "../../../utility";

const Conversation = props => {
  const [message, setMessage] = useState("");
  const instance = AxiosClient();

  useEffect(() => {
    window.jQuery(".messages").niceScroll({
      cursorcolor: "#cdd2d6",
      cursorwidth: "4px",
      cursorborder: "none"
    });

  }, []);

  useEffect(() => {
    props.onFetchConversation();
    console.log("Entro  a Use Effect");
    console.log("[User From Redux Store]", props.currentUserChat);

    window.jQuery(".messages").niceScroll({
      cursorcolor: "#cdd2d6",
      cursorwidth: "4px",
      cursorborder: "none"
    });
  }, [props.currentUserChat]);

  useEffect(() => {
    scrollToLastMessage();
  }, [props.conversation.length]);

  const onChangeMessage = event => {
    setMessage(event.target.value);
  };

  const onSendMessage = () => {
    instance
      .post("/api/chats/message", {
        to: props.currentUserChat._id,
        data: message
      })
      .then(res => {
        document.getElementById("texxt").value = "";
        setMessage("");
        props.onFetchConversation();
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="avatar">
          <img
            width="50"
            height="50"
            src="http://cs625730.vk.me/v625730358/1126a/qEjM1AnybRA.jpg"
          />
        </div>
        <div className="info">
          <div className="name">{props.currentUserChat.name}</div>
          <div className="count">{props.currentUserChat._id}</div>
        </div>
        <i className="fa fa-star" />
      </div>
      <ul id="messages-container" className="messages">
        {props.conversation.map(conv => {
          return <MessageBox key={conv._id} message={conv} />;
        })}
      </ul>

      <div className="write-form">
        <textarea
          placeholder="Type your message"
          name="e"
          id="texxt"
          rows="2"
          onChange={onChangeMessage}
        />
        {/* <i className="fa fa-picture-o" />
        <i className="fa fa-file-o" /> */}
        <span className="send" onClick={onSendMessage}>
          Send
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    conversation: state.chat.messages,
    currentUserChat: state.chat.currentUserChat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchConversation: () => dispatch(actions.getMessages())
  };
};

export default withPolling(actions.getMessages)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Conversation)
);
