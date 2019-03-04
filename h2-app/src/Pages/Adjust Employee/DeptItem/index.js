import React, { Component } from 'react'
import { getEmployeeMissingDepts } from '../../../Utils/Employees'
import './index.scss'

class DeptItem extends Component {
constructor(props) {
    super(props)
    this.state = {
      item: {
          employeeId: 0,
          departmentId: 0,
          from: '',
          to: '',
          name: ''
        },
        edit: false,
        missingDepts: null
    }

    this.onChange = this.onChange.bind(this)
    this.updateItem = this.updateItem.bind(this)
    this.getMissingDepts = this.getMissingDepts.bind(this)
}

  componentDidMount() {
    this.updateItem(this.props.item)
  }

  componentWillReceiveProps(next) {
    this.updateItem(next.item)
    setTimeout(() => {
        this.setState({
            ...this.state,
            edit: false
        })
    }, 50)
  }

  updateItem(item) {
    this.setState({
        ...this.state,
        item: {
          ...item,
          from: item.from,
          to: item.to
        }
      })
  }

  getMissingDepts() {
    getEmployeeMissingDepts(this.state.item.employeeId, this.props.type).then(res => {
      this.setState({
        ...this.state,
        missingDepts: res
      })
    }).catch(err => console.log(err)) //TODO: better error handeling
  }

  onChange(e) {
    var value = e.target.value
    var property = e.target.name
    
    this.setState({
      ...this.state,
      item: {
        ...this.state.item,
        [property]: value
      }
    })
  }

  render() {
    var item = this.state.item
    const setAsEdit = () => {
        this.setState({
            ...this.state,
            edit: true
        })
    }

    const renderStatic = () => {
        return (
          <div className="deptItem" onClick={setAsEdit}>
            <div className="title">From</div>
            <div>{item.from}</div>
            <div className="title">To</div>
            <div>{item.to}</div>
            <div className="title">Department</div>
            <div>{item.name}</div>
          </div>
        )
    }

    const onCancel = () => {
      this.updateItem(this.props.item)
      this.setState({
        ...this.state,
        edit: false
      })
    }

    const renderDepartmentSelect = () => {
      var missing = this.state.missingDepts
      if (missing === null) {
        this.getMissingDepts()
        missing = []
      }

      return (
        <select value={this.state.item.departmentId} name='departmentId' onChange={this.onChange}>
          <option value=''>Select department</option>
          {missing.map((dept, key) => { return <option key={key} value={dept.Id}>{dept.name}</option> })}
        </select>
      )
    }

    const renderPost = () => {
        if (this.state.edit) {
            return (
                <div className="edit deptItem">
                  <div className="title">From</div>
                  <input type='date' name='from' className="form-input" value={item.from} onChange={this.onChange} />
                  <div className="title">To</div>
                  <input type='date' name='to' className="form-input" value={item.to} onChange={this.onChange} />
                  <div className="title">Department</div>
                  {this.state.item.isAdd ? renderDepartmentSelect() : <div>{item.name}</div>}
                  <div className="update-btn-group">
                    <button className="main-theam-bth" onClick={onSave}>{item.isAdd ? 'Add' : 'Update'}</button>
                    <button className="main-theam-bth" onClick={onCancel}>Cancel</button>
                  </div>
                </div>
              )
        } else {
            return (
                <div className="edit deptItem">
                  <button className="main-theam-bth new-btn" onClick={setAsEdit}>New</button>
                </div>
            )
        }
    }

    const onSave = () => {
        this.props.postItem(this.state.item)
        if (this.state.item.isAdd) {
          this.setState({
            ...this.state,
            missingDepts: null
          })
        }    
    }

    return (this.state.edit || this.state.item.isAdd) ? renderPost() : renderStatic()
  }
}

export default DeptItem