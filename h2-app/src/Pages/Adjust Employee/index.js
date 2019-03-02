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

  /*{postEmployee(
    this.state.employee.id,
    document.getElementById("birthdateInput").value, 
    document.getElementById("firstnameInput").value, 
    document.getElementById("lastnameInput").value, 
    document.getElementById("genderInput").value, 
    new Date())}*/

    render() {
      return (
        <form>
          <div class="form-group">
            <label for="firstname">Firstname</label>
            <input type="text" class="form-input" id="firstnameInput" placeholder="" defaultValue={this.state.employee.firstName}/>
          </div>
          <div class="form-group">
            <label for="lastname">Lastname</label>
            <input type="text" class="form-input" id="lastnameInput" placeholder="" defaultValue={this.state.employee.lastName}/>
          </div>
          <div class="form-group">
            <label for="birthdate">Birthdate</label>
            <input type="date" class="form-input" id="birthdateInput" placeholder="" defaultValue={this.state.employee.birthDate}/>
          </div>
          <div class="form-group">
            <label for="gender">Gender</label>
            <input type="text" class="form-input" id="genderInput" placeholder="" defaultValue={this.state.employee.gender} />
          </div>
          <div class="form-group">
            <input type="submit" class="form-input" value="Save" />
          </div>
        </form>
      );
    }
  };
      
  export default Adjust_Employee;