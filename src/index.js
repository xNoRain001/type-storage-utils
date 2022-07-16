import init from "./init/index"

const typeStorage = {
  localStorage: {},
  sessionStorage: {}
}

init(typeStorage.localStorage)
init(typeStorage.sessionStorage)

export default typeStorage

