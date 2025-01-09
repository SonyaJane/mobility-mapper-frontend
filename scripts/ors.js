const API_KEY = "5b3ce3597851110001cf6248f31ca2fd5da04a70b84fb4fe327c3588";

const profile = 'wheelchair';
const API_URL = `https://api.openrouteservice.org/v2/directions/${profile}/json`

document.getElementById("generate-route").addEventListener("click", e => postForm(e));
document.getElementById("search-location").addEventListener('click', e => {
    hideElements(e);
    searchLocation(e);
});

let coordinates = "[[-4.647578,51.968935],[-4.684234,52.111446]]";

let instructions = "false";
const body = `{"coordinates":${coordinates}, "instructions":${instructions}}`;

function hideElements(e) {
    // Get the closest .row to the button clicked
    const closestRow = e.target.closest('.row');
    console.log(closestRow);

    // Get all descendants of <main>
    const mainDescendants = Array.from(document.querySelectorAll('main *'));
    console.log(mainDescendants);
    // Hide all elements inside `<main>` except the closest `.row`, its ancestors, and its descendants
    mainDescendants.filter((element) => element !== closestRow && !closestRow.contains(element) && !element.contains(closestRow))
                   .forEach((element) => {element.style.display = 'none'; // Hide sibling elements
    });
}

async function searchLocation(e) {
    // Find the input field
    const inputField = e.target.closest('.row').querySelector('input[type="text"]');

    // Get the text from the input field
    const locationText = inputField.value;
    console.log("Entered location:", locationText);

    const api_url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationText)}&addressdetails=1`;

    const response = await fetch(api_url);

    const data = await response.json();

    if (response.ok) {
        console.log(data);
        for (let place of data) {
            console.log(`${place.type} ${place.addresstype} ${place.display_name}`);
        }
        displaySearchLocationResults(data)
    } else {
        throw new Error(data.error);
    }

}

function displaySearchLocationResults(data) {
    
    // if a results div already exists, remove it
    const existingResultsDiv = document.querySelector('.location-search-results');
    if (existingResultsDiv) {
        existingResultsDiv.remove();
    }   
    // create a new div
    const resultsDiv = document.createElement('div .location-search-results');   

    // Iterate through the data
    for (let place of data) {
        // Create a new div for each result
        const placeDiv = document.createElement('div');
        placeDiv.textContent = `${place.type} ${place.addresstype} ${place.display_name}`;
        
        // Append the div to the new div
        resultsDiv.appendChild(placeDiv);
    }
    
    // Append the new div to the body
    document.body.appendChild(resultsDiv);

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

