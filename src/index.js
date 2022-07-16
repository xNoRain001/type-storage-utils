import init from "./init/index"

const typeStorage = {
  localStorage: {},
  sessionStorage: {}
}

init(typeStorage.localStorage)

export default typeStorage

