import RANDOMS from '../randoms/index'
import { error } from "../utils/index"
import { getType, getStorageType } from "../utils/index"

const strategies = {
  string (value, expiredTime) {
    return expiredTime
      ? `${ RANDOMS }|string|${ RANDOMS }-${ expiredTime }-${ value }`
      : `${ RANDOMS }|string|${ value }`
  },

  number (value, expiredTime) {
    return expiredTime
      ? `${ RANDOMS }|number|${ RANDOMS }-${ expiredTime }-${ value }`
      : `${ RANDOMS }|number|${ value }`
  },

  boolean (value, expiredTime) {
    return expiredTime
      ? `${ RANDOMS }|boolean|${ RANDOMS }-${ expiredTime }-${ value }`
      : `${ RANDOMS }|boolean|${ value }`
  },

  null (value, expiredTime) {
    return expiredTime
      ? `${ RANDOMS }|null|${ RANDOMS }-${ expiredTime }-${ value }`
      : `${ RANDOMS }|null|${ value }`
  },

  undefined (value, expiredTime) {
    return expiredTime
      ? `${ RANDOMS }|undefined|${ RANDOMS }-${ expiredTime }-${ value }`
      : `${ RANDOMS }|undefined|${ value }`
  },

  array (value, expiredTime) {
    return expiredTime
      ? `${ RANDOMS }|array|${ RANDOMS }-${ expiredTime }-${ JSON.stringify(value) }`
      :`${ RANDOMS }|array|${ JSON.stringify(value) }`
  },

  object (value, expiredTime) {
    return expiredTime
      ? `${ RANDOMS }|object|${ RANDOMS }-${ expiredTime }-${ JSON.stringify(value) }`
      : `${ RANDOMS }|object|${ JSON.stringify(value) }`
  },

  date (value, expiredTime) {
    return expiredTime
      ? `${ RANDOMS }|date|${ RANDOMS }-${ expiredTime }-${ value }`
      : `${ RANDOMS }|date|${ value }`
  }
}

const setItem = function (key, value, expiredTime) {
  try {
    const storageType = getStorageType.call(this)
    const type = getType(value)

    expiredTime = getType(expiredTime) === 'number'
      ? Date.now() + expiredTime * 1000
      : expiredTime.getTime()

    const formattedValue = strategies[type](value, expiredTime)

    return window[storageType].setItem(key, formattedValue)
  } catch (e) {
    error(e)
  }
}

export default setItem