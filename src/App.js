import ActionCable from 'actioncable'
import React, { Component } from 'react'
import { render } from 'react-dom'
import ArModels from './ArModels'
import Login  from'./Login'
import CreateNewUser from './CreateNewUser'
import {BrowserRouter, Redirect,Route} from 'react-router-dom'


class App extends Component {


  render () {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" render={() => <Redirect to="/new-user" />} />

          <Route path="/play-game" component={ArModels} />

          <Route path="/login" component={Login} />
          <Route path="/new-user" component={CreateNewUser} />


        </div>
    </BrowserRouter>

    )
  }
}

export default App
