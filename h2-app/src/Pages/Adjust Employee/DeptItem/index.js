import React, { Component } from 'react'
import { getDateString } from '../../../Utils/helpers'
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
        edit: false
    }

    this.onChange = this.onChange.bind(this)
    this.updateItem = this.updateItem.bind(this)
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
          from: getDateString(item.from),
          to: getDateString(item.to)
        }
      })
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
            <div>{item.from}</div>
            <div>{item.to}</div>
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

    const renderPost = () => {
        if (this.state.edit) {
            return (
                <div className="edit deptItem">
                  <input type='date' name='from' className="form-input" value={item.from} onChange={this.onChange} />
                  <input type='date' name='to' className="form-input" value={item.to} onChange={this.onChange} />
                  {this.state.item.isAdd ? 
                    (<input type='number' name='departmentId' className="form-input" value={item.departmentId} onChange={this.onChange} />) 
                    : (<div>{item.name}</div>)}
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
    }

    return (this.state.edit || this.state.item.isAdd) ? renderPost() : renderStatic()
  }
}

export default DeptItem