import React, { Component } from 'react';
import Dashboard from './Pages/Dashboard';
import Employees from './Pages/Employees'
import Navbar from './Components/navbar';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        <Employees />
      </div>
    );
  }
}

export default App;
