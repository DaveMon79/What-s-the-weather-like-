var searchButton = document.getElementById("search-button")
var resultsList = document.getElementById("results-list")
var currentWeatherList = document.getElementById("current-weather-list")
var resultsList = document.getElementById("results-list")
var storedCityNames = []
var apiKey = "27c15d159618d2da5af0904826c56b48"
var data = {}
var fiveDayData = {}
var storedCityNames = JSON.parse(localStorage.getItem("city")) || [];



function searchCity() {
    var cityName = document.getElementById("user-input").value;
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric";
    fetch(requestUrl)
        .then((response) => response.json())
        // .then(data => console.log(data));
        .then(function (currentWeatherInfo) {
            document.getElementById("city").innerHTML = "City name:  " + currentWeatherInfo.name
            document.getElementById("temp").innerHTML = "Tempature:  " + currentWeatherInfo.main.temp_min + "°C"
            document.getElementById("wind").innerHTML = "Wind speed:  " + currentWeatherInfo.wind.speed + "mph"
            document.getElementById("humidity").innerHTML = "Humidity:  " + currentWeatherInfo.main.humidity + "%"
            document.getElementById("uv").innerHTML = "UV:  " + 20

        })

    currentCityInfo = {
        Name: cityName,
        url: requestUrl
    }

    storedCityNames.push(currentCityInfo)
    localStorage.setItem("city", JSON.stringify(storedCityNames));
    fiveDayForecast()
    

}

savedCitiesList()

function savedCitiesList() {

    for (var i = 0; i < storedCityNames.length; i++) {
        var li = document.createElement("LI")
        li.setAttribute('class', '.search-results li')
        resultsList.appendChild(li)
        li.innerHTML = storedCityNames[i].Name
        // link.href = storedCityNames[i].url

    }
}



function fiveDayForecast() {
    var cityName = document.getElementById("user-input").value;
    var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&cnt=5&appid=" + apiKey + "&units=metric";
    fetch(fiveDayUrl)
        .then((response) => response.json())
        return fiveDayData
        // .then((fiveDayData) => console.log(fiveDayData));
        .then (function(fiveDayData) {
            weather.date = list
            weather.city =
            weather.city =
            weather.city =
            weather.city =

        })


}


searchButton.addEventListener("click", searchCity)
// resultsList.addEventListener("click", searchCity)






