// Add lat lon to MM.coordinates array given the output div id
export default function addCoordinatesToRoute(lon, lat, outputDivId) {
    if (outputDivId === "currentStart") {
        MM.coordinates[0] = [lon, lat];
    } else {
        MM.coordinates[1] = [lon, lat];
    }
    console.log("New coordinates added to MM.coordinates: ", MM.coordinates);
}