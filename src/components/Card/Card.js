import { useContext, useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";
import { AppContext } from "../../App";

function Card({id, name, imageURL, price, onFavorite, onPlus, favorited=false, loading = false}) {
  const { isItemAdded, favoriteItems } = useContext(AppContext)
  const[isFavorite, setIsFavorite] = useState(favorited)

  useEffect(() => {
    const isInFavorites = favoriteItems?.some((item) => {
      const favProductId = item?.parentId ?? item?.id;
      return Number(favProductId) === Number(id);
    });

    setIsFavorite(Boolean(favorited || isInFavorites));
  }, [favorited, favoriteItems, id]);

  const onClickFavorite = () => {
    onFavorite({id, name, imageURL, price})
    setIsFavorite(!isFavorite)
  }
  const onClickPlus = () => {
    onPlus({id, name, imageURL, price})
  }
    return (
        <div className={styles.card}>
          { loading ?
          <ContentLoader 
            speed={2}
            width={245}
            height={342}
            viewBox="0 0 245 342"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            {/* <rect x="0" y="291" rx="5" ry="5" width="100" height="15" />  */}
            <rect x="0" y="311" rx="5" ry="5" width="60" height="30" /> 
            <rect x="215" y="311" rx="20" ry="20" width="30" height="30" /> 
            <rect x="0" y="270" rx="5" ry="5" width="245" height="15" /> 
            <rect x="0" y="0" rx="15" ry="15" width="245" height="245" />
          </ContentLoader> :
          <>
            <div className={styles.favorite}>
              {onFavorite && (
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={onClickFavorite}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  <img
                    src={`/img/${isFavorite ? "saved" : "unsaved"}.svg`}
                    alt=""
                    width={32}
                    height={32}
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
            <img className={styles.image} src={imageURL} alt={name} width={245} height={245}/>
            <h5>{name}</h5>
            <div className={styles.cardBottom}>
              <div className={styles.cardPrice}>
                <span>Price:</span>
                <b>{price} €</b>
              </div>
              {onPlus && (
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={onClickPlus}
                  aria-label={isItemAdded(id) ? "Remove from cart" : "Add to cart"}
                >
                  <img
                    className={styles.button}
                    src={`/img/${isItemAdded(id) ? "added" : "plus"}.svg`}
                    alt=""
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
          </>
          }
        </div>
    )
}

export default Card;