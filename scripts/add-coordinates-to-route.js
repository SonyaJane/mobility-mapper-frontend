// Add lat lon to MM.coordinates array given the output div id
export default function addCoordinatesToRoute(lon, lat, outputDivId) {
    if (outputDivId === "currentStart") {
        // need to round to 6dp for OpenRouteService API
        MM.coordinates[0] = [parseFloat(lat.toFixed(6)), parseFloat(lon.toFixed(6))];
    } else {
        MM.coordinates[1] = [parseFloat(lat.toFixed(6)), parseFloat(lon.toFixed(6))];
    }
    console.log("New coordinates added to MM.coordinates: ", MM.coordinates);
}