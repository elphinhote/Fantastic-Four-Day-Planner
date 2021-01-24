// Event to let the user know that the DOM content Loaded
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        // Let user know that everything loaded correctly
        // console.info("DOM content Loaded");
    }

    // Consts for the DOM for the weather
    let button = document.querySelector('#weather')
    let inputVal = document.querySelector('.inputValue')
    let namel = document.querySelector('.name')
    let dis = document.querySelector('.desc')
    let temp = document.querySelector('.temp')

    // Add event listener for the weather button
    button.addEventListener('click', function () {
        // Sweet Alert
        swal('Good job', 'See the weather!', 'success')
        const weatherSearch = {
            weather: inputVal.value
        }
        // Fetch request for the weather API
        fetch("/api/weather", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(weatherSearch)
        })
            // JSON the response
            .then(response => response.json())
            // Get the data
            .then(data => {
                // Get the DOM and write it to the page
                let nameValue = data['name']
                namel.textContent = ('Location: ') + nameValue;
                let tempvalue = data['main']['temp'];
                temp.innerHTML = ('Temperature: ') + [Math.floor((tempvalue - 273.15) * 1.8) + 20] + (" °F");
                let disval = data['weather'][0]['description'];
                dis.textContent = ('Seems like: ') + disval;

            })

    })

})