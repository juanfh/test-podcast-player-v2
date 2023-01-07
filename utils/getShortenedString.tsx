export const getShortenedString = (str: string, maxLength: number = 40) => {
  if (str.length <= maxLength) {
    return str
  }

  return str.slice(0, maxLength) + "..."
}