import { css, html, LitElement } from 'lit-element'

import '../pages/home-page/home-page'
import '../pages/favorite-page/favorite-page'
import '../components/layout/wrapper/main-layout'
import { router } from './app-router'
import { ContextProvider } from '@lit/context'
import { favoritesContext } from '../store/favorites-context'
import { favoritesStore } from '../store/favorites-store'

class AppRoot extends LitElement {
  constructor () {
    super()

    // this._store = new FavoritesStore()
    this.currentRoute = router.currentRoute || window.location.pathname

    this.provider = new ContextProvider(this, {
      context: favoritesContext,
      initialValue: favoritesStore
    })
  }

  static get is () {
    return 'app-root'
  }

  static styles = css``

  static get properties () {
    return {
      currentRoute: { type: String }
    }
  }

  connectedCallback () {
    super.connectedCallback()

    router.addEventListener('route-change', this.handleRouteChange)
  }

  disconnectedCallback () {
    router.removeEventListener(
      'route-change',
      this.handleRouteChange
    )

    super.disconnectedCallback()
  }

  handleRouteChange = () => {
    this.currentRoute = router.currentRoute
    this.requestUpdate()
  }

  renderPage () {
    switch (this.currentRoute) {
      case '/favorites':
        return html`<favorite-page></favorite-page>`

      default:
        return html`<home-page></home-page>`
    }
  }

  render () {
    return html`
    <main-layout>
      ${this.renderPage()} 
    </main-layout>
    `
  }
}

customElements.define(AppRoot.is, AppRoot)
