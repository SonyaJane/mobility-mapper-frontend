const OPENROUTESERVICE_API_KEY = "5b3ce3597851110001cf6248f31ca2fd5da04a70b84fb4fe327c3588";
const OPENROUTESERVICE_API_URL = "https://api.openrouteservice.org/v2/directions/";


export default async function generateRoute(profile = "wheelchair", instructions = "false") {
    const url = `${OPENROUTESERVICE_API_URL}${profile}/json`;
        const body = `{"coordinates":${JSON.stringify([...MM.coordinates])},"instructions":"${instructions}"}`;

    console.log("URL: ", url);
    console.log("Body: ", body);

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

        if (response.ok) {
            displayRoute(data);
        } else {
            // displayException(data);
            throw new Error(data.error);
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

        // Adjust map to fit the polyline bounds
        MM.map.fitBounds(routeCoordinates);
    }
}