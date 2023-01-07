import { getAllFromLocalStorage } from "./getAllFromLocalStorage"

export const getFromLocalStorage = (name: string) => {
  const now = new Date()
  const params = getAllFromLocalStorage()
  if (params && params[name]) {
    if (now.getTime() > params.expiry) {
      localStorage.removeItem('WebLocalParams')
      return false
    }
    return params[name]
  }
  return false
}
