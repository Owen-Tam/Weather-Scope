import tempSvg from "url:../../img/temp.svg";
import humiditySvg from "url:../../img/humidity.svg";
import pressureSvg from "url:../../img/pressure.svg";
import sunSvg from "url:../../img/sun.svg";
import sunsetSvg from "url:../../img/sunset.svg";
import windSvg from "url:../../img/wind.svg";
import spinner from "url:../../img/spinner.png";
class WeatherView {
  _parentElement = document.querySelector(".showcase");
  _errorMessage = "Your location's weather wasn't found :(";
  _clear() {
    this._parentElement.textContent = "";
  }
  renderSpinner() {
    this._clear();
    const markup = `
    <h2>Loading...</h2>`;
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  addHandlerLoad(handler) {
    window.addEventListener("load", handler);
  }
  render(weather) {
    this._clear();
    this._parentElement.insertAdjacentHTML(
      "afterbegin",
      this._formatWeather(weather)
    );
  }
  renderError(message = this._errorMessage) {
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", `<h2>${message}</h2>`);
  }
  _formatWeather(weather) {
    return `<div class="showcase-basic-info">
    <h2 class="loc__name">${weather.region}</h2>
    <h3 class="loc__weather-description">${
      weather.condition.slice(0, 1).toUpperCase() + weather.condition.slice(1)
    }</h3>
    </div>
  <div class="showcase__info">
    <ul class="showcase__complex-info">
      <li class="loc__temperature loc__item">
        <img class="loc__icon icon" src="${tempSvg}" alt="" />
        <p class="loc__max-temp">Max-Temp: ${Math.round(weather.tempMax)}°C</p>

        <p class="loc__min-temp">Min-Temp: ${Math.round(weather.tempMin)}°C</p>
      </li>

      <li class="loc__item">
        <img class="loc__icon icon" src="${pressureSvg}" alt="" />
        <p class="loc__pressure">Pressure: ${weather.pressure} hPa</p>
      </li>
      <li class="loc__item">
        <img class="loc__icon icon" src="${humiditySvg}" alt="" />
        <p class="loc__humidity">Humidity: ${weather.humidity}%</p>
      </li>
      <li class="loc__item">
        <img class="loc__icon icon" src="${windSvg}" alt="" />
        <p class="loc__wind">Wind: ${weather.windSpeed} mph</p>
      </li>
    </ul>
    <ul class="showcase__sun">
      <li class="loc__item">
        <img class="loc__icon icon" src="${sunSvg}" alt="" />
        <p class="loc__sunrise">Sunrise: ${this._formatDate(
          weather.sunrise
        )}</p>
      </li>
      <li class="loc__item">
        <img class="loc__icon icon" src="${sunsetSvg}" alt="" />
        <p class="loc__sunset">Sunset: ${this._formatDate(weather.sunset)}</p>
      </li>
    </ul>
  </div>`;
  }
  _formatDate(date) {
    console.log(date);
    const time = new Date(date * 1000);
    const hours = time.getHours() + "";
    const mins = time.getMinutes() + "";
    return `${hours.padStart(2, "0")}:${mins.padStart(2, "0")}`;
  }
}

export default new WeatherView();
