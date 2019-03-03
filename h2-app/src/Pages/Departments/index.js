import React, { Component } from 'react'
import ReactList from 'react-list'
import Item from './listItem'
import { getDepartments } from '../../Utils/Departments'
import './index.scss'
import DepartmentData from './departmentData'

class Departments extends Component {
  state = {
    departments: [],
    availableHeight: 650
  }

  componentDidMount() {
    getDepartments({ limit: 100 }).then(res => {
      this.setState({ ...this.state, departments: res })
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
    var height = (window.innerHeight - document.getElementById('depTitle').getBoundingClientRect().bottom)
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
      var depCount = this.state.departments.length

      if (((depCount * 39) - (top+this.state.availableHeight)) === 0) {
        var lastId = this.state.departments[depCount-1].Id        
        getDepartments({ limit: 100, lastId: lastId, seach: this.state.seach }).then(res => {
          this.setState({ 
            ...this.state, 
            departments: this.state.departments.concat(res)
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
      getDepartments({ limit: 100, seach: this.state.seach }).then(res => {
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
       
        <div id="depTitle" className="listTitle">
          
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

          <DepartmentData></DepartmentData>
      {/*    
        <button type="button" class="btn btn-default">
          <span class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
        </button>
      */}
      </div>
    )
  }
}

export default Departments