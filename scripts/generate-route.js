const OPENROUTESERVICE_API_KEY = "5b3ce3597851110001cf6248f31ca2fd5da04a70b84fb4fe327c3588";
const OPENROUTESERVICE_API_URL = "https://api.openrouteservice.org/v2/directions/";


export default async function generateRoute(profile = "wheelchair", instructions = "false") {

    const url = `${OPENROUTESERVICE_API_URL}${profile}/json`;
    const body = `{"coordinates":${JSON.stringify([...MM.coordinates])},"instructions":"${instructions}"}`;

    try {
        // Fetch the route from the OpenRouteService API
        const response = await fetch(url, {
            method: "POST",
            headers: {
                // Type of data returned
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                "Authorization": OPENROUTESERVICE_API_KEY,
                // Type of data being sent
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: body,
        });

        const data = await response.json();
        console.log("Response from OpenRouteService API: ", data);
        if (response.ok) {
            console.log("Route generated successfully");
            console.log("Displaying route on the map");
            displayRoute(data);
        } else {
            displayRouteGenerationError(data.error);
            throw new Error(data.error.message);
        }

    } catch (error) {
        console.error("Error generating route: ", error);
    }

    function displayRoute(data) {

        // Get the polyline (series of coordinates) from the response
        const encodedPolyline = data.routes[0].geometry;

        // Decode the polyline into [lat, lng] pairs
        const routeCoordinates = polyline.decode(encodedPolyline);
        // Add polyline to the map
        L.polyline(routeCoordinates, { color: 'blue', weight: 3 }).addTo(MM.map);

        // Create a bounds object from the route coordinates
        const bounds = L.latLngBounds(routeCoordinates);

        // get lat and lon of start and end markers
        const startMarkerLatLng = L.latLng(MM.coordinates[0][1], MM.coordinates[0][0]); // [lon, lat]
        const endMarkerLatLng = L.latLng(MM.coordinates[1][1], MM.coordinates[1][0]); // [lon, lat]
        // get lat and lon of start and end of route
        const routeStartLatLng = L.latLng(routeCoordinates[0][0], routeCoordinates[0][1]); // First route point
        const routeEndLatLng = L.latLng(
            routeCoordinates[routeCoordinates.length - 1][0],
            routeCoordinates[routeCoordinates.length - 1][1]
        ); // Last route point

        // extend the bounds to include the start and end markers
        bounds.extend(startMarkerLatLng);
        bounds.extend(endMarkerLatLng);

        // Check if the route start differs from the start marker location
        if (!startMarkerLatLng.equals(routeStartLatLng)) {
            // Add dashed line from marker to route start
            L.polyline([startMarkerLatLng, routeStartLatLng], {
                color: 'blue',
                weight: 2,
                dashArray: '5, 5', // Dashed line pattern
            }).addTo(MM.map);
        }

        // Check if the route end differs from the end marker location
        if (!endMarkerLatLng.equals(routeEndLatLng)) {
            // Add dashed line from marker to route end
            L.polyline([endMarkerLatLng, routeEndLatLng], {
                color: 'blue',
                weight: 2,
                dashArray: '5, 5', // Dashed line pattern
            }).addTo(MM.map);
        }

        // Extend bounds to account for markers height and width
        let myFGMarker = new L.FeatureGroup();
        myFGMarker.addLayer(MM.startMarker);
        myFGMarker.addLayer(MM.endMarker);
        bounds.extend(myFGMarker.getBounds());

        // Adjust map to fit the extended bounds
        MM.map.fitBounds(bounds);
    }

    function displayRouteGenerationError() {
        // Set message depending on the error code
        let title = document.getElementById('errorModalTitle');
        let message = document.getElementById('errorModalMessage');
        
        title.innerText = "Route generation error";
        message.innerText = "No route found. Please try again with different locations.";
        
        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('errorModal'));
        modal.show();
    }

}