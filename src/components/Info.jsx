import React, { useContext } from 'react'
import { AppContext } from '../App';

const Info = ({
  title,
  description,
  image,
  className = "cartEmpty",
  imageClassName = "emptyIcon",
  buttonClassName = "greenButton",
}) => {
  const { setCartOpened } = useContext(AppContext)

  return (
    <div className={className}>
        <img className={imageClassName} src={image} alt="Empty cart" />
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => setCartOpened(false)} className={buttonClassName}>
            <img src="/img/arrow-right.svg" alt="Arrow" width={25} height={25} />
            Back to main page
        </button>
    </div>
  )
}

export default Info;
