import RANDOMS from '../randoms/index'
import { error } from "../utils/index"
import { getType, getStorageType } from "../utils/index"

const strategies = {
  string (value, configStr) {
    return configStr
      ? `${ RANDOMS }|string|${ RANDOMS }-${ configStr }-${ value }`
      : `${ RANDOMS }|string|${ value }`
  },

  number (value, configStr) {
    return configStr
      ? `${ RANDOMS }|number|${ RANDOMS }-${ configStr }-${ value }`
      : `${ RANDOMS }|number|${ value }`
  },

  boolean (value, configStr) {
    return configStr
      ? `${ RANDOMS }|boolean|${ RANDOMS }-${ configStr }-${ value }`
      : `${ RANDOMS }|boolean|${ value }`
  },

  null (value, configStr) {
    return configStr
      ? `${ RANDOMS }|null|${ RANDOMS }-${ configStr }-${ value }`
      : `${ RANDOMS }|null|${ value }`
  },

  undefined (value, configStr) {
    return configStr
      ? `${ RANDOMS }|undefined|${ RANDOMS }-${ configStr }-${ value }`
      : `${ RANDOMS }|undefined|${ value }`
  },

  array (value, configStr) {
    return configStr
      ? `${ RANDOMS }|array|${ RANDOMS }-${ configStr }-${ JSON.stringify(value) }`
      :`${ RANDOMS }|array|${ JSON.stringify(value) }`
  },

  object (value, configStr) {
    return configStr
      ? `${ RANDOMS }|object|${ RANDOMS }-${ configStr }-${ JSON.stringify(value) }`
      : `${ RANDOMS }|object|${ JSON.stringify(value) }`
  },

  date (value, configStr) {
    return configStr
      ? `${ RANDOMS }|date|${ RANDOMS }-${ configStr }-${ value }`
      : `${ RANDOMS }|date|${ value }`
  }
}

const setItem = function (key, value, config) {
  try {
    const storageType = getStorageType.call(this)
    const type = getType(value)
    const { expiredTime } = config

    config.expiredTime = getType(expiredTime) === 'number'
      ? Date.now() + expiredTime * 1000
      : expiredTime.getTime()

    const configStr = JSON.stringify(config)
    const formattedValue = strategies[type](value, configStr)

    return window[storageType].setItem(key, formattedValue)
  } catch (e) {
    error(e)
  }
}

export default setItem