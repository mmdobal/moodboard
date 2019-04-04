import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthService from './Auth/auth-service';
import Home from './pages/Home';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service.loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          })
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          })
        })
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    console.log(this.state.loggedInUser);

    { this.fetchUser() }
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Switch>
            <Route exact path='/' render={() => <Home getUser={this.getTheUser} loggedInUser={this.state.loggedInUser} />} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Switch>
            <Route exact path='/' render={() => <Home getUser={this.getTheUser} loggedInUser={this.state.loggedInUser} />} />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
