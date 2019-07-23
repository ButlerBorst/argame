import React, {Component} from 'react';

class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  constructor() {
    super()
    this.username = React.createRef()
    this.password = React.createRef()

    if (this.getToken()) {
      this.getProfile()
    }

    this.logout = this.logout.bind(this)
  }

  login = (ev) => {
    ev.preventDefault()
    console.log('log in')

    let username = this.username.current.value
    let password = this.password.current.value

    fetch('http://localhost:3001/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user:{username, password} })
    })
    .then(res => res.json())
    .then(json => {
      console.log('login:', json)
      if (json && json.jwt) {
        this.saveToken(json.jwt)
        this.getProfile()
        this.props.history.push("./play-game")
      }
    })
  }

  logout() {
    this.clearToken()
    this.setState({username: ''})
    this.props.history.push("./new-user")
    return false
  }

  getProfile = () => {
    let token = this.getToken()
    fetch('http://localhost:3001/api/v1/profile', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log('profile:', json)
      this.setState({user: json.user})
    })
  }

  saveToken(jwt) {
    localStorage.setItem('jwt', jwt)
  }

  clearToken(jwt) {
    localStorage.setItem('jwt', '')
  }

  getToken(jwt) {
    return localStorage.getItem('jwt')
  }

  handleEdit = () => {
    this.props.history.push("./edit-user")
  }

  handleDelete = () => {
    this.props.history.push("./delete-user")
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.login}>
          <input type="text" placeholder="username" ref={this.username} />
          <input type="password" placeholder="password" ref={this.password} />
          <input type="submit" value="log in" />
          <button type="button" onClick={this.logout}>log out</button>
          <button type="button" onClick={this.handleEdit}>edit</button>
          <button type="button" onClick={this.handleDelete}>delete</button>
        </form>
      </div>
    );
  }
}

export default Login
