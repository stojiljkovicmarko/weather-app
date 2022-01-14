const api = {
  key: "2178d71f730cf2719f7f9527b7b22806",
  base_url: "https://api.openweathermap.org/data/2.5/onecall",
  exclude: "minutely,alerts",
  units: "metric",
};

const getWeatherData = async (coordinates) => {
  const response = await fetch(
    `${api.base_url}?lat=${coordinates.lat}&lon=${coordinates.long}&exclude=${api.exclude}&units=${api.units}&appid=${api.key}`
  );

  if (!response.ok) {
    throw new Error("Could not find the weather for specified place.");
  }

  const data = await response.json();

  return data;
};

export { getWeatherData };
