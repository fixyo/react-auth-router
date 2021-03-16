import React from 'react'
import { HashRouter as R } from 'react-router-dom'
// import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
// import BindingThis from './views/binding-this'
// import ControlledComponent from './views/controlled-component'
// import Calculator from './views/thermometer/calculator'
// import BTN from './views/refs-forward'
// import IntoJSX from './views/hoc'

// import routers from './router'
// import PageNotFount from './pages/page-not-found'

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <BindingThis></BindingThis>
//         <hr />
//         <ControlledComponent />
//         <hr />
//         <Calculator />
//         <hr />
//         <BTN />
//         <hr />
//         <IntoJSX />
//       </div>
//     )
//   }
// }



// function App2(props) {
//   const { isLogin } = props
//   const { author}
//   return (
//     <Router>
//       <Switch>
//         {
//           routers.map((router, index) => {
//             return (
//               <Route path={router.path} key={index} exact render={
//                 (props) => {
//                   if (!router.meta.requireAuth) {
//                     return <router.component {...props} />
//                   }
//                   if (isLogin) {
//                     return <router.component {...props} />
//                   }
//                   return <Redirect to={{pathname: '/login'}} />
//                 }
//               }/>
//             )
//           })
//         }
//         <Route component={PageNotFount} />
//       </Switch>
//     </Router>
//   )
// }


import Router from './router/createRouter'
// 引入redux
import { Provider } from 'react-redux'
import store from './store/store.thunk'

function App3(props) {
  return (
    <R>
      <Provider store={store} >
        <Router />
      </Provider>
    </R>
    
  )
}
export default App3