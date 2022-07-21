import { error, getStorageType } from "../utils/index"

const removeItem = function (key) {
  const storageType = getStorageType.call(this)

  try {
    return window[storageType].removeItem(key)
  } catch (e) {
    error(e)
  }
}
export default removeItem