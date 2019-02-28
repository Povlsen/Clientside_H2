import React, { Component } from 'react'

class Dashboard extends Component {
  render() {
    return (
      <body className="dashboard_grid">        
        <div className="grid_item"> 
          <h3>Add employee</h3> 
          <img src="https://image.flaticon.com/icons/svg/39/39632.svg" alt=""/>
        </div>
        <div className="grid_item"> 
          <h3>Salary</h3>
          <img src="https://image.flaticon.com/icons/svg/150/150430.svg" alt=""/>
        </div>
        <div className="grid_item"> 
          <h3>Employees</h3>
          <img src="https://image.flaticon.com/icons/svg/33/33308.svg" alt=""/>
        </div>
        <div className="grid_item"> 
          <h3>Departments</h3> 
          <img src="https://image.flaticon.com/icons/svg/50/50616.svg" alt="" />
        </div>
      </body>
    )
  }
}
    
export default Dashboard