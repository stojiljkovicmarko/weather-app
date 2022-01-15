const api = {
  base_url: "https://api.opencagedata.com/geocode/v1/json",
  key: "de6d02af764448c19fbeb163c957bdc6",
};

const getLocationOfCoordinates = async (coordinates) => {
  const { lat, long } = coordinates;

  const response = await fetch(
    `${api.base_url}?q=${lat}+${long}&key=${api.key}`
  );

  if (!response.ok) {
    throw new Error("Could not find information for the city!");
  }

  const data = await response.json();

  return data;
};

export { getLocationOfCoordinates };
