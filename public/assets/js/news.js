const now = moment();
const day = (moment().format("MMM Do YYYY"))
console.log(day)

const todaysDate = document.querySelector("#todays-date")
todaysDate.textContent = (`For: ${day}`)

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


console.log(search)
function todaysNews() {
    fetch("/api/todaysNews", {
        method: "GET",
    })
        .then((results) => results.json())
        // Console log to let user know it was successful!
        .then((data) => {
            console.log(data)
            todaysNewsTitle1.textContent = data.articles[0].title
            todaysNewsLink1.textContent = data.articles[0].url
            todaysNewsTitle2.textContent = data.articles[1].title
            todaysNewsLink2.textContent = data.articles[1].url
            todaysNewsTitle3.textContent = data.articles[2].title
            todaysNewsLink3.textContent = data.articles[2].url
            todaysNewsTitle4.textContent = data.articles[3].title
            todaysNewsLink4.textContent = data.articles[3].url
            todaysNewsTitle5.textContent = data.articles[4].title
            todaysNewsLink5.textContent = data.articles[4].url





        })

}
todaysNews()