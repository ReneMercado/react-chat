import React, { Component } from "react";
import AxiosClient from "../../../axiosClient";

class SideChat extends Component {
  state = {
    users: []
  };

  instance = AxiosClient();

  componentDidMount() {
    this.instance
      .get("/api/users")
      .then(res => {
        console.log(res.data);
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="left-menu">
        <form action="#" className="search">
          <input placeholder="search..." type="search" name="" id="" />
          <input type="submit" value="&#xf002;" />
        </form>
        <menu className="list-friends">
          {this.state.users.map(user => {
            return (
              <li
                key={user._id}
                onClick={() => this.props.onChatClicked(user)}
              >
                <img
                  width="50"
                  height="50"
                  src="http://cs625730.vk.me/v625730358/1126a/qEjM1AnybRA.jpg"
                />
                <div className="info">
                  <div className="user">{user.name}</div>
                  <div
                    className={
                      user.status === "ONLINE" ? "status on" : "status off"
                    }
                  >
                    {user.status}
                  </div>
                </div>
              </li>
            );
          })}
        </menu>
      </div>
    );
  }
}

export default SideChat;
