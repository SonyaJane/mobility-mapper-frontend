import { startMarker, endMarker } from './markers.js';

export function getClickedLocation(e) {
    // When user clicks on a location div (created as a result of a search or saved places)
    // Get the latitude and longitude, and place name from the clicked div
    const lat = e.currentTarget.dataset.lat;
    const lon = e.currentTarget.dataset.lon;
    const loc = e.currentTarget.dataset.location;
    return [lon, lat, loc];
}

export function addRouteMarker(lat, lon, markerUrl = startMarkerUrl) {
    // Add markerType = startMarker or endMarker at the given lat lon
    L.marker([lat, lon], { icon: markerUrl }).addTo(MM.map);
}

// show elements in the input array
export function showElements(arr) {
    arr.forEach((divId) => { 
        // check if the div exists
        if (document.getElementById(divId)) {
            document.getElementById(divId).classList.remove('hidden');
        }
    });
}

// hide elements in the input array
export function hideElements(arr) {
    arr.forEach((divId) => { 
        // check if the div exists
        if (document.getElementById(divId)) {
            document.getElementById(divId).classList.add('hidden');
        }
    });
}

export function capitaliseWords(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

