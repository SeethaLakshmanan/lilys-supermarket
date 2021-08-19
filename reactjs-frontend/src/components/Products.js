import React from "react";
import { connect } from "react-redux";
import Item from "./Item";
import { addItem, removeItem } from "../actionCreators/index";
import Navbar from "./Navbar";

// React class component to display the products available
class Products extends React.Component {
    onAdd = (product) => {
        this.props.addItem({ product });
    };

    onRemove = (product) => {
        this.props.removeItem({ id: product.id });
    };

    getQuantity = (product) => {
        let { cart } = this.props;
        var qty = 0;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === product.id) {
                qty = cart[i].quantity;
                break;
            }
        }
        return qty;
    };

    render() {
        return (
            <div>
                <Navbar />
                {this.props.location.pathname.substring(1) === "fruits" ? (
                    <div>
                        <h3 style={{ textAlign: "center" }}>Fruits</h3>
                        {this.props.fruits.map((product, index) => (
                            <Item
                                product={product}
                                onAdd={() => this.onAdd(product)}
                                onRemove={() => this.onRemove(product)}
                                key={index}
                                quantity={this.getQuantity(product)}
                            />
                        ))}
                    </div>
                ) : this.props.location.pathname.substring(1) === "vegetables" ? (
                    <div>
                        <h3 style={{ textAlign: "center" }}>Vegetables</h3>
                        {this.props.vegetables.map((product, index) => (
                            <Item
                                product={product}
                                onAdd={() => this.onAdd(product)}
                                onRemove={() => this.onRemove(product)}
                                key={index}
                                quantity={this.getQuantity(product)}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        fruits: state.fruits,
        vegetables: state.vegetables,
        cart: state.cart,
    };
}

export default connect(mapStateToProps, { addItem, removeItem })(Products);
