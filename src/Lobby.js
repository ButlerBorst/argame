import React, { Component } from 'react'
import { render } from 'react-dom'
import { withRouter } from 'react-router';
import {BrowserRouter, Redirect,Route} from 'react-router-dom'


class Lobby extends Component  {

  state = {
    joinGameId: ''
  }

 //  handleCreateGame = () => {
 //    console.log("in fetch")
 //   fetch('http://localhost:3001/games', {
 //
 //     method: "POST",
 //
 //     headers: {
 //       'Accept': 'application/json',
 //       'Content-Type': 'application/json',
 //
 //     },
 //    body: JSON.stringify()
 //   })
 //   .then(res => res.json())
 //   .then(data => {
 //
 //    this.setState({gameRoom: data.data.id})
 //   })
 //   .then(this.handleEditUser)
 // }

 // handleEditUser = () => {
 //   console.log(this.state.gameRoom)
 //   const token = localStorage.getItem('jwt');
 //   return fetch(`http://localhost:3001/api/v1/users/${this.props.user.id}`,{
 //      method: 'PATCH',
 //      headers: {'Content-Type': 'application/json',
 //              'Accept': 'application/json',
 //              'Authorization': 'Bearer ' + token
 //            },
 //      body: JSON.stringify({
 //        game_id: this.state.gameRoom
 //      })
 //    }).then( resp => resp.json())
 //      .then( data => {
 //        console.log(data)
 //      })
 //  }
  //

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
   }



  render(){
    return(
      <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 class="h1">Welcome: {this.props.user.username}</h1>
      <br></br>
      <form onSubmit={this.handleJoinGame}>
        <div class="form-group">
          <label class="h3" for="game room">Game Room</label>
          <input onChange={this.gameState} type="text" class="form-control" placeholder="Enter Game Room Number"/>
        </div>
        <br></br>
        <br></br>

          <div class="text-center">
          <input type="submit" id="joinGameButton" className="btn btn-primary pull-center" value="Join Game"/>
          </div>
          <br></br>
          <br></br>
          <div class="text-center">
          <input type="submit" onClick={this.props.handleCreateGame} className="btn btn-primary" value="Create Game"/>
          </div>
          <h1 class="display-4 text-center">{this.props.gameRoom}</h1>
      </form>
      </div>
    )
  }
}

export default withRouter(Lobby)
