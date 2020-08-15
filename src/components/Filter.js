import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        console.log("ESDDD",this.props)
        return (
            <div className="filter">
                <div className="filter-result">{this.props.count} Products {" "} </div>
                <div className="filter-sort">Order{" "}
                    <select value={this.props.sort} onChange={this.props.sortProducts}>
                        <option value="Alpha Order">Alpha Order</option>    
                        <option value="Lowest Price">Lowest Price</option>    
                        <option value="Most Recent">Most Recent</option>    
                    </select>
                </div>
            </div>
        )
    }
}
