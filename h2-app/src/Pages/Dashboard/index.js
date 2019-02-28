import React, { Component } from 'react'

class Dashboard extends Component {
  render() {
    return (
      <body className="dashboard_grid">        
        <div className="grid_item"> 
          <h3>Opret Ansatte</h3> 
          <img src="https://image.flaticon.com/icons/svg/39/39632.svg" alt=""/>
        </div>
        <div className="grid_item"> 
          <h3>Juster Løn</h3>
          <img src="https://image.flaticon.com/icons/svg/150/150430.svg" alt=""/>
        </div>
        <div className="grid_item"> 
          <h3>Alle Ansatte</h3>
          <img src="https://image.flaticon.com/icons/svg/33/33308.svg" alt=""/>
        </div>
        <div className="grid_item"> 
          <h3>Afdelinger</h3> 
          <img src="https://image.flaticon.com/icons/svg/50/50616.svg" alt="" />
        </div>
      </body>
    )
  }
}
    
export default Dashboard