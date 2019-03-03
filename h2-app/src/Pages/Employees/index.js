import React, { Component } from 'react'
import List from '../../Components/List'
import EmployeeItem from './EmployeeItem'
import { getEmployees } from '../../Utils/Employees'
import './index.scss'

class Employees extends Component {

  render() {
    const renderListTitle = () => {
      return (
        <div className="EmployeeItem">
          <div className="list_item_id">#</div>
          <div>Firstname</div>
          <div>Lastname</div>
          <div>Birth</div>
          <div>Gender</div>
          <div className="list_item_hire">Hire</div>
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
        />
      </div>
    )
  }
}

export default Employees