const API_KEY = "5b3ce3597851110001cf6248f31ca2fd5da04a70b84fb4fe327c3588";

const profile = 'wheelchair';
const API_URL = `https://api.openrouteservice.org/v2/directions/${profile}/json`

const hide_divs = ["map", "device-select", "generate-route-container", "destination-select", "start-location-display", "or", "start-location-options"];

document.getElementById("generate-route").addEventListener("click", e => postForm(e));
document.getElementById("search-location").addEventListener('click', e => {
    hideElements(hide_divs);
    searchLocation(e);
});

let coordinates = "[[-4.647578,51.968935],[-4.684234,52.111446]]";

let instructions = "false";
const body = `{"coordinates":${coordinates}, "instructions":${instructions}}`;


function hideElements(arr) {
    arr.forEach((divId) => {document.getElementById(divId).classList.add('hidden')});
}

function showElements(arr) {
    arr.forEach((divId) => {document.getElementById(divId).classList.remove('hidden')});
}

async function searchLocation(e) {
    // Find the input field
    const inputField = e.target.closest('.row').querySelector('input[type="text"]');

    // Get the text from the input field
    const locationText = inputField.value;

    const api_url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationText)}&addressdetails=1`;

    const response = await fetch(api_url);

    const data = await response.json();

    if (response.ok) {
        displaySearchLocationResults(data)
    } else {
        throw new Error(data.error);
    }

}

function displaySearchLocationResults(data) {
    // if a results div already exists, remove it
    const existingResultsDiv = document.querySelector('#location-search-results');
    if (existingResultsDiv) {
        existingResultsDiv.remove();
    }   

    // create a new div with id #location-search-results
    const resultsDiv = document.createElement('div');
    resultsDiv.id = 'location-search-results';
    resultsDiv.classList.add('container', 'px-1');

    // Iterate through the data
    for (let place of data) {
        // Create a new div for each result
        const placeDiv = document.createElement('div');
        // add html to the div
        placeDiv.innerHTML = `<p>${capitaliseWords(place.addresstype)}</p>
                              <p>${place.display_name}</p>`;
        // add css classes to the div
        placeDiv.classList.add('border-bottom', 'py-1', 'cursor-pointer');
        // add data attributes to the div
        placeDiv.dataset.lat = place.lat;
        placeDiv.dataset.lon = place.lon;
        placeDiv.dataset.location = place.display_name;
        // add an event listener to the div
        placeDiv.addEventListener('click', e => {
            let [lon, lat, placeName] = getLocation(e);
            coordinates = [[lon, lat]];
            console.log(coordinates);
            // Get the start location element and set the text to the clicked location
            document.querySelector('#currentStart').textContent = placeName;
            // Remove the search results div
            document.querySelector('#location-search-results').remove();
            showElements(hide_divs);
            hideElements(["start-options"]);
        });
        
        // Append the div to the new div
        resultsDiv.appendChild(placeDiv);
    }
    
    // Append the new div to the body
    document.body.appendChild(resultsDiv);

}

function getLocation(e) {
    // When a user clicks on a location div
    // Get the latitude and longitude, and place name from the clicked div
    const lat = e.currentTarget.dataset.lat;
    const lon = e.currentTarget.dataset.lon;
    const loc = e.currentTarget.dataset.location;
    return [lon, lat, loc];
};


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

function capitaliseWords(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}