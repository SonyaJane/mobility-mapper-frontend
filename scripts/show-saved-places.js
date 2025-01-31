import addCoordinatesToRoute from './add-coordinates-to-route.js';
import setStartEndLocationText from './set-start-end-location-text.js';
import { showElements } from './utils.js';
import displayLocationOnMap from './display-location-on-map.js';

/**
 * Description of what fn does
 * 
 */
export default function showSavedPlaces(outputDivId) {
    // create a new div with id #saved-places-list
    const savedPlacesDiv = document.createElement('div');
    savedPlacesDiv.id = 'saved-places-list';
    savedPlacesDiv.classList.add('px-2', 'px-md-3');

    // Add a title
    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = `<h2 class="mb-0 py-3 border-bottom border-top-orange">Select a saved place</h2>`;
    savedPlacesDiv.appendChild(titleDiv);

    // Iterate through the saved places
    for (let place of MM.savedPlaces) {
        // Create a new div for each result
        const placeDiv = document.createElement('div');
        // add html to the div
        placeDiv.innerHTML = `<p>${place.name}</p>
                                <p>${place.address}</p>
                                <p>${place.lat}, ${place.lon}</p>`;
        // add css classes to the div
        placeDiv.classList.add('border-bottom', 'py-2', 'cursor-pointer', 'saved-place');
        // add data attributes to the div
        placeDiv.dataset.location = place.name;
        placeDiv.dataset.lat = place.lat;
        placeDiv.dataset.lon = place.lon;

        // add an event listener to the div for choosing the location
        placeDiv.addEventListener('click', e => {
            // Display the place name
            setStartEndLocationText(place.name, outputDivId);
            // Display the location on the map
            if (outputDivId == "currentStart") {
                // remove current start marker
                if (MM.startMarker) MM.startMarker.remove();
                displayLocationOnMap(place.lat, place.lon, 15, 'startMarker');
            } else if (outputDivId == "currentDestination") {   
                // remove current end marker
                if (MM.endMarker) MM.endMarker.remove();        
                displayLocationOnMap(place.lat, place.lon, 15, 'endMarker');
            }
            // Remove the saved places div
            document.querySelector('#saved-places-list').remove();
            // Show the hidden elements
            showElements(["start-end-display", "map"]);
            // add lat and lon to global coordinates 
            addCoordinatesToRoute(place.lat, place.lon, outputDivId);
        });

        // Append the div to the new div
        savedPlacesDiv.appendChild(placeDiv);
    }

    // Append the new div to the main element
    document.querySelector('main').appendChild(savedPlacesDiv);
}