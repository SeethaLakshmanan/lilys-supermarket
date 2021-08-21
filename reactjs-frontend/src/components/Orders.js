import React from "react";
import { withRouter } from "react-router-dom";
import Navbar, { RouteAuth } from "./Navbar";
import OrderItem from "./OrderItem";
import OrderDetails from "./OrderDetails";
import CustomButton from "./CustomButton";

// React class component to fetch and display a user's orders
class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            selectedOrder: {},
            shouldShowDetails: false,
        };
    }

    toggleShowDetails = (order = {}) => {
        if (Object.keys(order).length !== 0) {
            this.setState({
                shouldShowDetails: !this.state.shouldShowDetails,
                selectedOrder: order,
            });
        } else {
            this.setState({ shouldShowDetails: !this.state.shouldShowDetails });
        }
    };

    processOrders = (ordersJson) => {
        var orders = [];
        Object.keys(ordersJson).forEach(function (key) {
            orders.push(ordersJson[key]);
        });
        this.setState({ orders: orders });
    };

    // orders not stored in redux (yet) since no other component in the app needs
    // to access it
    loadOrders = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: RouteAuth.userId }),
        };
        fetch("http://127.0.0.1:8000/shopping_api/loadOrders", requestOptions)
            .then((response) => response.json())
            .then((ordersJson) => this.processOrders(ordersJson))
            .catch((err) => {
                console.log("Error: " + err);
                this.setState({
                    errMsg: "Server not available",
                });
            });
    };

    startShopping = () => {
        this.props.history.push("/");
    };

    componentDidMount() {
        if (RouteAuth.isAuthenticated) this.loadOrders();
    }

    render() {
        let { orders } = this.state;
        return (
            <div>
                <Navbar />
                {!RouteAuth.isAuthenticated ? (
                    <div style={{ textAlign: "center" }}>
                        <h3>Login to see your orders!!</h3>
                    </div>
                ) : orders.length > 0 ? (
                    <div className="cart-items common">
                        {orders.reverse().map((order, index) => (
                            <OrderItem
                                key={index}
                                toggleShowDetails={this.toggleShowDetails}
                                order={order}
                            />
                        ))}
                        {this.state.shouldShowDetails ? (
                            <OrderDetails
                                selectedOrder={this.state.selectedOrder}
                                show={this.state.shouldShowDetails}
                                handleClose={this.toggleShowDetails}
                            />
                        ) : null}
                    </div>
                ) : (
                    <div style={{ textAlign: "center" }}>
                        <h3>You did not place any orders!</h3>
                        <br />
                        <CustomButton onClick={this.startShopping} label="Start Shopping" />
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(Orders);
