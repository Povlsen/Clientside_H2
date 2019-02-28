import React, { Component } from 'react'

class Dashboard extends Component {
  render() {
    return (
      <body className="dashboard_grid">        
        <div className="grid_item"> 
          <h3>Opret Ansatte</h3> 
          <img/>
        </div>
        <div className="grid_item"> 
          <h3>Juster Løn</h3>
          <img/>
        </div>
        <div className="grid_item"> 
          <h3>Alle Ansatte</h3>
          <img/>
        </div>
        <div className="grid_item"> 
          <h3>Afdelinger</h3> 
          <img/>
        </div>
      </body>
    )
  }
}
    
export default Dashboard