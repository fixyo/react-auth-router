import React, { Component } from 'react'

export default class login extends Component {
  render() {
    return (
      <form onSubmit={e => this.handleSubmit()}>
        <div>
          <label htmlFor="username">
            用户名:
            <input id="username" name="username"></input>
          </label>
        </div>
        <div>
        <label htmlFor="password">
            密码:
            <input id="password" name="password"></input>
          </label>
        </div>
      </form>
    )
  }
}
