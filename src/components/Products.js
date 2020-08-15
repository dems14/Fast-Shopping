import React, { Component } from 'react';
import formatCurrency from '../util';
import {Fade, Zoom} from 'react-awesome-reveal';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import {fetchProducts} from '../actions/productsActions';
import {addToCart} from '../actions/cartActions';

Modal.setAppElement('#root')


 class Products extends Component {
    constructor(props){
        super(props);
            this.state = {
                product: null
            }
        }

    componentDidMount(){
        this.props.fetchProducts();

    };
    openModal = (product) =>{
        this.setState({product});
    }

    closeModal = () =>{
        this.setState({product: null});
    }
    render() {
        const {product} = this.state;
        
        return (
            <div>
                <Fade direction="top" cascade>
                    {
                        !this.props.products ? <div>Loading</div>:
                        <ul className="products">
                        {this.props.products.map((product) => (
                            <li key={product._id}>
                                <div className="product">
                                    <a href={"#"+ product._id} onClick={() => this.openModal(product)}>
                                        <img src={product.image} alt={product.title}/>
                                        <p>{product.title}</p>
                                    </a>
                                    <div className="product-price">
                                        <div>
                                            {formatCurrency(product.price)}
                                            <button onClick={() => this.props.addToCart(product)} className="button primary">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                        </li> ))}
                    </ul> 
                    } 
                </Fade>
                {product && 
                <Modal
                isOpen={true}
                onRequestClose = {this.closeModal}
                >
                    <Zoom>
                        <button style={{display: "inline-block"}} className="close-modal" onClick={this.closeModal}>x</button>
                        <div className="product-details">
                            <img src = {product.image} alt={product.title}></img>
                            <div className="product-details-description">
                                <p>
                                    <strong>{product.title}</strong>
                                </p>
                                <p>
                                    {product.description}
                                </p>
                                <p>
                                    Categories:{" "}
                                    { product.categories.map(x => (
                                        <span key={x}> {" "} <button className="button" key={x}>{x}</button></span>
                                    ))}
                                </p>
                                <div className="product-price">
                                    <div>
                                        {formatCurrency(product.price)}
                                        <button className="button primary" onClick={() =>{
                                            this.props.addToCart(product);
                                            this.closeModal();
                                        }}>
                                        Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </Modal>}
            </div>
        )}
}
export default connect ((state) => ({ products: state.products.filteredItems }), {
    fetchProducts,
    addToCart
    
})(Products)