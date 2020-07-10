# Homwework6---Server-side-apis
![](Assets/h06screenshot.png)

GitHub link: https://github.com/markmckenna37/Weather-Dashboard---Serverside-API

Live GitHub link: https://markmckenna37.github.io/Weather-Dashboard---Serverside-API/

For this homework assignment, we were tasked with making a fully functional weather dashboard app where the user searches for a city, and the app provides a date, temperature, humidity, uv index, and wind speed for both the current day, and a 5 day forecast. The app also keeps a list of your previously searched cities in a local storage file. The data for the app is accessed through the Open Weather Map API. Jquery, bootstrap, and moment.js were also used for styling query selectors, and time data.

The app used data from 3 different API urls to access the current weather, uv index, and the forecast weather. First, upon a city search or button click, a "getWeather" function is called which calls an ajax function to access the current temperature, wind speed, humidity, and the weather icon. All of those data strings are then appended to a wrapper div, and appended to the "currentWeather" HTML div. 
The getWeather function also calls a function (GetUVI) to access and append the uv index to tue current weather HTML div. This data point is also run through an if/else statement to assign it the appropriate color coding. After the UV index is appended, the function calls another function called "getForecastWeather", which calls an ajax function to access the temperature and humidity for a 5 day forecast. A for loop then adds the data to a bootstrap card, which is then appended to the weatherforecast html div.

The store cities functions also push the searched cities to local storage. The render buttons function also creates a button for every city stored in local storage. 

