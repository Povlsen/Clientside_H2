import React, { Component } from 'react'
import ReactList from 'react-list'
import Item from './listItem'
import { getEmployees } from '../../Utils/Employees'
import './index.scss'

class Employees extends Component {
  state = {
    employees: []
  };

  componentDidMount() {
    getEmployees().then(res => {
      this.setState({ employees: res })
    }).catch(err => console.log(err)) //TODO: better error handeling
  }


  render() {
    return (
      <div className="Employees">
        <h1>Employees</h1>
        <div className="list">
          <ReactList
            itemRenderer={(index, key) => { return <Item item={this.state.employees[index]} key={key} /> }}
            length={this.state.employees.length}
            type='uniform'
          />
        </div>
      </div>
    );
  }
}

export default Employees