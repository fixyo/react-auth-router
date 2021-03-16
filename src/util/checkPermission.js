import isEmpty from 'lodash/isEmpty'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
// import indexOf from 'lodash/indexOf'

/**
 * 
 * @param {*} authorities 当前用户权限 
 * @param {*} permissions 允许访问的权限
 */
const checkPermission = (authorities, permissions) => {
  if (isEmpty(permissions)) {
    return true 
  }

  if (isArray(authorities)) {
    return authorities.some(item => {
      if (permissions.indexOf(item) !== -1) {
        return true 
      }
      return false 
    })
  }

  if (isString(authorities)) {
    return permissions.indexOf(authorities) !== -1
  }

  if (isFunction(authorities)) {
    return authorities(permissions)
  }

  throw new Error('Unsupport type of authorities')
}

export default checkPermission 
