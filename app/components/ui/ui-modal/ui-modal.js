import { html, LitElement } from 'lit-element'
import { styles } from './ui-modal.css'
import { buttonReset } from '../../../styles/button-reset.css'

class UiModal extends LitElement {
  constructor () {
    super()
    this.open = true
  }

  static get is () {
    return 'ui-modal'
  }

  static get styles () {
    return [buttonReset, styles]
  }

  static get properties () {
    return {
      open: { type: Boolean, Reflect: true }
    }
  }

  _closeModal () {
    this.dispatchEvent(new CustomEvent('modal-close', {
      bubbles: true,
      composed: true,
      detail: {}
    }))
  }

  _handleBackdropClick (ev) {
    if (ev.target?.id === 'modal-backdrop') {
      this._closeModal()
    }
  }

  render () {
    if (!this.open) return html``
    return html`
      <div
        id="modal-backdrop"
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="character-name"
        @click=${this._handleBackdropClick}
      >
        <div class="contentModal">
          <button type="button" class="closeButton" aria-label="Cerrar modal" @click=${this._closeModal}>
            CERRAR
          </button>
          <slot></slot>
        </div>
      </div>
    `
  }
}

customElements.define(UiModal.is, UiModal)
