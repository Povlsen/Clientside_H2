import React, { Component } from 'react'
import { getEmployee, postEmployee, postEmployeeSalary, postEmployeeTitle } from '../../Utils/Employees'
import { postDepartmentEmployee, postDepartmentManager } from '../../Utils/Departments'
import List from '../../Components/List'
import SalaryItem from './SalaryItem'
import TitleItem from './TitleItem'
import DeptItem from './DeptItem'
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
      defaultTitleItem: {
        isAdd: true,
        employeeId: 0,
        from: getYesterday(),
        to: getYesterday(new Date(Date.MAX_DATE)),
        title: ''
      },
      deptManagers: [],
      departments: [],
      defaultDeptItem: {
        isAdd: true,
        employeeId: 0,
        departmentId: 0,
        from: getYesterday(),
        to: getYesterday(new Date(Date.MAX_DATE))
      }
    }

    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.renderLists = this.renderLists.bind(this)
    this.renderSalaries = this.renderSalaries.bind(this)
    this.renderTitles = this.renderTitles.bind(this)
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
          defaultTitleItem: {
            ...this.state.defaultTitleItem,
            employeeId: res.Id
          },
          deptManagers: res.deptManagers,
          departments: res.departments,
          defaultDeptItem: {
            ...this.state.defaultDeptItem,
            employeeId: res.Id
          }
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
        defaultTitleItem: {
          ...this.state.defaultTitleItem,
          employeeId: res.Id
        },
        defaultDeptItem: {
          ...this.state.defaultDeptItem,
          employeeId: res.Id
        }
      })
    }).catch(err => console.log(err)) //TODO: better error handeling
  }

  renderSalaries() {
    var items = [this.state.defaultSalaryItem].concat(this.state.salaries)

    const renderTitle = () => {
      return <div className="line" />
    }

    const postItem = (data) => {
      postEmployeeSalary(data).then(res => {
        this.setState({
          ...this.state,
          salaries: res
        })
      }).catch(err => console.log(err)) //TODO: better error handeling
    }

    const renderItem = (item, key) => {
      return <SalaryItem key={key} item={item} postItem={postItem}/>
    } 

    return (
      <div className="salaries">
        <List 
          renderTitle={() => <h2>Salaries</h2>}
          availableHeight={100}
          filListToWindowBottom
          renderListTitle={renderTitle}
          renderItem={renderItem}
          items={items}
        />
      </div>
    )
  }

  renderTitles() {
    var items = [this.state.defaultTitleItem].concat(this.state.titles)
    
    const renderTitle = () => {
      return <div className="line" />
    }

    const postItem = (data) => {
      postEmployeeTitle(data).then(res => {
        this.setState({
          ...this.state,
          titles: res
        })
      }).catch(err => console.log(err)) //TODO: better error handeling
    }

    const renderItem = (item, key) => {
      return <TitleItem key={key} item={item} postItem={postItem}/>
    } 

    return (
      <div className="titles">
        <List
          renderTitle={() => <h2>Titles</h2>}
          availableHeight={100}
          filListToWindowBottom
          renderListTitle={renderTitle}
          renderItem={renderItem}
          items={items}
        />
      </div>
    )
  }

  renderDepartments(listName) {
    var items = [this.state.defaultDeptItem].concat(this.state[listName])
    
    const renderTitle = () => {
      return <div className="line" />
    }

    const postItem = (data) => {
      const setRes = (res) => {
        this.setState({
          ...this.state,
          [listName]: res
        })
      }
      if (listName === 'departments')
        postDepartmentEmployee(data).then(setRes).catch(err => console.log(err)) //TODO: better error handeling
      else
        postDepartmentManager(data).then(setRes).catch(err => console.log(err)) //TODO: better error handeling
    }

    const renderItem = (item, key) => {
      return <DeptItem key={key} item={item} postItem={postItem}/>
    } 

    return (
      <div className="departments">
        <List
          renderTitle={() => <h2>{listName === 'departments' ? 'In department' : 'Manager at'}</h2>}
          availableHeight={100}
          filListToWindowBottom
          renderListTitle={renderTitle}
          renderItem={renderItem}
          items={items}
        />
      </div>
    )
  }

  renderLists() {
    if (!(this.state.employee.Id > 0)) return

    return (
      <div className="lists">
        {this.renderSalaries()}
        {this.renderTitles()}
        {this.renderDepartments('departments')}
        {this.renderDepartments('deptManagers')}
      </div>
    )
  }

    render() {
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
          {this.renderLists()}
        </div>
      )
    }
  }
      
  export default Adjust_Employee