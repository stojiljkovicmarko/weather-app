// https://api.waqi.info/feed/geo:[lat];[long]/?token=demo
// geo:[lat];[lng] - info for latitude and longitude

const api = {
    base_url: "https://api.waqi.info/feed/",
    token: "e74883ed5a6d9b630f409c73866ebb9ed4a77580",
};

const getAQI = async (coordinates) => {
    const response = await fetch(`${api.base_url}geo:${coordinates.lat};${coordinates.long}/?token=${api.token}`);

    if(!response.ok) {
        throw new Error("Couldn't find air quality info for specified place");
    }

    const data = await response.json();

    return data;
}

export { getAQI };