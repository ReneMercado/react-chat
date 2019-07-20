import React, { useState, useEffect } from "react";
import MessageBox from "./messageBox/messageBox";
import * as actions from "../../../../redux/actions/index";
import { connect } from "react-redux";
import { withPolling } from "../../../../hoc/withPolling";
import ConversationChatTop from "./chat-top/conversation-chat-top";
import ConversationChatMessagesContainer from "./chat-messages-container/conversation-chat-messages-container";
import ConversationWriteForm from "./write-form/conversation-write-form";

const Conversation = props => {
  const [message, setMessage] = useState("");
  let messagesEnd = React.createRef();

  useEffect(() => {
    props.onFetchConversation();
  }, [props.currentUserChat]);

  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.conversation.length]);

  const onChangeMessage = event => {
    setMessage(event.target.value);
  };

  const onSendMessage = () => {
    props.onSendMessage(
      {
        to: props.currentUserChat._id,
        data: message
      },
      setMessage
    );
  };

  return (
    <React.Fragment>
      <ConversationChatTop
        name={props.currentUserChat.name}
        id={props.currentUserChat._id}
      />
      <ConversationChatMessagesContainer
        refBottomElem={el => {
          messagesEnd = el;
        }}
      >
        {props.conversation.map(conv => {
          return <MessageBox key={conv._id} message={conv} />;
        })}
      </ConversationChatMessagesContainer>
      <ConversationWriteForm
        onChangeMessage={onChangeMessage}
        onSendMessage={onSendMessage}
        message={message}
      />
    </React.Fragment>
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
    onFetchConversation: () => dispatch(actions.getMessages()),
    onSendMessage: (messageObj, setTextMessageBox) =>
      dispatch(actions.onSendMessage(messageObj, setTextMessageBox))
  };
};

export default withPolling(actions.getMessages)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Conversation)
);
