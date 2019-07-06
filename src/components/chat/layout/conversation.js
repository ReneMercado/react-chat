import React, { useState, useEffect } from "react";
import MessageBox from "../messageBox/messageBox";
import AxiosClient from "../../../axiosClient";

const Conversation = props => {
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState('');
  let messagesEnd = null;
  const instance = AxiosClient();

  const getMessages = () => {
    instance
      .get("/api/chats/conversation/" + props.user._id + "?sort:+date")
      .then(res => {
        setConversation(res.data);
        scrollToBottom();
      })
      .catch(err => console.log(err));
  };

  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getMessages();
    console.log("Entro  a Use Effect");
    console.log("[User]", props.user);
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
        document.getElementById('texxt').value = '';
        setMessage('');
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
          return <MessageBox message={conv} />;
        })}
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => {
            messagesEnd = el;
          }}
        />
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
