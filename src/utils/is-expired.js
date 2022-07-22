const isExpired = (expiredTime) => {
  return Date.now() >= expiredTime
}

export default isExpired