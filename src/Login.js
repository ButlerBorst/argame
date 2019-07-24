


import React, {Component} from 'react';
import * as THREE from 'three';

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

    fetch('https://tabletopargame.herokuapp.com/api/v1/login', {
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
    fetch('https://tabletopargame.herokuapp.com/api/v1/profile', {
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
        <div class="form-group">
          <label>User Name</label>
          <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="username" ref={this.username}/>
  
        </div>
        <div class="form-group">
          <label >Password</label>
          <input type="password" class="form-control" placeholder="password" ref={this.password}/>
        </div>
          <input type="submit" class="btn btn-primary" value="log in" />
        <button type="button" class="btn btn-primary" onClick={this.logout}>log out</button>
        <button type="button" class="btn btn-primary" onClick={this.handleEdit}>edit</button>
        <button type="button" class="btn btn-primary" onClick={this.handleDelete}>delete</button>
      </form>
    </div>


    );
  }
}

export default Login
