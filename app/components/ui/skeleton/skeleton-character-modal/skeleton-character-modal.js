import { html, LitElement } from 'lit-element'
import { styles } from './skeleton-character-modal.css'

class SkeletonCharacterModal extends LitElement {
  static get is () {
    return 'skeleton-character-modal'
  }

  static get styles () {
    return styles
  }

  static get properties () {
    return {}
  }

  render () {
    return html`
      <div
      class="modalSkeleton skeleton"
      role="status"
      aria-busy="true"
      aria-label="Cargando detalles del personaje"
    >
      <div class="modalContent skeleton" >Cargando...</div>
    </div>
    `
  }
}

customElements.define(SkeletonCharacterModal.is, SkeletonCharacterModal)
