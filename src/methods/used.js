const used = () => {
  const stored = Object.entries(localStorage)
  const storage = 5 * 1024 * 1024 // 5MB
  let _used = 0

  for (let i = 0, l = stored.length; i < l; i++) {
    const item = stored[i]

    _used += (item[0].length + item[1].length)
  }

  return `${ (_used / storage).toFixed(6) }%`
}

export default used