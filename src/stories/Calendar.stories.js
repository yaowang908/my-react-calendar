import React from 'react'
import App from 'App.js'

export default {
    component: App,
    title: "Calendar",
};

const Template = (args) => <App {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    test: 'data'
};
