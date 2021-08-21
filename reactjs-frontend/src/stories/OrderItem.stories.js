import React from "react";
import OrderItem from "../components/OrderItem";

export default {
    title: "Supermarket/OrderItem",
    component: OrderItem,
};

const Template = (args) => <OrderItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    order: { createdAt: "2021-08-14T19:47:08.976304Z", cartDetails: [{ cartId: 1 }], total: 4.67 },
    toggleShowDetails: () => null,
};
