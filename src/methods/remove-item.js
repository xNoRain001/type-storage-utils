import error from '../utils/error'

const removeItem = key => {
  try {
    return window.localStorage.removeItem(key)
  } catch (e) {
    error(e)
  }
}
export default removeItem