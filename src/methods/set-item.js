import getType from "../utils/type"
import RANDOMS from '../randoms/index'

const strategies = {
  string (value) {
    return `${ RANDOMS }|string|${ value }`
  },

  number (value) {
    return `${ RANDOMS }|number|${ value }`
  },

  boolean (value) {
    return `${ RANDOMS }|boolean|${ value }`
  },

  null (value) {
    return `${ RANDOMS }|null|${ value }`
  },

  undefined (value) {
    return `${ RANDOMS }|undefined|${ value }`
  },

  array (value) {
    return `${ RANDOMS }|array|${ JSON.stringify(value) }`
  },

  object (value) {
    return `${ RANDOMS }|object|${ JSON.stringify(value) }`
  },
}

const setItem = function (key, value) {
  const storageType = this === localStorage
    ? 'localStorage'
    : 'sessionStorage'

  try {

    // get value's type
    const type = getType(value)
    value = strategies[type](value)
    return window[storageType].setItem(key, value)
  } catch (e) {
    console.log(e)
  }
}

export default setItem