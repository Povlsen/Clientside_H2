import React, { Component } from 'react'
import List from '../../Components/List'
import EmployeeItem from './EmployeeItem'
import { getEmployees } from '../../Utils/Employees'
import './index.scss'

class Employees extends Component {
  constructor(props){
    super(props)
    this.state = {
      sort: {
        column: 'Id',
        ascDesc: true
      }
    }
  }
  render() {
    const renderListTitle = () => {
      const sort = (column) => {
        let sort = true
        if (column === this.state.sort.column) {
          sort = !this.state.sort.ascDesc
        }
        this.setState({
          sort: {
            column: column,
            ascDesc: sort
          }
        })
      }

      const toggleArr = (column) => {
        if (column !== this.state.sort.column) return
        if (this.state.sort.ascDesc) return "▲"
        else return "▼"
      }
      return (
        <div className="EmployeeItem">
          <div className="list_item_id" onClick={() => sort('Id')}># {toggleArr('Id')}</div>
          <div onClick={() => sort('firstName')}>Firstname {toggleArr('firstName')}</div>
          <div onClick={() => sort('lastName')}>Lastname {toggleArr('lastName')}</div>
          <div onClick={() => sort('birthDate')}>Birth {toggleArr('birthDate')}</div>
          <div onClick={() => sort('gender')}>Gender {toggleArr('gender')}</div>
          <div className="list_item_hire" onClick={() => sort('hireDate')}>Hire {toggleArr('hireDate')}</div>
        </div>
      )
    }

    const renderItem = (item, key) => {
      return <EmployeeItem 
        onClick={(Id) => this.props.history.push(`/employees/${Id}`)}
        item={item}
        key={key}
        />
    }
    return (
      <div className="employees">
        <List 
          renderTitle={() => <h1>Employees</h1>}
          autoLoad
          seach
          availableHeight={650}
          initialItemHeight={39}
          maxListSize={120}
          loadCount={100}
          filListToWindowBottom
          renderListTitle={renderListTitle}
          renderItem={renderItem}
          getItems={getEmployees}
          sortFilter={this.state.sort}
          notify={this.props.notify}
        />
      </div>
    )
  }
}

export default Employees