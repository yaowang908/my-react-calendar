const path = require("path");

module.exports = {
    stories: [
        "../src/stories/*.stories.js",
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-create-react-app",
    ],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.css$/,
            use: [
                {
                    loader: "postcss-loader",
                    options: {
                        ident: "postcss",
                        plugins: [
                            // require("postcss-import"),
                            require("tailwindcss")("tailwind.config.js"),
                            require("autoprefixer"),
                        ],
                    },
                },
            ],
            include: path.resolve(__dirname, "../"),
        });
        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: { "@root": path.resolve(__dirname, "../src") },
            },
        };
    },
};
