import React from "react";
import { Modal, Row, Col } from "react-bootstrap";
import { getDate } from "../utils/index";

const OrderDetailsModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ordered on: {getDate(props.createdAt)}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col>Product Name</Col>
                    <Col>Quantity</Col>
                    <Col>Price</Col>
                </Row>
                {props.orderItems.map((item, index) => (
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
                    <Col style={{ fontWeight: "bold" }}>{props.total}</Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default OrderDetailsModal;
