$(document).ready(function () {
    var cities = []
    var currentCity = cities[length - 1]
    var today = moment().format('l');
    var wrapperDiv = $("<div class='wrapper'>")

    function getWeather() {

        var city = $(this).attr("data-name");
        event.preventDefault();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=eb996df505ee640221603df760c80d82&units=imperial"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            var weatherHead = $("<h2>").text(city + " (" + today + ")")
            var currentIcon = response.weather[0].icon
            var icon = $(`<img src="http://openweathermap.org/img/wn/${currentIcon}@2x.png">`)
            var temp = $("<p>").text("Temperature: " + response.main.temp + "°F")
            var humid = $("<p>").text("Humidity: " + response.main.humidity + "%")
            var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH")
            var UVtext = $("<p>").text("UV Index: ")
            wrapperDiv.append(weatherHead, icon, temp, humid, windSpeed, UVtext)
            getUVI(response);

        })
    }

    function getUVI(response) {
        var lat = response.coord.lat
        var lon = response.coord.lon
        var UVURL = `http://api.openweathermap.org/data/2.5/uvi?appid=eb996df505ee640221603df760c80d82&lat=${lat}&lon=${lon}`
        $.ajax({
            url: UVURL,
            method: "GET"
        }).then(function (UV) {
            var UVI = UV.value;
            var UVColor;
            if (UVI <= 5) {
                UVColor = "badge badge-pill badge-primary"
            }
            else if ((UVI > 5) && (UVI < 8)) {
                UVColor = "badge badge-pill badge-success"
            }
            else if ((UVI > 7) && (UVI < 9)) {
                UVColor = "badge badge-pill badge-warning"
            }
            else {
                UVColor = "badge badge-pill badge-danger"
            }
            var UVElement = $("<span class='" + UVColor + "'>")
            UVElement.text(UVI)
            wrapperDiv.append(UVElement)
            $(".currentWeather").append(wrapperDiv)
            getForecastWeather(response);


        })
    }

    function getForecastWeather(response) {
        $(".forecastWeather").empty();
        var lat = response.coord.lat
        var lon = response.coord.lon
        var fUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
                                    exclude=current,minutely,hourly&appid=eb996df505ee640221603df760c80d82&units=imperial`
        $.ajax({
            url: fUrl,
            method: "GET"
        }).then(function (forecast) {
            console.log(forecast)
            for (var i = 0; i < 5; i++) {
                var currentIcon = forecast.daily[i + 1].weather[0].icon
                var icon = $(`<img src="http://openweathermap.org/img/wn/${currentIcon}.png">`)
                var fCard = $("<div class='card text-white bg-primary'>")
                var fDate = $("<h4>").text(moment().add(i + 1, 'days').format('l'))
                var fTemp = $("<p>").text("Temperature: " + forecast.daily[i + 1].temp.day + "°F")
                var fHumid = $("<p>").text("Humidity: " + forecast.daily[i + 1].humidity + "%")
                fCard.append(fDate, icon, fTemp, fHumid)
                $(".forecastWeather").append(fCard);
            }
        })
    }

    function renderButtons() {
        $(".cityList").empty();
        $(".cityInput").val("")
        for (var i = 0; i < cities.length; i++) {
            var a = $("<button>");
            a.addClass("btn btn-secondary btn-sm btn-block cityBtn");
            a.attr("data-name", cities[i]);
            a.text(cities[i]);
            $(".cityList").append(a);
        }
    }


function storeCity() {
    var newCity = $(".cityInput").val()
    if ((newCity === "") || (cities.length == 10)){
       return false
    }
    else {
    cities.push(newCity)
    localStorage.setItem("CityList", JSON.stringify(cities))
    getWeather();
    renderButtons();
    }
}

cities = JSON.parse(localStorage.getItem("CityList")) || [];














$(document).on("click",".cityBtn" , getWeather);
$(document).on("click","#searchBtn" , storeCity);
renderButtons();


});