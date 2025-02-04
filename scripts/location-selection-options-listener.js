// add event listeners to the four location selection options
import searchLocationNominatim from './search-location-nominatim.js';
import displaySearchLocationResults from './display-search-location-results.js';
import { hideElements } from './utils.js';
import displayLocationOnMap from './display-location-on-map.js';
import showSavedPlaces from './show-saved-places.js';
import latLonToAddress from './lat-lon-to-address.js';
import locateUser from './locate-user.js';
import addCoordinatesToRoute from './add-coordinates-to-route.js';
import displayLocationSearchError from './display-location-search-error.js';

/**
 * Add event listeners to the four location selection options:
 * 1. "Search for place or address" search button (magnifying glass icon) 
 *     - Clicking this button will search for a location using the Nominatim API
 * 2. "Current Location" square
 *     - Clicking this button will use the user's current location as the start or destination location
 * 3. "Select on map" button
 *     - Clicking this button will allow the user to select a location on the map
 * 4. "Select from saved places" button
 *     - Clicking this button will allow the user to select a location from their saved places.
 */

export default function addEventListenersToLocationSelectionOptions(outputDivId) {

    // Add click event listener to button for "Search for place or address" text input
    // (Magnifying glass icon)
    document.getElementById("text-search-submit").addEventListener('click', async e => {

        const locationText = document.getElementById("text-search-input").value;
        // Regular expression to check if the input contains at least one word (letters)
        let wordPattern = /[a-zA-Z0-9]/;
        if (wordPattern.test(locationText)) {
            // Use the search input to query the Nominatim API
            const data = await searchLocationNominatim(locationText);
            if (data) {
                 // Hide everything except search text input, header and footer
                hideElements(["start-location-display", "destination-location-display", "other-selection-options", "map"]);
                // Display the search results
                displaySearchLocationResults(data, outputDivId);
            } else {
                // If there is an error, display an error message in the modal
                displayLocationSearchError();
            }
        } else {
            // If the input field is empty, add placeholder text in red
            // First remove any existing text
            document.getElementById("text-search-input").value = "";
            document.getElementById("text-search-input").placeholder = "Enter text to search";
            document.getElementById("text-search-input").classList.add("red-placeholder");
        }

    });

    // Add click event listener to "Current Location" square
    document.getElementById("use-current-location").addEventListener('click', async e => {
        // Update user's location
        try {                 
            MM.userLocation = await locateUser(MM.map);
        } catch (error) {
            console.error("Error getting user location: ", error);
        }

        const lat = MM.userLocation.lat;
        const lon = MM.userLocation.lon;

        // Display the user's location on the map
        
        if (outputDivId == "currentStart") {
            // remove existing start marker
            if (MM.startMarker) MM.startMarker.remove();
            displayLocationOnMap(lat, lon, 15, 'startMarker');
        } else if (outputDivId == "currentDestination") {
            // remove existing end marker
            if (MM.endMarker) MM.endMarker.remove();
            displayLocationOnMap(lat, lon, 15, 'endMarker');
        }

        // get place name from lat and lon
        let placeName = await latLonToAddress(lat, lon);
        if (placeName == null) {
            console.error("Error getting place name from lat and lon");
            placeName = "Unknown location";
        }
        // Display the place name in the start/destination location div
        // get the string before the first comma
        document.getElementById(outputDivId).textContent = placeName.split(",")[0];
        // add coordinates to route (MM.coordinates)
        addCoordinatesToRoute(lat, lon, outputDivId);
    });

    // Add click event listener to select on map div
    document.getElementById("select-on-map").addEventListener('click', async e => {
        // hide all elements except the map, header and footer
        hideElements(["start-end-display"]);
        // resizes map to fit the new container size
        MM.map.invalidateSize();
    });

    // Add click event listener to select location from saved places
    document.getElementById("select-from-saved-places").addEventListener('click', e => {
        // hide elements
        hideElements(["start-end-display", "map"]);
        // show the saved places
        showSavedPlaces(outputDivId);
    });

}