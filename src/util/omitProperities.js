import omit from 'lodash/omit'

// var object = { 'a': 1, 'b': '2', 'c': 3 }
// omit(object, ['a', 'c'])
// => { 'b': '2' }

const OMIT_PROPERITIES = ['render', 'component']

const omitProperities = (route) => {
  return omit(route, OMIT_PROPERITIES)
}

export default omitProperities