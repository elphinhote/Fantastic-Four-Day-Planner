const { QueryTypes } = require('sequelize');
const db = require('../models');
const Stock = require('../models/stocks.js');
const axios = require("axios")

// dotenv const to hide API key
const dotenv = require('dotenv').config()
// Check for errors
if (dotenv.error) {
    throw dotenv.error
}
// Set the .env data as a varible
const apiKey = dotenv.parsed.apiKey
// console log the API key
console.log(apiKey)

module.exports = (app) => {
    app.get('/api/all', (req, res) => {

        db.Stocks.findAll({}).then((dbStocks) => {
            res.json(dbStocks);
            // console.log(dbStocks)
        });
    });


    app.post("/api/new", (req, res) => {

        db.Stocks.create(req.body).then((dbStocks) => res.json(dbStocks))

    });


    app.put('/api/stockSearch', async (req, res) => {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.body.stock}&apikey=${apiKey}`;
        const stock = await axios.get(url);
        // const data = stock.data
        // console.log(stock.data)
        // res.json(stock.data)

        try {
            const stock = await axios.get(url);
            res.json(stock.data);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error - Whoops');
        }
    });



};