import {showElements, getClickedLocation } from './utils.js';
import displayLocationOnMap from './display-location-on-map.js';
import addCoordinatesToRoute from './add-coordinates-to-route.js';
import setStartEndLocationText from './set-start-end-location-text.js';

export default function searchResultsEventListener(e, outputDivId) {
    // Get the latitude, longitude and place name from the clicked div
    let [lon, lat, placeName] = getClickedLocation(e);
    // check the placename is not undefined
    if (!placeName) {
        placeName = "Selected location";
    }
    setStartEndLocationText(placeName, outputDivId);
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
    // Remove the orange background from the waypoint divs
    document.querySelectorAll('.waypoint').forEach(waypoint => {
        waypoint.classList.remove('background-orange');
    });
    // remove the waypoint-selection-options div
    document.getElementById("waypoint-selection-options").remove();
    // reset the map
    MM.map.invalidateSize();
    // add lat and lon to global coordinates 
    addCoordinatesToRoute(lat, lon, outputDivId);
}