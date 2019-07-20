import React from "react";
import "./conversation-write-form.less";

const ConversationWriteForm = props => {
  return (
    <div className="conversation-write-form">
      <textarea
        className="conversation-write-form__textarea"
        placeholder="Type your message"
        rows="2"
        value={props.message}
        onChange={props.onChangeMessage}
      />
      <span
        className="conversation-write-form__send"
        onClick={props.onSendMessage}
      >
        Send
      </span>
    </div>
  );
};

export default ConversationWriteForm;
