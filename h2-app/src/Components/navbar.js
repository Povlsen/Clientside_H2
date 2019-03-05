import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Navbar extends Component {
  state = {
    onMenueToggleEvent: new Event('navResize')
  }

  render() {
    var curPath = this.props.location.pathname
    const onNavToggle = () => {
      setTimeout(() => document.dispatchEvent(this.state.onMenueToggleEvent), 500)      
    }
    return (
        <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar" onClick={onNavToggle} >
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>                        
            </button>
            <a className="navbar-brand"><Link to='/'>Employees-app</Link></a>
          </div>

          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
             <li className={curPath === "/" ? "active" : ""}><Link to='/'>Dashboard</Link></li>
             <li className={curPath === "/employees" ? "active" : ""}><Link to='/employees'>Employees</Link></li>
             <li className={/^\/departments(\/d\d{3})?$/.test(curPath) ? "active" : ""}><Link to='/departments'>Departments</Link></li>
             <li className={/^\/employees\/([0-9]+)$/.test(curPath) ? "active" : ""}><Link to='/employees/0'>{`${/^\/employees\/([1-9][0-9]+)$/.test(curPath) ? 'Edit' : 'Add'} Employee`}</Link></li>
            </ul>
          </div>
        </div>        
      </nav>
    )
  }
}

export default Navbar