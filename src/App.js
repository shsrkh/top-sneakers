import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

export const AppContext = createContext({})

function App() {
  const[items, setItems] = useState([])
  const[cartItems, setCartItems] = useState([])
  const[favoriteItems, setFavoriteItems] = useState([])
  const[searchValue, setSearchValue] = useState("")
  const[cartOpened, setCartOpened] = useState(false)
  const[isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setErrorMessage("");
        const [cartItemsRes, favItemsRes, itemsRes] = await Promise.all([
          axios.get("https://69344f054090fe3bf01f964d.mockapi.io/cart"),
          axios.get("https://69366fe7f8dc350aff30dc5e.mockapi.io/favorites"),
          axios.get("https://69344f054090fe3bf01f964d.mockapi.io/sneakers"),
        ]);

        setCartItems(cartItemsRes.data);
        setFavoriteItems(favItemsRes.data);
        setItems(itemsRes.data);
      } catch (error) {
        setErrorMessage("Could not load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    if (!cartOpened) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [cartOpened]);

  const onAddToCart = useCallback(async (product) => {
    try {
      setErrorMessage("");
      const existing = cartItems.find(
        (item) => Number(item.parentId) === Number(product.id)
      );

      if (existing) {
        await axios.delete(
          `https://69344f054090fe3bf01f964d.mockapi.io/cart/${existing.id}`
        );
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(existing.id))
        );
        return;
      }

      const payload = { ...product, parentId: product.id };
      const { data } = await axios.post(
        "https://69344f054090fe3bf01f964d.mockapi.io/cart",
        payload
      );
      setCartItems((prev) => [...prev, data]);
    } catch (error) {
      setErrorMessage("Could not update cart. Please try again.");
    }
  }, [cartItems]);

  const onRemoveFromCart = async (id) => {
    try {
      setErrorMessage("");
      await axios.delete(`https://69344f054090fe3bf01f964d.mockapi.io/cart/${id}`)
      setCartItems(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      setErrorMessage("Could not remove item from cart. Please try again.")
    }
  }

  const onAddToFavorite = useCallback(async (product) => {
  try {
    setErrorMessage("");
    
    const existing = favoriteItems.find(
      (item) => Number(item.parentId) === Number(product.id)
    );

    if (existing) {
      await axios.delete(
        `https://69366fe7f8dc350aff30dc5e.mockapi.io/favorites/${existing.id}`
      );
      setFavoriteItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(existing.id))
      );
      return;
    }

    const originalId = product.parentId !== undefined ? product.parentId : product.id;
    const payload = { ...product, parentId: originalId };
    const { data } = await axios.post(
      "https://69366fe7f8dc350aff30dc5e.mockapi.io/favorites",
      payload
    );
    setFavoriteItems((prev) => [...prev, data]);
  } catch (error) {
    setErrorMessage("Could not update favorites. Please try again.");
  }
}, [favoriteItems]);

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = useCallback(
    (id) => cartItems.some((item) => Number(item.parentId) === Number(id)),
    [cartItems]
  );

  const contextValue = useMemo(
    () => ({
      items,
      cartItems,
      favoriteItems,
      isItemAdded,
      onAddToFavorite,
      onAddToCart,
      setCartOpened,
      setCartItems,
    }),
    [
      items,
      cartItems,
      favoriteItems,
      isItemAdded,
      onAddToFavorite,
      onAddToCart,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>
      <div className="wrapper">
        {errorMessage && (
          <div className="appError" role="alert">
            {errorMessage}
          </div>
        )}
        <Cart
        onClose={() => setCartOpened(false)}
        onRemove={onRemoveFromCart}
        opened={cartOpened}
        />
        <Header onCartClick={() => setCartOpened(true)} />
        <Routes>
          <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onFavorite={onAddToFavorite}
              onPlus={onAddToCart}
              isLoading={isLoading}
            />}
          />
          <Route
          path="/favorites"
          element={
            <Favorites
              onFavorite={onAddToFavorite}
              onPlus={onAddToCart}
            />}
          />
          <Route
          path="/orders"
          element={
            <Orders
              items={favoriteItems}
              onFavorite={onAddToFavorite}
              onPlus={onAddToCart}
            />}
          />
        </Routes>
        <Footer />
        </div>
      </AppContext.Provider>
  );
}

export default App;
