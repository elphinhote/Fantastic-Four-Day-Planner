// weatherApiKey=a818b4cc3056dff4bd880c03672ec7ed
// Event to let the user know that the DOM content Loaded
document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        // Let user know that everything loaded correctly
        console.info("DOM content Loaded");
    }

    let button = document.querySelector('#submit')
    let inputVal = document.querySelector('.inputValue')
    let namel = document.querySelector('.name')
    let dis = document.querySelector('.desc')
    let temp = document.querySelector('.temp')
    button.addEventListener('click', function () {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputVal.value + '&appid=a818b4cc3056dff4bd880c03672ec7ed')
            .then(response => response.json())
            .then(data => {
                console.log("clicked")
                console.log(data)
                var nameValue = data['name']
                namel.textContent = ('Location: ') + nameValue;
                var tempvalue = data['main']['temp'];
                temp.innerHTML = ('Temperature: ') + [Math.floor((tempvalue - 273.15) * 1.8) + 20] + (" °F");
                var disval = data['weather'][0]['description'];
                dis.textContent = ('Seems like: ') + disval;
            })
            .catch(err => console.log(err))
    })





})