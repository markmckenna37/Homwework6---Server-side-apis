$(document).ready(function() {

    function getCityWeather() {
        event.preventDefault()
    var userCity = $("#userCity").val()
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=eb996df505ee640221603df760c80d82"
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response)
      });

    }
// location/new Date() checkout MDN date object, on location-date
var today = moment().format('l');
console.log(today);



    for (var i = 0; i < 5; i++ ) {
    var fToday = moment().add(i + 1, 'days').format('l')
        $(".fDate" + i).text(fToday)
    }

// openweathermap.org/api (try to fiugre out how to make it in units imperial)
// .temperature
// .humidity
// .windspeed
// .uvIndex
// localstorage for the cities on the left sidebar
    // clickable dynamic elements (buttons in this case), this is very similar to activiity 10 unit 6
 //   Forecast Dates, temperature, and humidity for the next 5 days with  .fDatei, .fTempi, and .fHumidi







$("#submitCity").on("click", function() {
    getCityWeather()
})


















})