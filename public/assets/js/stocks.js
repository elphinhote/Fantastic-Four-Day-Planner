// Event to let the user know that the DOM content Loaded
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
    }
    // Consts for the Stock search input and search button
    const searchInput = document.querySelector(".searchInput")
    const searchBtn = document.querySelector(".searchBtn")

    // Function to get all the Stocks from the database and display to the page
    function getStocks() {
        // Query Selector for the Ul of the past stock searches
        let pastSearches = document.querySelector(".past-searches")
        // Clear out the list
        pastSearches.textContent = ""

        // Fetch Request to get all of the past searched stocks from the database
        fetch('/api/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Json that response
        })
            .then((response) => response.json())
            // Then get the data
            .then((data) => {
                // For Each loop to loop through the database and get the stock and id
                data.forEach(({ id, stock }) => {

                    // Set the past searches to a li on the left side of the page
                    let pastSearches = document.querySelector(".past-searches")

                    // Get the list
                    let searchTitle = document.createElement("li");
                    // Add the class 
                    searchTitle.classList.add("stockSearched")

                    let stockSearched = document.querySelector(".stockSearched")
                    // Create the delete buttons
                    let deleteButton = document.createElement("button");
                    // Add the class to the delete buttons
                    deleteButton.classList.add("delete-stock", "btn", "btn-sm", "btn-outline-danger", "far", "fa-trash-alt")
                    // Label the button
                    deleteButton.textContent = " "

                    // Set the ID for the stock
                    let stockId = deleteButton.setAttribute("id", id)

                    // Event listener for the delete button
                    deleteButton.addEventListener("click", (e) => {
                        // Target the Id
                        stockId = e.target.getAttribute("id")
                        // Call the delete stock function
                        deleteStock(stockId)
                        // Empty out the li
                        searchTitle.textContent = ""

                    })

                    // Set the title to the stock searched
                    searchTitle.textContent = stock
                    // Append the list
                    pastSearches.append(searchTitle, deleteButton)

                })
            })
    }
    // Call the get stocks function
    getStocks()

    // delete stocks function
    function deleteStock(stockId) {
        // Fetch request to delete the stock
        fetch(`/api/all/${stockId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            // then call the get stocks function
        }).then(getStocks);
    }

    // Add event listener for the earch button
    searchBtn.addEventListener("click", (e) => {
        // prevent that default behavior
        e.preventDefault();

        // Variable for the search
        let search = searchInput.value
        const newStock = {
            stock: search,
        }

        // Fetch request to post the newly searched stock to the database
        fetch('/api/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStock),
        })
            // Json that data
            .then((newStock) => newStock.json())

            // Get the data
            .then((data) => {
                // Console log it
                console.log(data)
                console.log(`Stock added: ${newStock.stock}`);
                getStocks()
            })
            // Catching all them errors!
            .catch((error) => {
                console.error('Error:', error);
            });


        // Fetch Request to the stock search API for searching stocks
        fetch("/api/stockSearch", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStock),
        })
            // Json those results
            .then((results) => results.json())
            // Get the data!
            .then((data) => {
                // Set Variable for the stock symbol
                let stockSymbol = data["Global Quote"]["01. symbol"]
                // Set Variable for the stock price
                let stockPrice = data["Global Quote"]["05. price"]

                // Query selector the classes
                let company = document.querySelector(".company")
                let price = document.querySelector(".price")
                // Display the search results to the page
                company.innerHTML = (`Stock Symbol: ${stockSymbol}`)
                price.textContent = (`Price: $${stockPrice}`)

            })

        // Get the DOM for the news search button
        const newsSearchButton = document.querySelector(".news-button")
        // Event listener for the stock news search button
        newsSearchButton.addEventListener("click", (e) => {
            // prevent that default behavior
            e.preventDefault();
            // Fetch request to hte news API for the stock searched
            fetch("/api/newsSearch", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStock),
            })
                // Json those results
                .then((results) => results.json())
                // Get the data
                .then((data) => {
                    // get the DOM for the stock news title
                    const stockNewsTitle = document.querySelector("#stock-news-title")
                    // Set the text content
                    stockNewsTitle.textContent = `${newStock.stock} Stock News`
                    // Consts for the stock news lists
                    const stockNews1 = document.querySelector("#stock-news-1-title")
                    const stockLink1 = document.querySelector("#stock-news-1-link")
                    const stockNews2 = document.querySelector("#stock-news-2-title")
                    const stockLink2 = document.querySelector("#stock-news-2-link")
                    const stockNews3 = document.querySelector("#stock-news-3-title")
                    const stockLink3 = document.querySelector("#stock-news-3-link")

                    // Display the news for the stocks to the page
                    stockNews1.textContent = data.articles[0].title
                    stockLink1.innerHTML = `<a href="${data.articles[0].url}" target="_blank">${data.articles[0].url}<a>`
                    stockNews2.textContent = data.articles[1].title
                    stockLink2.innerHTML = `<a href="${data.articles[1].url}" target="_blank">${data.articles[1].url}<a>`
                    stockNews3.textContent = data.articles[2].title
                    stockLink3.innerHTML = `<a href="${data.articles[2].url}" target="_blank">${data.articles[2].url}<a>`
                })

        })
        // Call the get stocks function
        // getStocks()
    })
})

