"use strict";

/* ---------------------------- Show time and day --------------------------- */

const dateContainerElement = document.querySelector(".date-container");
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

setTimeout(() => {
	dateContainerElement.style.opacity = 1;
}, 1500);

function getTime() {
	setInterval(() => {
		let time = new Date();
		timeElement.textContent = time.toLocaleTimeString();
		dateElement.textContent = time.toLocaleDateString();
	}, 1000);
}

/* -------------------------- Initialize app -------------------------- */

let city = "Sydney";
getWeatherInformation();

/* --------------------------------- Input city -------------------------------- */

const bodyElement = document.querySelector("body");
const formElement = document.querySelector("form");
const inputFieldElement = document.querySelector("#input-field");
const inputContainerElement = document.querySelector(".input-container");
const buttonElement = document.querySelector(".button");
const weatherInfoElement = document.querySelector(
	".current-conditions-container"
);

buttonElement.addEventListener("click", () => {
	inputContainerElement.classList.toggle("field-visible");
});

formElement.addEventListener("submit", (event) => {
	event.preventDefault();
	city = inputFieldElement.value;
	inputFieldElement.value = "";
	inputContainerElement.classList.toggle("field-visible");

	setTimeout(() => {
		weatherInfoElement.style.opacity = 0;
	}, 0);
	setTimeout(() => {
		getWeatherInformation();
	}, 500);
	setTimeout(() => {
		weatherInfoElement.style.opacity = 1;
	}, 1000);
});

function increaseOpacity() {
	weatherInfoElement.style.opcacity = 1;
}

/* -------------- Get current weather -------------- */

function getWeatherInformation() {
	fetch(
		`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=321dc1f804a859eadfdb47b5acf0e2b0`
	)
		.then((data) => data.json())
		.then((data) => {
			let latCity = Number(data[0].lat.toFixed(2));
			let lonCity = Number(data[0].lon.toFixed(2));
			city = data[0].local_names.de;

			/* -------------- Get current weather -------------- */

			fetch(
				`https://api.openweathermap.org/data/2.5/weather?lang=de&lat=${latCity}&lon=${lonCity}&appid=321dc1f804a859eadfdb47b5acf0e2b0`
			)
				.then((data) => data.json())
				.then((data) => {
					console.log("current Weather:", data);
					weatherInfoElement.style.opacity = 1;
					const sunrise = document.getElementById("sunrise");
					const sunset = document.getElementById("sunset");
					const tempElement = document.querySelector(".current-temp");
					const humidityElement =
						document.querySelector(".current-humidity");
					const weatherElement =
						document.querySelector(".current-weather");
					const locationElement = document.querySelector(".location");
					const weatherIconElement = document.querySelector(
						".current-weather-icon"
					);

					let iconId = data.weather[0].icon;
					weatherIconElement.src = `http://openweathermap.org/img/wn/${iconId}@2x.png`;

					tempElement.textContent =
						Math.round(data.main.temp - 273.15) + "°C";
					humidityElement.textContent =
						Math.round(data.main.humidity) + "%";
					weatherElement.textContent = data.weather[0].description;
					locationElement.textContent = city;

					//  Sunrise / Sunset
					let sunriseTime = new Date(data.sys.sunrise);
					console.log("SunRise in dateFormat:", sunriseTime);
					sunriseTime = sunriseTime.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					});
					let sunsetTime = new Date(data.sys.sunset);
					console.log("SunSet in dateFormat:", sunsetTime);
					sunsetTime = sunsetTime.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					});
					sunrise.innerText = sunriseTime;
					sunset.innerText = sunsetTime;

					// Set background image
					const upperSectionElement =
						document.querySelector(".upper-section");

					switch (data.weather[0].main) {
						case "Clear":
							upperSectionElement.style.backgroundImage =
								"url('https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80')";
							break;
						case "Clouds":
							upperSectionElement.style.backgroundImage =
								"url('https://images.unsplash.com/photo-1525510579144-4844ac3d3a3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNsb3VkeXxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60')";
							break;
						case "Rain":
							upperSectionElement.style.backgroundImage =
								"url('https://images.unsplash.com/photo-1594516150843-b2a82ece1035?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=832&q=80')";
							break;
						case "Snow":
							upperSectionElement.style.backgroundImage =
								"url('https://images.unsplash.com/photo-1516015222231-943dc82860bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80')";
							break;
						case "Thunderstorm":
							upperSectionElement.style.backgroundImage =
								"url('https://images.unsplash.com/photo-1508697014387-db70aad34f4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80')";
							break;
						case "Drizzle":
							upperSectionElement.style.backgroundImage =
								"url('https://images.unsplash.com/photo-1638253910847-b98cac8387c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80')";
							break;
						case "Mist":
							upperSectionElement.style.backgroundImage =
								"url('https://images.unsplash.com/photo-1585508889431-a1d0d9c5a324?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8TWlzdHxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60')";
							break;
						case "Dust":
							upperSectionElement.style.backgroundImage =
								"url('https://images.unsplash.com/photo-1520632587893-f4e855502ca3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80')";
							break;
						case "Fog":
							upperSectionElement.style.backgroundImage =
								"url('https://images.unsplash.com/photo-1510596713412-56030de252c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80')";
							break;
					}
				});
			fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${latCity}&lon=${lonCity}&appid=321dc1f804a859eadfdb47b5acf0e2b0`
			)
				.then((data) => data.json())
				.then((data) => {
					const morningWeather = document.querySelector(
						".forecast-icon-morning"
					);
					const dayWeather =
						document.querySelector(".forecast-icon-day");
					const eveningWeather = document.querySelector(
						".forecast-icon-evening"
					);
					const nightWeather = document.querySelector(
						".forecast-icon-night"
					);
					const forecastMorningTemperatur =
						document.querySelector(".p-morning");
					const forecastDayTemperatur =
						document.querySelector(".p-day");
					const forecastEveningTemperatur =
						document.querySelector(".p-evening");
					const forecastNightTemperatur =
						document.querySelector(".p-night");

					console.log("forecast", data);

					dayForecast(morningWeather, 0);
					dayForecast(dayWeather, 1);
					dayForecast(eveningWeather, 2);
					dayForecast(nightWeather, 3);

					function dayForecast(tageszeit, uhrzeit) {
						if (tageszeit == morningWeather) {
							forecastMorningTemperatur.innerHTML = `${Math.round(
								data.list[uhrzeit].main.temp - 273.15
							)} °C`;
						}
						if (tageszeit == dayWeather) {
							forecastDayTemperatur.innerHTML = `${Math.round(
								data.list[uhrzeit].main.temp - 273.15
							)} °C`;
						}
						if (tageszeit == eveningWeather) {
							forecastEveningTemperatur.innerHTML = `${Math.round(
								data.list[uhrzeit].main.temp - 273.15
							)} °C`;
						}
						if (tageszeit == nightWeather) {
							forecastNightTemperatur.innerHTML = `${Math.round(
								data.list[uhrzeit].main.temp - 273.15
							)} °C`;
						}

						switch (data.list[uhrzeit].weather[0].main) {
							case "Clear":
								tageszeit.style.backgroundImage =
									"url(./assets/img/clear.svg)";
								break;
							case "Clouds":
								tageszeit.style.backgroundImage =
									"url(./assets/img/clouds2.svg)";
								break;
							case "Rain":
								tageszeit.style.backgroundImage =
									"url(./assets/img/rain.svg)";
								break;
							case "Snow":
								tageszeit.style.backgroundImage =
									"url(./assets/img/snow.svg)";
								break;
							case "Thunderstorm":
								tageszeit.style.backgroundImage =
									"url(./assets/img/thunderstorm.svg)";
								break;
							case "Drizzle":
								tageszeit.style.backgroundImage =
									"url(./assets/img/drizzle.svg)";
								break;
							case "Mist":
								tageszeit.style.backgroundImage =
									"url('https://images.unsplash.com/photo-1585508889431-a1d0d9c5a324?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8TWlzdHxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60')";
								break;
							case "Dust":
								tageszeit.style.backgroundImage =
									"url('https://images.unsplash.com/photo-1520632587893-f4e855502ca3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80')";
								break;
							case "Fog":
								tageszeit.style.backgroundImage =
									"url('https://images.unsplash.com/photo-1510596713412-56030de252c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80')";
								break;
						}
					}
				});
		});
}

/* -------------------------------- forecast; ------------------------------- */

// fetch(
// 	`https://api.openweathermap.org/data/2.5/forecast?lat=${latCity}&lon=${lonCity}&appid=321dc1f804a859eadfdb47b5acf0e2b0`
// )
// 	.then((data) => data.json())
// 	.then((data) => {
// 		console.log(data);
// 	});

/* --------------------------------- Notizen -------------------------------- */

// Stadtnamen
// aktuelle Temperatur
// Temp. Morgen
// Temp. Mittag
// Temp. Abend
// Temp. Nacht

// Weather
// https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
// Humidity

// OPTIONAL
// Windspeed
// Wind direction
