export const getAllFromLocalStorage = () => JSON.parse(localStorage.getItem('WebLocalParams') || '{}')
