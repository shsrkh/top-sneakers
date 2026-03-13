import Card from "../components/Card/Card";
import { useEffect, useState } from "react";
import axios from "axios";

function Orders({ items, onFavorite, onPlus }) {
  const[isLoading, setIsLoading] = useState(true);
  const[orders, setOrders] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
      const { data } = await axios.get("https://69366fe7f8dc350aff30dc5e.mockapi.io/orders")

      setOrders(data.map((el) => el.items).flat())
      setIsLoading(false)
    }
     catch (error) {
      alert("Error when requesting orders.")
    }
    }
    fetchData()
  }, [])
    return (
      <div className="content">
        <div className="h1-search">
          <h1>Orders</h1>
        </div>

        <div className="sneakers">
          {(isLoading? [...Array(6)] : orders)
          .map((el, index) => (
            <Card
            key={index}
            loading={isLoading}
            {...el}
            />
          ))}
        </div>
      </div>
    )
}

export default Orders;