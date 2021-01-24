// Required Consts
const { QueryTypes, EmptyResultError } = require('sequelize');
const db = require('../models');
const Stock = require('../models/stocks.js');
const axios = require("axios")
// Luxon for the date to search todays news
const { DateTime } = require("luxon");
// Luxon
dt = DateTime.local()
// Variables for the date
let yearLuxon = dt.c.year
let monthLuxon = dt.c.month
let dayLuxon = dt.c.day
// Variable to format the date to be able to be searched by the API
today = (`${yearLuxon}-${monthLuxon}-${dayLuxon}`)

// dotenv const to hide API key
const dotenv = require('dotenv').config()
// Check for errors
if (dotenv.error) {
    throw dotenv.error
}
// Set the .env data as a varible for the API Keys
const stockApiKey = dotenv.parsed.stockApiKey
const weatherApiKey = dotenv.parsed.weatherApiKey
const newsApiKey = dotenv.parsed.newsApiKey

// Module.exports using sequelize for the app requests
module.exports = (app) => {
    // App.get to get all the stocks from the database
    app.get('/api/all', (req, res) => {
        db.Stocks.findAll({}).then((dbStocks) => {
            res.json(dbStocks);
        });
    });

    // App.post for setting the newly searched Stock to the databse
    app.post("/api/new", (req, res) => {
        db.Stocks.create(req.body).then((dbStocks) => res.json(dbStocks))
    });
    // App.put to search the stock API 
    app.put('/api/stockSearch', async (req, res) => {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${req.body.stock}&apikey=${stockApiKey}`;
        //Async and await
        try {
            const stock = await axios.get(url);
            res.json(stock.data);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error - Whoops');
        }
    });
    // App.put to search the news API for the stock searched for news from today
    app.put("/api/newsSearch", async (req, res) => {
        const newsUrl = `http://newsapi.org/v2/everything?q=${req.body.stock}&from=${today}&sortBy=popularity&apiKey=${newsApiKey}`
        //Async and await
        try {
            const news = await axios.get(newsUrl);
            res.json(news.data);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error - Whoops');
        }

    })

    // App.get for searching the News API for todays news
    app.get("/api/todaysNews", async (req, res) => {
        // const todaysNewsUrl = `http://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`
        //Async and await
        try {
            const todayNews = await axios.get(todaysNewsUrl);
            res.json(todayNews.data);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error - Whoops');
        }

    })

    // App.delete to delete the searched stock from the database
    app.delete("/api/all/:id", (req, res) => {
        db.Stocks.destroy({
            where: {
                id: req.params.id,
            },
        }).then((dbStocks) => res.json(dbStocks));
    });

    // App.get to get the todos from the database
    app.get('/api/allTodos', (req, res) => {
        db.Todos.findAll({}).then((dbTodos) => {
            res.json(dbTodos);
            console.log(dbTodos)
        });
    });
    // App.post to add the new todo to the database
    app.post("/api/newTodo", (req, res) => {
        db.Todos.create(req.body).then((dbTodos) => res.json(dbTodos))
    });

    // App.delete to delete the a todo
    app.delete("/api/allTodos/:id", (req, res) => {
        db.Todos.destroy({
            where: {
                id: req.params.id,
            },
        }).then((dbTodos) => res.json(dbTodos));
    });

    // App.put for updating the todo
    app.put("/api/allTodos/:id", (req, res) => {
        db.Todos.update(
            { todo: req.body.todo },
            { where: { id: req.params.id } })
            .then((dbTodos) => res.json(dbTodos));
    });

    // App.put to get the weather from the weather API
    app.put("/api/weather", async (req, res) => {
        const todaysWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.weather}&appid=${weatherApiKey}`
        // Async and await
        try {
            const todaysWeather = await axios.get(todaysWeatherUrl);
            res.json(todaysWeather.data);
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server Error - Whoops');
        }
    })

};