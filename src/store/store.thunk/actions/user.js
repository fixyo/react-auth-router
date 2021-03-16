import { GET_USER_INFO } from '../actionTypes'


export const getUserTokenAction = payload =>(
  {
    type: GET_USER_INFO,
    data: payload
  }
)

export const getUserInfo = (loginType) => {
  
  const role = loginType === 1 ? 'NORMAL_USER' : 'SUPER_ADMIN'
  return dispatch => {
    setTimeout(() => {
      const action = getUserTokenAction(role)
      dispatch(action)
    }, 500)
  }
}