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
<<<<<<< HEAD
        <ul class="list-group">
          <li class="list-group-item">Morbi leo risus</li>
          <li class="list-group-item">Porta ac consectetur ac</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
      )
=======
        <h3> {this.state.employee.Id} </h3>
      );
>>>>>>> 8089d7e0ba4f0b9c672997b836889c2dc512b503
    }
  };
      
  export default Adjust_Employee;