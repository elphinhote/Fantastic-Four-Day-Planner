// // Event to let the user know that the DOM content Loaded
// document.addEventListener('DOMContentLoaded', (event) => {
//     if (event) {
//         // Let user know that everything loaded correctly
//         // console.info("DOM content Loaded");
//     }
//     // // Consts for the search input and search button
//     const searchInput = document.querySelector(".searchInput")
//     const searchBtn = document.querySelector(".searchBtn")

//     // ADD GET STOCKS FFUNCTION


//     // Event listener for the stock search button
//     searchBtn.addEventListener("click", (e) => {
//         // prevent that default behavior
//         e.preventDefault();
//         // Variable for the search
//         let search = searchInput.value

//         // Fetch Request to get all of the past searched stocks from the database
//         fetch('/api/all', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             // Json that response
//         }).then((response) => response.json())

//             .then((data) => {

//                 data.forEach(({ id, stock }) => {
//                     console.log(stock)
//                     // Set the past searches to a li on the left side of the page
//                     const pastSearches = document.querySelector(".past-searches")

//                     //TEST Delete Button Move
//                     let searchTitle = document.createElement("li");
//                     searchTitle.classList.add("stockSearched")
//                     // pastSearches.append(searchTitle)


//                     let stockSearched = document.querySelector(".stockSearched")
//                     let deleteButton = document.createElement("button");
//                     deleteButton.classList.add("delete-stock")
//                     deleteButton.textContent = "Delete"
//                     let stockId = deleteButton.setAttribute("id", id)

//                     // stockSearched.append(deleteButton)

//                     deleteButton.addEventListener("click", (e) => {
//                         console.log("clicked")
//                         stockId = e.target.getAttribute("id")
//                         console.log(stockId)


//                         fetch(`/api/all/${stockId}`, {
//                             method: 'DELETE',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                         }).then(

//                             searchTitle.textContent = ""
//                         );
//                     }
//                     )
//                     // Append the list
//                     // pastSearches.append(deleteButton, searchTitle)

//                     pastSearches.append(searchTitle, deleteButton)
//                     // searchTitle.append(deleteButton)
//                     // Put the values on the screen
//                     searchTitle.textContent = stock
//                     // Append the list
//                     // stockTitle.append(deleteButton)
//                     // stockSearched.append(deleteButton)


//                     // TEST Search Again Button Test
//                     // let searchAgainButton = document.createElement("button");
//                     // searchAgainButton.innerHTML = "search Again"
//                     // searchAgainButton.classList.add("search-again-button")

//                     // const deleteBtn = document.querySelectorAll(".delete-button")
//                     // deleteBtn.forEach((button) => {
//                     //     button.addEventListener("click", (e) => {
//                     //         // prevent that default behavior

//                     //         console.log("clicked")
//                     //     })
//                     // })
//                     // END TEST

//                 })
//             })
//             // Catching them errors
//             .catch((error) => {
//                 console.error('Error:', error);
//             });

//         // Const for saving a newly searched stock to the database
//         const newStock = {
//             stock: search,
//         }

//         // Fetch request to post the newly searched stock to the database
//         fetch('/api/new', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newStock),
//         })
//             // Json the data
//             .then((newStock) => newStock.json())
//             // Console log to let user know it was successful!
//             .then((data) => {
//                 console.log('Success in adding stock:', data);
//                 console.log(`Stock added: ${newStock.stock}`);
//             })
//             // Catching all them errors!
//             .catch((error) => {
//                 console.error('Error:', error);
//             });


//         // Fetch Request searching stocks
//         fetch("/api/stockSearch", {
//             method: "PUT",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newStock),
//         })
//             .then((results) => results.json())
//             // Console log to let user know it was successful!
//             .then((data) => {

//                 // Set Variable for the stock symbol
//                 let stockSymbol = data["Global Quote"]["01. symbol"]
//                 // Set Variable for the stock price
//                 let stockPrice = data["Global Quote"]["05. price"]

//                 // Query selector the classes
//                 let company = document.querySelector(".company")
//                 let price = document.querySelector(".price")
//                 // Display the search to the page
//                 company.innerHTML = (`Stock Symbol: ${stockSymbol}`)
//                 price.textContent = (`Price: $${stockPrice}`)

//             })

//         const newsSearchButton = document.querySelector(".news-button")
//         newsSearchButton.addEventListener("click", (e) => {
//             // prevent that default behavior
//             e.preventDefault();
//             console.log("newsClicked")
//             console.log(search)

//             fetch("/api/newsSearch", {
//                 method: "PUT",
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(newStock),
//             })
//                 .then((results) => results.json())
//                 // Console log to let user know it was successful!
//                 .then((data) => {
//                     console.log(data)
//                     const stockNewsTitle = document.querySelector("#stock-news-title")
//                     stockNewsTitle.textContent = `${newStock.stock} Stock News`

//                     const stockNews1 = document.querySelector("#stock-news-1-title")
//                     const stockLink1 = document.querySelector("#stock-news-1-link")
//                     const stockNews2 = document.querySelector("#stock-news-2-title")
//                     const stockLink2 = document.querySelector("#stock-news-2-link")
//                     const stockNews3 = document.querySelector("#stock-news-3-title")
//                     const stockLink3 = document.querySelector("#stock-news-3-link")


//                     stockNews1.textContent = data.articles[0].title
//                     stockLink1.textContent = data.articles[0].url
//                     stockNews2.textContent = data.articles[1].title
//                     stockLink2.textContent = data.articles[1].url
//                     stockNews3.textContent = data.articles[2].title
//                     stockLink3.textContent = data.articles[2].url


//                 })

//         })
//     })

// })



// Event to let the user know that the DOM content Loaded
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        // Let user know that everything loaded correctly
        // console.info("DOM content Loaded");
    }
    // // Consts for the search input and search button
    const searchInput = document.querySelector(".searchInput")
    const searchBtn = document.querySelector(".searchBtn")

    // let pastSearches = document.querySelector(".past-searches")
    // pastSearches.textContent = ""

    function getStocks() {
        let pastSearches = document.querySelector(".past-searches")
        pastSearches.textContent = ""

        // Fetch Request to get all of the past searched stocks from the database
        fetch('/api/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            // Json that response
        }).then((response) => response.json())

            .then((data) => {

                data.forEach(({ id, stock }) => {
                    console.log(stock)
                    // Set the past searches to a li on the left side of the page
                    let pastSearches = document.querySelector(".past-searches")

                    //TEST Delete Button Move
                    let searchTitle = document.createElement("li");
                    searchTitle.classList.add("stockSearched")
                    // pastSearches.append(searchTitle)


                    let stockSearched = document.querySelector(".stockSearched")
                    let deleteButton = document.createElement("button");
                    deleteButton.classList.add("delete-stock")
                    deleteButton.textContent = "Delete"
                    let stockId = deleteButton.setAttribute("id", id)
                    deleteButton.addEventListener("click", (e) => {
                        console.log("clicked")
                        stockId = e.target.getAttribute("id")
                        console.log(stockId)

                        deleteStock(stockId)
                        searchTitle.textContent = ""

                    })

                    // Append the list
                    // pastSearches.append(deleteButton, searchTitle)
                    searchTitle.textContent = stock
                    pastSearches.append(searchTitle, deleteButton)
                    // searchTitle.append(deleteButton)
                    // Put the values on the screen
                    // searchTitle.textContent = stock
                })
            })
    }

    getStocks()

    function deleteStock(stockId) {
        fetch(`/api/all/${stockId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(getStocks);
    }


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


        // Fetch Request searching stocks
        fetch("/api/stockSearch", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStock),
        })
            .then((results) => results.json())
            // Console log to let user know it was successful!
            .then((data) => {

                // Set Variable for the stock symbol
                let stockSymbol = data["Global Quote"]["01. symbol"]
                // Set Variable for the stock price
                let stockPrice = data["Global Quote"]["05. price"]

                // Query selector the classes
                let company = document.querySelector(".company")
                let price = document.querySelector(".price")
                // Display the search to the page
                company.innerHTML = (`Stock Symbol: ${stockSymbol}`)
                price.textContent = (`Price: $${stockPrice}`)

            })

        const newsSearchButton = document.querySelector(".news-button")
        newsSearchButton.addEventListener("click", (e) => {
            // prevent that default behavior
            e.preventDefault();
            console.log("newsClicked")
            console.log(search)

            fetch("/api/newsSearch", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStock),
            })
                .then((results) => results.json())
                // Console log to let user know it was successful!
                .then((data) => {
                    console.log(data)
                    const stockNewsTitle = document.querySelector("#stock-news-title")
                    stockNewsTitle.textContent = `${newStock.stock} Stock News`

                    const stockNews1 = document.querySelector("#stock-news-1-title")
                    const stockLink1 = document.querySelector("#stock-news-1-link")
                    const stockNews2 = document.querySelector("#stock-news-2-title")
                    const stockLink2 = document.querySelector("#stock-news-2-link")
                    const stockNews3 = document.querySelector("#stock-news-3-title")
                    const stockLink3 = document.querySelector("#stock-news-3-link")


                    stockNews1.textContent = data.articles[0].title
                    stockLink1.innerHTML = `<a href="${data.articles[0].url}" target="_blank">${data.articles[0].url}<a>`
                    stockNews2.textContent = data.articles[1].title
                    stockLink2.innerHTML = `<a href="${data.articles[1].url}" target="_blank">${data.articles[1].url}<a>`
                    stockNews3.textContent = data.articles[2].title
                    stockLink3.innerHTML = `<a href="${data.articles[2].url}" target="_blank">${data.articles[2].url}<a>`


                })

        })
        getStocks()
    })
})


// })