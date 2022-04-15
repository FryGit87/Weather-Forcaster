var apiKey = "c897da12469fa121d634b40a11fa4de5";

//left side
let cityEl = $(".city");
let dateEl = $(".date");
let pastSerchEl = $(".pastSerch");

//search
let searchBtn = $(".search-button");
let searchInput = $(".search-input");

var todayDate = moment().format("MM/DD/YYYY");

searchBtn.on("click", function () {
  dateEl.text(`(${todayDate})`);
});
