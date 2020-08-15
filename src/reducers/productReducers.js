import { FETCH_PRODUCTS, ORDER_PRODUCTS_BY_PRICE } from "../types";

export const productsReducer = (state = {}, action) => {

    switch (action.type) {

        case ORDER_PRODUCTS_BY_PRICE:
        return {
                ...state, 
                sort: action.payload.sort,
                filteredItems: action.payload.items
        }
        
        case FETCH_PRODUCTS:
            let products = action.payload;
            products.forEach(product =>{
                let str = product.categories
                str = str.split(',');
                product.categories = str; 
        })
        return { items: action.payload, filteredItems: action.payload }

        default:
        return state; 
    }
}