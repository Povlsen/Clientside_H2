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
  render() {
    return (
      <div className="App">
        <Main Dashboard={Dashboard} />
      </div>
    )
  }
  /*NotificationsPage(){
    notify(type){
    return () => {
      switch (type) {
        case 'info':
          toast.info('Info message', {
            autoClose: 3000
          });
          break;
        case 'success':
          toast.success('Success message', {
            position: "top-right",
          });
          break;
        case 'warning':
          toast.warn('Warning message');
          break;
        case 'error':
          toast.error('Error message');
          break;
      }
    };
  };
    render(){
      return (
        <Fragment>
          <button className='btn btn-info' onClick={this.notify('info')}>Info</button>
          <button className='btn btn-success' onClick={this.notify('success')}>Success</button>
          <button className='btn btn-warning' onClick={this.notify('warning')}>Warning</button>
          <button className='btn btn-danger' onClick={this.notify('error')}>Error</button>
          <ToastContainer
            hideProgressBar={true}
            newestOnTop={true}
            autoClose={5000}
          />
        </Fragment>
      );
    }*/
  }
export default App
