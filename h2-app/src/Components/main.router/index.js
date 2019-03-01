import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Employees from '../../Pages/Employees';
import Departments from '../../Pages/Departments';
import Adjust_Employee from '../../Pages/Adjust Employee';

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={this.props.Dashboard}/>
          <Route exact path='/employees' render={router => <Employees {...router} />} />
          <Route path='/employees/:Id' component={Adjust_Employee}/>
          <Route path='/departments' render={router =><Departments {...router} />} />
        </Switch>
      </main>
    )
  }
}

export default Main