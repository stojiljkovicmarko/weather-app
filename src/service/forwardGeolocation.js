const api = {
  base_url: "https://api.opencagedata.com/geocode/v1/json",
  key: "de6d02af764448c19fbeb163c957bdc6",
};

const getCoordinatesFromLocation = async (city) => {
  const response = await fetch(`${api.base_url}?q=${city}&key=${api.key}`);

  if (!response.ok) {
    throw new Error("Could not find info for that city!");
  }

  const data = await response.json();

  console.log("data from get coordinates:", data);

  return data;
};

export { getCoordinatesFromLocation };
