let weather = {
  apiKey: "1200f64ebb89911d8832d9d7b5ba0fbd",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector('.description').innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector('.humidity').innerText =
      "Humidity: " + humidity + "%";
    document.querySelector('.speed').innerText =
      `Wind speed: ${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-location").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
      weather.search();
});
const d = new Date();
document.querySelector('.date').innerHTML = d;
document
  .querySelector(".search-location")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }4
  });

weather.fetchWeather("Delhi");