// Description: This script is used to allow the user to search for 
// a location using text input, and then select a location from the 
// search results to use as a start or finish location, or waypoint 
// on the route.

// Get the map object from the global scope
const map = window.mapObject;

// Define a global variable to store the list of latitude and 
// longitude coordinates for the route
let coordinates = [];

// IDs of the divs to hide when the user searches for location
const divs_to_hide = ["map", "device-select", "generate-route-container", "destination-select", "start-location-display", "or", "start-location-options"];

// Add click event listener to location text search buttons
document.getElementById("search-location").addEventListener('click', e => {
    hideElements(divs_to_hide);
    searchLocation(e);
});

// Add click event listener to use current location div
document.getElementById("current-location").addEventListener('click', locateAndDisplay);

async function locateAndDisplay() {
    try {
        const [lat, lon, accuracy] = await locateUser();
        console.log(`Location: Latitude: ${lat}, Longitude: ${lon}`);
        // add coordinates to the start position (0) in the global variable
        coordinates[0] = [lat, lon];
        // Add a marker at the user's location
        const userMarker = L.marker([lat, lon]).addTo(window.mapObject);
        userMarker.bindPopup(`You are within ${accuracy.toFixed(2)} meters of this point`, {offset: [0, -20]}).openPopup();
        L.circle([lat, lon], accuracy).addTo(window.mapObject);
    } catch (error) {
        
            console.error("Error locating user:", error.message);
    };
};

// Get current user's location using Leaflet's locate method
async function locateUser() {
    try {
        const [lat, lon, accuracy] = await new Promise((resolve, reject) => {
            window.mapObject.locate({ setView: false, enableHighAccuracy: true });

            window.mapObject.on('locationfound', (e) => {
                resolve([e.latitude, e.longitude, e.accuracy]);
            });

            window.mapObject.on('locationerror', (e) => {
                reject(new Error(e.message));
            });
        });

        console.log(`User's location: Latitude: ${lat}, Longitude: ${lon}, Accuracy: ${accuracy}`);
        return [lat, lon, accuracy]; // Return the location values if successful

    } catch (error) { // for when the location cannot be retrieved (eg permissions denied, timeout)
        console.error(error.message);
        alert("Could not get your location. Please allow location access."); 
        return null; 
    }
}


function addMarkerAndZoom(lat, lon, popupText = "Marker location", zoomLevel = 15) {
    const marker = L.marker([lat, lon]).addTo(window.mapObject);
    const popup = L.popup().setLatLng([lat, lon]).setContent(popupText).openOn(window.mapObject);
    window.mapObject.setView([lat, lon], zoomLevel);
}

function hideElements(arr) {
    arr.forEach((divId) => {document.getElementById(divId).classList.add('hidden')});
}

function showElements(arr) {
    arr.forEach((divId) => {document.getElementById(divId).classList.remove('hidden')});
}

async function searchLocation(e) {
    // Find the input field
    const inputField = e.target.closest('.row').querySelector('input[type="text"]');
    // Get the text from the input field
    const locationText = inputField.value;
    // define the api url
    const api_url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationText)}&addressdetails=1`;
    // fetch the data
    const response = await fetch(api_url);
    // convert the response to json
    const data = await response.json();
    // if the response is ok, display the search results
    if (response.ok) {
        displaySearchLocationResults(data)
    } else {
        throw new Error(data.error);
    }
}

function displaySearchLocationResults(data) {
    // if a results div already exists, remove it
    const existingResultsDiv = document.querySelector('#location-search-results');
    if (existingResultsDiv) {
        existingResultsDiv.remove();
    }   

    // create a new div with id #location-search-results
    const resultsDiv = document.createElement('div');
    resultsDiv.id = 'location-search-results';
    resultsDiv.classList.add('container', 'px-1');

    // Iterate through the data
    for (let place of data) {
        // Create a new div for each result
        const placeDiv = document.createElement('div');
        // add html to the div
        placeDiv.innerHTML = `<p>${capitaliseWords(place.addresstype)}</p>
                              <p>${place.display_name}</p>`;
        // add css classes to the div
        placeDiv.classList.add('border-bottom', 'py-1', 'cursor-pointer');
        // add data attributes to the div
        placeDiv.dataset.lat = place.lat;
        placeDiv.dataset.lon = place.lon;
        placeDiv.dataset.location = place.display_name;

        // add an event listener to the div for choosing the location
        placeDiv.addEventListener('click', selectLocation);
        
        // Append the div to the new div
        resultsDiv.appendChild(placeDiv);
    }
    
    // Append the new div to the body
    document.body.appendChild(resultsDiv);
}

function selectLocation(e) {
    // Get the latitude, longitude and place name of the selected location
    let [lon, lat, placeName] = getLocation(e);
    // add coordinates to the global variable
    coordinates[0] = [lon, lat];

    console.log(coordinates);
    // Get the start location element and set the text to the clicked location
    document.querySelector('#currentStart').textContent = placeName;
    // Remove the search results div
    document.querySelector('#location-search-results').remove();
    showElements(divs_to_hide);
    hideElements(["start-options"]);

    // add marker to the map
    L.marker([lat, lon]).addTo(window.mapObject);
    window.mapObject.setView([lat, lon], zoomLevel = 15);
}

function getLocation(e) {
    // When a user clicks on a location div
    // Get the latitude and longitude, and place name from the clicked div
    const lat = e.currentTarget.dataset.lat;
    const lon = e.currentTarget.dataset.lon;
    const loc = e.currentTarget.dataset.location;
    return [lon, lat, loc];
};

function capitaliseWords(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}