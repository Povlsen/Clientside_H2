import React, { Component } from 'react';
import './index.css';

class Item extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    console.log('item props', this.props)
  }


  render() {
    return (
      <div className="EmployeeItem">
        <p>mikkel</p>
      </div>
    );
  }
}

export default Item;