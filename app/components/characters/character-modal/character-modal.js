import { html, LitElement } from 'lit-element'
import { styles } from './character-modal.css'
import { buttonReset } from '../../../styles/button-reset.css'
import { starFillIcon } from '../../../icons/incons'
import '../../ui/ui-modal/ui-modal'
import '../../ui/skeleton/skeleton-character-modal/skeleton-character-modal'

class CharacterModal extends LitElement {
  constructor () {
    super()
    this.open = false
    this.character = null
    this.loading = false
    this.error = ''
  }

  static get is () {
    return 'character-modal'
  }

  static get styles () {
    return [buttonReset, styles]
  }

  static get properties () {
    return {
      open: { type: Boolean },
      character: { type: Object },
      loading: { type: Boolean },
      error: { type: String }
    }
  }

  closeCharacterModal () {
    this.dispatchEvent(
      new CustomEvent('close-character-modal', {
        bubbles: true,
        composed: true
      })
    )
  }

  render () {
    return html`
      <ui-modal
        .open=${this.open}
        @modal-close=${this.closeCharacterModal}
      >
    ${this.renderContent()}</ui-modal>
    `
  }

  renderContent () {
    if (this.loading) {
      return html`<skeleton-character-modal></skeleton-character-modal>`
    }

    if (this.error) {
      return html`<div class="error">${this.error}</div>`
    }

    if (!this.character) {
      return html`<p>No data</p>`
    }

    return html`
    <div class="content">
    <div class="contentImg">
      <figure>
        <img class="imgModal" src=${this.character.image} />
      </figure>
      <div class="contentBtnFavorite">
        <button
          class="btnFav"
        >
        ${starFillIcon(18)}
          <!-- {isFavorite ? (
            <StarFillIcon />
          ) : (
            <StarIcon class="icon} />
          )} -->
        </button>
      </div>
    </div>
    <div>
      <h2 class="title">${this.character?.name}</h2>
      <div class="tagsGrid">
        <span class="tag tagBlue" >
          <strong>Estado:</strong> ${this.character?.status}
        </span>
        <span class="tag tagPurple">
          <strong>Género:</strong> ${this.character?.gender}
        </span>
        <span class="tag tagGreen">
          <strong>Especie:</strong> ${this.character?.species}
        </span>
        <span class="tag tagYellow">
          <strong>Origen:</strong> ${this.character?.origin?.name}
        </span>
        <span class="tag tagOrange">
          <strong>Ubicación:</strong> ${this.character?.location?.name}
        </span>
      </div>
    </div>
</div>
      <!-- <h2>${this.character.name}</h2>
      <img src=${this.character.image}>
      <p>Status: ${this.character.status}</p>
      <p>Species: ${this.character.species}</p> -->
    `
  }
}

customElements.define(CharacterModal.is, CharacterModal)

// import styles from "./character-modal.css.js";
// import { useEffect, useState } from "react";
// import { getCharactersById } from "@/service/rickAndMortyApi";
// import type { Character } from "@/types/character";
// import { CharacterModalSkeleton } from "@/components/ui/skeleton/characterModalSkeleton";
// import Modal from "@/components/ui/modal";
// import { useAppDispatch, useAppSelector } from "@/store/hook";
// import { StarFillIcon, StarIcon } from "@/icons";
// import { toggleFavorite } from "@/store/features/favorites/favoritesSlice";

// type Props = {
//   id: number | null;
//   onClose: () => void;
// };
// export default function CharacterModal({ id, onClose }: Props) {
//   const dispatch = useAppDispatch()
//   const favorites = useAppSelector((state)=>state.favorites)
//   const [data, setData] = useState<Character | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;
//     const fetchDetail = async () => {
//       setLoading(true);
//       setData(null);
//       setError(null);
//       try {
//         const data = await getCharactersById(id);
//         setData(data);
//       } catch (err) {
//         console.error(err);
//         setError("No se pudo cargar el detalle del personaje");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetail();
//   }, [id]);

//   if (!id) return null;

//   const handleClose = () => {
//     setData(null);
//     setError(null);
//     setLoading(false);
//     onClose();
//   };

//   const isFavorite = data && favorites.includes(data?.id)

//   return (
//     <Modal open={!!id} onChange={handleClose}>
//       {loading && <CharacterModalSkeleton />}
//       {!loading && error && <div className={styles.error}>{error}</div>}
//       {!loading && !error && data && (
//         <div className={styles.content}>
//           <>
//             <div className={styles.contentImg}>
//               <figure>
//                 <img className={styles.imgModal} src={data.image} />
//               </figure>
//               <div className={styles.contentBtnFavorite}>
//                 <button
//                   onClick={() => dispatch(toggleFavorite(id))}
//                   className={styles.btnFav}
//                 >
//                   {isFavorite ? (
//                     <StarFillIcon />
//                   ) : (
//                     <StarIcon className={styles.icon} />
//                   )}
//                 </button>
//               </div>
//             </div>
//             <div>
//               <h2 className={styles.title}>{data?.name}</h2>
//               <div className={styles.tagsGrid}>
//                 <span className={`${styles.tag} ${styles.tagBlue}`}>
//                   <strong>Estado:</strong> {data?.status}
//                 </span>
//                 <span className={`${styles.tag} ${styles.tagPurple}`}>
//                   <strong>Género:</strong> {data?.gender}
//                 </span>
//                 <span className={`${styles.tag} ${styles.tagGreen}`}>
//                   <strong>Especie:</strong> {data?.species}
//                 </span>
//                 <span className={`${styles.tag} ${styles.tagYellow}`}>
//                   <strong>Origen:</strong> {data?.origin?.name}
//                 </span>
//                 <span className={`${styles.tag} ${styles.tagOrange}`}>
//                   <strong>Ubicación:</strong> {data?.location?.name}
//                 </span>
//               </div>
//             </div>
//           </>
//         </div>
//       )}
//     </Modal>
//   );
// }
