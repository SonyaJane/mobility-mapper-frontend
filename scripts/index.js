import addMapClickListener from './map-click-listener.js';
import addEventListenersToWaypointDivs from './waypoint-div-click-listener.js';
import initialiseMap from './initialise-map.js';

document.addEventListener('DOMContentLoaded', async () => {

    console.log("Creating MobilityMapper namespace and initialising global variables");

    // Create MM (Mobility Mapper) global namespace to store global variables
    window.MM = window.MM || {}; // || {} ensures that if the namespace already exists, it won't be overwritten

    // Initialise global variables
    MM.currentDevice = null;
    MM.coordinates = []; // Coordinates for the route

    // User saved places
    MM.savedPlaces = [{ name: "Home", lat: 51.463913, lon: -3.162759, address: "1 Home Street, Cardiff" },
                      { name: "Work", lat: 51.485925, lon: -3.176533, address: "1 Work Street, Cardiff" },
                      { name: "Dentist", lat: 51.519471, lon: -3.117880, address: "1 Dentist Street, Cardiff" }];
    
    // Initialise Leaflet map
    await initialiseMap();
    console.log("MM.userLocation", MM.userLocation);

    // add click event listener to the map
    addMapClickListener();
    
    // Add a click event listener to .waypoint (start and destination) divs
    // Adds a div below the waypoint div with ways to select or search for a location
    addEventListenersToWaypointDivs();
 
    function exitMapFullScreen(lat, lon) {
        // Ensure map resizes to fit the new container size
        MM.map.invalidateSize();
        // reset view to center on selected location
        MM.map.setView([lat, lon]), undefined, { animate: false };
        // go to the top of the page
        console.log("Going to the top of the page");
        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });  // Scroll to the top of the page
        }, 5000);
    }
    
    function removePopupWithSlide() {
        console.log("removePopupWithSlide()");
        console.log("Removing fixed popup with slide animation");

        const popup = document.getElementById('fixed-popup');
    
        if (popup) {
            // Add a class to trigger the slide-down animation
            popup.classList.add('slide-down-1');
    
            // Wait for the animation to complete before removing the element
            popup.addEventListener('animationend', () => {
                popup.remove();
            }, { once: true }); // Use `{ once: true }` to ensure the event listener is only triggered once
            
        }
    }

    function showElementsSlide() {
        console.log("showElementsSlide()");
        console.log("Showing location display and map elements with slide animation");
        const startEndDisplay = document.getElementById("start-end-display");
        const map = document.getElementById("map");

        // show the start/end location display div
        startEndDisplay.classList.remove('hidden');

        // trigger the animations 
        startEndDisplay.classList.add('slide-down-2'); 
        map.classList.add('slide-down-map');           
    
        // Remove the animation classes after the animation ends
        startEndDisplay.addEventListener('animationend', () => {
            startEndDisplay.classList.remove('slide-down-2');
        }, { once: true }); // Ensure the listener runs only once

        map.addEventListener('animationend', () => {
            map.classList.remove('slide-down-map');
        }, { once: true }); // Ensure the listener runs only once

    }

});