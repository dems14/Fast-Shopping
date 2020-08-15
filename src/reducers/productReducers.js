import { FETCH_PRODUCTS } from "../types";

export const productsReducer = (state = {}, action) => {

    switch (action.type){
        case FETCH_PRODUCTS:
            let products = action.payload;
            products.forEach(product =>{
                let str = product.categories
                str = str.split(',');

                product.categories = str;
                console.log(product);  
            })
            return {items: action.payload}
        default:
            return state; 
    }
}