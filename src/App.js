import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/createStore';
import './App.css';

import CreateUser from './components/login/CreateUser';
import Auth from './components/login/Auth';
import UserList from './components/userList';
import Chat from './components/chat';
import ChatLayout from './components/chat/layout/chatLayout';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" component={Auth} />
            <Route path="/create-user" component={CreateUser} />
            <Route path="/chatBase" component={ChatLayout} />
            {/* <Route path="/users-list" component={UserList} />
            <Route path="/chat/:id" component={Chat} /> */}
            <Route path="/" exact component={Auth} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
