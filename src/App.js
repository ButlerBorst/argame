import ActionCable from 'actioncable'
import React, { Component } from 'react'
import { render } from 'react-dom'
import ArModels from './ArModels'
import Login  from'./Login'
import CreateNewUser from './CreateNewUser'
import {BrowserRouter, Redirect,Route} from 'react-router-dom'
import Lobby from './Lobby'
// import { withRouter } from 'react-router';

class App extends Component {

  state = {
    user: "",
    gameRoom: '',
    leaderboard: []
  }

  constructor(){
    super();
    if (this.getToken()) {
      this.getProfile()
    }

  }




  handleCreateGame = () => {
    console.log("in fetch")
   fetch('https://tabletopargame.herokuapp.com/games', {
     // fetch('http://localhost:3001/games', {

     method: "POST",

     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',

     },
    body: JSON.stringify()
   })
   .then(res => res.json())
   .then(data => {
    this.setState({gameRoom: data.data.id})
   })
   .then(this.handleEditUser)
 }

 handleSetGameId = (joinGameId) => {
   this.setState({
     gameRoom: joinGameId
   })
 }

 handleEditUser = () => {
   console.log(this.state.gameRoom)
   const token = localStorage.getItem('jwt');
   return fetch(`https://tabletopargame.herokuapp.com/api/v1/users/${this.state.user.id}`,{
     // return fetch(`http://localhost3001/api/v1/users/${this.state.user.id}`,{

      method: 'PATCH',
      headers: {'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + token
            },
      body: JSON.stringify({
        game_id: this.state.gameRoom
      })
    }).then( resp => resp.json())
      .then( data => {
        console.log(data)
        this.setState({leaderboard: data.data})
      })
  }

  // handleJoinGame = () => {
  //     this.props.history.push("./play-game")
  //   }

  getToken(jwt) {
    return localStorage.getItem('jwt')
  }


  getProfile = () => {
    let token = this.getToken()
    fetch('https://tabletopargame.herokuapp.com/api/v1/profile', {
      // fetch('http://localhost:3001/api/v1/profile', {

      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => res.json())
    .then(json => {
      if(json.user){
      console.log('profile:', json)
      // user should be in App state, not Login state, so it can easily be passed to Lobby + beyond
      this.setState({user: json.user, gameRoom: json.user.game_id })
    }else{
      // there was a token in local storage, but the backend rejected it
      // so instead let's get rid of that token
      console.log("no profile", json)
      localStorage.setItem('jwt', "")
    }
    })
  }

  render () {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => <Redirect to="/new-user" />} />

          {this.state.gameRoom?
          <Route path="/play-game" render={(props) => <ArModels {...props} gameRoom={this.state.gameRoom} currentUserId={this.state.user.id} />} /> : null}

          <Route path="/login" render={(props) => <Login {...props} getProfile={this.getProfile}/>} />
          <Route path="/new-user" component={CreateNewUser} />
          <Route  path="/lobby" render={ (props) => <Lobby {...props} handleSetGameId={this.handleSetGameId}  handleCreateGame={this.handleCreateGame} user={this.state.user} gameRoom={this.state.gameRoom} />} />

        </div>
    </BrowserRouter>

    )
  }
}

export default (App)
