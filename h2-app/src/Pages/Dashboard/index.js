import React, { Component } from 'react';
import './index.scss';

class Dashboard extends Component {
  render() {
    console.log('dash', this.props)
    return (
      <body className="dashboard_grid">        
        <div className="grid_item" onClick={() => this.props.history.push(`/employees/0`)}> 
            <h3 className="theamAnimation">Add employee</h3> 
            <img src="https://image.flaticon.com/icons/svg/39/39632.svg" alt=""/>
        </div>
        <div className="grid_item inactive"> 
          <h3 className="theamAnimation">Salary</h3>
          <img src="https://image.flaticon.com/icons/svg/150/150430.svg" alt=""/>
        </div>
        <div className="grid_item" onClick={() => this.props.history.push(`/employees`)}> 
          <h3 className="theamAnimation">Employees</h3>
          <img src="https://image.flaticon.com/icons/svg/33/33308.svg" alt=""/>
        </div>
        <div className="grid_item" onClick={() => this.props.history.push(`/departments`)}> 
          <h3 className="theamAnimation">Departments</h3> 
          <img src="https://image.flaticon.com/icons/svg/50/50616.svg" alt="" />
        </div>
      </body>
    )
  }
};
    
export default Dashboard;