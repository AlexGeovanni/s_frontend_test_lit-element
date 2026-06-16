import { css, html, LitElement } from 'lit-element'
import '../../components/layout/wrapper/main-layout'
import './components/favorite-header/favorite-header'
import { Characters } from '../../service/characters.service'
import { ContextConsumer } from '@lit/context'
import { favoritesContext } from '../../store/favorites-context'
import { listCharactersNormalize } from '../../normalize/list-characters-normalize'
class FavoritePage extends LitElement {
  _page = 10
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

    this.store = null
    this.listener = null

    this.listCharactersNormalize = listCharactersNormalize
    this.contextConsumer = new ContextConsumer(this, {
      context: favoritesContext,
      callback: value => {
        this.store = value
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
    if (!this.store) return

    this.listener = () => this.requestUpdate()
    this.store.addEventListener('change', () => {
      this.listener()
      this._getFavoritesCharacters()
    })
  }

  disconnectedCallback () {
    if (this.store && this.listener) {
      this.store.removeEventListener(
        'change',
        this.listener
      )
    }

    super.disconnectedCallback()
  }

  async _getFavoritesCharacters () {
    this.loading = true
    this.error = ''
    const favorites = this.store.getAll() || []
    try {
      if (!(favorites?.length > 0)) return
      const res = await this.characters.getFavoritesCharacters(favorites)
      this.data = this.listCharactersNormalize(Array.isArray(res) ? res : [res])

      const totalPages = Math.ceil(this.data.length / this._page)
      this.start = (this.currentPage - 1) * this._page
      this.end = this.start + this._page
      this.info = {
        count: this.data.length,
        page: totalPages,
        next: this.currentPage < totalPages ? 'next' : null,
        prev: this.currentPage > 1 ? 'prev' : null
      }
    } catch (error) {
      this.error = 'No se pudieron cargar los personajes. Revisa tu conexión e inténtalo de nuevo más tarde.'
      console.error(error)
    } finally {
      this.loading = false
    }
  }

  render () {
    return html`
      <main-layout>
        <favorite-header></favorite-header>
        <character-list
          .staustMssgTitle=${'Sin personajes favoritos'}
          .staustMssgDescription=${'Comienza a agregar tus personajes favoritos para verlos'}
          .characters=${this.data.slice(this.start, this.end) || []}
          .info=${this.info}
          .loading=${this.loading}
          .error=${this.error}
          .currentPage=${this.currentPage}
        ></character-list>
      </main-layout>
    `
  }
}

customElements.define(FavoritePage.is, FavoritePage)
