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
          {favoriteItems.map(el => (
            <Card
            key={el.id}
            {...el}
            id={el.parentId}
            onFavorite={(el) => onFavorite(el)}
            onPlus={(el) => onPlus(el)}
            favorited={true}
            />
            ))}
        </div>
      </div>
    )
}

export default Favorites;