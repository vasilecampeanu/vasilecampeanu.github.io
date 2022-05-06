const path = require('path')

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "assets/js/src", "index.js"),
    output: {
        path: path.resolve(__dirname, 'assets/js/dist'),
        filename: 'bundle.js'
    },
    watch: true
}