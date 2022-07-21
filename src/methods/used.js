import { getStorageType } from "../utils/index"

const used = function () {
  const storageType = getStorageType.call(this)
  const maxLength = 5 * 1024 * 1024 // 5MB
  let _used = 0
  
  for (const [key, value] of Object.entries(window[storageType])) {
    _used += (key.length + value.length)
  }

  return `${ (_used / maxLength).toFixed(6) }%`
}

export default used