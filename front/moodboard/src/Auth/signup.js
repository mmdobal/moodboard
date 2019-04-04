import React, { Component } from 'react';
import AuthService from './auth-service';
import { Redirect } from 'react-router-dom';
import { Button, TextField, Box, Label, Text } from 'gestalt';
import 'gestalt/dist/gestalt.css';

class Signup extends Component {
    constructor() {
      super();
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.state = {
        name: "",
        username: "",
        password: "",
        redirect: null
      };
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.service = new AuthService();
    }

    handleNameChange({ value }) {
      this.setState({ name: value });
      console.log(this.state);
    }

    handleUsernameChange({ value }) {
      this.setState({ username: value });
      console.log(this.state);
    }

    handlePasswordChange({ value }) {
      this.setState({ password: value });
    }
  
    handleFormSubmit(event) {
      event.preventDefault();
      const { username, password, name } = this.state;
      const { getUser, handleToggleModal } = this.props;
      this.service.signup(username, password, name)
        .then((response) => {
          handleToggleModal();
          this.setState({
            username: '',
            password: '',
            name: ''
          });
          getUser(response);
          this.setState({ redirect: <Redirect to="/entrar" /> });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
    render() {
      const r = this.state.redirect !== null ? this.state.redirect : false;
      return (
        <div className="App">
						<form onSubmit={this.handleFormSubmit}>
            <Box>
              <Box marginBottom={2}>
                <Label htmlFor="name">
                  <Text>Name</Text>
                </Label>
              </Box>
              <TextField
                id="name"
                name="name"
                onChange={this.handleNameChange}
                placeholder="Name"
                value={this.state.name}
                type="text"
              />
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
  
  export default Signup;
  