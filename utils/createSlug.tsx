export const createSlug = (string: string) => string.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")