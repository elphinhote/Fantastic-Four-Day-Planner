const { QueryTypes } = require('sequelize');
const db = require('../models');
const Stock = require('../models/stocks.js');

module.exports = (app) => {
    app.get('/api/stocks', (req, res) => {

        db.Stocks.findAll({}).then((dbStocks) => {
            res.json(dbStocks);
            console.log(dbStocks)
        });
    });


    app.post("/api/new", (req, res) => {
        console.log(`${req.body.stock} line 16`)
        db.Stocks.create(req.body).then((dbStocks) => res.json(dbStocks))

        // res.status(200).json(stock)
    });



};