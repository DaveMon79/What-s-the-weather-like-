var searchButton = document.getElementById("search-button")
var cityName = document.getElementById("user-input")
var apiKey = "27c15d159618d2da5af0904826c56b48"
var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

function searchCity(requestUrl) {
    fetch(requestUrl)
        .then(function (response) {
            console.log(response);
            if (response.status === 404) 
                console.log("error 404")

            
            return response.json();

        })
}



searchButton.addEventListener("click", searchCity)





// https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=27c15d159618d2da5af0904826c56b48


// 'https://api.openweathermap.org/data/2.5/weather?q=manchester&appid=27c15d159618d2da5af0904826c56b48'