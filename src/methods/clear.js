import error from '../utils/error'

const clear = () => {
  try {
    return window.localStorage.clear()
  } catch (e) {
    error(e)
  }
}

export default clear