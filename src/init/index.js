import { 
  setItem, 
  getItem,
  removeItem,
  clear,
  used
} from "../methods/index"

const init = storage => {
  storage.setItem = setItem
  storage.getItem = getItem
  storage.removeItem = removeItem
  storage.clear = clear
  storage.used = used
}

export default init