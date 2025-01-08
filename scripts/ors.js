const API_KEY = "5b3ce3597851110001cf6248f31ca2fd5da04a70b84fb4fe327c3588";

const profile = 'wheelchair';
const API_URL = `https://api.openrouteservice.org/v2/directions/${profile}/json`

document.getElementById("generate-route").addEventListener("click", e => postForm(e));
document.getElementById("search-location").addEventListener("click", e => getLatLon(e));

let coordinates = "[[-4.647578,51.968935],[-4.684234,52.111446]]";

let instructions = "false";
const body = `{"coordinates":${coordinates}, "instructions":${instructions}}`;

async function getLatLon(e) {
    // Find the input field
    const inputField = e.target.closest('.row').querySelector('input[type="text"]');
    // Get the text from the input field
    const locationText = inputField.value;
    console.log("Entered location:", locationText);

    const api_url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationText)}`;

    const response = await fetch(api_url);

    const data = await response.json();

    if (response.ok) {
        console.log(data);
    } else {
        throw new Error(data.error);
    }

}

async function postForm(e) {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            // Type of data returned
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            "Authorization": API_KEY,
            // Type of data being sent
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: body,
    });

    const data = await response.json();

    if (response.ok) {
        displayRoute(data);
        console.log(data);
    } else {
        // displayException(data);
        throw new Error(data.error);
    }

}

function displayRoute(data) {
    // Access the global mapObject
    const map = window.mapObject;

    // Get the polyline (series of coordinates) from the response
    const encodedPolyline = data.routes[0].geometry;
    
    // Decode the polyline into [lat, lng] pairs
    const routeCoordinates = polyline.decode(encodedPolyline);

    // Add polyline to the map
    L.polyline(routeCoordinates, { color: 'blue', weight: 3 }).addTo(map);

    // Adjust map to fit the polyline bounds
    map.fitBounds(routeCoordinates);

    // Add markers for start and end points
    const start = routeCoordinates[0];
    const end = routeCoordinates[routeCoordinates.length - 1];
    L.marker(start).addTo(map);
    L.marker(end).addTo(map);

}

