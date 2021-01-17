// Event to let the user know that the DOM content Loaded
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        // Let user know that everything loaded correctly
        console.info("DOM content Loaded");
    }


    function stockSearch() {
        // set variables to grab the HTML classes so we can display the stock name and price
        let company = document.querySelector(".company");
        let price = document.querySelector(".price");
        // Api request URL for AlphaVantage (currently just searching for IBM) 
        const requestUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo`;
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
                company.innerHTML = data["Global Quote"]["01. symbol"]
                price.textContent = data["Global Quote"]["05. price"]

            })
    }
    stockSearch()


})