// Add lat lon to MM.coordinates array given the output div id
export default function addCoordinatesToRoute(lat, lon, outputDivId) {
    if (outputDivId === "currentStart") {
        // ORS takes coords in [lon, lat] format
        MM.coordinates[0] = [lon, lat];
    } else {
        MM.coordinates[1] = [lon, lat];

    }
}