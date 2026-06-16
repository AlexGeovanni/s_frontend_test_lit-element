import { html, LitElement } from 'lit-element'
import { arrowLeftIcon, arrowRightIcon } from '../../../icons/incons'
import { styles } from './pagination-list.css'
import { buttonReset } from '../../../styles/button-reset.css'

class PaginationList extends LitElement {
  constructor () {
    super()
    this.info = {}
    this.currentPage = 1
  }

  static get is () {
    return 'pagination-list'
  }

  static get styles () {
    return [buttonReset, styles]
  }

  static get properties () {
    return {
      info: { type: Object },
      currentPage: { type: Number }
    }
  }

  _getPages (currentPage, totalPages) {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage >= totalPages - 2) {
      return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [currentPage, currentPage + 1, '...', totalPages - 1, totalPages]
  }

  _getPaginationState () {
    const totalPages = this.info?.pages || 0
    const hasPrev = this.info?.prev !== null
    const hasNext = this.info?.next !== null
    const pages = this._getPages(this.currentPage, totalPages)

    return { totalPages, hasPrev, hasNext, pages }
  }

  _onPageChange (page) {
    const totalPages = this.info?.pages || 1

    if (page < 1 || page > totalPages) return

    this.dispatchEvent(new CustomEvent('page-change', {
      bubbles: true,
      composed: true,
      detail: { page }
    }))
  }

  render () {
    const { hasPrev, hasNext, pages } = this._getPaginationState()
    return html`
      <div class="contentPagination">
      <div class="contentbtns">
        <button
          type="button"
          aria-label="Página anterior"
          class="btnPagination btnPrev"
          .disabled=${!hasPrev}
          @click=${() => this._onPageChange(this.currentPage - 1)}
        >
          ${arrowLeftIcon(18)}
        </button>
        ${pages?.map((page) =>
          page === '...'
            ? html`<span class="btnPagination">…</span>`
            : html`<button
                type="button"
                class="btnPagination ${page === this.currentPage && 'activePage'}"
                @click=${() => this._onPageChange(page)}
              >
                ${page}
              </button>`
        )}
        <button
          type="button"
          aria-label="Ir a la página ${this.currentPage}"
          class="btnPagination"
          .disabled=${!hasNext}
          @click=${() => this._onPageChange(this.currentPage + 1)}
        >
          ${arrowRightIcon(18)}
        </button>
      </div>
    </div>
    `
  }
}

customElements.define(PaginationList.is, PaginationList)
