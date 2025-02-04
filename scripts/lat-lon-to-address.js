/**
 * Get the address from the latitude and longitude using the OpenStreetMap Nominatim API
 */
export default async function latLonToAddress(lat, lon) {
    // define the api url
    const api_url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
    // fetch the data
    const response = await fetch(api_url);
    // convert the response to json
    const data = await response.json();
    // if the response is ok, display the search results
    if (response.ok) {
        return data.display_name;
    } else {
        throw new Error(data.error || 'An error occurred while retrieving the address.');
    }
}