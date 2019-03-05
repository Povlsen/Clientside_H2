import React, { Component } from 'react'
import ReactList from 'react-list'
import Item from './listItem'
import { getDepartments } from '../../Utils/Departments'
import './index.scss'
import Department from './Department'

class Departments extends Component {
  state = {
    departments: []
  }

  componentDidMount() {
    getDepartments().then(res => {
      this.setState({ ...this.state, departments: res })
    }).catch(() => this.props.notify('error'))
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
          departments: []
        }, () => {
          this.setState({
            departments: res
          })
        })
      }).catch(() => this.props.notify('error'))
    }

    const changeSelectedDepartment = (Id) => {
      this.props.history.push(`/departments/${Id}`)
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
                onClick={changeSelectedDepartment}
                item={this.state.departments[index]} 
                key={key}
                /> 
              }}
              length={this.state.departments.length}
              type='simple'
            />
          </div>
          <Department Id={this.props.match.params.Id} notify={this.props.notify} newId={Id => {
              changeSelectedDepartment(Id)
              seach()              
            }} 
          />
      </div>
    )
  }
}

export default Departments