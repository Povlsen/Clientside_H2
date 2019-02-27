import React, { Component } from 'react';


class Navbar extends Component {
  render() {
    return (
        <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand">Bordfodbold Oversigt</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li class="active"><a>Denne uge</a></li>
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">Forrige uger <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="">Uge 2</a></li>
            <li><a href="">Uge 3</a></li>
          </ul>
        </li>
        <li><a href="">Samlet Scoreboard</a></li>
        <li><a href="">Regljusteringer</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><a href=""><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
        <li><a href=""><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
      </ul>
    </div>
  </div>
</nav>
    );
  }
}

export default Navbar;