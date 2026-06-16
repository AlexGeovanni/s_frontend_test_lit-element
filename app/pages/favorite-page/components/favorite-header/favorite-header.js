import { html, LitElement } from 'lit-element'
import { styles } from './favorite-header.css'
import { homeIcon } from '../../../../icons/incons'
import { router } from '../../../../router/app-router'

class FavoriteHeader extends LitElement {
  static get is () {
    return 'favorite-header'
  }

  static get styles () {
    return styles
  }

  static get properties () {
    return {}
  }

  onNavigate (e) {
    e.preventDefault()

    const path = e.currentTarget.getAttribute('href')
    router.navigate(path)
  }

  render () {
    return html`
      <header>
      <div class="contentTitlePage">
        <h1>Favoritos</h1>
      </div>
      <nav class="nav">
        <a href="/" class="btnLink" @click=${this.onNavigate}>
          <span>
            ${homeIcon()}
          </span>
          Volver
        </a>
      </nav>
    </header>
    `
  }
}

customElements.define(FavoriteHeader.is, FavoriteHeader)
