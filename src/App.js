import React from 'react';
import data from './data.json'
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store'
import { Provider } from 'react-redux';


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products : data.products,
      sort: "",
      cartItems: JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) : []
    };
  }

  createOrder = (order) => {
    alert("implemented later"+ order.name);
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems:  cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem("cartItems",JSON.stringify(cartItems.filter((x) => x._id !== product._id)));
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false
    cartItems.forEach((item) =>{
      if(item._id === product._id) {
        item.count ++;
        alreadyInCart = true;
      }
    });

    if(!alreadyInCart) {
      cartItems.push({...product, count: 1})
    }

    this.setState({cartItems});
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
  }
  sortProducts = (event) => {

    console.log(event.target.value);
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice()
      .sort((a,b) => 
          sort === "Lowest Price"
          ? a.price > b.price
          ? 1
          : -1
          : sort === "Alpha Order" 
          ? a.price < b.price
          ? 1
          :-1
          : a._id > b._id
          ? 1
          :-1
       ),
    }))
  }

  render(){
    return (
      <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">Fast Shopping</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
                <Filter count={this.state.products.length} 
                sort={this.state.sort}
                sortProducts={this.sortProducts}
                >
                </Filter>
                <Products products={this.state.products} addToCart={this.addToCart}></Products>
            </div>
            <div className="sidebar">
                <Cart 
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}>
                </Cart>
            </div>
          </div>
        </main>
        <footer>
          All right reserved
        </footer>
      </div>
      </Provider>
      );  

  }
}

export default App;
