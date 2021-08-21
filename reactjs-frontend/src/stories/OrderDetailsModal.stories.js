import React from "react";
import OrderDetailsModal from "../components/OrderDetailsModal";

export default {
    title: "Supermarket/OrderDetailsModal",
    component: OrderDetailsModal,
};

const Template = (args) => <OrderDetailsModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    orderItems: [
        { name: "Apple", quantity: 1, calcPrice: "1.99" },
        { name: "Grapes", quantity: 1, calcPrice: "1.49" },
        { name: "Potato", quantity: 1, calcPrice: "1.19" },
    ],
    show: true,
    handleClose: () => null,
    createdAt: "2021-08-14T19:47:08.976304Z",
    total: 4.67,
};
