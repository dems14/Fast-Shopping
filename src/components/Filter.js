import React, { Component } from 'react'
import { connect } from 'react-redux'
import {sortProducts} from '../actions/productsActions'

 class Filter extends Component {
    render() {
        return !this.props.filteredProducts? (
            <div>Loading...</div> ) : (
            <div className="filter">
                <div className="filter-result">{this.props.filteredProducts.length} Products {" "} </div>
                <div className="filter-sort">Order{" "}
                    <select value={this.props.sort} onChange={(e) => this.props.sortProducts(this.props.products, e.target.value)}>
                        <option value="Most Recent">Most Recent</option>    
                        <option value="Alpha Order">Alpha Order</option>    
                        <option value="Lowest Price">Lowest Price</option>    
                    </select>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        sort: state.products.sort || 'Most Recent',
        products: state.products.items,
        filteredProducts: state.products.filteredItems
    }),
    {
    sortProducts
    }
)(Filter);
