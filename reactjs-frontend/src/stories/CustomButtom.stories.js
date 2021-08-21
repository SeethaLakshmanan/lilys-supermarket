import React from "react";

import CustomButton from "../components/CustomButton";

export default {
    title: "Supermarket/CustomButton",
    component: CustomButton,
};

const Template = (args) => <CustomButton {...args} />;

export const Enabled = Template.bind({});
Enabled.args = {
    onClick: () => alert("You clicked me!"),
    disabled: false,
    label: "I am enabled",
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    label: "I am disabled",
};
