/**
 * Prepares the map for a new route by removing any existing route and extending the map bounds to include the start and end markers.
 */
export default async function prepareForNewRoute() {
    // Remove any existing route from the map
    MM.map.eachLayer((layer) => {
        if (layer instanceof L.Polyline) {
            MM.map.removeLayer(layer);
        }
    });

    // remove the waypoint options div
    const waypointOptionsDiv = document.getElementById("waypoint-selection-options");
    if (waypointOptionsDiv) {
        waypointOptionsDiv.remove();
        MM.map.invalidateSize();
    }

    // Extend bounds to include the start and end markers
    let myFGMarker = new L.FeatureGroup();
    myFGMarker.addLayer(MM.startMarker);
    myFGMarker.addLayer(MM.endMarker);
    //Get bounds of the FeatureGroup
    let bounds = myFGMarker.getBounds();

    if (!MM.map.getBounds().contains(bounds)) {
        // Adjust map to fit the extended bounds
        MM.map.fitBounds(bounds);
        // Wait for the map to be ready
        await new Promise(resolve => MM.map.whenReady(resolve));
    }
}