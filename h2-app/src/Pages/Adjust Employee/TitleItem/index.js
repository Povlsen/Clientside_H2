import React, { Component } from 'react'
import './index.scss'

class TitleItem extends Component {
constructor(props) {
    super(props)
    this.state = {
      item: {
          employeeId: 0,
          from: '',
          to: '',
          title: ''
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
          originalFrom: item.isAdd ? '' : item.originalFrom,
          originalTitle: item.isAdd ? '' : item.originalTitle,
          from: item.from,
          to: item.to
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
          <div className="titleItem" onClick={setAsEdit}>
            <div className="title">From</div>
            <div>{item.from}</div>
            <div className="title">To</div>
            <div>{item.to}</div>
            <div className="title">Title</div>
            <div>{item.title}</div>
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
                <div className="edit titleItem">
                  <div className="title">From</div>
                  <input type='date' name='from' className="form-input" value={item.from} onChange={this.onChange} />
                  <div className="title">To</div>
                  <input type='date' name='to' className="form-input" value={item.to} onChange={this.onChange} />
                  <div className="title">Title</div>
                  <input type='text' name='title' className="form-input" value={item.title} onChange={this.onChange} />
                  <div className="update-btn-group">
                    <button className="main-theam-bth" onClick={onSave}>{item.isAdd ? 'Add' : 'Update'}</button>
                    <button className="main-theam-bth" onClick={onCancel}>Cancel</button>
                  </div>
                </div>
              )
        } else {
            return (
                <div className="edit titleItem">
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

export default TitleItem