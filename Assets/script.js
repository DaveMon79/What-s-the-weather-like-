var searchButton = document.getElementById("search-button")
var resultsList = document.getElementById("results-list")
var currentWeatherList = document.getElementById("current-weather-list")
var resultsList = document.getElementById("results-list")
var storedCityNames = []
var apiKey = "27c15d159618d2da5af0904826c56b48"
var storedCityNames = JSON.parse(localStorage.getItem("city")) || [];
var iconEl = "http://openweathermap.org/img/wn/"



function searchCity(requestUrl) {
    var cityName = document.getElementById("user-input").value;
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric";
    fetch(requestUrl)
        .then((response) => response.json())
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

    var storedCityNames = JSON.parse(localStorage.getItem("city")) || [];
    for (var i = 0; i < storedCityNames.length; i++) {
        var li = document.createElement("LI")
        li.setAttribute('class', '.search-results li')
        resultsList.appendChild(li)
        li.innerHTML = storedCityNames[i].Name

    }
}


function fiveDayForecast(fiveDayUrl) {

    fetch(fiveDayUrl)
        .then((response) => response.json())
        .then(function (data) {
         
            var uv = document.getElementById("uv")
            var uvi = data.daily[0].uvi
            uv.innerHTML = "UV:  " + data.daily[0].uvi
        
            if (uvi <= 2) {
                uv.setAttribute("class", "green")
            }

            else if (uvi >= 3 && uvi <= 5) {
                uv.setAttribute("class", "orange")
            }
            else if (uvi >= 6) {
                uv.setAttribute("class", "red")
            }


            for (i = 0; i < 5; i++) {
                var day = (data.daily[i].dt)
                var dateString = moment.unix(day).format("dddd Do MMMM YYYY");
                var img = document.getElementById("five-day-img-" + i)
                img.src=`http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png`
                document.querySelector("#five-day-date-"+ (i)).innerHTML =  dateString
                document.querySelector("#five-day-temp-" + (i)).innerHTML = "Temp:   " + (data.daily[i].temp.day) + "°C"
                document.querySelector("#five-day-wind-" + (i)).innerHTML = "Wind:   " + (data.daily[i].wind_speed) + "mph"
                document.querySelector("#five-day-humidity-" + (i)).innerHTML = "Hum:   " + (data.daily[i].humidity) + "%"

            }

        })



}


function previousSearchHistory () {
    var storedCityNames =  JSON.parse(localStorage.getItem("city"))
    var requestUrl = (storedCityNames[i].url)
    console.log(storedCityNames)
    searchCity(requestUrl)

}

searchButton.addEventListener("click", searchCity)
resultsList.addEventListener("click", previousSearchHistory)






