import ActionCable from 'actioncable'
import React, { Component } from 'react'
import { render } from 'react-dom'


class arModels extends Component {

  state = {
    points: 0,
    opponentsPoints: 0
  }

  componentDidMount() {
    window.fetch('http://localhost:3001/games/1').then(data => {
      data.json().then(res => {
        this.setState({
          points: res.points,
          opponentsPoints: res.opponentsPoints
        })
      })
    })
    const cable = ActionCable.createConsumer('ws://localhost:3001/cable')
    this.sub = cable.subscriptions.create('GameChannel', {
       received: this.handleReceiveNewGame
   })
  }

  handleReceiveNewGame = ({ points, opponentsPoints }) => {
   if (points !== this.state.points && opponentsPoints !== this.state.opponentsPoints) {
     this.setState({
       points,
       opponentsPoints
     })
   }
 }



  handlePlusClick = () => {
      this.setState(prevState => {
        console.log('previous state', prevState)

        this.sub.send({points: prevState.points + 1, id: 1});
        return {points: prevState.points + 1}
      });

    };

    handleMinusClick = () => {
      this.setState(prevState => {
        console.log('previous state', prevState)

        this.sub.send({points: prevState.points - 1, id: 1});
        return {points: prevState.points - 1}
      });

    };


    handlePlusClickTwo = () => {
        this.setState(prevState => {
          console.log('previous state', prevState)

          this.sub.send({opponentsPoints: prevState.opponentsPoints + 1, id: 1});
          return {opponentsPoints: prevState.opponentsPoints + 1}
        });

      };


      handleMinusClickTwo = () => {
          this.setState(prevState => {
            console.log('previous state', prevState)

            this.sub.send({opponentsPoints: prevState.opponentsPoints - 1, id: 1});
            return {opponentsPoints: prevState.opponentsPoints - 1}
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
            @Username <span class="badge badge-light">{this.state.points}</span>
          </button>
        </div>

        <div id="user-2">
          <button type="button" class="btn btn-danger" disabled>
            @Username <span class="badge badge-light">{this.state.opponentsPoints}</span>
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

          <a-marker preset="hiro">
            <a-entity gltf-model='https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/All.gltf' scale="-10 10 10" rotation="0 0 0" position="0 0 0">
              <a-animation attribute="rotation" to="0 360 0" dur="9000" repeat="indefinite" easing="linear"></a-animation>
            </a-entity>
          </a-marker>




          <a-marker preset='kanji'>
            <a-entity gltf-model="https://raw.githubusercontent.com/ButlerBorst/ar-project-glitch/master/assets/LearnCoSymb.gltf" scale="-10 10 10" rotation="0 0 0" position="0 0 0">
              <a-animation attribute="rotation" to="0 360 0" dur="9000" repeat="indefinite" easing="linear"></a-animation>
            </a-entity>
          </a-marker>


          <a-entity camera></a-entity>
          </a-scene>
        </div>




    )
  }
}

export default arModels
