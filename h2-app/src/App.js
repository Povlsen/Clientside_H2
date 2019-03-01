import React, { Component } from 'react';
import Dashboard from './Pages/Dashboard';
import Main from './Components/main.router/';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Main Dashboard={Dashboard} />
      </div>
    );
  }
}

export default App;
