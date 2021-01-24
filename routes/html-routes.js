// Dependencies
// Const for the path
const path = require('path');

// Routes using sequelize
module.exports = (app) => {
    // index route loads index.html
    app.get('/', (req, res) =>
        res.sendFile(path.join(__dirname, '../public/index.html'))
    );
}