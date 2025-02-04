import addCoordinatesToRoute from './add-coordinates-to-route.js';
import setStartEndLocationText from './set-start-end-location-text.js';
import displayLocationOnMap from './display-location-on-map.js';
import { showElements } from './utils.js';

export default function savedPlacesEventListener(place, outputDivId) {
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
}