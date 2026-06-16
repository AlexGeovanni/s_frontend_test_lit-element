const BASE_URL = 'https://rickandmortyapi.com/api/character'

export async function Api (endpoint, options, signal) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    ...options,
    signal
  })

  if (!res?.ok) {
    throw new Error('Request failed')
  }

  return res.json()
}
