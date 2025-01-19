export default async function searchLocationNominatim(locationText) {
    // Query the Nominatim API for the location input by the user
    try {
        // Define the api url
        const api_url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationText)}&addressdetails=1`;

        // Fetch the data
        const response = await fetch(api_url);

        // Handle HTTP errors
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        // Convert the response to json
        const data = await response.json();
        
        return data;
    } catch (error) {
        // Log the error
        console.error(`Error during searchLocationNominatim: ${error.message}`);
        return null;
    }
}