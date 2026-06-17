import { css } from 'lit-element'

export const styles = css`
  .contentHeader {
    display: flex;
    padding: 0.25rem 0;
    flex-direction: column-reverse;
    gap: 1rem;
  }

  .contentSearch {
    width: 100%;
  }

  @media (min-width: 48rem) {
    .contentHeader {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .contentSearch {
      max-width: 500px;
    }
  }

  .searchLabel {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem;
    background-color: #f7f7f8;
    border-radius: 0.5rem;
    border: 1px solid rgba(0,0,0,0.2);
  }

  .labelInput {
    border: none;
    background: transparent;
    outline: none;
    font-size: var(--font-base);
    width: 100%;
  }

  .btnLink {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #000;
    text-decoration: none;
    transition: color ease 0.2s;
  }

  .btnLink:hover {
    text-decoration: underline;
    color: #5c5c5c;
  }

  .LinkIcon {
      background: #4339f2;
      padding: 0.35rem 0.375rem;
      padding-bottom: 0.25rem;
      border-radius: 0.313rem;
    }

    .icon {
      color: #fff;
    }
`
