
import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import image from './Battle-Ar-Logo.png'

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

      <div className="firstpage">
      <div>
      
      <h1 class="h1 text-center"> Welcome To </h1>
        <img id="logo" class="center" src={image} />
          <form onSubmit={this.handleSubmit}>
            <div class="form-group">
            <h1 class="h3 text-center"> Create Account </h1>


            <br></br>
              <label class="h4">   UserName</label>
              <input onChange={this.handleChange} class="form-control form-control-lg" type="text" name="username" placeholder="username" value={this.state.username} ref={input => this.username = input} />
            </div>


          <div class="form-group">
            <label class="h4"> Password</label>
            <input onChange={this.handleChange} class="form-control form-control-lg" type="password" name="password" placeholder="password" value={this.state.password} />
          </div>
          <input class="btn btn-primary btn-lg" id="createUserButton" type="submit"/>
        </form>
        </div>
      </div>



    )
  }
}



export default CreateNewUser;
