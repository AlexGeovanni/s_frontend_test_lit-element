import { html, LitElement } from 'lit-element'
import { styles } from './home-page.css'
import { listCharactersNormalize } from '../../normalize/list-characters-normalize'
import { Characters } from '../../service/characters.service'

import './components/home-header/home-header'
import './components/home-toolbar/home-toolbar'
import '../../components/characters/character-list/character-list'

class HomePage extends LitElement {
  _controller
  _debounceId
  constructor () {
    super()
    this.data = []
    this.info = {}
    this.loading = true
    this.error = ''
    this.search = ''

    this.characters = new Characters()
    this.listCharactersNormalize = listCharactersNormalize
  }

  static get is () {
    return 'home-page'
  }

  static get properties () {
    return {
      data: { type: Array, attribute: false },
      info: { type: Object, attribute: false },
      loading: { type: Boolean, attribute: false },
      error: { type: String, attribute: false },
      search: { type: String, attribute: false }
    }
  }

  static get styles () {
    return styles
  }

  disconnectedCallback () {
    this._controller?.abort()
    super.disconnectedCallback()
  }

  firstUpdated () {
    this._getCharacters()
  }

  async _getCharacters () {
    this.loading = true
    this.error = ''

    try {
      const res = await this.characters.getCharacters(1)
      this.info = res?.info
      this.data = this.listCharactersNormalize(res.results)
    } catch (error) {
      this.error = 'No se pudieron cargar los personajes. Revisa tu conexión e inténtalo de nuevo más tarde.'
      console.error(error)
    } finally {
      this.loading = false
    }
  }

  _onSearchInput (ev) {
    this.search = ev.detail?.value || ''
    clearTimeout(this._debounceId)
    this._debounceId = window.setTimeout(() => {
      this._searchApi()
    }, 500)
  }

  async _searchApi () {
    this.loading = true
    this.error = ''

    this._controller?.abort()
    this._controller = new AbortController()

    try {
      if (this.search === '') {
        await this._getCharacters()
        return
      }
      const res = await this.characters.searchCharactersByName(this.search, 1, this._controller?.signal)
      this.info = res?.info
      this.data = this.listCharactersNormalize(res.results)
    } catch (error) {
      this.error = 'No se pudieron cargar los personajes. Revisa tu conexión e inténtalo de nuevo más tarde.'
      if (error.name === 'AbortError') {
        console.log('Búsqueda abortada')
      }
      console.error('Error al buscar personajes:', error)
    } finally {
      this.loading = false
    }
  }

  render () {
    return html`
        <home-header></home-header>
        <home-toolbar @search-change=${this._onSearchInput}></home-toolbar>
        <character-list
          .loading=${this.loading}
          .error=${this.error}
          .info=${this.info}
          .characters=${this.data}
        ></character-list>
    `
  }
}

customElements.define(HomePage.is, HomePage)
