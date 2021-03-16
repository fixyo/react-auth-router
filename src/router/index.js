import Admin from '../pages/admin'
import Detail from '../pages/detail'
import Home from '../pages/home'
import List from '../pages/list'
import Login from '../pages/login'

const routers = [
  {path: '/', name: 'dashboard', component: Home, meta: {requireAuth: false}},
  {path: '/admin', name: 'admin', component: Admin, meta: {requireAuth: true}},
  {path: '/detail', name: 'detail', component: Detail, meta: {requireAuth: true}},
  {path: '/list', name: 'list', component: List, meta: {requireAuth: true}},
  {path: '/login', name: 'login', component: Login, meta: {requireAuth: false}}
]

export default routers
