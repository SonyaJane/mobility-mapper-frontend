import addCoordinatesToRoute from './add-coordinates-to-route.js';
import setStartEndLocationText from './set-start-end-location-text.js';
import { showElements } from './utils.js';
import displayLocationOnMap from './display-location-on-map.js';

/**
 * Show list of saved places in a new div.
 * Add click event listener to each saved place.
 */
export default function showSavedPlaces(outputDivId) {
    // create a new div with id #saved-places-list
    const savedPlacesDiv = document.createElement('div');
    savedPlacesDiv.id = 'saved-places-list';
    savedPlacesDiv.classList.add('px-2', 'px-md-3');

    // Add a title for the saved locations title and an exit button
    const titleDiv = document.createElement('div');
    // add html to the div    
    titleDiv.innerHTML = `<h2 class="mb-0">Select a saved place</h2>
                            <button class="btn exit-button"><i class="bi bi-x-square"></i></button>`;
    // add css classes to the div
    titleDiv.classList.add('border-bottom', 'py-1', 'd-flex', 'justify-content-between', 'align-items-center');
    titleDiv.id = 'search-results-title';

    // Add an event listener to the exit button
    titleDiv.querySelector('.exit-button').addEventListener('click', e => {
        // Remove the saved places div
        document.querySelector('#saved-places-list').remove();
        // Show the hidden elements
        showElements(["start-end-display", "map"]);
        // reset the map
        MM.map.invalidateSize();
    });

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
            // Display the place name in the start or destination div
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