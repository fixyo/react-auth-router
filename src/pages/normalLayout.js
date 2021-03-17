import React, { Component } from 'react'

export default class NormalLayout extends Component {
  render() {
    return (
      <div>
        NORMAL_LAYOUT
        {
          this.props.children
        }
      </div>
    )
  }
}
