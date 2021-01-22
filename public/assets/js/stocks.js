// const now = moment();
// const day = (moment().format("MMM Do YY"))
// console.log(day)

// Event to let the user know that the DOM content Loaded
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        // Let user know that everything loaded correctly
        console.info("DOM content Loaded");
    }
    // // Consts for the search input and search button
    const searchInput = document.querySelector(".searchInput")
    const searchBtn = document.querySelector(".searchBtn")

    //Moved to weather page
    // let button = document.querySelector('#submit')
    // let inputVal = document.querySelector('.inputValue')
    // let namel = document.querySelector('.name')
    // let dis = document.querySelector('.desc')
    // let temp = document.querySelector('.temp')
    // button.addEventListener('click', function () {
    //     fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputVal.value + '&appid=a818b4cc3056dff4bd880c03672ec7ed')
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log("clicked")
    //             console.log(data)
    //             var nameValue = data['name']
    //             namel.textContent = ('Location: ') + nameValue;
    //             var tempvalue = data['main']['temp'];
    //             temp.innerHTML = ('Temperature: ') + [Math.floor((tempvalue - 273.15) * 1.8) + 20] + (" °F");
    //             var disval = data['weather'][0]['description'];
    //             dis.textContent = ('Seems like: ') + disval;
    //         })
    //         .catch(err => console.log(err))
    // })

    // Event listener for the stock search button
    searchBtn.addEventListener("click", (e) => {
        // prevent that default behavior
        e.preventDefault();
        // console.logs to see if the button is clicked, and what the search is for.
        // console.log("clicked")
        // Variable for the search
        let search = searchInput.value
        // Console log the searched Stock Ticker
        // console.log(search)


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
                // console.log('Success in getting all stocks', data);
                // For each loop to go through the searches and print them to the page
                // console.log(data)
                // let stockList = data
                // console.log(stockList)
                // stockList.forEach(({ id, stock }) => {
                //     console.log(id)
                //     console.log(stock)
                // })



                data.forEach(({ id, stock }) => {
                    console.log(stock)
                    // Set the past searches to a li on the left side of the page
                    const pastSearches = document.querySelector(".past-searches")
                    // Create the list
                    let searchTitle = document.createElement("li");
                    searchTitle.classList.add("searched")

                    let deleteButton = document.createElement("button");
                    deleteButton.classList.add("delete-stock")

                    let stockId = deleteButton.setAttribute("id", id)
                    deleteButton.innerHTML = "delete"
                    deleteButton.addEventListener("click", (e) => {
                        console.log("clicked")
                        stockId = e.target.getAttribute("id")
                        console.log(stockId)

                        fetch(`/api/all/${stockId}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }).then(

                            searchTitle.textContent = ""

                            // console.log("Deleted")

                        );




                    }
                    )
                    // Append the list
                    pastSearches.append(searchTitle, deleteButton)
                    // searchTitle.append(searchButton)
                    // Put the values on the screen
                    searchTitle.textContent = stock

                    // Search Again Button Test
                    // let searchAgainButton = document.createElement("button");
                    // searchAgainButton.innerHTML = "search Again"
                    // searchAgainButton.classList.add("search-again-button")

                    // const deleteBtn = document.querySelectorAll(".delete-button")
                    // deleteBtn.forEach((button) => {
                    //     button.addEventListener("click", (e) => {
                    //         // prevent that default behavior

                    //         console.log("clicked")
                    //     })
                    // })




                    // Append the list
                    // pastSearches.append(searchTitle, deleteButton)
                    // // searchTitle.append(searchButton)
                    // // Put the values on the screen
                    // searchTitle.textContent = stock

                })
            })
            // Catching them errors
            .catch((error) => {
                console.error('Error:', error);
            });

        // const deleteStock = document.querySelectorAll(".delete-stock")
        // deleteStock.forEach((button) => {
        //     button.addEventListener("click", (e) => {

        //         console.log("clicked")
        //     })
        // })

        // Const for saving a newly searched stock to the database
        const newStock = {
            stock: search,
        }
        // Console log it
        // console.log(newStock)

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
                // console log the data object
                // console.log(data)

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
                    stockLink1.textContent = data.articles[0].url
                    stockNews2.textContent = data.articles[1].title
                    stockLink2.textContent = data.articles[1].url
                    stockNews3.textContent = data.articles[2].title
                    stockLink3.textContent = data.articles[2].url


                })

        })


        // API KET FOR NEWS 73a4ea5fd9c54d2c9fb5628642ce8864
    })

    // const newsSearchButton = document.querySelector(".news-button")
    // newsSearchButton.addEventListener("click", (e) => {
    //     // prevent that default behavior
    //     e.preventDefault();
    //     console.log("newsClicked")
    //     console.log(search)

    //     fetch("/api/newsSearch", {
    //         method: "PUT",
    //         // headers: {
    //         //     'Content-Type': 'application/json',
    //         // },
    //         body: JSON.stringify(search),
    //     })
    //         .then((results) => results.json())
    //         // Console log to let user know it was successful!
    //         .then((data) => {
    //             console.log(data)
    //         })

    // })


})