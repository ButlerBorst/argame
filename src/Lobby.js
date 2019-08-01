import React, { Component } from 'react'
import { render } from 'react-dom'
import { withRouter } from 'react-router';
import {BrowserRouter, Redirect,Route} from 'react-router-dom'
import LeaderBoard from './LeaderBoard'

class Lobby extends Component  {

  constructor(){
    super();
    // window.location.reload();
  }

  state = {
    joinGameId: '',
    leaderboard: []
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
  // componentDidMount(){
    // window.location.reload();
  // }



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
      <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
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
        </form>
        <div class="text-center">
        <input type="submit" onClick={this.props.handleCreateGame} className="btn btn-primary" value="Create Game"/>
        </div>
        <h1 class="display-4 text-center">{this.props.gameRoom}</h1>

        <div id="leaderboard-button" class="text-center">
          <input  type="submit" onClick={this.handleLeaderBoard} className="btn btn-primary " data-toggle="modal" data-target="#exampleModalCenter" value="Leader Board"/>
        </div>

        <LeaderBoard leaderboardprops={this.state.leaderboard} />

      </div>


    )
  }
}

export default withRouter(Lobby)
