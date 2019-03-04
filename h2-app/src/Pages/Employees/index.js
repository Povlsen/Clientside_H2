import React, { Component } from 'react'
import List from '../../Components/List'
import EmployeeItem from './EmployeeItem'
import { getEmployees } from '../../Utils/Employees'
import './index.scss'
import { bool } from 'prop-types';

class Employees extends Component {
  constructor(props){
    super(props)
    this.state = {
      sort: {
        coloumn: 0,
        ascDesc: true
      }
    }
  }
  render() {
    const renderListTitle = () => {
      const sort = (id) => {
        let sort = true
        if (id === this.state.sort.coloumn) {
          sort = !this.state.sort.ascDesc
        }
        this.setState({
          sort: {
            coloumn: id,
            ascDesc: sort
          }
        }, () => {console.log(this.state.sort.ascDesc, this.state.sort.coloumn)})
      }

      const toggleArr = (id) => {
        if (id === this.state.sort.coloumn){
          if(this.state.sort.ascDesc){
            return "▼";
          } else {
            return "▲";
          }
        }
        return
      }
      return (
        <div className="EmployeeItem">
          <div className="list_item_id" onClick={() => sort(0)}># {toggleArr(0)}</div>
          <div onClick={() => sort(1)}>Firstname {toggleArr(1)}</div>
          <div onClick={() => sort(2)}>Lastname {toggleArr(2)}</div>
          <div onClick={() => sort(3)}>Birth {toggleArr(3)}</div>
          <div onClick={() => sort(4)}>Gender {toggleArr(4)}</div>
          <div className="list_item_hire" onClick={() => sort(5)}>Hire {toggleArr(5)}</div>
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