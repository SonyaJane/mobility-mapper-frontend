import addMapClickListener from './map-click-listener.js';
import addEventListenersToWaypointDivs from './waypoint-div-click-listener.js';
import initialiseMap from './initialise-map.js';
import generateRoute from './generate-route.js';

document.addEventListener('DOMContentLoaded', async () => {

    console.log("Creating MobilityMapper namespace and initialising global variables");

    // Create MM (Mobility Mapper) global namespace to store global variables
    window.MM = window.MM || {}; // || {} ensures that if the namespace already exists, it won't be overwritten

    // Initialise global variables
    MM.currentDevice = null;
    MM.coordinates = []; // Coordinates for the route

    // Add a Proxy to MM.coordinates to detect when the array length = 2
    // and trigger route generation
    MM.coordinates = new Proxy([], {
        set(target, property, value) {
            target[property] = value; // Update the array
            // Check if the length of the array is greater than 1
            if (target.length > 1) {
                // Generate the route and display it on the map
                generateRoute("wheelchair", "false");
                // Remove the orange background from the waypoint divs
                document.querySelectorAll('.waypoint').forEach(waypoint => {
                    waypoint.classList.remove('background-orange');
                });
            }
            return true; // Indicate the operation was successful
        }
    });
    
    // User saved places
    MM.savedPlaces = [{ name: "Home", lat: 51.463913, lon: -3.162759, address: "1 Home Street, Cardiff" },
                      { name: "Work", lat: 51.485925, lon: -3.176533, address: "1 Work Street, Cardiff" },
                      { name: "Dentist", lat: 51.519471, lon: -3.117880, address: "1 Dentist Street, Cardiff" }];
    
    // Initialise Leaflet map
    await initialiseMap();

    // add click event listener to the map
    addMapClickListener();
    
    // Add a click event listener to .waypoint (start and destination) divs
    // Adds a div below the waypoint div with ways to select or search for a location
    addEventListenersToWaypointDivs();

});