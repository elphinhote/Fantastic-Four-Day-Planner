const { QueryTypes } = require('sequelize');
const db = require('../models');

module.exports = (app) => {
    app.get('/api/stocks', (req, res) => {

        db.Stocks.findAll({}).then((dbStocks) => {
            res.json(dbStocks);
        });
    });
}