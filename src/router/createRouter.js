// import Unauthorized from '../pages/unauthorized'
import AuthRouter from '../auth-route'
import { connect } from 'react-redux'
import BasicLayout from '../pages/basicLayout'
import NormalLayout from '../pages/normalLayout'
import NotFound from '../pages/page-not-found'
import Unauthorized from '../pages/unauthorized'
import Admin from '../pages/admin'
import Detail from '../pages/detail'
import Home from '../pages/home'
import List from '../pages/list'
import Login from '../pages/login'

const authorizedRoutes = [
  {
    path: '/admin', 
    name: 'admin', 
    component: Admin, 
    exact: true,
    permissions: ['admin'],
    pageTitle: 'admin',
    unauthorized: Unauthorized
  },
  {
    path: '/detail', 
    name: 'detail',
    exact: true,
    component: Detail, 
    permissions: ['admin', 'user'],
    pageTitle: 'detail',
    unauthorized: Unauthorized
  },
  {
    path: '/list', 
    name: 'list', 
    exact: true,
    component: List,
    permissions: ['admin', 'user'],
    pageTitle: 'list',
    unauthorized: Unauthorized
  },
]

const normalRoutes = [
  {
    path: '/', 
    redirect: '/dashboard',
    exact: true 
  },
  {
    path: '/login', 
    component: Login, 
    exact: true 
  },
  {
    path: '/dashboard', 
    component: Home, 
    exact: true 
  }
]



const Router = props => (
  <AuthRouter
    {...props}
    token={props.user.token}
    authorities={props.user.authorities}
    authorizedRoutes={authorizedRoutes}
    authorizedLayout={BasicLayout}
    normalRoutes={normalRoutes}
    normalLayout={NormalLayout}
    notFound={NotFound}
  />
)

const mapStateToProps = state => ({
  user: state.user,
})

// Router.propTypes = propTypes;
export default connect(mapStateToProps)(Router);