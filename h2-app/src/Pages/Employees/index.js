import React, { Component } from 'react'
import ReactList from 'react-list'
import Item from './listItem'
import { getEmployees } from '../../Utils/Employees'
import './index.scss'

class Employees extends Component {
  constructor (props) {
    super(props)
    this.state = {
      employees: [],
      availableHeight: 650,
      filter: {
        limit: 100, 
        seach: null
      },
      listUpdated: false,
      listItemHeight: 39
    }

    this.listRef = React.createRef()
    this.listTitleRef = React.createRef() 
    this.setHeight = this.setHeight.bind(this)
    this.seach = this.seach.bind(this)
    this.updateEmployees = this.updateEmployees.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }

  componentDidMount() {
    this.seach()
    window.addEventListener('resize', this.setHeight.bind(this))
    document.addEventListener('navResize', this.setHeight.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeight.bind(this))
    document.removeEventListener('navResize', this.setHeight.bind(this))
  }

  componentDidUpdate() {
    this.setHeight()
  }

  setHeight() {
    try {
      var height = (window.innerHeight - this.listTitleRef.current.getBoundingClientRect().bottom)
      if (this.state.availableHeight !== height) {
        this.setState({
          ...this.state,
          availableHeight: height
        })
      }
    } catch {}

    try {
      var itemHeight = this.listRef.current.childNodes[0].childNodes[0].offsetHeight
      if (!isNaN(itemHeight)) {
        if (this.state.listItemHeight !== itemHeight) {
          this.setState({
            ...this.state,
            listItemHeight: itemHeight
          })
        }
      }
    } catch {}
  }

  updateEmployees(newList) {
    this.setState({
      ...this.state,
        employees: [],
        listUpdated: true
    })
    this.setState({
      ...this.state,
      employees: newList
    }, () => {
      setTimeout(() => {
        this.setState({
          ...this.state,
          listUpdated: false
        })
      }, 200)
    })
  }

  seach() {
    getEmployees(this.state.filter).then(res => {
      this.updateEmployees(res)
    }).catch(err => console.log(err)) //TODO: better error handeling
  }

  loadMore(isTop = false) {
    let empCount = this.state.employees.length
    let lastId = isTop ? this.state.employees[0].Id : this.state.employees[empCount-1].Id
    let ceepCount = 120
    var filter = this.state.filter
    filter.lastId = lastId
    filter.isTop = isTop

    getEmployees(filter).then(res => {
      if (res.length === 0) return
      var newList = []
      if (!isTop) {
        newList = this.state.employees.concat(res)
        if (newList.length > ceepCount) {
          newList.splice(0, newList.length - ceepCount)
        }        
      } else {
        newList = res.concat(this.state.employees)
        if (newList.length > ceepCount) {
          newList.length = ceepCount
        }
      }
      
      this.updateEmployees(newList)
    }).catch(err => console.log(err)) //TODO: better error handeling
  }

  render() {
    const onScroll = (params) => {
      if (this.state.listUpdated) {
        return
      }
      var top = params.target.scrollTop
      var empCount = this.state.employees.length
      if (((empCount * this.state.listItemHeight) - (top+this.state.availableHeight)) === 0) {
        //User scrolled to the bottom
        this.loadMore()
      } else if (top === 0) {
        //User scrolled to the top
        this.loadMore(true)
      }
    }

    const textChanged = (e) => {
      this.setState({
        ...this.state,
        seach: e.target.value
      }, () => this.seach())
    }

    return (
      <div className="Employees">
        <h1>Employees</h1>
        <input type="text" className="seachBox" placeholder="Seach" onChange={textChanged} onBlur={this.seach} />
        <div className="listTitle" ref={this.listTitleRef}>
          <div className="EmployeeItem">
            <div className="list_item_id">#</div>
            <div>Firstname</div>
            <div>Lastname</div>
            <div>Birth</div>
            <div>Gender</div>
            <div className="list_item_hire">Hire</div>
          </div>
        </div>
        <div className="list" style={{'height': this.state.availableHeight}} onScroll={onScroll} ref={this.listRef}>
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
      </div>
    );
  }
}

export default Employees