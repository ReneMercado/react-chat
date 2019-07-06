import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/createStore';
import './App.css';

import CreateUser from './components/login/CreateUser';
import Auth from './components/login/Auth';
import ChatLayout from './components/chat/layout/chatLayout';
import Login from './components/login/Login';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/create-user" component={CreateUser} />
            <Route path="/chatBase" component={ChatLayout} />
            <Route path="/" exact component={Login} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
