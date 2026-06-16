import { html, LitElement } from 'lit-element'
import { styles } from './character-modal.css'
import { buttonReset } from '../../../styles/button-reset.css'
import { starFillIcon, starIcon } from '../../../icons/incons'
import '../../ui/ui-modal/ui-modal'
import '../../ui/skeleton/skeleton-character-modal/skeleton-character-modal'
import { ContextConsumer } from '@lit/context'
import { favoritesContext } from '../../../store/favorites-context'

class CharacterModal extends LitElement {
  constructor () {
    super()
    this.open = false
    this.character = null
    this.loading = false
    this.error = ''

    this._store = null
    this.listener = null

    this.contextConsumer = new ContextConsumer(this, {
      context: favoritesContext,
      callback: value => {
        this._store = value

        this.unsubscribeStore()
        this.subscribeStore()

        this.requestUpdate()
      }
    })
  }

  static get is () {
    return 'character-modal'
  }

  static get styles () {
    return [buttonReset, styles]
  }

  static get properties () {
    return {
      open: { type: Boolean },
      character: { type: Object },
      loading: { type: Boolean },
      error: { type: String }
    }
  }

  subscribeStore () {
    if (!this._store) return

    this._listener = () => this.requestUpdate()
    this._store.addEventListener('change', this._listener)
  }

  unsubscribeStore () {
    if (!this._store || !this._listener) return

    this._store.removeEventListener('change', this._listener)
  }

  disconnectedCallback () {
    this.unsubscribeStore()
    super.disconnectedCallback()
  }

  toggleFavorite () {
    this._store.toggle(this.character?.id)
    // this.closeCharacterModal()
  }

  closeCharacterModal () {
    this.dispatchEvent(
      new CustomEvent('close-character-modal', {
        bubbles: true,
        composed: true
      })
    )
  }

  render () {
    return html`
      <ui-modal
        .open=${this.open}
        @modal-close=${this.closeCharacterModal}
      >
         ${this.renderContent()}
      </ui-modal>
    `
  }

  renderContent () {
    if (this.loading) {
      return html`<skeleton-character-modal></skeleton-character-modal>`
    }

    if (this.error) {
      return html`<div class="error">${this.error}</div>`
    }

    if (!this.character) {
      return html`<p>No data</p>`
    }

    const fav = this._store.isFavorite(this.character?.id)

    return html`
    <div class="content">
    <div class="contentImg">
      <figure>
        <img class="imgModal" src=${this.character.image} />
      </figure>
      <div class="contentBtnFavorite">
        <button
          class="btnFav"
          @click=${this.toggleFavorite}
        >
         ${fav ? starFillIcon(18) : starIcon(18)}
        </button>
      </div>
    </div>
    <div>
      <h2 class="title">${this.character?.name}</h2>
      <div class="tagsGrid">
        <span class="tag tagBlue" >
          <strong>Estado:</strong> ${this.character?.status}
        </span>
        <span class="tag tagPurple">
          <strong>Género:</strong> ${this.character?.gender}
        </span>
        <span class="tag tagGreen">
          <strong>Especie:</strong> ${this.character?.species}
        </span>
        <span class="tag tagYellow">
          <strong>Origen:</strong> ${this.character?.origin?.name}
        </span>
        <span class="tag tagOrange">
          <strong>Ubicación:</strong> ${this.character?.location?.name}
        </span>
      </div>
    </div>
</div>
      <!-- <h2>${this.character.name}</h2>
      <img src=${this.character.image}>
      <p>Status: ${this.character.status}</p>
      <p>Species: ${this.character.species}</p> -->
    `
  }
}

customElements.define(CharacterModal.is, CharacterModal)
