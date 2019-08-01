import React, { Component } from 'react'
import { render } from 'react-dom'
import { withRouter } from 'react-router';
import {BrowserRouter, Redirect,Route} from 'react-router-dom'
import LeaderBoard from './LeaderBoard'
import image from './Battle-Ar-Logo.png'

class Lobby extends Component  {

  constructor(){
    super();
      this.logout = this.logout.bind(this)
    // window.location.reload();
  }

  state = {
    joinGameId: '',
    leaderboard: []
  }

  clearToken(jwt) {
    localStorage.setItem('jwt', '')
  }

  logout() {
    this.clearToken()
    this.setState({username: ''})
    this.props.history.push("./login")
    return false
  }



  gameState = (e) => {
    this.setState({
      joinGameId: e.target.value
    })
    console.log(this.state.joinGameId)
  }

  handleJoinGame = (e) => {
    e.preventDefault()
    console.log("hJG fires")
    console.log(this.state.joinGameId)
    const token = localStorage.getItem('jwt');
    return fetch(`https://tabletopargame.herokuapp.com/api/v1/users/${this.props.user.id}`,{
      // return fetch(`http://localhost:3001/api/v1/users/${this.props.user.id}`,{

       method: 'PATCH',
       headers: {'Content-Type': 'application/json',
               'Accept': 'application/json',
               'Authorization': 'Bearer ' + token
             },
       body: JSON.stringify({
         game_id: this.state.joinGameId
       })
     }).then( resp => resp.json())
       .then (this.handleEnterGame)
       .catch(err=> console.log(err))
   }

   handleEnterGame = () => {
     this.props.handleSetGameId(this.state.joinGameId)
      this.props.history.push("./play-game")
      document.body.requestFullscreen();
   }

   handleLeaderBoard = () => {
           const token = localStorage.getItem('jwt');

           fetch('https://tabletopargame.herokuapp.com/games', {
             headers: {
               'Authorization': 'Bearer ' + token
             }
           })
           .then(res => res.json())
           .then(leaderboard => {
             console.log('leaderboard:', leaderboard)
             this.setState({leaderboard: leaderboard.data})

           })
         }

// btn-circle btn-lg

  render(){
    return(
      <div class="firstpage">
      <br></br>
      <h1 class="h1 text-center"> Play Battle-AR </h1>
      <img id="logo" class="center" src={image} />



      <form onSubmit={this.handleJoinGame}>
        <div class="form-group">
          <label class="h4" for="game room">Game Room</label>
          <input onChange={this.gameState} type="text" class="form-control form-control-lg" placeholder="Enter Game Room Number"/>
        </div>



          <div class="text-center">
          <input type="submit" id="joinGameButton" className="btn btn-primary btn-md pull-center" value="Join Game"/>
          </div>
        </form>

        <div class="text-center">
        <input type="submit" onClick={this.props.handleCreateGame} className="btn btn-primary btn-md" value="Create Game"/>
        </div>
        <h1 class="h2 text-center">{this.props.gameRoom}</h1>

        <div id="leaderboard-button" class="text-center">
          <input  type="submit" onClick={this.handleLeaderBoard} className="btn btn-primary btn-md" data-toggle="modal" data-target="#exampleModalCenter" value="Leader Board"/>
        </div>

          <br></br>

        <div class="text-center">
          <input  type="submit" onClick={this.logout} className="btn btn-primary btn-md" value="Logout"/>
        </div>

        <LeaderBoard leaderboardprops={this.state.leaderboard} />

      </div>


    )
  }
}

export default withRouter(Lobby)
