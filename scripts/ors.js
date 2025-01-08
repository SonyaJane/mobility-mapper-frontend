const API_KEY = "5b3ce3597851110001cf6248f31ca2fd5da04a70b84fb4fe327c3588";

const profile = 'wheelchair';
const API_URL = `https://api.openrouteservice.org/v2/directions/${profile}/json`

document.getElementById("generate-route").addEventListener("click", e => postForm(e));

let coordinates = "[[8.681495,49.41461],[8.687872,49.420318]]";
let instructions = "false";
const body = `{"coordinates":${coordinates}, "instructions":${instructions}}`;

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
        // displayResults(data);
        console.log(data.routes[0].summary.distance);
        // decode the polyline
        const polyline = data.routes[0].geometry;
        // Decode the polyline into [lat, lng] pairs
        const coordinates = polyline.decode(encodedPolyline);

        // Convert to LatLng format for Leaflet
        const latLngs = coordinates.map(coord => [coord[0], coord[1]]);        console.log(decodedPolyline);
        console.log(data);
        console.log(coordinates);
        console.log(latLngs);
    } else {
        // displayException(data);
        throw new Error(data.error);
    }

}

// function displayResults(data) {

//     let results = `Open Route Service Results`;
//     if (data.total_errors === 0) {
//         results = `<div class="no_errors">No errors reported!</div>`;
//     } else {
//         results = `<div>Total Errors: <span class="error_count">${data.total_errors}</span></div>`;
//         for (let error of data.error_list) {
//             results += `<div>At line <span class="line">${error.line}</span>, `;
//             results += `column <span class="column">${error.col}:</span></div>`;
//             results += `<div class="error">${error.error}</div>`;
//         }
//     }

//     document.getElementById("map").innerText = results;
// }