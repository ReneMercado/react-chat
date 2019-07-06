import React, { Component } from "react";
import AxiosClient from "../axiosClient";

class UserList extends Component {
  state = {
    users: []
  };
  instance = AxiosClient();

  componentDidMount() {
    this.instance
      .get("/api/users")
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  }

  setUserOnline = () => {
    this.instance
      .get("api/chats/connect")
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  openChat = userId => {
    this.props.history.push("/chat/" + userId);
  };

  render() {
    return (
      <React.Fragment>
        <ul>
          {this.state.users.map(obj => {
            return (
              <li
                key={obj._id}
                onClick={() => {
                  this.openChat(obj._id);
                }}
              >
                {obj.name}
              </li>
            );
          })}
        </ul>

        <button onClick={this.setUserOnline}>Online</button>
      </React.Fragment>
    );
  }
}

export default UserList;
