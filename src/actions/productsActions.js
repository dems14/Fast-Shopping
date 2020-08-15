import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE } from "../types";

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products");
  const data = await res.json();
  console.log(data);
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data,
  });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "Most Recent") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  }
  else {
      sortedProducts.sort((a,b) => (
          sort === "Lowest Price"?
            a.price > b.price ? 1 : -1 
            ? a.price < b.price : 1 : -1
      ))
  }
  dispatch({
      type: ORDER_PRODUCTS_BY_PRICE,
      payload : {
          sort: sort,
          items: sortedProducts
      },
  })
};
