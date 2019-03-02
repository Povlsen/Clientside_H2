import React, { Component } from 'react';
import { Link } from 'react-router-dom';


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
             <li className={curPath === "/departments" ? "active" : ""}><Link to='/departments'>Departments</Link></li>
             <li className={/^\/employees\/([0-9]+)$/.test(curPath) ? "active" : ""}><Link to='/employees/0'>Add Employee</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="">Settings <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="">1</a></li>
                  <li><a href="">2</a></li>
                  <li><a href="">3</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>        
      </nav>
    )
  }
}

export default Navbar