import { html, LitElement, nothing } from 'lit-element'
import { styles } from './character-list.css'
import { Characters } from '../../../service/characters.service'
import '../character-card/character-card'
import '../character-modal/character-modal'
import '../../ui/status-message/status-message'
import '../pagination-list/pagination-list'

class CharacterList extends LitElement {
  constructor () {
    super()
    this.staustMssgTitle = 'Sin personajes'
    this.staustMssgDescription = 'No hay resultados para mostrar'
    this.characters = []
    this.info = {}
    this.loading = false
    this.error = ''
    this.currentPage = 0

    this.isOpenModal = false
    this.selectedCharacter = null
    this.detailLoading = false
    this.detailError = ''
    this.charactersApi = new Characters()
  }

  static get is () {
    return 'character-list'
  }

  static get styles () {
    return styles
  }

  static get properties () {
    return {
      staustMssgTitle: { type: String },
      staustMssgDescription: { type: String },
      characters: { type: Array },
      info: { type: Object },
      loading: { type: Boolean },
      error: { type: String },
      currentPage: { type: Number },
      isOpenModal: { type: Boolean, attribute: false },
      selectedCharacter: { type: Object, attribute: false },
      detailLoading: { type: Boolean, attribute: false },
      detailError: { type: String, attribute: false }
    }
  }

  async handleCharacterSelected (e) {
    // El card solo avisa el id; aqui resolvemos el detalle completo.
    const id = e.detail?.id
    if (!id) return

    this.isOpenModal = true
    this.detailLoading = true
    this.detailError = ''
    this.selectedCharacter = null

    try {
      const res = await this.charactersApi.getCharactersById(id)
      this.selectedCharacter = res
    } catch (error) {
      this.detailError = 'Error al cargar el personaje'
    } finally {
      this.detailLoading = false
    }
  }

  _closeModal () {
    // Cerramos el modal y limpiamos el estado temporal del detalle.
    this.isOpenModal = false
    this.selectedCharacter = null
    this.detailLoading = false
    this.detailError = ''
  }

  render () {
    return html`
      ${this.renderHeader}
      ${this.renderCharactersList}
      <character-modal
        .open=${this.isOpenModal}
        .character=${this.selectedCharacter}
        .loading=${this.detailLoading}
        .error=${this.detailError}
        @close-character-modal=${this._closeModal}
      ></character-modal>
    `
  }

  get renderCharactersList () {
    if (this.loading) {
      return html`
        <status-message
          title="Cargando personajes"
          description="Un momento mientras cargamos la lista"
          variant="info"
        ></status-message>
      `
    }

    if (this.error) {
      return html`
        <status-message
          title="No pudimos mostrar los personajes"
          .description=${this.error}
          variant="error"
        ></status-message>
      `
    }

    if (!this.characters.length) {
      return html`
        <status-message
          title=${this.staustMssgTitle}
          description=${this.staustMssgDescription}
          variant="empty"
        ></status-message>
      `
    }

    return html`
      <div
        class="contentList"
        @character-selected=${this.handleCharacterSelected}
      >
        ${this.characters.map(
          (character) =>
            html`<character-card .character=${character}></character-card>`
        )}
      </div>
      <pagination-list .currentPage=${this.currentPage} .info=${this.info}></pagination-list>
      `
  }

  get renderHeader () {
    const total = this.info?.count || 0
    return html`
      <div class="headerList">
        <h2>Personajes</h2>
        ${this.info && !this.error && !this.loading && this.characters.length > 0
          ? html`
              <p>
                ${total} ${total !== 1 ? 'resultados' : 'resultado'} - Pagina 
                ${this.currentPage} de ${this.info?.pages || 0}
              </p>
            `
          : nothing}
      </div>
    `
  }
}

customElements.define(CharacterList.is, CharacterList)
