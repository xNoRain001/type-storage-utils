const clear = function () {
  const storageType = this === localStorage
    ? 'localStorage'
    : 'sessionStorage'

  try {
    return window[storageType].clear()
  } catch (e) {
    console.log(e)
  }
}

export default clear