import React, { Component } from 'react';
import './index.scss';

class Dashboard extends Component {
  render() {
    return (
      <body className="dashboard_grid">        
        <div className="grid_item"> 
            <h3 class="hover hover-1">Add employee</h3> 
            <img src="https://image.flaticon.com/icons/svg/39/39632.svg" alt=""/>
        </div>
        <div className="grid_item"> 
          <h3 class="hover hover-2">Salary</h3>
          <img src="https://image.flaticon.com/icons/svg/150/150430.svg" alt=""/>
        </div>
        <div className="grid_item"> 
          <h3 class="hover hover-3">Employees</h3>
          <img src="https://image.flaticon.com/icons/svg/33/33308.svg" alt=""/>
        </div>
        <div className="grid_item"> 
          <h3 class="hover hover-4">Departments</h3> 
          <img src="https://image.flaticon.com/icons/svg/50/50616.svg" alt="" />
        </div>
      </body>
    )
  }
};
    
export default Dashboard;