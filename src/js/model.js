import { API_URL, KEY } from "./config.js";
export const state = {
  weather: {},
  coords: {},
};
export const createWeatherObject = function (data) {
  return {
    loc: data.name,
    region: data.sys.country,
    condition: data.weather[0].description,
    tempMax: data.main.temp_max,
    tempMin: data.main.temp_min,
    pressure: data.main.pressure,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    windSpeed: data.wind.speed,
    humidity: data.main.humidity,
    timezone: data.timezone,
  };
};
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
    // coz resolve here will be called with the position in the successful callback
    // same for reject here but with the error
  });
};
export const loadPos = async function () {
  if (navigator.geolocation) {
    const pos = await getPosition();
    const { longitude, latitude } = pos.coords;
    state.coords.longitude = longitude;
    state.coords.latitude = latitude;
  }
};

export const loadWeather = async function (pos) {
  const { latitude, longitude } = pos;
  const res = await fetch(
    `${API_URL}?lat=${latitude}&lon=${longitude}&appid=${KEY}&mode=metric`
  );
  const data = await res.json();
  console.log(data);
  state.weather = createWeatherObject(data);
};
