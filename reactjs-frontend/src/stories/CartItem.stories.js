import React from "react";
import CartItem from "../components/CartItem";

export default {
    title: "Supermarket/CartItem",
    component: CartItem,
};

const Template = (args) => <CartItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    product: { name: "Grapes", price: 0.99, quantity: 2 },
    onRemove: () => null,
    onAdd: () => null,
};
