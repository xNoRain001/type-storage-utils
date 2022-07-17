const removeItem = function (key) {
  const storageType = this === localStorage
    ? 'localStorage'
    : 'sessionStorage'

  try {
    return window[storageType].removeItem(key)
  } catch (e) {
    console.error(e)
  }
}
export default removeItem