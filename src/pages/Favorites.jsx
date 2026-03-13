import Card from "../components/Card/Card";
import { AppContext } from "../App";
import { useContext } from "react";

function Favorites({ items, onFavorite, onPlus }) {
  const { favoriteItems } = useContext(AppContext)

    return (
      <div className="content">
        <div className="h1-search">
          <h1>Favorites</h1>
        </div>

        <div className="sneakers">
          {favoriteItems
          .map(el => (
            <Card
            key={el.id}
            onFavorite={(el) => onFavorite(el)}
            onPlus={(el) => onPlus(el)}
            favorited={true}
            {...el}
            />
          ))}
        </div>
      </div>
    )
}

export default Favorites;