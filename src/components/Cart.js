import React, { Component } from 'react';
import formatCurrency from '../util';
import {Fade, Zoom} from "react-awesome-reveal";
import { connect } from 'react-redux';
import Modal from 'react-modal';
import {removeFromCart} from '../actions/cartActions'
import {createOrder, clearOrder, regularCustomerOrder} from '../actions/orderActions'

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCheckout : false,
            showNewCustomer : false,
            showExistingCustomer: false,
            email:"",
            name:"",
            address:"",
            phone:"",
            userName:"",
            errors:""
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    clearFields = () => {
        this.setState({
            email:"",
            name:"",
            address:"",
            phone:"",
            userName:"" 
        })
    }

    createOrder = async (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            phone: this.state.phone,
            userName: this.state.userName,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => (a + c.price * c.count), 0)
        };
        const res = await this.props.createOrder(order);
        this.setState({errors : res})
    }

    regularCustomerOrder = async (e) =>{
        e.preventDefault();
        const order = {
            email: this.state.email,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => (a + c.price * c.count), 0)
        }
        const res = await this.props.regularCustomerOrder(order)
        this.setState({errors : res})
    }
    closeModal = () =>{
        this.props.clearOrder();
    }
    render() {
        const { cartItems, order} = this.props;
        return (
            <div>
                {cartItems.length === 0 ? (<div className="cart cart-header">Cart is empty</div>) :
                    (<div className="cart cart-header">You have {cartItems.length} in the cart</div>)
                }
                { order && <Modal isOpen = {true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>x</button>
                            <div className="order-details">
                                <h3 className="success-message">Your order has been placed.</h3>
                                <h2>Order {order._id} </h2>
                                <ul>
                                    <li>
                                        <div> Name: </div> 
                                        <div> {order.name} </div> 
                                    </li>
                                    <li>
                                        <div> Email: </div> 
                                        <div> {order.email} </div> 
                                    </li>
                                    <li>
                                        <div> Address: </div> 
                                        <div> {order.address} </div> 
                                    </li>
                                    <li>
                                        <div> Total: </div> 
                                        <div> { formatCurrency(order.total) } </div> 
                                    </li>
                                    <li>
                                        <div> Items:
                                            <div> 
                                                {order.cartItems.map((x) => ( 
                                                <div key={x._id}>
                                                    {x.count} {" x "} {x.title}
                                                </div> 
                                            ))}
                                            </div> 
                                        </div> 
                                        
                                    </li>
                                </ul>
                            </div>
                        </Zoom>
                </Modal>}
                <div className="cart">
                    <Fade direction="left" cascade={true}>
                        <ul className="cart-items">
                            {cartItems.map(item => (<li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div>{item.title}</div>

                                <div className="right">
                                    {formatCurrency(item.price)} x {item.count} {" "}
                                    <button className="button" onClick={() => this.props.removeFromCart(item)}>
                                        Remove
                                    </button>
                                </div>

                            </li>))}
                        </ul>
                    </Fade>
                </div>

                {cartItems.length !==0 && (
                    <div>
                        <div className="cart">
                        <div className="total">
                            <div>
                                Total:{" "}
                                { formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0)) }
                            </div>

                            <button onClick={()=>{
                                this.setState({showCheckout: true , showNewCustomer: true, showExistingCustomer: false});
                                this.clearFields();
                            }} className="button primary">New Customer 
                            </button>

                            <button onClick={()=>{
                                this.setState({showCheckout: true, showExistingCustomer: true,  showNewCustomer: false});
                                this.clearFields();
                            }} className="button primary">Existing Customer 
                            </button>
                        </div>
                        </div>
                        {this.state.showCheckout && this.state.showExistingCustomer ? ( 
                        <Fade direction="left" cascade>
                            <div className="cart">
                                <form onSubmit={this.regularCustomerOrder}>

                                    <ul className="form-container">
                                        <li>
                                            <label>Email</label>
                                            <input name="email" type="email" required onChange={this.handleChange}/>
                                        </li>
                                        {this.state.errors && 
                                        <li>
                                            <label className="error-message">{this.state.errors}</label>
                                        </li>
                                        } 
                                        <li>
                                            <button className="button primary" type="submit">Checkout</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </Fade> 
                        ) : (this.state.showCheckout && this.state.showNewCustomer) ? (
                            <Fade direction="left" cascade>
                            <div className="cart">
                                <form onSubmit={this.createOrder}>

                                    <ul className="form-container">

                                        <li>
                                            <label>Full Name</label>
                                            <input name="name" type="text" required onChange={this.handleChange}/>
                                        </li>

                                        <li>
                                            <label>ID</label>
                                            <input name="userName" type="text" required onChange={this.handleChange}/>
                                        </li>

                                        <li>
                                            <label>Address</label>
                                            <textarea className="address-input" name="address" type="textarea" rows="4" required onChange={this.handleChange}/>
                                        </li>
                                        
                                        <li>
                                            <label>Phone Number</label>
                                            <input name="phone" type="number" required onChange={this.handleChange}/>
                                        </li>

                                        <li>
                                            <label>Email</label>
                                            <input name="email" type="email" required onChange={this.handleChange}/>
                                        </li>

                                        {this.state.errors && 
                                        <li>
                                            <label className="error-message">{this.state.errors}</label>
                                        </li>
                                        } 

                                        <li>
                                            <button className="button primary" type="submit">Checkout</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </Fade>
                        ) : <div></div>}
                    </div>
                    
                )}
            </div>
        )
    }
}
export default connect ((state) => ({cartItems: state.cart.cartItems, order: state.order.order})

,{removeFromCart, createOrder, clearOrder, regularCustomerOrder}

)(Cart);