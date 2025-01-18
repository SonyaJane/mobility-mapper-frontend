// Get current user's location using Leaflet's locate method
export default async function locateUser(map) {
    // need to explicitly wrap the locateUser() function in a Promise to return values        
    try {
        const [latlon, accuracy] = await new Promise((resolve, reject) => {
            map.locate({ setView: false, enableHighAccuracy: true });

            map.on('locationfound', (e) => {
                resolve([{ "lat": e.latitude, "lon": e.longitude }, e.accuracy]);
            });

            map.on('locationerror', (e) => {
                reject(new Error(e.message));
            });
        });
        console.log(`User Location: Lat: ${latlon.lat}, Lon: ${latlon.lon}, Accuracy: ${accuracy}`);
        return latlon; // Return the location values as an object if successful

    } catch (error) { // for when the location cannot be retrieved (eg permissions denied, timeout)
        console.error(error.message);
        alert("Could not get your location. Please allow location access.");
        return null;
    }
}
