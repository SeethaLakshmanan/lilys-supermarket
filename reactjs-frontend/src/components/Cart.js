import React from "react";
import { connect } from "react-redux";
import { Accordion, Row, Col } from "react-bootstrap";
import { withRouter, Redirect } from "react-router-dom";

import { emptyCart, addItem, removeItem, placeOrder, reset } from "../actionCreators/index";
import CartItem from "./CartItem";
import { RouteAuth } from "./Navbar";
import { compose } from "redux";
import CustomButton from "./CustomButton";
import Navbar from "./Navbar";

// React class component that renders the cart
class Cart extends React.Component {
    emptyCart = () => {
        if (window.confirm("Are you sure you want to empty the cart?")) {
            this.props.emptyCart();
        }
    };

    placeOrder = () => {
        if (RouteAuth.isAuthenticated) {
            // logged in so continue with placing the order...
            if (window.confirm("Are you sure you want to place the order?")) {
                // call redux function (action creator) to place the order
                this.props.placeOrder({
                    userId: RouteAuth.userId,
                    cart: this.props.cart,
                    total: this.props.total,
                });
            }
        } else {
            // redirect to login in order to place the order
            this.props.history.push("/login");
        }
    };

    startShopping = () => {
        this.props.history.push("/");
    };

    onAdd = (product) => {
        this.props.addItem({ product });
    };

    onRemove = (product) => {
        this.props.removeItem({ id: product.id });
    };

    getProduct = (itemList, id) => {
        var product = null;
        itemList.forEach(function (f) {
            if (f.id === id) {
                product = f;
            }
        });
        return product;
    };

    // Separate items in the cart by category
    getItemsByCategory = (category) => {
        const items = this.props.cart
            .filter((item) => item.category === category)
            .map((filtered, index) => (
                <CartItem
                    product={filtered}
                    onAdd={() => this.onAdd(filtered)}
                    onRemove={() => this.onRemove(filtered)}
                    key={index}
                />
            ));
        return items;
    };

    componentWillUnmount() {
        if (this.props.orderStatus === "ORDER_PLACED") {
            this.props.reset();
        }
    }

    render() {
        let { cart, total, orderStatus } = this.props;
        var fruits = this.getItemsByCategory("fruits");
        var vegetables = this.getItemsByCategory("vegetables");

        if (orderStatus === "ORDER_PLACED") {
            alert("Your order has been placed successfully!");
            return <Redirect to="/" push />;
        }
        return (
            <div>
                <Navbar />
                <div className="container">
                    {cart.length <= 0 ? (
                        <div style={{ textAlign: "center" }}>
                            <h3>Your cart is empty!</h3>
                            <br />
                            <CustomButton onClick={this.startShopping} label="Start Shopping" />
                        </div>
                    ) : null}
                    <div>
                        {cart.length > 0 ? (
                            <Row>
                                <Col>
                                    <Accordion style={{ marginTop: 10 }}>
                                        {fruits.length > 0 ? (
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Fruits</Accordion.Header>
                                                <Accordion.Body>{fruits}</Accordion.Body>
                                            </Accordion.Item>
                                        ) : null}
                                        {vegetables.length > 0 ? (
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Vegetables</Accordion.Header>
                                                <Accordion.Body>{vegetables}</Accordion.Body>
                                            </Accordion.Item>
                                        ) : null}
                                    </Accordion>
                                </Col>
                                <Col>
                                    <div style={{ fontSize: "24px" }}>Total: €{total}</div>
                                    <div>
                                        <CustomButton
                                            onClick={this.placeOrder}
                                            label="Place Order"
                                        />
                                    </div>
                                    <div>
                                        <CustomButton
                                            onClick={this.emptyCart}
                                            label="Empty Cart"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        ) : null}
                    </div>
                </div>
                {/* If order is placed, navigate to homepage else show error message */}
                {orderStatus === "ERROR" ? (
                    <div style={{ backgroundColor: "lightsalmon" }}>
                        Oops! An error occured during the order placement. Please try again later.
                    </div>
                ) : null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    var total = 0.0;
    for (let i = 0; i < state.cart.length; i++) {
        total += state.cart[i].price * state.cart[i].quantity;
    }

    return {
        cart: state.cart,
        total: Math.round((total + Number.EPSILON) * 100) / 100,
        orderStatus: state.orderStatus,
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps, { emptyCart, addItem, removeItem, placeOrder, reset })
)(Cart);
