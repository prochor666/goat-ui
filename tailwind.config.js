module.exports = {
    content: [
        'src/vue-components/*.vue',
        'src/App.vue',
        'src/composables/*.js'
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            zIndex: {
                '1000': 1000,
                '2000': 2000,
            }
        },
    },
    variants: {
        extend: {
            backgroundColor: ['checked'],
            borderColor: ['checked'],
        },
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
};
