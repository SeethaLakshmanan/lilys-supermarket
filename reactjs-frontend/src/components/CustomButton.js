import React from "react";
import { Button } from "react-bootstrap";

// React functional component to display a button
const CustomButton = (props) => {
    return (
        <Button
            style={{
                color: "black",
                backgroundColor: "lightblue",
                margin: 5,
            }}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.label}
        </Button>
    );
};

export default CustomButton;
