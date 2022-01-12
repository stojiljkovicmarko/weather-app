const api = {
  key: "2178d71f730cf2719f7f9527b7b22806",
  base_url: "https://api.openweathermap.org/data/2.5/weather",
};

const getWeatherByLocation = async (location) => {
  const response = await fetch(
    `${api.base_url}?lat=${location.lat}&lon=${location.long}&units=metric&appid=${api.key}`
  );

  if (!response.ok) {
    throw new Error("Could not find the weather for specified place.");
  }

  const data = await response.json();
  console.log("weather by location", data);

  return data;
};

const getWeatherData = async (city) => {
  const response = await fetch(
    `${api.base_url}?q=${city}&units=metric&appid=${api.key}`
  );

  if (!response.ok) {
    throw new Error("Could not find the weather for specified place.");
  }

  const data = await response.json();

  return data;
};

export { getWeatherData, getWeatherByLocation };
