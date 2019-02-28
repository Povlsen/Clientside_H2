import React, { Component } from 'react'
import { getDateString } from '../../../Utils/helpers'
import './index.scss'

class Item extends Component {
  state = {
    employee: {
      Id: 0,
      birthDate: null,
      firstName: "",
      lastName: "",
      gender: "",
      hireDate: null
    }
  }

  componentDidMount() {
    var item = this.props.item
    this.setState({
      employee: {
        Id: item.Id,
        birthDate: getDateString(item.birthDate),
        hireDate: getDateString(item.hireDate),
        firstName: item.firstName,
        lastName: item.lastName,
        gender: item.gender
      }
    })
  }


  render() {
    var item = this.state.employee
    return (
      <div className="EmployeeItem">
        <div>{item.Id}</div>
        <div>{item.firstName}</div>
        <div>{item.lastName}</div>
        <div>{item.birthDate}</div>
        <div>{item.gender}</div>
        <div>{item.hireDate}</div>
      </div>
    )
  }
}

export default Item