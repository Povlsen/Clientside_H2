import React, { Component } from 'react'
import Dashboard from './Pages/Dashboard'
import Main from './Components/main.router/'
import { Button, ToastContainer, toast } from 'mdbreact'

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

  notify(type) {
    switch (type) {
      case 'info':
        return toast.info('Info message', {
          autoClose: 3000
        })
      case 'success':
        return toast.success('Success message', {
          position: "top-right",
        })
      case 'warning':
        return toast.warn('Warning message')
      case 'error':
        return toast.error('Error message')
      default:
        return
    }
  }

  render() {
    return (
      <div className="App">
        <Main Dashboard={Dashboard} notify={this.notify} />
        <ToastContainer
            hideProgressBar={false}
            newestOnTop={true}
            autoClose={5000}
          />
      </div>
    )
  }
}

export default App
