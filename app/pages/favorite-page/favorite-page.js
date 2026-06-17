import { css, html, LitElement } from 'lit-element'
import { Characters } from '../../service/characters.service'
import { ContextConsumer } from '@lit/context'
import { favoritesContext } from '../../store/favorites-context'
import { listCharactersNormalize } from '../../normalize/list-characters-normalize'
import './components/favorite-header/favorite-header'

class FavoritePage extends LitElement {
  _page = 10
  _controller
  _debounceId

  constructor () {
    super()
    this.currentPage = 1
    this.start = (this.currentPage - 1) * this._page
    this.end = this.start + this._page
    this.data = []
    this.info = {}
    this.loading = true
    this.error = ''

    this.characters = new Characters()

    this.dataCharacter = []
    this._store = null
    this.listener = null

    this.listCharactersNormalize = listCharactersNormalize
    this.contextConsumer = new ContextConsumer(this, {
      context: favoritesContext,
      callback: value => {
        this._store = value
        this.subscribe()
        this.requestUpdate()
      }
    })
  }

  static get is () {
    return 'favorite-page'
  }

  static styles = css``

  static get properties () {
    return {
      currentPage: { type: Number, attribute: false },
      start: { type: Number, attribute: false },
      end: { type: Number, attribute: false },
      data: { type: Array, attribute: false },
      info: { type: Object, attribute: false },
      loading: { type: Boolean, attribute: false },
      error: { type: String, attribute: false }
    }
  }

  firstUpdated () {
    this._getFavoritesCharacters()
  }

  subscribe () {
    if (!this._store) return

    this.listener = () => this.requestUpdate()
    this._store.addEventListener('change', () => {
      this.listener()
      this._getFavoritesCharacters()
    })
  }

  disconnectedCallback () {
    if (this._store && this.listener) {
      this._store.removeEventListener(
        'change',
        this.listener
      )
    }

    super.disconnectedCallback()
  }

  async _getFavoritesCharacters () {
    this.loading = true
    this.error = ''

    this._controller?.abort()
    this._controller = new AbortController()

    const favorites = this._store.getAll() || []

    try {
      if (!(favorites?.length > 0)) {
        this.data = []
        this._getCharacterFavMemo()
        return
      }
      const res = await this.characters.getFavoritesCharacters(favorites, this._controller?.singal)
      this.data = this.listCharactersNormalize(Array.isArray(res) ? res : [res])
      this._getCharacterFavMemo()
    } catch (error) {
      this.error = 'No se pudieron cargar los personajes. Revisa tu conexión e inténtalo de nuevo más tarde.'
      if (error.name === 'AbortError') {
        console.error('Búsqueda abortada')
      }
    } finally {
      this.loading = false
    }
  }

  //
  _onPageChange (ev) {
    this.currentPage = ev.detail?.page
    this._getCharacterFavMemo()
  }

  _getCharacterFavMemo () {
    this.start = (this.currentPage - 1) * this._page
    this.end = this.start + this._page

    const totalPages = Math.ceil(this.data.length / this._page)
    this.dataCharacter = this.data.slice(this.start, this.end) || []

    this.info = {
      count: this.data.length,
      pages: totalPages,
      next: this.currentPage < totalPages ? 'next' : null,
      prev: this.currentPage > 1 ? 'prev' : null
    }
  }

  render () {
    return html`
        <favorite-header></favorite-header>
        <character-list
          .staustMssgTitle=${'Sin personajes favoritos'}
          .staustMssgDescription=${'Comienza a agregar tus personajes favoritos para verlos'}
          .characters=${this.dataCharacter}
          .info=${this.info}
          .loading=${this.loading}
          .error=${this.error}
          .currentPage=${this.currentPage}
          @page-change=${this._onPageChange}
        ></character-list>
    `
  }
}

customElements.define(FavoritePage.is, FavoritePage)
