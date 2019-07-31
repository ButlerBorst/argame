
import React, { Component } from "react";
import { Redirect } from 'react-router-dom'


class CreateNewUser extends Component {

  state = {
  	username: '',
    password: '',
    win: 0,
    loss: 0,
    points: 0
  }

  handleChange = event => {

      const {name, value} = event.target;

      this.setState({
          [name]: value,
      }, ()=> console.log(this.state));
  }


      createUser = () =>{
          const URL = 'https://tabletopargame.herokuapp.com/api/v1/users'
          // const URL = 'http://localhost:3001/api/v1/users'

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

      <div className="App">

        <form onSubmit={this.handleSubmit}>
          <div class="form-group">

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1 class="display-4 text-center">Wecome to tARble</h1>
          <br></br>
          <br></br>
          <br></br>
            <label class="h2">   UserName</label>
            <input onChange={this.handleChange} class="form-control form-control-lg" type="text" name="username" placeholder="username" value={this.state.username} ref={input => this.username = input} />


          </div>
          <br></br>
          <br></br>
          <div class="form-group">
            <label class="h2"> Password</label>
            <input onChange={this.handleChange} class="form-control form-control-lg" type="password" name="password" placeholder="password" value={this.state.password} />
          </div>
          <input class="btn btn-primary" id="createUserButton" type="submit"/>
        </form>
      </div>



    )
  }
}



export default CreateNewUser;
