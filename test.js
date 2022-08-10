var searchButton = document.getElementById("search-button")
var resultsList = document.getElementById("results-list")
var currentWeatherList = document.getElementById("current-weather-list")
var resultsList = document.getElementById("results-list")
var storedCityNames = []
var apiKey = "27c15d159618d2da5af0904826c56b48"
var storedCityNames = JSON.parse(localStorage.getItem("city")) || [];
var iconEl = "http://openweathermap.org/img/wn/"
var longitude = ""
var latitude= ""
var data


var handleResponse = function (response) {
    return response.json();
  };
  
var handleData = function (data) {
    console.log(data);
    listArray = data.list;
    console.log(listArray);
  }

// https://api.openweathermap.org/data/2.5/onecall?lat=$" + latitude "&lon=$" + longitude "&exclude={part}&units=metric&appid=$" + apikey;


function searchCity() {
    var cityName = document.getElementById("user-input").value;
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric";
      
    fetch(requestUrl)
        .then((response) => response.json())
        .then(data => console.log(data));
      


    currentCityInfo = {
        Name: cityName,
        url: requestUrl
    }

    storedCityNames.push(currentCityInfo)
    localStorage.setItem("city", JSON.stringify(storedCityNames));


    // fiveDayForecast()

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
        .then(function (data) {

            for (i = 0; i < 4; i++) {
                document.querySelector("#five-day-text-" + (i)).innerHTML = "Date:" + (data.list[i].dt_txt)
                var li = document.createElement("LI")
                li.setAttribute('class', 'five-day-blocks  blocks-div five-day-blocks ul li')
                resultsList.appendChild(li)
            }
            for (i = 0; 1 < 4; i++) {
                document.querySelector("#five-day-text-" + (i)).src= "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon +".png"
                var li = document.createElement("LI")
                li.setAttribute('class', 'five-day-blocks  blocks-div five-day-blocks ul li')
                resultsList.appendChild(li)
            }
            for (i = 0; 1 < 4; i++) {
                document.querySelector("#five-day-text-" + (i)).innerHTML = "Temp:" + (data.list[i].main.temp)
                var li = document.createElement("LI")
                li.setAttribute('class', 'five-day-blocks  blocks-div five-day-blocks ul li')
                resultsList.appendChild(li)
            }
            for (i = 0; 1 < 4; i++) {
                document.querySelector("#five-day-text-" + (i)).innerHTML = "Wind:" + (data.list[i].wind.speed)
                var li = document.createElement("LI")
                li.setAttribute('class', 'five-day-blocks  blocks-div five-day-blocks ul li')
                resultsList.appendChild(li)
            }

        })



}


searchButton.addEventListener("click", searchCity)
// resultsList.addEventListener("click", searchCity)

