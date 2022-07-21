const getStorageType = function () {
  return this === typeStorage.localStorage
    ? 'localStorage'
    : 'sessionStorage'
}

export default getStorageType