import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
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
          <Route exact path='/' component={this.props.Dashboard}/>
          <Route exact path='/employees' render={router => <Employees {...router} />} />
          <Route path='/employees/:Id' component={Adjust_Employee}/>
          <Route path='/departments' render={router =><Departments {...router} />} />
          <Route path='/salary' render={router =><Salary {...router} />} />
        </Switch>
      </main>
    ])
  }
}

export default Main