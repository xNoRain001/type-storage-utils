import RANDOMS from '../randoms/index'
import { error, getStorageType } from "../utils/index"

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
  const storageType = getStorageType.call(this)

  try {
    const value = window[storageType].getItem(key)

    // nonexistent key
    if (value === null) {
      return value
    }

    const parts = value.split('|')
    const hasType = parts[0] == RANDOMS
    
    if (hasType) {
      const type = parts[1]
      return strategies[type](value.slice(RANDOMS.length + type.length + 2))
    } 

    return value
  } catch (e) {
    error(e)
  }
}

export default getItem