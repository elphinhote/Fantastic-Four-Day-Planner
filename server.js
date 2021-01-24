// Required Consts
const express = require("express");
const htmlRouter = require('./routes/html-routes.js');
const apiRouter = require('./routes/api-routes.js');
const app = express();

// dotenv const to hide API keys
const dotenv = require('dotenv').config()
// Check for errors
if (dotenv.error) {
    throw dotenv.error
}
// Sets up the Express App and optimizes for Heroku
const PORT = process.env.PORT || 3000;

// Requiring our models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory for being able to use the public assets folder
app.use(express.static('public'));

// Invoke routes
htmlRouter(app);
apiRouter(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
});