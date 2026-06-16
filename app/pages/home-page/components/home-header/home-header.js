import { css, html, LitElement } from 'lit-element'

class HomeHeader extends LitElement {
  static get is () {
    return 'home-header'
  }

  static styles = css`
    .contentTitlePage {
      text-align: center;
      padding: 2rem;
      margin-bottom: 0.25rem;
    }
  `

  static get properties () {
    return {}
  }

  render () {
    return html`
      <header>
        <div class="contentTitlePage">
          <h1>Explorador de personajes de Rick y Morty</h1>
          <p>Explora, busca y filtra personajes en todo el multiverso.</p>
        </div>
      </header>
    `
  }
}

customElements.define(HomeHeader.is, HomeHeader)
