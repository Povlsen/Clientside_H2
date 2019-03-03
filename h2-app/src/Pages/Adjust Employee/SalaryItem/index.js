import React, { Component } from 'react'
import { getDateString } from '../../../Utils/helpers'
import './index.scss'

class SalaryItem extends Component {
constructor(props) {
    super(props)
    this.state = {
        salary: {
          employeeId: 0,
          from: '',
          to: '',
          salary: 0
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
        salary: {
          ...item,
          originalFrom: item.isAdd ? '' : getDateString(item.originalFrom),
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
      salary: {
        ...this.state.salary,
        [property]: value
      }
    })
  }

  render() {
    var item = this.state.salary
    const setAsEdit = () => {
        this.setState({
            ...this.state,
            edit: true
        })
    }

    const renderStatic = () => {
        return (
          <div className="salaryItem" onClick={setAsEdit}>
            <div>{item.from}</div>
            <div>{item.to}</div>
            <div>{item.salary}</div>
          </div>
        )
    }

    const renderPost = () => {
        if (this.state.edit) {
            return (
                <div className="edit salaryItem">
                  <input type='date' name='from' className="form-input" value={item.from} onChange={this.onChange} />
                  <input type='date' name='to' className="form-input" value={item.to} onChange={this.onChange} />
                  <input type='number' name='salary' className="form-input" value={item.salary} onChange={this.onChange} />
                  <button className="update-btn" onClick={onSave}>{item.isAdd ? 'Add' : 'Update'}</button>
                </div>
              )
        } else {
            return (
                <div className="edit salaryItem">
                  <button className="update-btn" onClick={setAsEdit}>New</button>
                </div>
            )
        }
    }

    const onSave = () => {
        this.props.postSalary(this.state.salary)
    }

    return (this.state.edit || this.state.salary.isAdd) ? renderPost() : renderStatic()
  }
}

export default SalaryItem