import { getAllFromLocalStorage } from "./getAllFromLocalStorage"

export const saveToLocalStorage = (name: string, value: any) => {
  const now = new Date()
  const prevParams = getAllFromLocalStorage()
  const newParams = {
    ...prevParams,
    [name]: value,
    expiry: now.getTime() + 86400000
  }
  try {
    localStorage.setItem('WebLocalParams', JSON.stringify(newParams))
  } catch (error) {
    //console.log(error)
  }
}