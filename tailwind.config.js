const colors = require('tailwindcss/colors')

module.exports = {
    darkMode: false,
    theme: {
        extend: {
            colors: {
                primary: "#202225",
                secondary: "#5865F2",
                gray: colors.blueGray,
            },
        },

    },
    variants: {
        extend: {},
    },
    plugins: [],
}