import { html, LitElement } from 'lit-element'
import { styles } from './home-toolbar.css'
import { router } from '../../../../router/app-router'
import { searchIcon, starIcon } from '../../../../icons/incons'

class HomeToolbar extends LitElement {
  constructor () {
    super()
    this.search = ''
  }

  static get is () {
    return 'home-toolbar'
  }

  static get properties () {
    return {
      search: { type: String }
    }
  }

  static get styles () {
    return styles
  }

  _onSearchInput (ev) {
    const value = ev.target.value
    this.search = value
    this.dispatchEvent(new CustomEvent('search-change', {
      bubbles: true,
      composed: true,
      detail: { value }
    }))
  }

  onNavigate (e) {
    e.preventDefault()

    const path = e.currentTarget.getAttribute('href')
    router.navigate(path)
  }

  render () {
    return html`
      <div class="contentHeader">
        <div class="contentSearch">
          <label htmlFor="search" class="searchLabel">
            <!-- <SearchIcon /> -->
             ${searchIcon(18)}
            <input
              class="labelInput"
              type="search"
              name="search"
              id="search"
              placeholder="Buscar..."
              autoComplete="off"
              .value=${this.search}
              @input=${this._onSearchInput}
            />
          </label>
        </div>
        <nav>
          <a href="/favorites" class="btnLink" @click=${this.onNavigate}>
            <span>Mis Favoritos</span>
            <span class="LinkIcon">
              <!-- <StarIcon size={20} className={styles.icon} /> -->
               ${starIcon(20, 'icon')}
            </span>
          </a>
        </nav>
      </div>
    `
  }
}

customElements.define(HomeToolbar.is, HomeToolbar)
