// @ts-ignore
export const fetcher = (...args) => fetch(...args).then(res => res.json())

export const API_BASE_URL = 'http://localhost:4000';