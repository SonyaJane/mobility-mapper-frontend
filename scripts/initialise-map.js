import locateUser from './locate-user.js';

export default async function initialiseMap() {

    console.log("Initialising map");
    // Initialise Leaflet map
    MM.map = L.map('map');

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(MM.map);

    // get the user's location and set zoom level
    console.log("Locating user");

    try {                 
        MM.userLocation = await locateUser(MM.map);
    } catch (error) {
        console.error("Error getting user location: ", error);
        MM.userLocation = null;
    }

    // If we have the user's location, set the map view to the user's location
    if (MM.userLocation) {
        MM.map.setView([MM.userLocation.lat, MM.userLocation.lon], 6);
        // If we didn't get the user's location, set the map view to the middle of the UK
    } else {
        MM.map.setView([55.3781, 3.4360], 6);;
    }
}