const express = require("express");
// var bodyParser = require("body parser")
// var expressHandlebars = require("express-handlebars");
const app = express();

// dotenv const to hide API key
const dotenv = require('dotenv').config()
// Check for errors
if (dotenv.error) {
    throw dotenv.error
}
// Set the .env data as a varible
const APIKEY = dotenv.parsed.APIKEY
// console log the API key
console.log(APIKEY)


var app = express();

var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
const db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static('public'));

// Invoke routes
// htmlRouter(app);
// authorRouter(app);
// apiRouter(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});

// Start the server and let user know where it's listening
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log(`Listening on: http://localhost:${PORT}`);
});


// app.listen(PORT, function () {

//     console.log("Server listening on: http:///localhost:" + PORT);
//     ;
//     burgerapp.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
//     burgerapp.set("view engine", "handlebars");