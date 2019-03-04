import React, { Component } from 'react'
import ReactList from 'react-list'
import './index.scss'

class List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      availableHeight: 0,
      filter: {
        limit: 1,
        seach: null
      },
      listUpdated: false,
      listItemHeight: 0,
      maxListSize: 0
    }

    this.listRef = React.createRef()
    this.listTitleRef = React.createRef() 
    this.setHeight = this.setHeight.bind(this)
    this.seach = this.seach.bind(this)
    this.updateItems = this.updateItems.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.updateFromProps = this.updateFromProps.bind(this)
  }

  componentDidMount() {
    this.updateFromProps(this.props)

    if (this.props.filListToWindowBottom) {
      window.addEventListener('resize', this.setHeight.bind(this))
      document.addEventListener('navResize', this.setHeight.bind(this))
    }
  }

  componentWillUnmount() {
    if (this.props.filListToWindowBottom) {
      window.removeEventListener('resize', this.setHeight.bind(this))
      document.removeEventListener('navResize', this.setHeight.bind(this))
    }
  }

  componentDidUpdate() {
    this.setHeight()
  }

  componentWillReceiveProps(next) {
    this.updateFromProps(next)
  }

  updateFromProps(props) {
      this.setState({
        ...this.state,
        availableHeight: props.initialListHeight,
        listItemHeight: !isNaN(props.initialItemHeight) ? props.initialItemHeight : 20,
        maxListSize: !isNaN(props.maxListSize) ? props.maxListSize : 120,
        filter: {
            ...this.state.filter,
            limit: !isNaN(props.loadCount) ? props.loadCount : 100
        }
    }, this.seach)
  }

  setHeight() {
    if (this.props.filListToWindowBottom) {
      try {
        var height = (window.innerHeight - this.listTitleRef.current.getBoundingClientRect().bottom)
        if (this.state.availableHeight !== height) {
            this.setState({
              ...this.state,
              availableHeight: height
            })
        }
      } catch {}
    }

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

  updateItems(newList) {
    this.setState({
      ...this.state,
        items: [],
        listUpdated: true
    })
    this.setState({
      ...this.state,
      items: newList
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
    if (this.props.autoLoad) {
      let filter = {
        ...this.state.filter,
        sort: this.props.sortFilter ? this.props.sortFilter : null
      }
      this.props.getItems(filter).then(res => {
        this.updateItems(res)
      }).catch(err => console.log(err)) //TODO: better error handeling
    } else {
      this.setState({
        ...this.state,
          items: this.props.items
      })
    }

  }

  loadMore(isTop = false) {
    let empCount = this.state.items.length
    let lastId = isTop ? this.state.items[0].Id : this.state.items[empCount-1].Id
    let ceepCount = this.state.maxListSize
    var filter = this.state.filter
    filter.lastId = lastId
    filter.isTop = isTop
    filter.sort = this.props.sortFilter ? this.props.sortFilter : null

    this.props.getItems(filter).then(res => {
      if (res.length === 0) return
      var newList = []
      if (!isTop) {
        newList = this.state.items.concat(res)
        if (newList.length > ceepCount) {
          newList.splice(0, newList.length - ceepCount)
        }        
      } else {
        newList = res.concat(this.state.items)
        if (newList.length > ceepCount) {
          newList.length = ceepCount
        }
      }
      
      this.updateItems(newList)
    }).catch(err => console.log(err)) //TODO: better error handeling
  }

  render() {
    const onScroll = (params) => {
      if (this.props.autoLoad !== true || this.state.listUpdated) return
      
      var top = params.target.scrollTop
      var itemCount = this.state.items.length
      if (((itemCount * this.state.listItemHeight) - (top+this.state.availableHeight)) === 0) {
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
        filter: {
            ...this.state.filter,
            seach: e.target.value
        }
      }, () => this.seach())
    }

    return (
      <div className="list">
        {this.props.renderTitle()}
        {this.props.seach === true && <input type="text" className="seachBox" placeholder="Seach" onChange={textChanged} onBlur={this.seach} />}
        <div className="listTitle" ref={this.listTitleRef}>
            {this.props.renderListTitle()}
        </div>
        <div className="list" style={this.props.filListToWindowBottom ? {'height': this.state.availableHeight} : {}} onScroll={onScroll} ref={this.listRef}>
          <ReactList
            itemRenderer={(index, key) => { return this.props.renderItem(this.state.items[index], key) }}
            length={this.state.items.length}
            type='simple'
          />
        </div>
      </div>
    )
  }
}

export default List