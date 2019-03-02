import React, { Component } from 'react'
import ReactList from 'react-list'
import Item from './listItem'
import { getEmployees } from '../../Utils/Employees'
import './index.scss'

class Employees extends Component {
  state = {
    employees: [],
    availableHeight: 650
  };

  componentDidMount() {
    getEmployees({ limit: 100 }).then(res => {
      this.setState({ ...this.state, employees: res })
    }).catch(err => console.log(err)) //TODO: better error handeling

    window.addEventListener('resize', this.setHeight.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeight)
  }

  componentDidUpdate() {
    this.setHeight()
  }

  setHeight() {
    var height = (window.innerHeight - document.getElementById('empTitle').getBoundingClientRect().bottom)
    if (this.state.availableHeight !== height) {
      this.setState({
        ...this.state,
        availableHeight: height
      })
    }
  }

  render() {
    const onScroll = (params) => {
      var top = params.target.scrollTop
      var empCount = this.state.employees.length

      if (((empCount * 39) - (top+this.state.availableHeight)) === 0) {
        var lastId = this.state.employees[empCount-1].Id        
        getEmployees({ limit: 100, lastId: lastId, seach: this.state.seach }).then(res => {
          this.setState({ 
            ...this.state, 
            employees: this.state.employees.concat(res)
          })
        }).catch(err => console.log(err)) //TODO: better error handeling
      }
    }

    const textChanged = (e) => {
      this.setState({
        ...this.state,
        seach: e.target.value
      }, () => seach())
    }


    const seach = () => {
      getEmployees({ limit: 100, seach: this.state.seach }).then(res => {
        this.setState({ 
          ...this.state, 
          employees: res
        })
      }).catch(err => console.log(err)) //TODO: better error handeling
    }

    return (
      <div className="Employees">
        <h1>Employees</h1>
        <input type="text" className="seachBox" placeholder="Seach" onChange={textChanged} onBlur={seach} />
        <div id="empTitle" className="listTitle">
          <div className="EmployeeItem">
            <div className="list_item_id">#</div>
            <div>Firstname</div>
            <div>Lastname</div>
            <div>Birth</div>
            <div>Gender</div>
            <div className="list_item_hire">Hire</div>
          </div>
        </div>
        <div className="list" style={{'height': this.state.availableHeight}} onScroll={onScroll}>
          <ReactList
            itemRenderer={(index, key) => { return <Item 
              onClick={(Id) => this.props.history.push(`/employees/${Id}`)}
              item={this.state.employees[index]} 
              key={key}
              /> 
            }}
            length={this.state.employees.length}
            type='simple'
          />
        </div>
        <button type="button" class="btn btn-default">
          <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
        </button>
      </div>
    );
  }
}

export default Employees