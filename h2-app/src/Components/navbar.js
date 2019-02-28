import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Navbar = () => (
        <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>                        
            </button>
            <a className="navbar-brand">Employees-App</a>
          </div>

          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
             <li><Link to='/'>Dashboard</Link></li>
             <li><Link to='/employees'>Employees</Link></li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown" href="#">Settings <span className="caret"></span></a>
                <ul className="dropdown-menu">
                  <li><a href="">1</a></li>
                  <li><a href="">2</a></li>
                  <li><a href="">3</a></li>
                </ul>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href=""><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
              <li><a href=""><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
            </ul>
          </div>
        </div>

        
      </nav>

      
    );

export default Navbar;