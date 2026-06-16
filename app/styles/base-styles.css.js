import { css } from 'lit-element'

export const baseStyles = css`
  :host {
    box-sizing: border-box;
    display: block;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`
