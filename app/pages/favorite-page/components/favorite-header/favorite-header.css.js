import { css } from 'lit-element'

export const styles = css`
.contentTitlePage{
  text-align: center;
  padding: 2rem;
  margin-bottom: 0.25rem;
}

.contentTitlePage h1{
  margin: 0;
}

.nav {
  display: flex;
  align-items: center;
}
.btnLink {
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0.25rem;
  padding-right: 0.625rem;
  color: #000;
  font-size: var(--font-base);
  transition: color ease 0.2s;
}
.btnLink:hover {
  text-decoration: underline;
  color: #5c5c5c;
}
.btnLink span {
  padding: 0.375rem;
  padding-bottom: 0.225rem;
  background-color: #2d68a2;
  border-radius: 0.313rem;
}

`
