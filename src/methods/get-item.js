import RANDOMS from '../randoms/index'

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
}

const getItem = function (key) {
  try {
    const value = window.localStorage.getItem(key)
    
    // nonexistent key
    if (value === null) {
      return null
    }

    const parts = value.split('|')
    const hasType = parts[0] === RANDOMS
    
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