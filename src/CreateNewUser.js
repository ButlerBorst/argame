
import React, { Component } from "react";
import { Redirect } from 'react-router-dom'


class CreateNewUser extends Component {

  state = {
  	username: '',
    password: ''
  }

  handleChange = event => {

      const {name, value} = event.target;

      this.setState({
          [name]: value,
      }, ()=> console.log(this.state));
  }


      createUser = () =>{
          const URL = 'http://localhost:3001/api/v1/users'
          const userInfo = this.state
          console.log(userInfo)
          const headers = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(userInfo)
          }
          fetch(URL, headers)
              .then(res=>res.json())
      }

      handleSubmit = (e) =>{
        e.preventDefault()
        this.createUser()
        this.props.history.push("./login")
      }


  render() {
    return(
      <div>
      <h3> Create new user: {this.state.username}</h3>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="text" name="username" placeholder="username" value={this.state.username} ref={input => this.username = input} />
          <input onChange={this.handleChange} type="password" name="password" placeholder="password" value={this.state.password} />
          <input type="submit"/>
        </form>
      </div>

    )
  }
}



export default CreateNewUser;
