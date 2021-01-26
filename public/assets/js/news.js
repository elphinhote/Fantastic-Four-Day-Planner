// Const for moments
const now = moment();
// Variable to set the day for the Top of the page
const day = (moment().format("MMM Do YYYY"))
// Const to get the location
const todaysDate = document.querySelector("#todays-date")
// Set the contents for the title of the page to display the date
todaysDate.textContent = (day)

// consts for selecting the news lists on the HTML
const todaysNewsTitle1 = document.querySelector("#todays-news-1-title")
const todaysNewsLink1 = document.querySelector("#todays-news-1-link")
const todaysNewsTitle2 = document.querySelector("#todays-news-2-title")
const todaysNewsLink2 = document.querySelector("#todays-news-2-link")
const todaysNewsTitle3 = document.querySelector("#todays-news-3-title")
const todaysNewsLink3 = document.querySelector("#todays-news-3-link")
const todaysNewsTitle4 = document.querySelector("#todays-news-4-title")
const todaysNewsLink4 = document.querySelector("#todays-news-4-link")
const todaysNewsTitle5 = document.querySelector("#todays-news-5-title")
const todaysNewsLink5 = document.querySelector("#todays-news-5-link")

// Function for getting todays News
function todaysNews() {
    // Fetch Request
    fetch("/api/todaysNews", {
        method: "GET",
    })
        // Json the results
        .then((results) => results.json())
        // Console log to let user know it was successful!
        .then((data) => {
            //   Display the titles and links of the daily news
            todaysNewsTitle1.textContent = data.articles[0].title
            todaysNewsLink1.innerHTML = `<a href="${data.articles[0].url}" target="_blank">${data.articles[0].url}<a>`
            todaysNewsTitle2.textContent = data.articles[1].title
            todaysNewsLink2.innerHTML = `<a href="${data.articles[1].url}" target="_blank">${data.articles[1].url}<a>`
            todaysNewsTitle3.textContent = data.articles[2].title
            todaysNewsLink3.innerHTML = `<a href="${data.articles[2].url}" target="_blank">${data.articles[2].url}<a>`
            todaysNewsTitle4.textContent = data.articles[3].title
            todaysNewsLink4.innerHTML = `<a href="${data.articles[3].url}" target="_blank">${data.articles[3].url}<a>`
            todaysNewsTitle5.textContent = data.articles[4].title
            todaysNewsLink5.innerHTML = `<a href="${data.articles[4].url}" target="_blank">${data.articles[4].url}<a>`

        })

}
// Call the todays news function
todaysNews()
