import React, { Component } from 'react';
import './dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <body className="dashboard_grid">
        <div className="grid_item"> Opret Ansatte </div>
        <div className="grid_item"> Juster Løn </div>
        <div className="grid_item"> Alle Ansatte </div>
        <div className="grid_item"> Afdelinger </div>
      </body>
    );
  }
}

export default Dashboard;