import { css } from 'lit-element'

export const styles = css`

  .contentCard {
    padding: 0.625rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }
  .contentImg {
    overflow: hidden;
    cursor: pointer;
    max-width: 400px;
    max-height: 400px;
    border-radius: 0.25rem;
  }
  .contentImg > figure {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .imgCard {
    display: block;
    width: 100%;
    height: 100%;
    aspect-ratio: 1/1;
    object-fit: fill;
    transition: transform ease 0.2s;
  }
  .imgCard:hover {
    transform: scale(1.1);
  }

  .contentInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid; */
    height: auto;
  }

  .title {
    font-weight: 600;
    color: #000;
    font-size: var(--font-base);
    cursor: pointer;
    transition: color ease 0.2s;

    @media (width:64rem) {
      font-size: var(--font-lg);
    }
  }

  .title:hover {
    color: #5c5c5c;
  }

  .btnCard {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e8e7e7;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }
  @media (min-width: 64rem) {
    .btnCard {
      width: 1.8rem;
      height: 1.8rem;
    }
  }

  .icon {
    color: #838a91;
  }
`
