import { error, getStorageType } from "../utils/index"

const clear = function () {
  try {
    const storageType = getStorageType.call(this)

    return window[storageType].clear()
  } catch (e) {
    error(e)
  }
}

export default clear