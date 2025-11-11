import { useState, useMemo } from 'react';

// Data should be provided as a static array in the code:
const products = [
  { id: 1, name: 'Laptop', price: 75000 },
  { id: 2, name: 'Smartphone', price: 35000 },
  { id: 3, name: 'Tablet', price: 20000 },
  { id: 4, name: 'Smartwatch', price: 1200 },
];

const SearchLayout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('low');
  const sortField = 'price';

  const filteredItems = useMemo(() => {
    let sortableProducts: any;
    
    // If no search term, if not sortfield and no products, return all data. 
    if (!searchTerm || !sortField || !products) {
      sortableProducts = [...products]; //  Create a shallow copy
    } else {
      //  Create a shallow copy and find search term
      sortableProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // sort by properity provided in sortField
    sortableProducts.sort((a: any, b: any) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (valueA < valueB) {
        return sortOrder === 'low' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === 'high' ? 1 : -1;
      }
      return 0;
    });

    return sortableProducts;
  }, [products, searchTerm, sortField, sortOrder]);

  return (
    <>
      <form autoComplete="off" noValidate>
        <div>
          <label htmlFor="searchField" className="sr-only">
            Search term
          </label>
          <input
            type="text"
            placeholder="Search..."
            name="searchField"
            value={searchTerm} // Controlled by state
            onChange={(e) => setSearchTerm(e.target.value)} // Updates state on change
            className="form-control"
            id="searchField"
          />
        </div>
        <div>
          <label htmlFor="searchOrderField">
            Sort by price
          </label>
          <div className="custom-select">
            <select
              name="searchOrderField"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="form-control"
              id="searchOrderField"
            >
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </form>

      {filteredItems.length > 0 ? (
        <div className="products-section">
          <ul aria-label="product list">
            {filteredItems.map((product: any) => (
              <li key={product.id}>
                <span>{product.name}</span>
                <span>$ {product.price}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No products found</p>
      )}
    </>
  );
};

export default SearchLayout;
