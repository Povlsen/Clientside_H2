import React, { Component } from 'react';
import Dashboard from './Pages/Dashboard';
import Navbar from './Components/navbar';
import './App.css';

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => {
        this.setState({ data: res })
        console.log(this.state.data)
      })
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('http://localhost:8080/api/employees/get/');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return ([
      <Navbar />,
      <div className="App">
        <Dashboard />
        
      </div>
    ]);
  }
}

export default App;
