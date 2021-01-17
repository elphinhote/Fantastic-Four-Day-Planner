// let dotenv = require('dotenv').config()

// Event to let the user know that the DOM content Loaded
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        // Let user know that everything loaded correctly
        console.info("DOM content Loaded");
    }
    // Consts for the search input and search button
    const searchInput = document.querySelector(".searchInput")
    const searchBtn = document.querySelector(".searchBtn")

    // Event listener for the stock search button
    searchBtn.addEventListener("click", (e) => {
        // prevent that default behavior
        e.preventDefault();
        // console.logs to see if the button is clicked, and what the search is for.
        console.log("clicked")
        // Variable for the search
        let search = searchInput.value
        console.log(search)
        // set variables to grab the HTML classes so we can display the stock name and price
        let company = document.querySelector(".company");
        let price = document.querySelector(".price");
        // console.log(dotenv.parsed.APIKEY)
        // let myAPI = process.env.APIKEY
        //  Api request URL for AlphaVantage (currently just searching for IBM) 
        const requestUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${search}&apikey=T4FCSEMRY1YDLIH0`;

        // fetch Request to get the information
        fetch(requestUrl, {

            method: "GET",
            credentials: "same-origin",
            redirect: "follow",
            cache: "reload",
        })
            // return to json format
            .then(function (response) {
                return response.json();
            })
            // create an object for the data
            .then(function (data) {
                // console log the data object
                console.log(data)
                console.log(data["Global Quote"]["01. symbol"])
                console.log(data["Global Quote"]["05. price"])

                let stockSymbol = data["Global Quote"]["01. symbol"]
                let stockPrice = data["Global Quote"]["05. price"]

                // Display the search to the page
                company.innerHTML = (`Stock Symbol: ${stockSymbol}`)
                price.textContent = (`Price: $${stockPrice}`)

            })


    })

})