import React, { Component } from 'react';
import AuthService from './auth-service';
import { Redirect } from 'react-router-dom';


class Login extends Component {

  constructor(props) {
    super(props);
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
    console.log(this.state)
  };

  handleFormSubmit(event) {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
      .then(response => {
        this.setState({ username: "", password: "", redirect: <Redirect to='/' /> });
        this.props.getUser(response);
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit} >
          <div className="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input onChange={this.handleChange('username')} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="insira o email" />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Senha</label>
            <input onChange={this.handleChange('password')} type="password" className="form-control" id="exampleInputPassword1" placeholder="insira a senha" />
          </div>
          <div className='text-center'>
            <button type='submit'>Entrar</button>
          </div>
        </form>
      </div >
    );
  }
}

export default Login;

