// Add lat lon to MM.coordinates array given the output div id
export default function addCoordinatesToRoute(lat, lon, outputDivId) {
    if (outputDivId === "currentStart") {
        // need to round to 6dp for OpenRouteService API
        // ORS takes coords in [lon, lat] format
        MM.coordinates[0] = [parseFloat(lon.toFixed(6)), parseFloat(lat.toFixed(6))];
    } else {
        MM.coordinates[1] = [parseFloat(lon.toFixed(6)), parseFloat(lat.toFixed(6))];
    }
}