import { error, getStorageType } from "../utils/index"

const clear = function () {
  const storageType = getStorageType.call(this)

  try {
    return window[storageType].clear()
  } catch (e) {
    error(e)
  }
}

export default clear