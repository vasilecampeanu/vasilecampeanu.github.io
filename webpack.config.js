const path = require('path')

module.exports = {
    mode: 'development',
    entry: './assets/js/src/main.js',
    output: {
        path: path.resolve(__dirname, 'assets/js/dist'),
        filename: 'bundle.js'
    },
    watch: true
}