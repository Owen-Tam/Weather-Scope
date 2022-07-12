const locNameDisplay = document.querySelector(".loc-name");
const weatherDescDisplay = document.querySelector(".loc__weather-description");
const maxTempDisplay = document.querySelector(".loc__max-temp");
const minTempDisplay = document.querySelector(".loc__min-temp");
const pressureDisplay = document.querySelector(".loc__pressure");
const humidityDisplay = document.querySelector(".loc__humidity");
const windDisplay = document.querySelector(".loc__wind");
const sunriseDisplay = document.querySelector(".loc__sunrise");
const sunsetDisplay = document.querySelector(".loc__sunset");

import * as model from "./model.js";
import weatherView from "./view/weatherView.js";

const controlWeather = async function () {
  try {
    weatherView.renderSpinner();
    await model.loadPos();
    console.log(model.state.coords);
    await model.loadWeather(model.state.coords);
    weatherView.render(model.state.weather);
  } catch (err) {
    console.error(err);
    weatherView.renderError();
  }
};
const init = function () {
  weatherView.addHandlerLoad(controlWeather);
};
init();
