import React from 'react'
import { Calendar } from 'index.js'

export default {
    component: Calendar,
    title: "Calendar",
};

const Template = (args) => <Calendar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    test: 'data'
};
