class FavoritesStore extends EventTarget {
  constructor () {
    super()
    this.favorites = this.loadFromStorage()
  }

  loadFromStorage () {
    const data = localStorage.getItem('favorites')

    if (!data) return []

    try {
      // Si el storage se corrompe, preferimos volver a un estado vacío.
      return JSON.parse(data)
    } catch {
      return []
    }
  }

  _save () {
    localStorage.setItem(
      'favorites',
      JSON.stringify(this.favorites)
    )
  }

  getAll () {
    return this.favorites
  }

  add (id) {
    const exists = this.favorites.some(
      c => c === id
    )

    if (exists) return

    this.favorites = [...this.favorites, id]
    this._save()
    // El resto de la app escucha este evento para refrescar la UI.
    this._notify()
  }

  remove (id) {
    this.favorites = this.favorites.filter(
      c => c !== id
    )

    this._save()
    // El resto de la app escucha este evento para refrescar la UI.
    this._notify()
  }

  toggle (id) {
    if (this.isFavorite(id)) {
      this.remove(id)
    } else {
      this.add(id)
    }
  }

  isFavorite (id) {
    return this.favorites.some(c => c === id)
  }

  _notify () {
    this.dispatchEvent(new Event('change'))
  }
}

export const favoritesStore = new FavoritesStore()
