import { css, html, LitElement } from 'lit-element'

class MainLayout extends LitElement {
  static get is () {
    return 'main-layout'
  }

  static get styles () {
    return css`
      *{
        box-sizing: border-box;
        margin: 0;
      }
      .wrapper {
        max-width: 1440px;
        width: 100%;
        margin: 0 auto;
        padding: 2rem 8px;
      }
    `
  }

  render () {
    return html`
      <main class="wrapper">
        <slot></slot>
      </main>
    `
  }
}

customElements.define(MainLayout.is, MainLayout)
