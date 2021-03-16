import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import map from 'lodash/map'
import isNil from 'lodash/isNil'
import { Switch, Route, Redirect} from 'react-router-dom'
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
      component: PropTypes.func
    })
  ),
  normalLayout: PropTypes.func,
  authorizedRoutes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      permissions: PropTypes.arrayOf(PropTypes.string),
      component: PropTypes.func,
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

    console.log(Unauthorized, 'x2')

    const hasPermission = checkPermission(authorities, permissions)

    console.log(hasPermission, 'hasPermission')

    // not authorized and has a fallback unathorized component 
    if (!hasPermission) {
      if (route.unauthorized) {
        console.log('xxx')
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