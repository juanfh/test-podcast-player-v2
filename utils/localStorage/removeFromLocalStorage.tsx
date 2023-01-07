import { getAllFromLocalStorage } from "./getAllFromLocalStorage"

export const removeFromLocalStorage = (name: string) => {
  const prevParams = getAllFromLocalStorage()
  const newParams = { ...prevParams, [name]: null }
  localStorage.setItem('WebLocalParams', JSON.stringify(newParams))
}