import { error, getStorageType } from "../utils/index"

const removeItem = function (key) {
  try {
    const storageType = getStorageType.call(this)

    return window[storageType].removeItem(key)
  } catch (e) {
    error(e)
  }
}
export default removeItem