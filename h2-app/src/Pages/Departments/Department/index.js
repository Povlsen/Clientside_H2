import React, { Component } from 'react'
import ManItem from './ManItem'
import List from '../../../Components/List'
import { getDepartment } from '../../../Utils/Departments'
import { postDepartmentManager, postDepartment } from '../../../Utils/Departments'
import './index.scss'

class Department extends Component {
  constructor(props) {
    super(props)
    this.state = {
      department: {
        Id: undefined,
        name: ''
      },
      managers: []
    }

    this.onBlur = this.onBlur.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps(next) {
    if (next.Id === undefined) {
      this.setState({
        department: {
          ...this.state.department,
          Id: next.Id
        }
      })
    } else if (typeof next.Id === 'string' && this.state.department.Id !== next.Id) {
      getDepartment(next.Id).then(res => {
        this.setState({
          department: {
            ...this.state.department,
            Id: res.Id,
            name: res.name
          },
          managers: res.managers
        })
      }).catch(() => this.props.notify('error'))
    }
  }

  onChange(e) {
    var value = e.target.value
    var property = e.target.name

    this.setState({
      ...this.state,
      department: {
        ...this.state.department,
        [property]: value
      }
    })
  }

  onBlur() {
    let data = this.state.department
    postDepartment(data).then(res => {
      this.setState({
        department: {
          ...this.state.department,
          Id: res.Id,
          name: res.name
        }
      }, () => {
        if (data.Id !== res.Id) this.props.newId(res.Id)
        this.props.notify('success')
      })
    }).catch(() => this.props.notify('error'))
  }

  renderManagers() {
    var items = this.state.managers
    var activeClass = this.state.mobileActiveList === '1' ? 'active ' : ''

    const renderTitle = () => {
      return <div className="line" />
    }

    const postItem = (data) => {
      data.isFromDepartment = true
      postDepartmentManager(data).then(res => {
        this.setState({
          ...this.state,
          managers: res
        }, () => this.props.notify('success'))
      }).catch(() => this.props.notify('error')) //TODO: better error handeling
    }

    const renderItem = (item, key) => {
      return <ManItem key={key} item={item} postItem={postItem}/>
    } 

    return (
      <div className={activeClass + "managers"}>
        <List 
          renderTitle={() => <h2>Managers</h2>}
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
    if (this.state.department.Id === undefined) return

    return (
      <div className="lists">
        {this.renderManagers()}
      </div>
    )
  }

  render() {
    return (
      <div className="department">
        <input type='text' placeholder='Dapartment name' name="name" value={this.state.department.name} onChange={this.onChange} onBlur={this.onBlur} />
        {this.renderLists()}
      </div>
    )
  }
}

export default Department