/** 
* When user clicks on a location div (created as a result of a search or saved places)
* Get the latitude and longitude, and place name from the clicked div
*/
export function getClickedLocation(e) {
    const lat = e.currentTarget.dataset.lat;
    const lon = e.currentTarget.dataset.lon;
    const loc = e.currentTarget.dataset.location;
    return [lon, lat, loc];
}

/**
 * Add markerType = startMarker or endMarker at the given lat lon
 */
export function addRouteMarker(lat, lon, markerUrl = startMarkerUrl) {
    L.marker([lat, lon], { icon: markerUrl }).addTo(MM.map);
}

/** 
 * show the elements in the input array
 */
export function showElements(arr) {
    arr.forEach((divId) => { 
        // check if the div exists
        if (document.getElementById(divId)) {
            document.getElementById(divId).classList.remove('hidden');
        }
    });
}

/**
 * Hide the elements in the input array
 */ 
export function hideElements(arr) {
    arr.forEach((divId) => { 
        // check if the div exists
        if (document.getElementById(divId)) {
            document.getElementById(divId).classList.add('hidden');
        }
    });
}

/**
 * Capitalise the first letter of each word in a string
 */
export function capitaliseWords(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

