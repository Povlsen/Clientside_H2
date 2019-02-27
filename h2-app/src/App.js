import React, { Component } from 'react';
import Dashboard from './Pages/Dashboard';
import Navbar from './Components/navbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Dashboard />
        
      </div>
    );
  }
}

export default App;
