import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import map from 'lodash/map'
import isNil from 'lodash/isNil'
import { Switch, Route, Redirect } from 'react-router-dom'
import omitProperities from '../util/omitProperities'
import checkPermission from '../util/checkPermission'
import DefaultLayout from './defaultLayout'
import DefaultNotFound from './defaultNotFound'

const propTypes = {
  authorities: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.array
  ]),
  normalRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      redirect: PropTypes.string,
      component: PropTypes.func | PropTypes.object
    })
  ),
  normalLayout: PropTypes.func,
  authorizedRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      permissions: PropTypes.arrayOf(PropTypes.string),
      component: PropTypes.func | PropTypes.object,
      redirect: PropTypes.string,
      unauthorized: PropTypes.func,
    })
  ),
  authorizedLayout: PropTypes.func,
  notFound: PropTypes.func
}

const defaultProps = {
  authorities: '',
  normalRoutes: [],
  normalLayout: DefaultLayout,
  authorizedRoutes: [],
  authorizedLayout: DefaultLayout,
  notFound: DefaultNotFound
}

class AuthRoute extends Component {
  constructor(props) {
    super(props)
    // const {token} = props
    console.log(this.props, 'props')
    
  }

  renderRedirectRoute = (route) => (
    <Route
      key={route.path}
      {...omitProperities(route)}
      render={() => <Redirect to={route.redirect} />}
    />
  )

  renderAuthorizedRoute = (route) => {
    const { authorizedLayout: AuthorizedLayout, authorities } = this.props
    const {
      permissions,
      path,
      component: RouteComponent,
      unauthorized: Unauthorized
    } = route

    if (!this.props.token) {
      return (
        <Route
          key={route.path}
          {...omitProperities(route)}
          render={() => <Redirect to={'/login'} />}
        />
      )
    }

    const hasPermission = checkPermission(authorities, permissions)

    // not authorized and has a fallback unathorized component 
    if (!hasPermission) {
      if (route.unauthorized) {
        return (
          <Route
            key={path}
            {...omitProperities(route)}
            render={
              props => (
                <AuthorizedLayout {...props}>
                  <Unauthorized {...props} />
                </AuthorizedLayout>
              )
            }
          />
        )
      }

      if (route.redirect) {
        return this.renderRedirectRoute(route)
      }
    }

    return (
      <Route
        key={path}
        {...omitProperities(route)}
        render={
          props => (
            <AuthorizedLayout {...props}>
              <RouteComponent {...props} />
            </AuthorizedLayout>
          )
        }
      />
    )
  }

  renderUnAuthorizedRoute = (route) => {
    const { normalLayout: NormalLayout } = this.props;
    const { redirect, path, component: RouteComponent } = route;

    // check if current route is a redirect route (doesn't have component but redirect path)
    if (isNil(RouteComponent) && !isNil(redirect)) {
      return this.renderRedirectRoute(route);
    }

    return (
      <Route
        key={path}
        {...omitProperities(route)}
        render={(props) => (
          <NormalLayout {...props}>
            <RouteComponent {...props} />
          </NormalLayout>
        )}
      />
    );
  }

  renderNotFound = () => {
    const { notFound: NotFound } = this.props
    return <Route key="not-found" render={
      props => (
        <NotFound {...props} />
      )
    } />
  }

  render() {
    const { normalRoutes, authorizedRoutes } = this.props
    return (
      
      <Switch>
        {
          normalRoutes.map(route => {
            return this.renderUnAuthorizedRoute(route)
          })
        }
        {
          authorizedRoutes.map(route => {
            return this.renderAuthorizedRoute(route)
          })
        }
        {
          this.renderNotFound()
        }
      </Switch>
    )
  }
}

AuthRoute.propTypes = propTypes
AuthRoute.defaultProps = defaultProps
export default AuthRoute