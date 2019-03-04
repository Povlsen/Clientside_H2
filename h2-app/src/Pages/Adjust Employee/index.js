import React, { Component } from 'react'
import { getEmployee, postEmployee, postEmployeeSalary, postEmployeeTitle } from '../../Utils/Employees'
import { postDepartmentEmployee, postDepartmentManager } from '../../Utils/Departments'
import List from '../../Components/List'
import SalaryItem from './SalaryItem'
import TitleItem from './TitleItem'
import DeptItem from './DeptItem'
import { Line } from "react-chartjs-2"
import { MDBContainer } from "mdbreact"
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
        hireDate: Date.CURRENT,
        gender: 'M'
      },
      salaries: [],
      defaultSalaryItem: {
        isAdd: true,
        employeeId: 0,
        from: Date.CURRENT,
        to: Date.MAX_DATE,
        salary: 0
      },
      titles: [],
      defaultTitleItem: {
        isAdd: true,
        employeeId: 0,
        from: Date.CURRENT,
        to: Date.MAX_DATE,
        title: ''
      },
      deptManagers: [],
      departments: [],
      defaultDeptItem: {
        isAdd: true,
        employeeId: 0,
        departmentId: 0,
        from: Date.CURRENT,
        to: Date.MAX_DATE
      },
      mobileActiveList: 0
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
            ...res,
            birthDate: res.birthDate,
            hireDate: res.hireDate
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
      if (data.Id === 0) this.props.history.push(`/employees/${res.Id}`)
      this.setState({
        employee: {
          ...this.state.employee,
          ...res,
          birthDate: res.birthDate,
          hireDate: res.hireDate
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

  /*-------------------------SALARY CHART -------------------------------*/

renderSalariesChart() {
  let salaries = Array.from(this.state.salaries)
  if (salaries.length <= 1) return
  
  salaries.reverse()
  let labels = salaries.map(sal => { return sal.from })
  let values = salaries.map(sal => { return sal.salary })

  let dataLine = {
    labels: labels,
    datasets: [
      {
        label: "Salary", 
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(22,188,185,0.4)",
        borderColor: "rgba(22,188,185,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(22,188,185,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(22,188,185,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: values
      }
    ]
    
  }

    return (
      <div className="salary-chart">
      <MDBContainer>
        <Line id="salaryChart" data={dataLine} options={{ responsive: true }} />
      </MDBContainer>
      </div>
    )
  }


  /*----------------------------------------------------------------------*/
  renderSalaries() {
    var items = [this.state.defaultSalaryItem].concat(this.state.salaries)
    var activeClass = this.state.mobileActiveList === '1' ? 'active ' : ''

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
      <div className={activeClass + "salaries"}>
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
    var activeClass = this.state.mobileActiveList === '2' ? 'active ' : ''
    
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
      <div className={activeClass + "titles"}>
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
    var activeClass = ''
    if ((this.state.mobileActiveList === '3' && listName === 'departments') || (this.state.mobileActiveList === '4' && listName === 'deptManagers'))  activeClass = 'active '

    const renderTitle = () => {
      return <div className="line" />
    }

    const postItem = (data) => {
      data.isFromEmployee = true
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
      return <DeptItem key={key} item={item} postItem={postItem} type={listName === 'deptManagers' ? 'manage' : ''} />
    } 

    return (
      <div className={activeClass + "departments"}>
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
    if (this.state.employee.Id <= 0) return
    var activeList = this.state.mobileActiveList

    const setMobileActive = (e) => {
      let value = e.target.value
      this.setState({
        ...this.state,
        mobileActiveList: activeList === value ? 0 : value
      })
    }

    return (
      <div className="lists">
        <div className="mobile-list">
          <button className={(activeList === '1' ? 'active ' : '') + "main-theam-bth"} value="1" onClick={setMobileActive}>Salaries</button>
          <button className={(activeList === '2' ? 'active ' : '') + "main-theam-bth"} value="2" onClick={setMobileActive}>Titles</button>
          <button className={(activeList === '3' ? 'active ' : '') + "main-theam-bth"} value="3" onClick={setMobileActive}>Departments</button>
          <button className={(activeList === '4' ? 'active ' : '') + "main-theam-bth"} value="4" onClick={setMobileActive}>Manager</button>
        </div>
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
        <div className="form-chart-holder">
          <form className="main-modify-form">
              <label htmlFor="firstname" className="col-form-label">Firstname</label>
              <input id="firstname" type="text" className="form-input" id="firstnameInput" name="firstName" onChange={this.onChange} onBlur={this.onBlur} defaultValue={this.state.employee.firstName}/>
              <label htmlFor="lastname" className="col-form-label">Lastname</label>
              <input id="lastname" type="text" className="form-input" id="lastnameInput" name="lastName" onChange={this.onChange} onBlur={this.onBlur} defaultValue={this.state.employee.lastName}/>
              <label htmlFor="birthdate" className="col-form-label">Birthdate</label>
              <input id="birthdate" type="date" className="form-input" id="birthdateInput" name="birthDate" onChange={this.onChange} onBlur={this.onBlur} value={this.state.employee.birthDate}/>
              <fieldset className="form-group">
                <label className="col-form-label gender">Gender</label>
                  <div className="gender-holder">
                    <input className="form-check-input gender" type="radio" name="gender" id="maleGender" value="M" onChange={this.onChange} onBlur={this.onBlur} checked={this.state.employee.gender === 'M'} />
                    <label className="gender-type-label">Male</label>
                  </div>
                  <div className="gender-holder">
                    <input className="form-check-input gender" type="radio" name="gender" id="femaleGender" value="F" onChange={this.onChange} onBlur={this.onBlur} checked={this.state.employee.gender === 'F'} />
                    <label className="gender-type-label">Female</label>
                  </div>
              </fieldset>
              <label htmlFor="hiredate" className="col-form-label">Hiredate</label>
              <input id="hiredate" type="date" className="form-input" onChange={this.onChange} onBlur={this.onBlur} value={this.state.employee.hireDate}/>
          </form>
          
          {this.renderSalariesChart()}
          </div>
          {this.renderLists()}
        </div>
      )
    }
  }
      
  export default Adjust_Employee