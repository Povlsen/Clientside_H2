import React, { Component } from 'react';
import './index.scss';
import { getEmployee, postEmployee } from '../../Utils/Employees';


class Adjust_Employee extends Component {
  state = {
    employee: {}
  }

  componentDidMount() {
    getEmployee(this.props.match.params.Id).then(res => {
      this.setState({ employee: res })
    }).catch(err => console.log(err)) //TODO: better error handeling
  }

    render() {
      return (
        <h3> {this.state.employee.Id} </h3>
      );
    }
  };
      
  export default Adjust_Employee;