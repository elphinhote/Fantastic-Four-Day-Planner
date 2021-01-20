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
        // Console log the searched Stock Ticker
        console.log(search)


        // Fetch Request to get all of the past searched stocks from the database
        fetch('/api/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Json that response
        }).then((response) => response.json())
            // Console log the data to let user know it worked
            .then((data) => {
                console.log('Success in getting all stocks', data);
                // For each loop to go through the searches and print them to the page
                data.forEach(({ stock }) => {
                    // Set the past searches to a li on the left side of the page
                    const pastSearches = document.querySelector(".past-searches")
                    // Create the list
                    let searchTitle = document.createElement("li");
                    // Append the list
                    pastSearches.appendChild(searchTitle)
                    // Put the values on the screen
                    searchTitle.textContent = stock

                })
            })
            // Catching them errors
            .catch((error) => {
                console.error('Error:', error);
            });

        // Const for saving a newly searched stock to the database
        const newStock = {
            stock: search,
        }
        // Console log it
        console.log(newStock)

        // Fetch request to post the newly searched stock to the database
        fetch('/api/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStock),
        })
            // Json the data
            .then((newStock) => newStock.json())
            // Console log to let user know it was successful!
            .then((data) => {
                console.log('Success in adding stock:', data);
                console.log(`Stock added: ${newStock.stock}`);
            })
            // Catching all them errors!
            .catch((error) => {
                console.error('Error:', error);
            });








        // console.log(dotenv.parsed.APIKEY)
        // let myAPI = process.env.APIKEY
        //  Api request URL for AlphaVantage (currently just searching for IBM) 
        // const requestUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${search}&apikey=T4FCSEMRY1YDLIH0`;




        // // fetch Request to get the information
        // fetch(requestUrl, {

        //     method: "GET",
        //     credentials: "same-origin",
        //     redirect: "follow",
        //     cache: "reload",
        // })
        //     // return to json format
        //     .then(function (response) {
        //         return response.json();
        //     })
        //     // create an object for the data
        //     .then(function (data) {
        //         // console log the data object
        //         console.log(data)
        //         console.log(data["Global Quote"]["01. symbol"])
        //         console.log(data["Global Quote"]["05. price"])

        //         let stockSymbol = data["Global Quote"]["01. symbol"]
        //         let stockPrice = data["Global Quote"]["05. price"]

        //         // Display the search to the page
        //         company.innerHTML = (`Stock Symbol: ${stockSymbol}`)
        //         price.textContent = (`Price: $${stockPrice}`)

        //         // Set the past searches to a li on the left side of the page
        //         let searchTitle = document.createElement("li");

        //         searchTitle.innerHTML = stockSymbol;
        //         // append
        //         document.querySelector(".past-searches").appendChild(searchTitle)

        //     })


    })

})