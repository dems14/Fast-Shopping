import { CREATE_ORDER, CLEAR_CART, CLEAR_ORDER } from "../types"

export const createOrder = (order) => async (distpatch) => {

    let clientBody = {
        ClientId: 0,
        Name: order.name,
        UserName:order.userName,
        Address: order.address,
        Email: order.email,
        Phone: order.phone,
    }

    const valid = await fetch("/api/clients/" + order.email);
    let emailValidation = await valid.json();

    if(emailValidation.length === 0) {
        const res = await fetch("/api/clients", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(clientBody),
        });
        const client = await res.json();
    
        const cartItems = order.cartItems.map(x => {
            return {title: x.title, count: x.count}
        });
    
        let orderBody = {
            _id: 0,
            ClientId : Number(client),
            total: order.total,
            cartItems: JSON.stringify(cartItems)
        }
    
        await fetch("/api/clients/orders", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(orderBody),
        })
        .then(res=> res.json())
        .then(data => {
            data.address = order.address;
            data.email = order.email;
            data.name = order.name;
            data.cartItems = order.cartItems;
            data.total = order.total;
            console.log(data);
            distpatch({
                type:CREATE_ORDER, payload:data
            });
            localStorage.clear("cartItems");
            distpatch({
                type: CLEAR_CART
            })
        });
        return false;
    }
    else
    return "Email already exist";
};

export const regularCustomerOrder = (order) => async (distpatch) => {

    const res = await fetch("/api/clients/" + order.email);
    let client = await res.json();

    if(client.length > 0) {
        client = client[0];

        const cartItems = order.cartItems.map(x => {
            return {title: x.title, count: x.count}
        });

        let orderBody = {
            _id: 0,
            ClientId : client.ClientId,
            total: order.total,
            cartItems: JSON.stringify(cartItems)
        }

        await fetch("/api/clients/orders", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(orderBody),
        })
        .then(res=> res.json())
        .then(data => {
            data.address = client.Address;
            data.email = client.Email;
            data.name = client.Name;
            data.cartItems = order.cartItems;
            data.total = order.total;
            console.log(data);
            distpatch({
                type:CREATE_ORDER, payload:data
            });
            localStorage.clear("cartItems");
            distpatch({
                type: CLEAR_CART
            })
        });
        return false;
    }else {
        return "Email doesn't exist";  
    }
};

export const clearOrder = () => (dispatch) => {
    dispatch({ type: CLEAR_ORDER })
}