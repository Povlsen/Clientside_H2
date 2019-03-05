import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import notfound from '../../Pages/404'
import Employees from '../../Pages/Employees'
import Navbar from '../navbar'
import Departments from '../../Pages/Departments'
import Adjust_Employee from '../../Pages/Adjust Employee'
import Salary from '../../Pages/Salary'

class Main extends Component {
  render() {
    return ([
      <Route path='/' render={router => <Navbar {...router} />}/>,
      <main>
        <Switch>
          <Route exact path='/' component={this.props.Dashboard} />
          <Route exact path='/employees' render={router => <Employees {...router} notify={this.props.notify} />} />
          <Route exact path='/employees/:Id' render={router => <Adjust_Employee {...router} notify={this.props.notify} />}/>
          <Route exact path='/departments/:Id?' render={router => <Departments {...router} notify={this.props.notify} />} />
          <Route path='/salary' render={router => <Salary {...router} notify={this.props.notify} />} />
          <Route component={notfound} />} />
        </Switch>
      </main>
    ])
  }
}

export default Main