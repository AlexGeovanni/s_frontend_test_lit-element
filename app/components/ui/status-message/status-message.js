import { html, LitElement, nothing } from 'lit-element'
import { styles } from './status-message.css'
import { router } from '../../../router/app-router'

class StatusMessage extends LitElement {
  constructor () {
    super()
    this.location = window.location.pathname
    this.title = ''
    this.description = ''
    this.variant = 'empty'
  }

  static get is () {
    return 'status-message'
  }

  static get styles () {
    return styles
  }

  static get properties () {
    return {
      location: { type: String },
      title: { type: String },
      description: { type: String },
      variant: { type: String },
      stylesVariante: { type: Array }
    }
  }

  onNavigate () {
    router.navigate('/')
  }

  render () {
    // Solo mostramos este CTA cuando la vista de favoritos esta vacia.
    return html`
      <div
        class="statusMessage ${this.variant}"
        role="status"
        aria-live="polite"
      >
        <div class="textContent">
          <h2 class="title">${this.title}</h2>
          <p class="description">${this.description}</p>
          ${this.location === '/favorites' && this.variant === 'empty'
            ? html` <button
                type="button"
                class="button"
                @click=${this.onNavigate}
              >
                Explorar personajes
              </button>`
            : nothing}
        </div>
      </div>
    `
  }
}

customElements.define(StatusMessage.is, StatusMessage)
