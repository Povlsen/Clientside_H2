import React, { Component } from 'react'
import { getDateString } from '../../../Utils/helpers'
import './index.scss'

class EmployeeItem extends Component {
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
      ...this.state,
      employee: {
        ...item,
        birthDate: getDateString(item.birthDate),
        hireDate: getDateString(item.hireDate)
      }
    })
  }


  render() {
    var item = this.state.employee
    return (
      <div className="EmployeeItem" onClick={this.props.onClick.bind(this, item.Id)}>
        <div className="list_item_id">{item.Id}</div>
        <div>{item.firstName}</div>
        <div>{item.lastName}</div>
        <div>{item.birthDate}</div>
        <div>{item.gender}</div>
        <div className="list_item_hire">{item.hireDate}</div>
      </div>
    )
  }
}

export default EmployeeItem

