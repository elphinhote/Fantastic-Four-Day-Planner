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
        // const stock = await axios.get(url);
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

    app.put("/api/newsSearch", async (req, res) => {
        const newsUrl = "a818b4cc3056dff4bd880c03672ec7ed"
            `http://newsapi.org/v2/everything?q=${newsSearch}&&sortBy=popularity&apiKey=${newsApiKey}`;
        // const news = await axios.get(url);

        try {
            const news = await axios.get(url);
            res.json(news.data);
        } catch (error) {
            console.log(err.message);
            res.status(500).send("news Api Whoops");
        }
    })

    app.delete("/api/all/:id", (req, res) => {
        db.Stocks.destroy({
            where: {
                id: req.params.id,
            },
        }).then((dbStocks) => res.json(dbStocks));
    });



};