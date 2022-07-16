const clear = function () {
  const storageType = this === localStorage
    ? 'localStorage'
    : 'sessionStorage'

  try {
    return window[storageType].clear()
  } catch (e) {
    error(e)
  }
}

export default clear