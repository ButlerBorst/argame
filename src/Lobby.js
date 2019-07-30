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
    return fetch(`http://localhost:3001/api/v1/users/${this.props.user.id}`,{
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
      <h1>Welcome: {this.props.user.username}</h1>
      <br></br>
      <input type="submit" onClick={this.props.handleCreateGame} className="btn btn-primary" value="Create Game"/>
      <h1>{this.props.gameRoom}</h1>
      <form onSubmit={this.handleJoinGame}>
        <div class="form-group">
          <label for="game room">Game Room</label>
          <input onChange={this.gameState} type="text" class="form-control" placeholder="Enter Game Room Number"/>
        </div>
          <input type="submit" className="btn btn-primary" value="Join Game"/>
      </form>
      </div>
    )
  }
}

export default withRouter(Lobby)
