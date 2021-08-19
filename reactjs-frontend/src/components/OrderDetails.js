import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getDate } from "../utils/index";
import "../styles/styleSettings.css";

// React class component to display the details of an order in a modal
class OrderDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            orderItems: [],
        };
    }

    loadOrderItems = () => {
        var orderItems = [];
        // concatenate fruits and veggies as products
        let products = this.props.fruits.concat(this.props.vegetables);
        let order = this.props.selectedOrder;

        order.cartDetails.forEach(function (det) {
            var tempItem = {};
            let name = products.filter((p) => p.id === det.itemId)[0].name;
            tempItem["name"] = name;
            tempItem["quantity"] = det.numOfItems;
            tempItem["calcPrice"] = det.calcPrice;
            orderItems.push(tempItem);
        });
        this.setState({ orderItems });
    };

    handleClick = () => {
        this.props.toggle();
    };

    componentDidMount() {
        this.loadOrderItems();
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Ordered on: {getDate(this.props.selectedOrder.createdAt)}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col>Product Name</Col>
                        <Col>Quantity</Col>
                        <Col>Price</Col>
                    </Row>
                    {this.state.orderItems.map((item, index) => (
                        <Row key={index}>
                            <Col>{item.name}</Col>
                            <Col>{item.quantity}</Col>
                            <Col>{item.calcPrice}</Col>
                        </Row>
                    ))}
                    <hr />
                    <Row>
                        <Col style={{ fontWeight: "bold" }}>Total:</Col>
                        <Col></Col>
                        <Col style={{ fontWeight: "bold" }}>{this.props.selectedOrder.total}</Col>
                    </Row>
                </Modal.Body>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return { fruits: state.fruits, vegetables: state.vegetables };
}

export default connect(mapStateToProps, null)(OrderDetails);
