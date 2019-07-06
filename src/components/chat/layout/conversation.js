import React, { useState, useEffect } from "react";
import MessageBox from "../messageBox/messageBox";
import AxiosClient from "../../../axiosClient";
import nicescroll from "nicescroll";

const Conversation = props => {
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState("");
  const instance = AxiosClient();

  const getMessages = () => {
    instance
      .get("/api/chats/conversation/" + props.user._id + "?-message")
      .then(res => {
        setConversation(res.data);
        clearResizeScroll();
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    window.jQuery(".messages").niceScroll({
      cursorcolor: "#cdd2d6",
      cursorwidth: "4px",
      cursorborder: "none"
    });
  }, []);

  const clearResizeScroll = () => {
    window
      .jQuery(".messages")
      .getNiceScroll(0)
      .resize();

    window
      .jQuery(".messages")
      .getNiceScroll(0)
      .doScrollTop(999999, 999);
  };

  useEffect(() => {
    getMessages();
    console.log("Entro  a Use Effect");
    console.log("[User]", props.user);

    window.jQuery(".messages").niceScroll({
      cursorcolor: "#cdd2d6",
      cursorwidth: "4px",
      cursorborder: "none"
    });
  }, [props.user]);

  const onChangeMessage = event => {
    setMessage(event.target.value);
  };

  const onSendMessage = () => {
    instance
      .post("/api/chats/message", {
        to: props.user._id,
        data: message
      })
      .then(res => {
        document.getElementById("texxt").value = "";
        setMessage("");
        getMessages();
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
          <div className="name">{props.user.name}</div>
          <div className="count">{props.user._id}</div>
        </div>
        <i className="fa fa-star" />
      </div>
      <ul className="messages">
        {conversation.map(conv => {
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
        <i className="fa fa-picture-o" />
        <i className="fa fa-file-o" />
        <span className="send" onClick={onSendMessage}>
          Send
        </span>
      </div>
    </div>
  );
};

export default Conversation;
