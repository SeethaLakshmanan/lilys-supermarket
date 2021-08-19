import React from "react";
import { Card } from "react-bootstrap";
import CustomButton from "./CustomButton";
import "../styles/styleSettings.css";
import { getDate } from "../utils";

// React functional component to display an item in the order
const OrderItem = (props) => {
    let { order } = props;
    return (
        <Card>
            <Card.Body className="card-body">
                <Card.Title style={{ fontWeight: "bold" }}>{getDate(order.createdAt)}</Card.Title>
                <Card.Text>Order Id: {order.cartDetails[0].cartId}</Card.Text>
                <Card.Text>
                    Total: {order.total}
                    <CustomButton
                        className="right"
                        onClick={() => props.toggleShowDetails(order)}
                        label={"View Order Details"}
                    />
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default OrderItem;
