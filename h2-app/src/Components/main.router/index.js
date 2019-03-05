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
          <Route exact path='/' component={this.props.Dashboard}/>
          <Route exact path='/employees' render={router => <Employees {...router} />} />
          <Route exact path='/employees/:Id' component={Adjust_Employee}/>
          <Route exact path='/departments/:Id?' render={router => <Departments {...router} />} />
          <Route path='/salary' render={router =><Salary {...router} />} />
          <Route component={notfound} />} />
        </Switch>
      </main>
    ])
  }
}

export default Main