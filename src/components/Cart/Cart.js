import { useContext, useState } from "react";
import Info from "../Info";
import { AppContext } from "../../App";
import axios from "axios";
import styles from "./Cart.module.scss";

function Cart(props) {
  const { cartItems, setCartItems } = useContext(AppContext)
  const [orderId, setOrderId] = useState(null)
  const [isOrderCompleted, setIsOrderCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const totalPrice = cartItems.reduce((sum, el) => el.price + sum, 0)

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.post("https://69366fe7f8dc350aff30dc5e.mockapi.io/orders",
        {items: cartItems})
      setOrderId(data.id)
      setIsOrderCompleted(true)
      setCartItems([])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete(`https://69344f054090fe3bf01f964d.mockapi.io/cart/${item.id}`)
      }
    } catch (error) {
      alert("Order could not be completed!")
    }
    setIsLoading(false)
  }
    return (
        <div className={`${styles.overlay} ${props.opened ? styles.overlayVisible : ""}`}>
        <div className={styles.shoppingCart}>
          <h2 className={styles.cartHeading}>
            Your Cart{" "}
            <button type="button" className={styles.closeCartButton} onClick={props.onClose} aria-label="Close cart">
              <img className={styles.closeCart} src="/img/remove.svg" alt="" width={32} height={32} aria-hidden="true" />
            </button>
          </h2>

          { cartItems.length > 0 ?
          <>
            <div className={styles.items}>
              {cartItems.map(el => (
                <div key={el.id} className={styles.cartItem}>
                  <img src={el.imageURL} alt="Sneakers" width={70} height={70} style={{marginRight: 20}}/>
                  <div style={{marginRight: 20}}>
                    <p>{el.name}</p>
                    <b>{el.price.toFixed(2)} €</b>
                  </div>
                 <button type="button" onClick={() => props.onRemove(el.id)} className={styles.deleteBtn} aria-label="Remove item from cart">
                  <img src="/img/remove.svg" alt="" width={32} height={32} aria-hidden="true" />
                 </button>
                </div>
             ))}
           </div>
          <div className={styles.cartTotalBlock}>
            <ul>
              <li>
                <span>
                  Total:
                </span>
               <div></div>
               <b>{totalPrice.toFixed(2)} €</b>
             </li>
             <li>
                <span>
                 Tax 19%:
               </span>
                <div></div>
                <b>{(totalPrice * 0.19).toFixed(2)} €</b>
             </li>
              </ul>
              <button disabled={isLoading} className={`greenButton ${styles.greenButton}`} onClick={onClickOrder}>Check out <img src="/img/arrow-right.svg" alt="Arrow Right" width={25} height={25} /></button>
            </div>
          </>
          :
          <Info
            title={isOrderCompleted ? "Your order has been confirmed" : "Your cart is empty"}
            description={isOrderCompleted ? `Your order #${orderId} will soon be handed over to the courier for delivery.` : "Add at least one pair of sneakers to complete the order."}
            image={isOrderCompleted ? "/img/complete-order.svg" : "/img/empty-cart.svg"}
            className={styles.cartEmpty}
            imageClassName={styles.emptyIcon}
            buttonClassName={`greenButton ${styles.greenButton}`}
          />
          
          }
        </div>
      </div>
    )
}

export default Cart;