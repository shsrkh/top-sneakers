import Card from "../components/Card/Card"

function Home({ items, searchValue, setSearchValue, onChangeSearchInput, onFavorite, onPlus, isLoading }) {
  const renderItems = () => {
    const filteredItems = items.filter((el) => el.name.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? [...Array(9)] : filteredItems).map((el, index) => (
      <Card
        key={isLoading ? index : el.id}
        onFavorite={onFavorite}
        onPlus={onPlus}
        loading={isLoading}
        {...el}
      />
    ))
  }

    return (
        <div className="content">
        <div className="h1-search">
          <h1>{searchValue ? `Search results for: "${searchValue}"` : "All Sneakers"}</h1>
          <div className="searchBlock">
            <img src="/img/search.svg" alt="Search" width={14} height={14} />
            <input placeholder="Search..." onChange={onChangeSearchInput} value={searchValue} />
            {searchValue && <img onClick={() => setSearchValue("")} className="clear" src="/img/remove.svg" alt="Clear" width={18} height={18} />}
          </div>
        </div>

        <div className="sneakers">
          {renderItems()}
        </div>
      </div>
    )
}

export default Home;