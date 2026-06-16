import { html, LitElement } from 'lit-element'
import { styles } from './home-toolbar.css'
import { router } from '../../../../router/app-router'

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
    this._emitSearchChange(value)
  }

  _emitSearchChange (value) {
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
               ${this.starIcon()}
            </span>
          </a>
        </nav>
      </div>
    `
  }

  starIcon () {
    return html` 
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon"
    >
      <path
        d="M6.86642 1.75507L7.74642 3.51507C7.86642 3.76007 8.18642 3.99507 8.45642 4.04007L10.0514 4.30507C11.0714 4.47507 11.3114 5.21507 10.5764 5.94507L9.33642 7.18507C9.12642 7.39507 9.01142 7.80007 9.07642 8.09007L9.43142 9.62507C9.71142 10.8401 9.06642 11.3101 7.99142 10.6751L6.49642 9.79007C6.22642 9.63007 5.78142 9.63007 5.50642 9.79007L4.01142 10.6751C2.94142 11.3101 2.29142 10.8351 2.57142 9.62507L2.92642 8.09007C2.99142 7.80007 2.87642 7.39507 2.66642 7.18507L1.42642 5.94507C0.696419 5.21507 0.931419 4.47507 1.95142 4.30507L3.54642 4.04007C3.81142 3.99507 4.13142 3.76007 4.25142 3.51507L5.13142 1.75507C5.61142 0.800068 6.39142 0.800068 6.86642 1.75507Z"
        fill="none"
      />
    </svg>`
  }
}

customElements.define(HomeToolbar.is, HomeToolbar)
