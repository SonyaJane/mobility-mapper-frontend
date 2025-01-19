import { displayLocationOnMap, showElements, hideElements, capitaliseWords, getClickedLocation } from './utils.js';
import addCoordinatesToRoute from './add-coordinates-to-route.js';
import setStartEndLocationText from './set-start-end-location-text.js';

export default function displaySearchLocationResults(data, outputDivId) {
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
            // Get the latitude, longitude and place name from the clicked div
            let [lon, lat, placeName] = getClickedLocation(e);
            setStartEndLocationText(placeName, outputDivId);
            // add coordinates as a data attribute to the div
            document.getElementById(outputDivId).dataset.latLon = `${lat}, ${lon}`;
            // add lat and lon to global coordinates 
            addCoordinatesToRoute(lat, lon, outputDivId);
            // Display the location on the map
            if (outputDivId == "currentStart") {
                // remove existing start marker
                if (MM.startMarker) MM.startMarker.remove();
                displayLocationOnMap(lat, lon, 15, 'startMarker');
            } else if (outputDivId == "currentDestination") {
                // remove existing end marker
                if (MM.endMarker) MM.endMarker.remove();
                displayLocationOnMap(lat, lon, 15, 'endMarker');
            }
            // Remove the search results div
            document.querySelector('#location-search-results').remove();
            // Show the hidden elements
            showElements(["start-location-display", "destination-location-display", "other-selection-options", "map"]);
            // remove the waypoint-selection-options div
            document.getElementById("waypoint-selection-options").remove();
            // reset the map
            MM.map.invalidateSize();
        });

        // Append the div to the new div
        resultsDiv.appendChild(placeDiv);
    }
        
    // Append the new div to the main element
    document.querySelector('main').appendChild(resultsDiv);
}