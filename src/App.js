import ActionCable from 'actioncable'
import React, { Component } from 'react'
import { render } from 'react-dom'
import ArModels from './ArModels'


class App extends Component {

  state = {
    show: false
  }


  render () {
    return (
      <div>
        <ArModels />


      </div>
    )
  }
}

export default App
