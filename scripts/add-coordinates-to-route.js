import startRoutePlanning from './start-route-planning.js';

/**
 * 1. Adds the lat lon to the MM.coordinates array (start and end locations), where
 * the position in the array is determined by the outputDivId (either "currentStart" (0) or "currentEnd" (1))
 * 2. Calls startRoutePlanning() if both start and end locations are set.
 */ 
export default function addCoordinatesToRoute(lat, lon, outputDivId) {
    if (outputDivId === "currentStart") {
        // ORS takes coords in [lon, lat] format
        MM.coordinates[0] = [lon, lat];
    } else {
        MM.coordinates[1] = [lon, lat];

    }
    // Generate route if there are 2 sets of coordinates
    if (MM.coordinates[0] && MM.coordinates[1]) {
        startRoutePlanning();
    }
}