import { GET_USER_INFO } from '../actionTypes'

const defaultState = {
  token: '',
  role: ''
}

export default function user(state = defaultState, action) {
  //深度拷贝state
  // let newState = deepClone(state)
  switch (action.type) {
    case GET_USER_INFO:
      return {...state, ...action.data}
    default:
      return state
  }

}