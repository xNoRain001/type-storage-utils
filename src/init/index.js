import { 
  setItem, 
  getItem,
  removeItem,
  clear,
  used
} from "../methods/index"

const init = function (localStorage) {
  localStorage.setItem = setItem
  localStorage.getItem = getItem
  localStorage.removeItem = removeItem
  localStorage.clear = clear
  localStorage.used = used
}

export default init