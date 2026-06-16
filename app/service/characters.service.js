import { Api } from './api'

export class Characters {
  getCharacters (page = 1) {
    return Api(`?page=${page}`)
  }

  getCharactersById (id) {
    return Api(`/${id}`)
  }

  searchCharactersByName (name, page = 1, singal) {
    const query = encodeURIComponent(name.trim())
    return Api(`?name=${query}&page=${page}`, {}, singal)
  }

  getFavoritesCharacters (ids) {
    if (!ids.length) return Promise.resolve([])
    return Api(`/${ids.join(',')}`)
  }
}
