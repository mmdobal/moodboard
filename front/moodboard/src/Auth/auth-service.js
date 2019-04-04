import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:8080/api',
      withCredentials: true
    });
    this.service = service;
  }

  signup = (username, password, name) => {
    return this.service.post('/auth/signup', { username, password, name })
      .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/auth/loggedin')
      .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/auth/login', { username, password })
      .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/auth/logout', {})
      .then(response => response.data)
  }
}

export default AuthService;