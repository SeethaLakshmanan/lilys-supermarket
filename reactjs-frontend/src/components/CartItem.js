import React from "react";
import { Row, Col } from "react-bootstrap";
import { GrAdd, GrSubtract } from "react-icons/gr";
import CustomButton from "./CustomButton";

// React functional component to display an item in the cart
const CartItem = (props) => {
    const { product } = props;
    return (
        <div>
            <Row>
                <Col>{product.name} </Col>
                <Col>
                    <CustomButton
                        disabled={product.quantity === 0}
                        onClick={() => props.onRemove()}
                        label={<GrSubtract />}
                    />
                    <span className="button_border">{product.quantity}</span>
                    <CustomButton onClick={() => props.onAdd()} label={<GrAdd />} />
                </Col>
                <Col>€{Math.round(product.price * product.quantity * 100) / 100}</Col>
            </Row>
        </div>
    );
};

export default CartItem;
