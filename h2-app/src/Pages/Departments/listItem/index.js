import React, { Component } from 'react'
import './index.scss'

class Item extends Component {
  state = {
    department: {
      Id: 0,
      name: null
    }
  }

  componentDidMount() {
    var item = this.props.item
    this.setState({
      department: {
        Id: item.Id,
        name: item.name
      }
    })
  }


  render() {
    var item = this.state.department
    return (
        <div className="menu-item" onClick={this.props.onClick.bind(this, item.Id)}>
            <div className="menu_item_name">{item.name}</div>
        </div>
    )
  }
}

export default Item