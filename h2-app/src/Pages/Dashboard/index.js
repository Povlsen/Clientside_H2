import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    return (
      <body className="dashboard_grid">        
        <div className="grid_item"> 
          <h3>Opret Ansatte</h3> 
          <img srcSet="../../../res/icon_add_user.svg" alt=""/>
        </div>
        <div className="grid_item"> 
          <h3>Juster Løn</h3>
          <img srcSet="../../../res/icon_salary.svg" alt=""/>
        </div>
        <div className="grid_item"> 
          <h3>Alle Ansatte</h3>
          <img srcSet="../../../res/icon_users.svg" alt=""/>
        </div>
        <div className="grid_item"> 
          <h3>Afdelinger</h3> 
          <img srcSet="../../../res/icon_departments.svg" alt="" />
        </div>
      </body>
    );
  }
}

export default Dashboard;