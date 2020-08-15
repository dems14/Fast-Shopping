import { CREATE_ORDER, CLEAR_CART, CLEAR_ORDER } from "../types"

export const createOrder = (order) => (distpatch) => {

    fetch("/api/orders", {
        method:"POST",
        headers:{"Content-Type":"application/json"
    },
    body: JSON.stringify(order),
    })
    .then(res=>res.json())
    .then(data=>{
        distpatch({
            type:CREATE_ORDER, payload:data
        });
        localStorage.clear("cartItems");
        distpatch({
            type: CLEAR_CART, payload
        })
    });
};

export const clearOrder = () => (dispatch) => {
    dispatch({ type: CLEAR_ORDER })
}