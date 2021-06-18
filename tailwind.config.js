module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontSize: {
                xxs: ".6rem",
            },
            maxWidth: {
                1080: "1080px",
                800: "800px",
            },
            margin: {
                '18': '4.5rem',
            },
            width: {
                "1/7": "14.2857143%",
                "2/7": "28.5714286%",
                "3/7": "42.8571429%",
                "4/7": "57.1428571%",
                "5/7": "71.4285714%",
                "6/7": "85.7142857%",
                "7/7": "100%",
            },
            inset: {
                "80": "80px",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
