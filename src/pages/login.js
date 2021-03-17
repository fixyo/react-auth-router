import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props)
    console.log(this.props, 'login')
  }

  render() {
    const { user } = this.props 
    if (user.token) {
      return <Redirect to="/" key={'/dashboard'}/>
    }
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

const mapStateToProps = (state) => (
  {
    user: state.user,
  }
)

export default connect(mapStateToProps)(Login);
// export default connect(mapStateToProps)(Router);
// export default Login
