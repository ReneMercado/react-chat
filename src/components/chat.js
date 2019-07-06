import React, { Component } from "react";
import AxiosClient from "../axiosClient";

class Chat extends Component {
  state = {
    conversation: [],
    message: ""
  };
  instance = AxiosClient();
  userId = this.props.match.params.id;

  getMessages = () => {
    this.instance
      .get("/api/chats/conversation/" + this.userId)
      .then(res => {
        this.setState({ conversation: res.data });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    console.log(this.props);

    this.getMessages();
  }

  onChangeMessage = event => {
    let newState = {
      ...this.state,
      message: event.target.value
    };

    this.setState(newState);
  };

  onSendMessage = () => {
    this.instance
      .post("/api/chats/message", {
        to: this.userId,
        data: this.state.message
      })
      .then(res => {
        console.log(res);
        this.getMessages();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        {this.state.conversation.map(conv => {
          return <div key={conv._id}>{conv.data}</div>;
        })}

        <div>
          <input
            type="text"
            placeholder="Mensaje"
            onChange={this.onChangeMessage}
          />
          <button onClick={this.onSendMessage}>Enviar</button>
        </div>

        <div className="ui">
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
                <div className="name">Юния Гапонович</div>
                <div className="count">already 1 902 messages</div>
              </div>
              <i className="fa fa-star" />
            </div>
            <ul className="messages">
              <li className="i">
                <div className="head">
                  <span className="time">10:13 AM, Today</span>
                  <span className="name">Буль</span>
                </div>
                <div className="message">Привет!</div>
              </li>
              <li className="i">
                <div className="head">
                  <span className="time">10:13 AM, Today</span>
                  <span className="name">Буль</span>
                </div>
                <div className="message">)</div>
              </li>
              <li className="i">
                <div className="head">
                  <span className="time">10:14 AM, Today</span>
                  <span className="name">Буль</span>
                </div>
                <div className="message">М не счастья..</div>
              </li>
              <li className="friend-with-a-SVAGina">
                <div className="head">
                  <span className="name">Юния</span>
                  <span className="time">10:15 AM, Today</span>
                </div>
                <div className="message">чего тебе?</div>
              </li>
            </ul>
            <div className="write-form">
              <textarea
                placeholder="Type your message"
                name="e"
                id="texxt"
                rows="2"
              />
              <i className="fa fa-picture-o" />
              <i className="fa fa-file-o" />
              <span className="send">Send</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
