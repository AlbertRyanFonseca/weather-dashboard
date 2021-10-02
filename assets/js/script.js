var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city");
var fiveDayEl = document.querySelector("#fiveday-forecast");
var currentCitySearch = document.querySelector("#city-search");
var tempHistory = document.querySelector("#recentSearches");
var cityContainer = document.querySelector("#city-container");
var currentDayEl = document.querySelector("#current-container");
var day = moment().format("MM/DD/YYYY");
var recentSearch = [];

var getWeatherApi = function (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city +
        "&units=imperial" + "&appid=f106e5f8f454e764451ec9c1fac44551";

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data, city);
                });
            }
            else {
                alert("City does not exist.");
            }
        })
}

var loadSearch = function () {
    var sites = JSON.parse(localStorage.getItem('cities'));
    sites.forEach(createBtn);

}
// create btn
var createBtn = function (recent) {
    var btn = document.createElement("btn");
    btn.innerText = recent;
    btn.classList = "btn btn-primary btn-w";
    tempHistory.appendChild(btn);
    console.log(recent);
}

var saveSearch = function (saveData) {
    recentSearch.push(saveData);
    console.log(recentSearch);
    localStorage.setItem('cities', JSON.stringify(recentSearch));
}

var citySearch = function (event) {
    event.preventDefault();
    var citySelect = cityInputEl.value.trim();
    // console.log(citySelect);
    if (citySelect) {
        getWeatherApi(citySelect);
        createBtn(citySelect);
        saveSearch(citySelect);
        cityInputEl.textContent = "";

    } else {
        alert("Please enter a city");
        // console.log(event);
    }
};

var displayWeather = function (cities, searchTerm) {
    currentDayEl.textContent = "";
    currentCitySearch.textContent = searchTerm + ":" + "(" + day + ")";
    cityContainer.classList = "list-group col-12 col-md-8";
    var temp = document.createElement("p");
    temp.setAttribute("class", "weather-details");
    temp.textContent = "Temp:" + cities.main.temp + " F";
    currentDayEl.appendChild(temp);

    var wind = document.createElement("p");
    wind.setAttribute("class", "weather-details");
    wind.textContent = "Wind:" + cities.wind.speed + " MPH";
    currentDayEl.appendChild(wind);

    var humidity = document.createElement("p");
    humidity.setAttribute("class", "weather-details");
    humidity.textContent = "Humidity:" + cities.main.humidity + "%";
    currentDayEl.appendChild(humidity);
    // console.log(cities);

}

var recentClick = function () {

}

loadSearch();
cityFormEl.addEventListener("submit", citySearch);