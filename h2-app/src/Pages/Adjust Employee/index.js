import React, { Component } from 'react'
import { getEmployee, postEmployee, postEmployeeSalary, postEmployeeTitle } from '../../Utils/Employees'
import { postDepartmentEmployee, postDepartmentManager } from '../../Utils/Departments'
import List from '../../Components/List'
import SalaryItem from './SalaryItem'
import { getDateString, getYesterday } from '../../Utils/helpers'
import './index.scss'

class Adjust_Employee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employee: {
        Id: 0,
        firstName: '',
        lastName: '',
        birthDate: Date.MIN_DATE,
        hireDate: getDateString(getYesterday()),
        gender: 'M'
      },
      salaries: [],
      defaultSalaryItem: {
        isAdd: true,
        employeeId: 0,
        from: getYesterday(),
        to: getYesterday(new Date(Date.MAX_DATE)),
        salary: 0
      },
      titles: [],
      deptManagers: []
    }

    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.postSalary = this.postSalary.bind(this)
    this.renderSalaryItem = this.renderSalaryItem.bind(this)
  }

  componentDidMount() {
    var id = this.props.match.params.Id
    if (id > 0) {
      getEmployee(id).then(res => {
        this.setState({
          ...this.state, 
          employee: {
            ...this.state.employee,
            Id: res.Id,
            firstName: res.firstName,
            lastName: res.lastName,
            gender: res.gender,
            birthDate: getDateString(res.birthDate),
            hireDate: getDateString(res.hireDate)
          },
          salaries: res.salaries,
          defaultSalaryItem: {
            ...this.state.defaultSalaryItem,
            employeeId: res.Id
          },
          titles: res.titles,
          deptManagers: res.deptManagers
        })
      }).catch(err => console.log(err)) //TODO: better error handeling
    }
  }

  onChange(e) {
    var value = e.target.value
    var property = e.target.name

    this.setState({
      ...this.state,
      employee: {
        ...this.state.employee,
        [property]: value
      }
    })
  }

  onBlur() {
    let data = this.state.employee
    postEmployee(data).then(res => {
      this.setState({
        ...this.state,
        employee: {
          ...this.state.employee,
          ...res,
          birthDate: getDateString(res.birthDate),
          hireDate: getDateString(res.hireDate)
        },
        defaultSalaryItem: {
          ...this.state.defaultSalaryItem,
          employeeId: res.Id
        },
      })
    }).catch(err => console.log(err)) //TODO: better error handeling
  }

  renderSalariesListTitle() {
    return (
      <div className="salaryItem">
        <div>From</div>
        <div>To</div>
        <div>Salary</div>
      </div>
    )
  }

  renderSalaryItem(item, key) {
    return <SalaryItem key={key} item={item} postSalary={this.postSalary}/>
  }

  postSalary(data) {
    postEmployeeSalary(data).then(res => {
      this.setState({
        ...this.state,
        salaries: res
      })
    }).catch(err => console.log(err)) //TODO: better error handeling
  }

    render() {
      var items = [this.state.defaultSalaryItem].concat(this.state.salaries)
      return (
        <div className="postEmployee">
          <form>
            <div className="form-group row">
              <label htmlFor="firstname" className="col-sm-1 col-form-label">Firstname</label>
              <input id="firstname" type="text" className="form-input" id="firstnameInput" name="firstName" onChange={this.onChange} onBlur={this.onBlur} defaultValue={this.state.employee.firstName}/>
            </div>
            <div className="form-group row">
              <label htmlFor="lastname" className="col-sm-1 col-form-label">Lastname</label>
              <input id="lastname" type="text" className="form-input" id="lastnameInput" name="lastName" onChange={this.onChange} onBlur={this.onBlur} defaultValue={this.state.employee.lastName}/>
            </div>
            <div className="form-group row">
              <label htmlFor="birthdate" className="col-sm-1 col-form-label">Birthdate</label>
              <input id="birthdate" type="date" className="form-input" id="birthdateInput" name="birthDate" onChange={this.onChange} onBlur={this.onBlur} value={this.state.employee.birthDate}/>
            </div>
            <fieldset className="form-group">
              <div className="row">
                <legend className="col-form-label col-sm-1">Gender</legend>
                <div className="col-sm-10">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="gender" id="maleGender" value="M" onChange={this.onChange} onBlur={this.onBlur} checked={this.state.employee.gender === 'M'} />
                    <label className="form-check-label" htmlFor="maleGender">Male</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="gender" id="femaleGender" value="F" onChange={this.onChange} onBlur={this.onBlur} checked={this.state.employee.gender === 'F'} />
                    <label className="form-check-label" htmlFor="femaleGender">Female</label>
                  </div>
                </div>
              </div>
            </fieldset>
            <div className="form-group row">
              <label htmlFor="hiredate" className="col-sm-1 col-form-label">Hiredate</label>
              <input id="hiredate" type="date" className="form-input" onChange={this.onChange} onBlur={this.onBlur} value={this.state.employee.hireDate}/>
            </div>
          </form>
          {this.state.employee.Id > 0 && <div className="salaries">
            <List 
              renderTitle={() => <h2>Salaries</h2>}
              availableHeight={100}
              filListToWindowBottom
              renderListTitle={this.renderSalariesListTitle}
              renderItem={this.renderSalaryItem}
              items={items}
            />
          </div>}
        </div>
      )
    }
  }
      
  export default Adjust_Employee