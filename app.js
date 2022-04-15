var apiKey = "c897da12469fa121d634b40a11fa4de5";

//left side
let cityEl = $(".city");
let dateEl = $(".date");
let pastSerchEl = $(".pastSerch");

//search
let searchBtn = $(".search-button");
let searchInput = $(".search-input");

//main display
let temperatureEl = $(".temp");
let windEl = $(".wind");
let humidEl = $(".humidity");
let uvIndexEl = $(".uvIndex");
let cardRow = $(".card-row");

var todayDate = moment().format("MM/DD/YYYY");

//-------------------------------DONE-----------------------------------
searchBtn.on("click", function (e) {
  e.preventDefault();
  dateEl.text(`(${todayDate})`);
  findWeather(searchInput.val());
});

//------------------------------- DONE-----------------------------------

function displayPreviousSearch(cName) {
  pastSerchEl.empty();
  let pastSerchArr = JSON.parse(localStorage.getItem("previousSearch"));
  for (let i = 0; i < pastSerchArr.length; i++) {
    let recentSearch = $("<li>");
    recentSearch.text(pastSerchArr[i]);
    pastSerchEl.prepend(recentSearch);
  }
}

//-------------------------------DONE-----------------------------------

function weatherInformation(cName, cTemp, cHumid, cWind, cUvRating) {
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
    let queryUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${cObject.cUvRating.lat}&lon=${cityObj.cUvRating.lon}&APPID=${apiKey}&units=imperial`;
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (cUv) {
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
            cWeatherImgDisplay,
            cUv.value
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
            cWeatherImgDisplay,
            cUv.value
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
            cWeatherImgDisplay,
            cUv.value
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
            cWeatherImgDisplay,
            cUv.value
          );
        }
      }
    });
  });
}

nextFiveDays();

function nextFiveDays() {
  //WRITE MEEEEEEEEEE
}
