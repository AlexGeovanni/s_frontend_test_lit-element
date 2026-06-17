import { Api } from './api'

export class Characters {
  getCharacters (page = 1) {
    return Api(`?page=${page}`)
  }

  getCharactersById (id) {
    return Api(`/${id}`)
  }

  searchCharactersByName (name, page = 1, singal) {
    // Codificamos el texto para que la API soporte espacios y caracteres especiales.
    const query = encodeURIComponent(name.trim())
    return Api(`?name=${query}&page=${page}`, {}, singal)
  }

  getFavoritesCharacters (ids, signal) {
    if (!ids.length) return Promise.resolve([])

    // La API acepta varios ids separados por comas en una sola llamada.
    return Api(`/${ids.join(',')}`, {}, signal)
  }
}
