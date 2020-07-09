$(document).ready(function () {
    var cities = ["Denver", "Phoenix"]
    var today = moment().format('l');
    var dayOrNight = $(".currentWeather").attr("data-state")
    var hour = moment().format('HH')
    function getWeather() {
        var city = $(this).attr("data-name");
        event.preventDefault();
        $(".currentWeather").empty();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=eb996df505ee640221603df760c80d82&units=imperial"
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            var wrapperDiv = $("<div class='wrapper'>")
            var weatherHead = $("<h2>").text(city + " (" + today + ")")
            var currentIconText = ""
            var currentIcon = response.weather[0].main
            console.log()
            if ((currentIcon == "Clouds") && ($(".currentWeather").attr("data-state") == "day")) {
                currentIconText = "03d"
            }
            else if ((currentIcon == "Rain") || (currentIcon == "Drizzle") || (currentIcon == "Thunderstorm")) {
                currentIconText = "04d"
            }
            else if (currentIcon == "Snow") {
                currentIconText = "13d"
            }
            else if ((currentIcon == "Clear") && ($(".currentWeather").attr("data-state") == "night")) {
                currentIconText = "01n"
            }
            else {
                currentIconText = "01d"
            }

            var icon = $(`<img src="http://openweathermap.org/img/wn/${currentIconText}@2x.png">`)
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
                    wrapperDiv.append(weatherHead, icon, temp, humid, windSpeed, UVI)
                    $(".currentWeather").append(wrapperDiv)
                    getForecastWeather();
                    function getForecastWeather() {
                        $(".forecastWeather").empty();
                        var fUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
                        exclude=current,minutely,hourly&appid=eb996df505ee640221603df760c80d82&units=imperial`
                        $.ajax({
                            url: fUrl,
                            method: "GET"
                        }).then(function(forecast) {
                            // var wrapperDiv = $("<div class='wrapper'>");
                            console.log(forecast)
                            for (var i = 0; i < 5; i++) {
                            var icon = $(`<img src="http://openweathermap.org/img/wn/${currentIconText}.png">`)
                            var currentIcon = forecast.daily[i + 1].weather[0].main
                            var currentIconText = ""
                            if ((currentIcon == "Clouds") && ($(".currentWeather").attr("data-state") == "day")) {
                                currentIconText = "03d"
                            }
                            else if ((currentIcon == "Rain") || (currentIcon == "Drizzle") || (currentIcon == "Thunderstorm")) {
                                currentIconText = "04d"
                            }
                            else if (currentIcon == "Snow") {
                                currentIconText = "13d"
                            }
                            else if ((currentIcon == "Clear") && ($(".currentWeather").attr("data-state") == "night")) {
                                currentIconText = "01n"
                            }
                            else {
                                currentIconText = "01d"
                            }
                            var fCard = $("<div class='card text-white bg-primary'>")
                            var fDate = $("<h4>").text(moment().add(i + 1, 'days').format('l'))
                            var fTemp = $("<p>").text("Temperature: " + forecast.daily[i + 1].temp.day + "°F")
                            var fHumid = $("<p>").text("Humidity: " + forecast.daily[i + 1].humidity + "%")
                            fCard.append(fDate, icon, fTemp, fHumid)
                            $(".forecastWeather").append(fCard);
                            }
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
    
    
    
    // need to make some if/else statements about the weather and assign the appropriate icons
    
    
    
    
    
    
    
    
    
    
    
    
    if (hour >= 19) {
        $(".currentWeather").attr("data-state", "night")
    }
    else {       
         $(".currentWeather").attr("data-state", "day")
        }
    console.log(dayOrNight)

    
    
    
    
    
    
    
    
    $(document).on("click", ".btn", getWeather);
    renderButtons();
    
    
    });