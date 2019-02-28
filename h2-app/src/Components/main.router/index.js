import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Employees from '../../Pages/Employees';

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={this.props.Dashboard}/>
          <Route exact path='/employees' render={router => <Employees {...router} />} />
          <Route path='/employees/:Id' component={Employees}/>
        </Switch>
      </main>
    )
  }
}

export default Main