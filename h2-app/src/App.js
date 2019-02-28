import React, { Component } from 'react';
import Dashboard from './Pages/Dashboard';
import Main from './Components/main.router/';
import Navbar from './Components/navbar';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        <Main Dashboard={Dashboard} />
      </div>
    );
  }
}

export default App;
