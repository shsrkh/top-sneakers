import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

function Header(props) {
    const { cartItems } = useContext(AppContext)
    const totalPrice = cartItems.reduce((sum, el) => el.price + sum, 0)
    return (
        <header>
          <Link to="/">
          <div className="headerLeft">
            <img src="/img/logo.png" alt="Logo" width={40} height={40} />
            <div>
              <h3>TOP Sneakers</h3>
              <p>Shop for the best sneakers</p>
            </div>
          </div>
          </Link>
        <ul className="headerRight">
          <li>
            <button type="button" className="headerCartButton" onClick={props.onCartClick} aria-label="Open cart">
              <img src="/img/cart.svg" alt="" width={18} height={18} aria-hidden="true" />
              <span>{totalPrice.toFixed(2)} €</span>
            </button>
          </li>
          <li>
            <Link to="/favorites">
            <img src="/img/favorite-header.svg" alt="Favorite icon" width={18} height={18} />
            </Link>
          </li>
          <li>
            <Link to="/orders">
            <img src="/img/user.svg" alt="User icon" width={18} height={18} />
            </Link>
          </li>
        </ul>
      </header>
    )
}

export default Header;