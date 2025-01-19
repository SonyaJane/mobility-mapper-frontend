import locateUser from './locate-user.js';
import createZoomToLocationButton from './create-zoom-to-location-button.js';

export default async function initialiseMap() {

    console.log("Initialising map");

    // Initialise Leaflet map and add OpenStreetMap tiles
    MM.map = L.map('map').setView([55.3781, 3.4360], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(MM.map);

    // get the user's location and set zoom level
    try {                 
        MM.userLocation = await locateUser(MM.map);
        if (MM.userLocation) {
            MM.map.setView([MM.userLocation.lat, MM.userLocation.lon], 6);
        }
    } catch (error) {
        console.error("Error getting user location: ", error);
    }

    // Add a button to zoom to the user's current location
    createZoomToLocationButton();
}