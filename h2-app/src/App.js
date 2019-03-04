import React, { Component } from 'react'
import Dashboard from './Pages/Dashboard'
import Main from './Components/main.router/'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    Object.defineProperties(Date, {
      MIN_DATE: {
        value: '1970-01-01'
      },
      MAX_DATE: {
        value: '9999-01-01'
      },
      CURRENT: {
        value: new Date().toISOString().substring(0, 10)
      }
    })
  }
  render() {
    return (
      <div className="App">
        <Main Dashboard={Dashboard} />
      </div>
    )
  }
}

export default App
