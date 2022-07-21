import init from "./init/index"

const typeStorage = {
  localStorage: {},
  sessionStorage: {}
}

// mount methods
const keys = Object.keys(typeStorage)

for (let i = 0, key; key = keys[i++];) {
  init(typeStorage[key])
}

export default typeStorage