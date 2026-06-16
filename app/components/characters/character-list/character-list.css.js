import { css } from 'lit-element'

export const styles = css`
.headerList{
  padding: 0 1rem;
}
.headerList h2{
  /* text-3xl font-bold tracking-tight text-balance */
  font-weight: bold;
  font-size: 1.575rem;
}

.headerList p{
  /* text-3xl font-bold tracking-tight text-balance */
  color: #737373;
  font-size: var(--font-base);
}

.contentList {
    padding: 0.25rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  @media (min-width: 48rem) {
    .contentList {
      grid-template-columns: repeat(3, 1fr);
      padding: 0.5rem;
      gap: 1rem;
    }
  }

  @media (min-width: 64rem) {
    .contentList {
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
  }

.contentEmpty {
  background-color: #eeeeee;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 80dvh;
  margin:0.5rem 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #696969;
}
`
