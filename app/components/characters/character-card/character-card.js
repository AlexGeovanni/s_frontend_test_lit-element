import { html, LitElement } from 'lit-element'
import { styles } from './character-card.css'
import { starFillIcon, starIcon } from '../../../icons/incons'
import { buttonReset } from '../../../styles/button-reset.css'
import { ContextConsumer } from '@lit/context'
import { favoritesContext } from '../../../store/favorites-context'

class CharacterCard extends LitElement {
  constructor () {
    super()
    this.character = {}

    this._store = null
    this.listener = null

    this._contextConsumer = new ContextConsumer(this, {
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
    return 'character-card'
  }

  static get styles () {
    return [buttonReset, styles]
  }

  static get properties () {
    return {
      character: { type: Object }
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
  }

  _selectCharacter () {
    this.dispatchEvent(
      new CustomEvent('character-selected', {
        detail: { id: this.character?.id },
        bubbles: true,
        composed: true
      })
    )
  }

  render () {
    const fav = this._store.isFavorite(this.character?.id)
    return html`
      <div class="contentCard">
        <div role="button" class="contentImg" @click=${this._selectCharacter}>
          <figure>
            <img
              class="imgCard"
              src="${this.character.image}"
              alt="character image"
            />
          </figure>
        </div>
        <div>
          <div class="contentInfo">
            <button role="button" class="title" @click=${this._selectCharacter}>${this.character.name}</button>
            <button role="button" class="btnCard" @click=${this.toggleFavorite}>
              ${fav ? starFillIcon(18) : starIcon(18, 'icon')}
            </button>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define(CharacterCard.is, CharacterCard)
