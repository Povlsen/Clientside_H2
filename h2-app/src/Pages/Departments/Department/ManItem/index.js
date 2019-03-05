import React, { Component } from 'react'
import './index.scss'

class ManItem extends Component {
constructor(props) {
    super(props)
    this.state = {
      item: {
          employeeId: 0,
          departmentId: 0,
          from: '',
          to: '',
          firstName: '',
          lastName: '',
          gender: '',
          birthDate: '',
          hireDate: ''
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
        item: { ...item }
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
          <div className="deptManItem" onClick={setAsEdit}>
            <div className="title">From</div>
            <div>{item.from}</div>
            <div className="title">To</div>
            <div>{item.to}</div>
            <div className="title">Firstname</div>
            <div>{item.firstName}</div>
            <div className="title">Lastname</div>
            <div>{item.lastName}</div>
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
      return (
        <div className="edit deptManItem">
          <div className="title">From</div>
          <input type='date' name='from' className="form-input" value={item.from} onChange={this.onChange} />
          <div className="title">To</div>
          <input type='date' name='to' className="form-input" value={item.to} onChange={this.onChange} />
          <div className="title">Firstname </div>
          <div>{item.firstName}</div>
          <div className="title">Lastname </div>
          <div>{item.lastName}</div>
          <div className="update-btn-group">
            <button className="main-theam-bth" onClick={onSave}>Update</button>
            <button className="main-theam-bth" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      )
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

    return this.state.edit ? renderPost() : renderStatic()
  }
}

export default ManItem