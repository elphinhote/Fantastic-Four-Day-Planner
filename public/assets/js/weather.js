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

// BEGIN Test for getting location data from the browser
// var x = document.getElementById("demo");


// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);

//     function showPosition(position) {
//         //     x.innerHTML = "Latitude: " + position.coords.latitude +
//         //         "<br>Longitude: " + position.coords.longitude;
//         // console.log(position.coords.latitude)
//         let latitude = position.coords.latitude
//         // console.log(position.coords.longitude)
//         dis.textContent = latitude
//         let longitude = position.coords.longitude
//         longitude.slice(0, 3)
//         temp.textContent = longitude

//         let currentLocation = `lat=${latitude}&long=${longitude}`
//         temp.textContent = currentLocation

//         const locationWeatherSearch = {
//             weather: currentLocation
//         }

//         fetch("/api/location", {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(locationWeatherSearch)
//         })
//             // JSON the response
//             .then(response => response.json())
//             // Get the data
//             .then(data => {
//                 dis.textContent = data


//                 // Get the DOM and write it to the page
//                 // let nameValue = data['name']
//                 // namel.textContent = ('Location: ') + nameValue;
//                 // let tempvalue = data['main']['temp'];
//                 // temp.innerHTML = ('Temperature: ') + [Math.floor((tempvalue - 273.15) * 1.8) + 20] + (" °F");
//                 // let disval = data['weather'][0]['description'];
//                 // dis.textContent = ('Seems like: ') + disval;

//             })



//     }
// } else {
//     console.log("Geolocation is not supported by this browser.")
//     // x.innerHTML = "Geolocation is not supported by this browser.";
//     //     }
//     // }

//     // function showPosition(position) {
//     // //     x.innerHTML = "Latitude: " + position.coords.latitude +
//     // //         "<br>Longitude: " + position.coords.longitude;
//     //     console.log(position)



// }

// END Test for getting location data from the browser