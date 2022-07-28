import RANDOMS from '../randoms/index'
import { error, getStorageType, isExpired } from "../utils/index"

const strategies = {
  string (value) {
    return value
  },

  number (value) {
    return Number(value)
  },

  boolean (value) {
    return value === 'true'
      ? true
      : false
  },

  null () {
    return null
  },

  undefined () {
    return undefined
  },

  array (value) {
    return JSON.parse(value)
  },

  object (value) {
    return JSON.parse(value)
  },

  date (value) {
    return new Date(value)
  }
}

const getItem = function (key) {
  try {
    const storageType = getStorageType.call(this)
    const value = window[storageType].getItem(key)

    // nonexistent key
    if (value === null) {
      return value
    }

    const parts = value.split('|')
    const hasType = parts[0] === RANDOMS
    const segments = parts[2].split('-')

    if (hasType) {
      const hasExpiresOrDate = segments[0] === RANDOMS
      const timestamp = segments[1]

      if (hasExpiresOrDate && isExpired(timestamp)) {
        return null
      }

      const type = parts[1]
      const _value = value.slice(
        RANDOMS.length * 2 + type.length + timestamp.length + 4
      )
      
      return strategies[type](_value)
    } 

    return value
  } catch (e) {
    error(e)
  }
}

export default getItem