var apiKey = "c897da12469fa121d634b40a11fa4de5";

//left side
let cityEl = $(".searched-city-name");
let dateEl = $(".date");
// let imageEl = $(".weather-image");
let previousSearches = $(".search-history");

//search
let searchBtn = $(".search-button");
let searchInput = $(".search-input");

//main display
let temperatureEl = $(".temperature");
let windEl = $(".wind");
let humidEl = $(".humidity");
let uvIndexEl = $(".uvIndex");
let nextFiveDays = $(".future-forecast-cards");

var todayDate = moment().format("MM/DD/YYYY");

//-------------------------------DONE-----------------------------------
searchBtn.on("click", function (e) {
  e.preventDefault();
  dateEl.text(`(${todayDate})`);
  returnWeatherData(searchInput.val());
});

//
//-------------------------------NOT DONE-----------------------------------
//
if (JSON.parse(localStorage.getItem("previousSearch")) === null) {
  console.log("null");
} else {
  console.log("!null");
  displayPreviousSearch();
}

//------------------------------- DONE-----------------------------------

function displayPreviousSearch(cName) {
  previousSearches.empty();
  let pastSerchArr = JSON.parse(localStorage.getItem("previousSearch"));
  for (let i = 0; i < pastSerchArr.length; i++) {
    let recentSearch = $("<li>");
    recentSearch.text(pastSerchArr[i]);
    previousSearches.prepend(recentSearch);
  }
}

//
//-------------------------------DONE-----------------------------------

function weatherInformation(
  cName,
  cTemp,
  cHumid,
  cWind,
  cUvRating
  //   cityWeatherIcon,
) {
  cityEl.text(cName);
  dateEl.text(`(${todayDate})`);
  temperatureEl.text(`Temperature: ${cTemp} °F`);
  windEl.text(`Wind Speed: ${cWind} MPH`);
  humidEl.text(`Humidity: ${cHumid}%`);
  uvIndexEl.text(`UV Index: ${cUvRating}`);
}

//------------------------------- DONE-----------------------------------

function returnWeatherData(userCityChoice) {
  let queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCityChoice}&APPID=${apiKey}&units=imperial`;
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (weatherData) {
    let cObject = {
      cName: weatherData.name,
      cTemp: weatherData.main.temp,
      cHumid: weatherData.main.humidity,
      cWind: weatherData.wind.speed,
      cUvRating: weatherData.coord,
      cWeatherImg: weatherData.weather[0].icon,
    };
    let queryUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cObject.cUvRating.lat}&lon=${cObject.cUvRating.lon}&APPID=${apiKey}&units=imperial`;
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (cUv) {
      console.log(cUv.value);
      if (JSON.parse(localStorage.getItem("previousSearch")) == null) {
        let pastSerchArr = [];
        if (pastSerchArr.indexOf(cObject.cName) === -1) {
          pastSerchArr.push(cObject.cName);
          localStorage.setItem("previousSearch", JSON.stringify(pastSerchArr));

          let cWeatherImgDisplay = `https:///openweathermap.org/img/w/${cObject.cWeatherImg}.png`;
          weatherInformation(
            cObject.cName,
            cObject.cTemp,
            cObject.cHumid,
            cObject.cWind,
            cUv.value,
            cWeatherImgDisplay
          );
          displayPreviousSearch(cObject.cName);
        } else {
          console.log("ALREADY SEARCHED");
          let cWeatherImgDisplay = `https:///openweathermap.org/img/w/${cObject.cWeatherImg}.png`;
          weatherInformation(
            cObject.cName,
            cObject.cTemp,
            cObject.cHumid,
            cObject.cWind,
            cUv.value,
            cWeatherImgDisplay
          );
        }
      } else {
        let pastSerchArr = JSON.parse(localStorage.getItem("previousSearch"));
        if (pastSerchArr.indexOf(cObject.cName) === -1) {
          pastSerchArr.push(cObject.cName);
          localStorage.setItem("previousSearch", JSON.stringify(pastSerchArr));
          let cWeatherImgDisplay = `https:///openweathermap.org/img/w/${cObject.cWeatherImg}.png`;
          weatherInformation(
            cObject.cName,
            cObject.cTemp,
            cObject.cHumid,
            cObject.cWind,
            cUv.value,
            cWeatherImgDisplay
          );
          displayPreviousSearch(cObject.cName);
        } else {
          console.log("ALREADY SEARCHED");
          let cWeatherImgDisplay = `https:///openweathermap.org/img/w/${cObject.cWeatherImg}.png`;
          weatherInformation(
            cObject.cName,
            cObject.cTemp,
            cObject.cHumid,
            cObject.cWind,
            cUv.value,
            cWeatherImgDisplay
          );
        }
      }
    });
  });
}
