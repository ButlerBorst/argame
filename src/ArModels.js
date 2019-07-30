import ActionCable from 'actioncable'
import React, { Component } from 'react'
import { render } from 'react-dom'


class arModels extends Component {

  state = {
    player1: "",
    player2: "",
    win: 0,
    login:0,
    points1: 0,
    points2: 0
  }

  componentDidMount() {
    // window.fetch('https://tabletopargame.herokuapp.com/games/1').then(data => {
    // console.log("game id:?", this.props.gameRoom)
    window.fetch(`https://tabletopargame.herokuapp.com/games/${this.props.gameRoom}`)
    .then(data => data.json())
    .then(data => {
      let players = data.users
      console.log("data", players)

      const cable = ActionCable.createConsumer('https://tabletopargame.herokuapp.com/cable')
      // const cable = ActionCable.createConsumer('ws://localhost:3001/cable')

      this.sub = cable.subscriptions.create('GameChannel', {
        received: this.handleReceiveNewGame
      });

      // if two players returned  by fetch, you are joining an existing game
      // after updating state for both players, send an update to the cable to
      // announce you have joined
      if(players[0] && players[1]){
        this.setState({
          player1: players[0],
          points1: players[0].points,
          player2: players[1],
          points2: players[1].points
        })
        console.log("sending to cable:", players[1].id, players[1].points, players[1].username)
        setTimeout(()=> {
          console.log("waited for timeout  already")
          this.sub.send({
            user_id: players[1].id,
            points: players[1].points,
            username: players[1].username
          })
        }, 5000);

      }
      // if only one player returned, you  are the only player in  the game so far,
      // so just set yourself to player 1 in state
      else if (players[0]) {
        this.setState({
          player1: players[0],
          points1: players[0].points
        })
      }
    })
}


  handleReceiveNewGame = (args) => {
    const {user_id, points, username} = args
    console.log(user_id, points, args)
    if (points === 0 || points) {
      if (user_id === this.state.player1.id){
        this.setState({
          points1: points
        })
      } else if (user_id === this.state.player2.id) {
        this.setState({
          points2: points
        })
      } else if (this.state.player2 === ""){
        this.setState({
          player2: {id: user_id, username: username},
          points2: points
        })
      }
    }
     // if (this.state.player1.id === user_id) {
     //   this.setState({
     //     points: points
     //   })
     // } if ((points === 0 || points) && (this.state.player2.id === user_id)) {
     //   this.setState({
     //     opponentsPoints: points
     //   })
     // } if (user_id !==  this.state.player1.id && this.state.player2 == "" ) {
     //   this.setState({
     //     player2: {id: user_id, username: username},
     //     opponentsPoints: points
     //   })
     // }
 }
 //  handleReceiveNewGame = ({points, opponentsPoints}) => {
 //    console.log(points, opponentsPoints)
 //   if (points === 0 || points) {
 //     this.setState({
 //       points
 //     })
 //   }
 //   if (opponentsPoints === 0 || opponentsPoints) {
 //       this.setState({
 //         opponentsPoints
 //       })
 //     }
 // }


  handlePlusClick = () => {
      this.setState(prevState => {
        console.log('previous state', prevState)
        // once you know who player 1 is, send their ID
        this.sub.send({
          user_id: prevState.player1.id,
          points: prevState.points1 + 1,
          username: prevState.player1.username
        })
        // this.sub.send({points: prevState.points + 1, id: 1});
        return {points1: prevState.points1 + 1}
      });

    };

    handleMinusClick = () => {
      this.setState(prevState => {
        console.log('previous state', prevState)

        this.sub.send({
          user_id: prevState.player1.id,
          points: prevState.points1 - 1,
          username: prevState.player1.username
        })
        return {points1: prevState.points1 - 1}
      });

    };


    handlePlusClickTwo = () => {
        this.setState(prevState => {
          console.log('previous state', prevState)

          this.sub.send({
            user_id: prevState.player2.id,
            points: prevState.points2 + 1,
            username: prevState.player2.username
          })
          return {points2: prevState.points2 + 1}
        });

      };


      handleMinusClickTwo = () => {
          this.setState(prevState => {
            console.log('previous state', prevState)

            this.sub.send({
              user_id: prevState.player2.id,
              points: prevState.points2 - 1,
              username: prevState.player2.username

            })
            return {points2: prevState.points2 - 1}
          });

        };

  render() {

    return (
      <div>
        <div id="modal-button">
          <button type="button" className="btn btn-primary btn-circle btn-lg" data-toggle="modal" data-target="#exampleModalCenter"><i className="fa fa-home"></i>
          </button>
        </div>

        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">tARble</h5>
              </div>
              <div class="modal-body">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                  Home
                </button>

                <br></br>
                <br></br>

                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                  Reset Game
                </button>

                <br></br>
                <br></br>

                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                  LeaderBoard
                </button>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div id="user-1">
          <button type="button" class="btn btn-primary" disabled>
             {this.state.player1.username}    <span class="badge badge-light">{this.state.points1}</span>
          </button>
        </div>

        <div id="user-2">
          <button type="button" class="btn btn-danger" disabled>
            {this.state.player2.username}    <span class="badge badge-light">{this.state.points2}</span>
          </button>
        </div>

        <div id="buttons-1">
          <button onClick={this.handlePlusClick} type="button" className="btn btn-primary btn-circle btn-lg" ><i className="fa fa-plus"></i></button>
          <br></br>
          <br></br>
          <button onClick={this.handleMinusClick} type="button" className="btn btn-primary btn-circle btn-lg" ><i className="fa fa-minus"></i></button>
        </div>

        <div id="buttons-2">
          <button onClick={this.handlePlusClickTwo} type="button" className="btn btn-danger btn-circle btn-lg" ><i className="fa fa-plus"></i></button>
          <br></br>
          <br></br>
          <button onClick={this.handleMinusClickTwo} type="button" className="btn btn-danger btn-circle btn-lg" ><i className="fa fa-minus"></i></button>
        </div>



    <a-scene arjs="debugUIEnabled: false;">

        <a-light type="ambient" intensity="1">
          <a-marker preset='hiro'>
            <a-entity gltf-model='https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/FITOKEN/FITOKEN.gltf' scale="-10 10 10" rotation="0 0 0" position="0 -1 0">
              <a-animation attribute="rotation" to="0 360 0" dur="9000" repeat="indefinite" easing="linear"></a-animation>
            </a-entity>
          </a-marker>

          <a-marker preset='kanji'>
            <a-entity gltf-model='https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/LearnCoSymb.gltf' scale="-10 10 10" rotation="0 0 0" position="0 -1 0">
              <a-animation attribute="rotation" to="0 360 0" dur="9000" repeat="indefinite" easing="linear"></a-animation>
            </a-entity>
          </a-marker>


        <a-marker preset='custom' type='pattern' url='https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/pattern-Sun-Marker-Colored.patt'>
            <a-entity gltf-model="https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/NewSun/NewSun.gltf" scale="-10 10 10" rotation="0 0 0" position="0 -.1 0">
              <a-animation attribute="rotation" to="0 360 0" dur="60000" repeat="indefinite" easing="linear"></a-animation>
            </a-entity>
            <a-entity gltf-model="https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/rings1/rings1.gltf" scale="-10 10 10" rotation="-10 -10 10" position="0 -.1 0">
              <a-animation attribute="rotation" to="0 360 0" dur="80000" repeat="indefinite" easing="linear"></a-animation>
            </a-entity>
          <a-entity gltf-model="https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/rings3/rings3.gltf" scale="-10 10 10" rotation="-10 -10 10" position="0 -.1 0">
            <a-animation attribute="rotation" to="0 -360 0" dur="40000" repeat="indefinite" easing="linear"></a-animation>
          </a-entity>
        </a-marker>


      <a-light type="point"  color="pink" position="-2 -90 0"></a-light>
        <a-light type="point" color="pink" position="2 90 0"></a-light>
          <a-marker preset='custom' type='pattern' url='https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/pattern-black-hole-marker.patt'>

            <a-entity gltf-model="https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/Ring11/Ring11.gltf" material="side: double" scale="-9 9 9" rotation="0 0 0" position="0 -.5 0">
              <a-animation attribute="rotation" to="360 360 0" dur="100000" repeat="indefinite" easing="linear"></a-animation>
            </a-entity>


            <a-entity gltf-model="https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/Ring12/Ring12.gltf" material="side: double" scale="-9 9 9" rotation="0 0 0" position="0 -.5 0">
              <a-animation attribute="rotation" to="-360 -360 0" dur="50000" repeat="indefinite" easing="linear"></a-animation>
            </a-entity>

            <a-entity gltf-model="https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/Ring13/Ring13.gltf" material="side: double" scale="-9 9 9" rotation="0 0 0" position="0 -.5 0 ">
              <a-animation attribute="rotation" to="360 360 0" dur="40000" repeat="indefinite" easing="linear"></a-animation>
            </a-entity>

            <a-entity gltf-model="https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/Ring14/Ring14.gltf" material="side: double" scale="-9 9 9" rotation="0 0 0" position="0 -.5 0">
              <a-animation attribute="rotation" to="-360 -360 0" dur="30000" repeat="indefinite" easing="linear"></a-animation>
            </a-entity>

            <a-entity gltf-model="https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/Ring15/Ring15.gltf" material="side: double" scale="-9 9 9" rotation="0 0 0" position="0 -.5 0">
              <a-animation attribute="rotation" to="360 360 0" dur="20000" repeat="indefinite" easing="linear"></a-animation>
            </a-entity>

            <a-entity gltf-model="https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/Ring16/Ring16.gltf" scale="-9 9 9" rotation="0 0 0" position="0 -.5 0">
              <a-animation attribute="rotation" to="-360 -360 0" dur="10000" repeat="indefinite" easing="linear"></a-animation>
            </a-entity>

            <a-entity gltf-model="https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/Ring17/Ring17.gltf" scale="-9 9 9" rotation="0 0 0" position="0 -.5 0">
              <a-animation attribute="rotation" to="360 360 0" dur="5000" repeat="indefinite" easing="linear"></a-animation>
            </a-entity>

            <a-entity gltf-model="https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/Blackhole/Blackhole.gltf" scale="-9 9 9" rotation="0 0 0" position="0 -.5 0">
              <a-animation attribute="rotation" to="0 360 0" dur="10000" repeat="indefinite" easing="linear"></a-animation>
            </a-entity>
          </a-marker>
        </a-light>

      <a-entity camera></a-entity>
    </a-scene>
  </div>




    )
  }
}

export default arModels
