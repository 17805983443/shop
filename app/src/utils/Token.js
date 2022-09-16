export const setToken = function (token) {
  localStorage.setItem('Token', token)
}

export const getToken = function () {
  return localStorage.getItem('Token')
}

export const remToken = function () {
  return localStorage.removeItem('Token')
}
