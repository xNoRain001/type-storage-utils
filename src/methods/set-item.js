import RANDOMS from '../randoms/index'
import { error } from "../utils/index"
import { getType, getStorageType } from "../utils/index"

const strategies = {
  string (value, timestamp) {
    return `${ RANDOMS }|string|${ RANDOMS }-${ timestamp || null }-${ value }`
  },

  number (value, timestamp) {
    return `${ RANDOMS }|number|${ RANDOMS }-${ timestamp || null }-${ value }`
  },

  boolean (value, timestamp) {
    return `${ RANDOMS }|boolean|${ RANDOMS }-${ timestamp || null }-${ value }`
  },

  null (value, timestamp) {
    return `${ RANDOMS }|null|${ RANDOMS }-${ timestamp || null }-${ value }`
  },

  undefined (value, timestamp) {
    return `${ RANDOMS }|undefined|${ RANDOMS }-${ timestamp || null }-${ value }`
  },

  array (value, timestamp) {
    return `${ RANDOMS }|array|${ RANDOMS }-${ timestamp || null }-${ JSON.stringify(value) }`
  },

  object (value, timestamp) {
    return `${ RANDOMS }|object|${ RANDOMS }-${ timestamp || null }-${ JSON.stringify(value) }`
  },

  date (value, timestamp) {
    return `${ RANDOMS }|date|${ RANDOMS }-${ timestamp || null }-${ value }`
  }
}

const setItem = function (key, value, expiresOrDate) {
  try {
    const storageType = getStorageType.call(this)
    const type = getType(value)
    const timestamp = getType(expiresOrDate) === 'number'
      ? Date.now() + expiresOrDate * 1000
      : expiresOrDate
          ? expiresOrDate.getTime()
          : null
    const formattedValue = strategies[type](value, timestamp)

    return window[storageType].setItem(key, formattedValue)
  } catch (e) {
    error(e)
  }
}

export default setItem