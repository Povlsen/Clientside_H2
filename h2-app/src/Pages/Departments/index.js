import React, { Component } from 'react'
import ReactList from 'react-list'
import Item from './listItem'
import { getDepartments } from '../../Utils/Departments'
import './index.scss'
import DepartmentData from './departmentData'

class Departments extends Component {
  state = {
    departments: []
  }

  componentDidMount() {
    getDepartments().then(res => {
      this.setState({ ...this.state, departments: res })
    }).catch(err => console.log(err)) //TODO: better error handeling
  }


  render() {
    const textChanged = (e) => {
      this.setState({
        ...this.state,
        seach: e.target.value
      }, () => seach())
    }


    const seach = () => {
      getDepartments(this.state.seach).then(res => {
        this.setState({ 
          ...this.state, 
          departments: res
        })
      }).catch(err => console.log(err)) //TODO: better error handeling
    }

    return (
      <div className="Departments">
        <h1>Departments</h1>
        <input type="text" className="seachBox" placeholder="Seach" onChange={textChanged} onBlur={seach} />
        <div className="listTitle">      
        </div>
          <div className="menu">
            <ReactList
              itemRenderer={(index, key) => { return <Item 
                onClick={(Id) => this.props.history.push(`/departments/${Id}`)}
                item={this.state.departments[index]} 
                key={key}
                /> 
              }}
              length={this.state.departments.length}
              type='simple'
            />
          </div>
          <DepartmentData />
      </div>
    )
  }
}

export default Departments