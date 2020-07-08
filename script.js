$(document).ready(function () {
    var cities = ["Denver"]
    var today = moment().format('l');
    
    function getWeather() {
        var city = $(this).attr("data-name");
        event.preventDefault();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=eb996df505ee640221603df760c80d82&units=imperial"
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var wrapperDiv = $("<div class='wrapper'>");
            var weatherHead = $("<h2>").text(city + " (" + today + ")")
            var temp = $("<p>").text("Temperature: " + response.main.temp + "°F")
            var humid = $("<p>").text("Humidity: " + response.main.humidity + "%")
            var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH")
            getUVI();
            function getUVI() {
                var lat = response.coord.lat
                var lon = response.coord.lon
                var UVURL = `http://api.openweathermap.org/data/2.5/uvi?appid=eb996df505ee640221603df760c80d82&lat=${lat}&lon=${lon}`
                $.ajax({
                    url: UVURL,
                    method: "GET"
                }).then(function(UV) {
                    var UVI = "UV Index: " + UV.value
                    wrapperDiv.append(weatherHead, temp, humid, windSpeed, UVI)
                    $(".currentWeather").append(wrapperDiv)
                    getForecastWeather();
                    function getForecastWeather() {
                        var fUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=eb996df505ee640221603df760c80d82&units=imperial`
                        $.ajax({
                            url: fUrl,
                            method: "GET"
                        }).then(function(forecast) {
                            console.log(forecast)
                            var WrapperDiv = $("<div class='wrapper'>");
                        })
                    }
                })
            }
        })
    }
    
    function getCurrentWeather() {
        
    }
    
    function renderButtons() {
    $(".cityList").empty();
    for (var i = 0; i < cities.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-secondary btn-sm btn-block");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);
        $(".cityList").append(a);
    }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    $(document).on("click", ".btn", getWeather);
    renderButtons();
    
    
    });