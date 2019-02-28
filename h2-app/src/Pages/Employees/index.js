import React, { Component } from 'react'
import ReactList from 'react-list'
import Item from './listItem'
import { getEmployees } from '../../Utils/Employees'
import './index.css';

class Employees extends Component {
  state = {
    employees: []
  };

  componentDidMount() {
    getEmployees().then(res => 
        this.setState({ employees: [res[0]] })
    ).catch(err => console.log(err)); //TODO: better error handeling
  }


  render() {
    return (
      <div className="Employees">
        <h1>Employees</h1>
        <div style={{overflow: 'auto', maxHeight: 400}}>
          <ReactList
            itemRenderer={Item}
            length={this.state.employees.length}
            type='uniform'
          />
        </div>
      </div>
    );
  }
}

export default Employees;