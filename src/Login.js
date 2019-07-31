

import React, {Component} from 'react';
import * as THREE from 'three';
import Lobby from './Lobby'

class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  constructor() {
    super()
    this.username = React.createRef()
    this.password = React.createRef()

    // // this should be in App
    // if (this.getToken()) {
    //   this.getProfile()
    // }

    // this should maybe be in App, depends how logging out should work
    this.logout = this.logout.bind(this)
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  login = (ev) => {
    ev.preventDefault()
    console.log('log in')

    let username = this.username.current.value
    let password = this.password.current.value

    fetch('https://tabletopargame.herokuapp.com/api/v1/login', {
      // fetch('http://localhost:3001/api/v1/login', {

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
        // right now, Login handles getting the profile
        // but really App should handle that, plus passing props to  Lobby
        // Login should invoke a callback in its props that alters the state of App
        this.props.getProfile()
        this.props.history.push("./lobby")
      }
    })
  }

  logout() {
    this.clearToken()
    this.setState({username: ''})
    this.props.history.push("./new-user")
    return false
  }

  // // this should go  in App
  // getProfile = () => {
  //   let token = this.getToken()
  //   // fetch('https://tabletopargame.herokuapp.com/api/v1/profile', {
  //     fetch('http://localhost:3001/api/v1/profile', {
  //
  //     headers: {
  //       'Authorization': 'Bearer ' + token
  //     }
  //   })
  //   .then(res => res.json())
  //   .then(json => {
  //     console.log('profile:', json)
  //     // user should be in App state, not Login state, so it can easily be passed to Lobby + beyond
  //     this.setState({user: json.user})
  //   })
  // }

  saveToken(jwt) {
    localStorage.setItem('jwt', jwt)
  }

  clearToken(jwt) {
    localStorage.setItem('jwt', '')
  }

  getToken(jwt) {
    return localStorage.getItem('jwt')
  }

  // IDK
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
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1 class="display-4 text-center">tARble</h1>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <label class="h2">User Name</label>
          <input type="text" class="form-control" name="username" aria-describedby="emailHelp" placeholder="username" onChange={this.handleOnChange} ref={this.username}/>

        </div>
        <div class="form-group">
          <label class="h2">Password</label>
          <input type="password" name="password"class="form-control" placeholder="password" onChange={this.handleOnChange} ref={this.password}/>
        </div>
          <input type="submit" id="loginButton" class="btn btn-primary" value="log in" />
        <button type="button" id="logoutButton" class="btn btn-primary" onClick={this.logout}>log out</button>

      </form>
    </div>


    );
  }
}

export default Login
