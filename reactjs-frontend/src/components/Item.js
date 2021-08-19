import React from "react";
import { Card } from "react-bootstrap";
import { GrAdd, GrSubtract } from "react-icons/gr";
import CustomButton from "./CustomButton";
import "../styles/styleSettings.css";

// React functional component to display a product
const Item = (props) => {
    const { product, quantity } = props;
    return (
        <div className="box-border-img">
            <Card bg="light" text="dark">
                <Card.Body className="card-body">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>€{product.price}</Card.Text>
                    <CustomButton
                        disabled={quantity === 0}
                        onClick={() => props.onRemove()}
                        label={<GrSubtract />}
                    />
                    <span className="button_border">{quantity}</span>
                    <CustomButton label={<GrAdd />} onClick={() => props.onAdd()} />
                </Card.Body>
            </Card>
        </div>
    );
};

export default Item;
