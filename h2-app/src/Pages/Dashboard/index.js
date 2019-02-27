import React, { Component } from 'react';
import './dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard_grid">
        <div> Opret Ansatte </div>
        <div> Juster Løn </div>
        <div> Alle Ansatte </div>
        <div> Afdelinger </div>
      </div>
    );
  }
}

export default Dashboard;