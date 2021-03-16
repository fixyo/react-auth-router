import React, { Component } from 'react'

export default class BasicLayout extends Component {
  render() {

    return (
      <div style={{width: '100vw', height: '100vh', border: '1px solid green' }}>
        <div style={{width: '300px', border: '1px solid green'}}>
          MENUS
        </div>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}
