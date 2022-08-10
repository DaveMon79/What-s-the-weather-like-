var searchButton = document.getElementById("search-button")
var resultsList = document.getElementById("results-list")
var currentWeatherList = document.getElementById("current-weather-list")
var resultsList = document.getElementById("results-list")
var storedCityNames = []
var apiKey = "27c15d159618d2da5af0904826c56b48"
var storedCityNames = JSON.parse(localStorage.getItem("city")) || [];
var iconEl = "http://openweathermap.org/img/wn/"



function searchForecast(url) {
    console.log(url)
}

function searchCity() {
    var cityName = document.getElementById("user-input").value;
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric";
    fetch(requestUrl)
        .then((response) => response.json())
        // .then(data => console.log(data));
        .then(function (currentWeatherInfo) {
            console.log(currentWeatherInfo)
            document.getElementById("date").innerHTML = moment().format("dddd Do MMMM YYYY");
            document.getElementById("city").innerHTML = "City:  " + currentWeatherInfo.name
            document.getElementById("temp").innerHTML = "Tempature:  " + currentWeatherInfo.main.temp_min + "°C"
            document.getElementById("wind").innerHTML = "Wind speed:  " + currentWeatherInfo.wind.speed + "mph"
            document.getElementById("humidity").innerHTML = "Humidity:  " + currentWeatherInfo.main.humidity + "%"

            var longitude = (currentWeatherInfo.coord.lon)
            var latitude = (currentWeatherInfo.coord.lat)

            var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude={part}&units=metric&appid=" + apiKey
            fiveDayForecast(url)
    

        })


    currentCityInfo = {
        Name: cityName,
        url: requestUrl
    }

    storedCityNames.push(currentCityInfo)
    localStorage.setItem("city", JSON.stringify(storedCityNames));




}

savedCitiesList()

function savedCitiesList() {

    for (var i = 0; i < storedCityNames.length; i++) {
        var li = document.createElement("LI")
        li.setAttribute('class', '.search-results li')
        resultsList.appendChild(li)
        li.innerHTML = storedCityNames[i].Name
        // li.link.href = storedCityNames[i].url

    }
}





function fiveDayForecast(fiveDayUrl) {

    fetch(fiveDayUrl)
        .then((response) => response.json())
        .then(function (data) {
            console.log(data)
            var uv = document.getElementById("uv").innerHTML = "UV:  " + data.daily[0].uvi

            if (uv <= 2) {
                uv.setAttribute(".green")
            }

            else if (uv >= 3 && uv <= 5) {
                uv.setAttribute(".orange")
            }
            else if (uv >= 6) {
                uv.setAttribute(".red")
            }


            for (i = 0; i < 4; i++) {
                document.querySelector(".day-blocks-" + (i)).innerHTML = "Date:" + (data.daily[i].dt)
                // var li = document.createElement("LI")
                // li.setAttribute('class', 'five-day-blocks  blocks-div five-day-blocks ul li')
                // resultsList.appendChild(li)
            }
            for (i = 0; 1 < 4; i++) {
                document.querySelector("#five-day-text-" + (i)).src = "http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png"
                // var li = document.createElement("LI")
                // li.setAttribute('class', 'five-day-blocks  blocks-div five-day-blocks ul li')
                // resultsList.appendChild(li)
            }
            for (i = 0; 1 < 4; i++) {
                document.querySelector("#five-day-text-" + (i)).innerHTML = "Temp:" + (data.daily[i].temp.day)
                // var li = document.createElement("LI")
                // li.setAttribute('class', 'five-day-blocks  blocks-div five-day-blocks ul li')
                // resultsList.appendChild(li)
            }
            for (i = 0; 1 < 4; i++) {
                document.querySelector("#five-day-text-" + (i)).innerHTML = "Wind:" + (data.daily[i].wind_speed)
                // var li = document.createElement("LI")
                // li.setAttribute('class', 'five-day-blocks  blocks-div five-day-blocks ul li')
                // resultsList.appendChild(li)
            }



        })



}


searchButton.addEventListener("click", searchCity)
// resultsList.addEventListener("click", searchCity)






