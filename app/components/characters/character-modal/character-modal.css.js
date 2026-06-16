import { css } from 'lit-element'

export const styles = css`
.content {
  background: #fff;
  width: 100%;
}

.contentImg {
  overflow: hidden;
  max-width: 500px;
  max-height: 400px;
  border-radius: 0.25rem;
  position: relative;
  @media (min-width: 64rem) {
    margin: 0 0 1rem;
  }
}
.contentImg > figure {
  width: 100%;
  height: 100%;
  margin: 0;
}

.imgModal {
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  object-fit: fill;
}

.contentBtnFavorite{
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
}
.btnFav {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e8e7e7;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  @media (min-width: 64rem) {
    width: 2rem;
    height: 2rem;
  }
}

.icon{
  color: #838A91;
}

.title {
  /* font-size: var(--font-base); */
  font-weight: 600;
  text-align: center;
  font-weight: bold;
  margin: 0 0 0.5rem;
  @media (min-width: 64rem) {
    font-size: var(--font-lg);
    margin: 0 0 1rem;
  }
}

.tagsGrid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 400px;
  gap: 8px;
}

.tag {
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 12px;
  color: #2a2030;
  white-space: nowrap;
}

.tag strong {
  font-weight: 700;
}

.tagBlue {
  background-color: #cfe9f1;
}

.tagPurple {
  background-color: #d4cae6;
}

.tagGreen {
  background-color: #d4ecd0;
}

.tagYellow {
  background-color: #f4e4b8;
}

.tagOrange {
  background-color: #f5d9c4;
}

.error{
  width: 100%;
  height:520px ;
  background: #ffffff;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c73a3a;
}
`
