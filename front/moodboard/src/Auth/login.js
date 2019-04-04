import React, { Component } from 'react';
import AuthService from './auth-service';
import { Redirect } from 'react-router-dom';
import { Button, TextField, Box, Label, Text } from 'gestalt';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      username: "",
      password: ""
    };
    this.service = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleUsernameChange({ value }) {
    this.setState({ username: value });
    console.log(this.state);
  }

  handlePasswordChange({ value }) {
    this.setState({ password: value });
    console.log(this.state);

  }

  handleFormSubmit(event) {
    const { handleToggleModal } = this.props;
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
      .then(response => {
        handleToggleModal();
        this.setState({ username: "", password: "", redirect: <Redirect to='/' /> });
        this.props.getUser(response);
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit} >
        <Box>
          <Box marginBottom={2} marginTop={2}>
            <Label htmlFor="email">
              <Text>Email</Text>
            </Label>
          </Box>
          <TextField
            id="username"
            name="username"
            onChange={this.handleUsernameChange}
            placeholder="Email Address"
            value={this.state.username}
            type="email"
          />
          <Box marginBottom={2} marginTop={2}>
            <Label htmlFor="password">
              <Text>Password</Text>
            </Label>
          </Box>
          <TextField
            id="password"
            name="password"
            onChange={this.handlePasswordChange}
            placeholder="Password"
            value={this.state.password}
            type="password"
          />
        </Box>
        <Box marginBottom={4} marginTop={4}>
          <Button
            size="lg"
            color="blue"
            text="Send"
            type='submit'
          />
        </Box>
        </form>
      </div >
    );
  }
}

export default Login;

