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
    getEmployees({ limit: 1000 }).then(res => {
      this.setState({ employees: res })
    }).catch(err => console.log(err)) //TODO: better error handeling

    console.log(this.props)
  }


  render() {
    return (
      <div className="Employees">
        <h1>Employees</h1>
        <div className="list">
          <ReactList
            itemRenderer={(index, key) => { return <Item 
              onClick={(Id) => this.props.history.push(`/employees/${Id}`)}
              item={this.state.employees[index]} 
              key={key}
              /> 
            }}
            length={this.state.employees.length}
            type='simple'
          />
        </div>
      </div>
    );
  }
}

export default Employees