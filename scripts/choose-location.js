// Description: This script is used to allow the user to search for 
// a location using text input, and then select a location from the 
// search results to use as a start or finish location, or waypoint 
// on the route.

// Get the map object from the global scope
const map = window.mapObject;

// List of user saved places
const savedPlaces = [{ name: "Home", lat: 51.463913, lon: -3.162759 },
{ name: "Work", lat: 51.485925, lon: -3.176533 },
{ name: "Dentist", lat: 51.519471, lon: -3.117880 }];

// Define a global variable to store the list of latitude and 
// longitude coordinates for the route
let coordinates = [];

// IDs of the divs to hide when the user searches for location
const divs_to_hide =   ["header", "device-select", "start-location-display", "destination-location-display", "generate-route-container", "other-selection-options", "map"];
const divs_to_hide_2 = ["header", "device-select", "start-location-display", "destination-location-display", "generate-route-container", "waypoint-selection-options", "map"];
const divs_to_hide_3             = ["header", "device-select", "start-location-display", "destination-location-display", "generate-route-container", "waypoint-selection-options"];

// Add click event listeners

// Add a click event listener for choosing a location
// get all elements with class .location-selection
document.querySelectorAll('.location-selection').forEach(item => {
    item.addEventListener('click', e => {

        // if waypoint-selection-options div does not exist for any waypoint, 
        // add it for this waypoint
        // if waypoint-selection-options div already exists for this waypoint, 
        // remove it and finish, else add it for this waypoint
        // if waypoint-selection-options div already exists for another waypoint,
        // remove it then add it for this waypoint

        const existingDiv = document.getElementById('waypoint-selection-options');
        // If it doesnt exist, add it
        if (!existingDiv) {
            //add the location selection options div for this waypoint
            addDiv(e)
        } else {
            // If it exists for this waypoint, remove it and finish
            if (existingDiv.previousElementSibling === e.currentTarget) {
                existingDiv.remove();
                return;
            } else { // if it exists for another waypoint, remove it and add it for this waypoint
                existingDiv.remove();
                //add the location selection options div
                addDiv(e)
            }
        }

        function addDiv(e) {
            showLocationSelectionOptions(e);
            // get id of last child div of div that was clicked 
            // (requred to display the selected location, and store the coordinates)
            const lastChildId = e.currentTarget.lastElementChild.id;
            // add event listeners to the location selection options
            addEventListenersToLocationSelctors(lastChildId);
        }

    }
    );
});

// add event listeners to the location selection options
function addEventListenersToLocationSelctors(outputDivId) {

    // Add click event listener to button for "Search for place or address" text input
    // (Magnifying glass icon)
    document.getElementById("text-search-submit").addEventListener('click', async e => {

        // check the input field contains text
        const locationText = document.getElementById("text-search-input").value;

        if (locationText) {
            // Hide everything except search text input, and search results div
            hideElements(divs_to_hide);
            // Use the search input to query the Nominatim API
            const data = await searchLocationNominatim(locationText);
            // Display the search results
            displaySearchLocationResults(data, outputDivId);
        } else {
            // If the input field is empty, add placeholder text in red
            document.getElementById("text-search-input").placeholder = "Please enter a location to search";
            document.getElementById("text-search-input").classList.add("red-placeholder");
        }

    });

    // Add click event listener to "Current Location" square
    document.getElementById("use-current-location").addEventListener('click', async e => {
        // Get the user's location
        const [lat, lon] = await locateUser();
        // Display the user's location on the map
        displayLocationOnMap(lat, lon, 15);
        // get place name from lat and lon
        const placeName = await latLonToAddress(lat, lon);
        // Display the place name in the start location div
        document.getElementById(outputDivId).textContent = placeName;
        // add coordinates as a data attribute to the div
        document.getElementById(outputDivId).dataset.latLon = `${lat}, ${lon}`;
    });

    // Add click event listener to select on map div
    document.getElementById("select-on-map").addEventListener('click', async e => {
        // hide elements
        hideElements(divs_to_hide_3);
        // make map take up full screen
        document.getElementById("map").classList.add("map-fullscreen");
        // Ensure map resizes to fit the new container size
        window.mapObject.invalidateSize();  

        // add click event listener to the map
        window.mapObject.on('click', async function (e) {
            // Get the latitude and longitude of the clicked point
            const lat = e.latlng.lat;
            const lon = e.latlng.lng;
            // get address from lat and lon
            const placeName = await latLonToAddress(lat, lon);
            // Create popup content with the location and button
            const popupContent = `
                <div class="p-2 text-center">
                    <p class="mb-1">${placeName}
                    <hr class="my-2">
                    ${lat.toFixed(6)}, ${lon.toFixed(6)}</p>
                    <button id="use-location-btn" class="btn btn-use-this m-2">
                    Select This Location</button>
                </div>
                `;

            // remove any existing markers
            window.mapObject.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    window.mapObject.removeLayer(layer);
                }
            });

            // add marker at clicked location
            L.marker([lat, lon]).addTo(window.mapObject);

            // Center the map on the clicked point
            // get current zoom level
            const zoom = window.mapObject.getZoom();
            // zoom to level 15 or remain at current zoom level, whichever is greater
            window.mapObject.setView([lat, lon], Math.max(15, zoom));

            // add popup at top center of map
            showFixedPopup(popupContent);

            // Add click event listener to the button in the popup
            addEventListenerToUseLocationButton(lat, lon, placeName, outputDivId);

        });
    });

    // Add click event listener to select location from saved places
    document.getElementById("select-from-saved-places").addEventListener('click', e => {
        // hide elements
        hideElements(divs_to_hide_2);
        // show the saved places
        showSavedPlaces(outputDivId);
    });

};

// Create and show a fixed popup
function showFixedPopup(content) {
    // Remove any existing popups
    const existingPopup = document.getElementById('fixed-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    // Create the popup element
    const popup = document.createElement('div');
    popup.className = 'fixed-popup';
    popup.id = 'fixed-popup';
    popup.innerHTML = content;

    // Add the popup to the map container
    document.getElementById('map').appendChild(popup);
}

function showSavedPlaces(outputDivId) {
    // create a new div with id #saved-places-list
    const savedPlacesDiv = document.createElement('div');
    savedPlacesDiv.id = 'saved-places-list';
    savedPlacesDiv.classList.add('container', 'px-1');

    // Add a title
    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = `<h1>Select a saved place</h1>`;
    savedPlacesDiv.appendChild(titleDiv);

    // Iterate through the saved places
    for (let place of savedPlaces) {
        // Create a new div for each result
        const placeDiv = document.createElement('div');
        // add html to the div
        placeDiv.innerHTML = `<p>${capitaliseWords(place.name)}</p>
                              <p>${place.lat}, ${place.lon}</p>`;
        // add css classes to the div
        placeDiv.classList.add('border-bottom', 'py-1', 'cursor-pointer');
        // add data attributes to the div
        placeDiv.dataset.location = place.name;
        placeDiv.dataset.lat = place.lat;
        placeDiv.dataset.lon = place.lon;

        // add an event listener to the div for choosing the location
        placeDiv.addEventListener('click', e => {
            let [lon, lat, placeName] = getClickedLocation(e);
            setLocationText(placeName, outputDivId);
            // add coordinates as a data attribute to the div
            document.getElementById(outputDivId).dataset.latLon = `${lat}, ${lon}`;

            // Display the location on the map
            displayLocationOnMap(lat, lon, zoom = 15)

            // Remove the saved places div
            document.querySelector('#saved-places-list').remove();
            // Show the hidden elements
            showElements(divs_to_hide_2);
        });

        // Append the div to the new div
        savedPlacesDiv.appendChild(placeDiv);
    }

    // Append the new div to the body
    document.body.appendChild(savedPlacesDiv);
}


function addEventListenerToUseLocationButton(lat, lon, placeName, outputDivId) {
    // Add click event listener to the button in the popup
    document.getElementById("use-location-btn").addEventListener('click', e => {
        // show hidden divs
        showElements(divs_to_hide_3);
        // Display the place name in the start location div
        setLocationText(placeName, outputDivId);
        // add coordinates as a data attribute to the div
        document.getElementById(outputDivId).dataset.latLon = `${lat}, ${lon}`;
        // Remove the popup
        document.getElementById('fixed-popup').remove();
        // Remove the event listener
        window.mapObject.off('click');
        // Retun the map to its original size
        document.getElementById("map").classList.remove("map-fullscreen");
        // reset view to center on selected location
        window.mapObject.invalidateSize();
        window.mapObject.setView([lat, lon]), undefined, { animate: false };
        // go to the top of the page
        console.log("Going to the top of the page");
        setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });  // Scroll to the top of the page
        }, 5000); 
    });
};

async function latLonToAddress(lat, lon) {
    // Get the address from the latitude and longitude
    // define the api url
    const api_url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
    // fetch the data
    const response = await fetch(api_url);
    // convert the response to json
    const data = await response.json();
    // if the response is ok, display the search results
    if (response.ok) {
        console.log(data.display_name);
        return data.display_name;
    } else {
        throw new Error(data.error);
    }
}

function displayLocationOnMap(lat, lon, zoom) {
    // Add a marker at given location
    L.marker([lat, lon]).addTo(window.mapObject);
    window.mapObject.setView([lat, lon], zoomLevel = zoom);
};

// Get current user's location using Leaflet's locate method
async function locateUser() {
    // Get current user's location using Leaflet's locate method
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
        console.log(`Location: Latitude: ${lat}, Longitude: ${lon}, Accuracy: ${accuracy}`);
        return [lat, lon, accuracy]; // Return the location values if successful

    } catch (error) { // for when the location cannot be retrieved (eg permissions denied, timeout)
        console.error(error.message);
        alert("Could not get your location. Please allow location access.");
        return null;
    }
}

function hideElements(arr) {
    arr.forEach((divId) => { document.getElementById(divId).classList.add('hidden') });
}

function showElements(arr) {
    arr.forEach((divId) => { document.getElementById(divId).classList.remove('hidden') });
}

async function searchLocationNominatim(locationText) {
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

        console.log(data);
        return data;
    } catch (error) {
        // Log the error
        console.error(`Error during searchLocationNominatim: ${error.message}`);
        return null;
    }
}

function displaySearchLocationResults(data, outputDivId) {
    // Displays the results of a search for a place or address 
    // Creates a new div for each result with a click event listener

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
        placeDiv.addEventListener('click', e => {
            let [lon, lat, placeName] = getClickedLocation(e);
            setLocationText(placeName, outputDivId);
            // add coordinates as a data attribute to the div
            document.getElementById(outputDivId).dataset.latLon = `${lat}, ${lon}`;
            // Display the location on the map
            displayLocationOnMap(lat, lon, zoomLevel = 15)
            // Remove the search results div
            document.querySelector('#location-search-results').remove();
            // Show the hidden elements
            showElements(divs_to_hide);
            // hide the start options
            hideElements(["waypoint-selection-options"]);
        });

        // Append the div to the new div
        resultsDiv.appendChild(placeDiv);
    }

    // Append the new div to the body
    document.body.appendChild(resultsDiv);
}

function setLocationText(placeName, divId) {
    // Display the name of the seleted location in the div with the given id
    document.getElementById(divId).textContent = placeName;

}

function getClickedLocation(e) {
    // When user clicks on a location div (created as a result of a search or saved places)
    // Get the latitude and longitude, and place name from the clicked div
    const lat = e.currentTarget.dataset.lat;
    const lon = e.currentTarget.dataset.lon;
    const loc = e.currentTarget.dataset.location;
    return [lon, lat, loc];
};

function capitaliseWords(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}