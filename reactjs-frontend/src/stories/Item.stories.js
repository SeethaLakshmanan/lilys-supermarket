import React from "react";
import Item from "../components/Item";

export default {
    title: "Supermarket/Item",
    component: Item,
};

const Template = (args) => <Item {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    product: { name: "Grapes", price: 0.99 },
    quantity: 2,
    onRemove: () => null,
    onAdd: () => null,
};
