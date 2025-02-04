import { startMarker, endMarker } from './markers.js';

/**
 * Display a location on the map with the given latitude and longitude and
 * marker type (start or end marker), then zoom to the location with the given zoom level.
 */

export default function displayLocationOnMap(lat, lon, zoom, markerType) {
    // Add a marker at given location
    switch (markerType) {
        case 'startMarker':
            MM.startMarker = L.marker([lat, lon], { icon: startMarker });
            MM.startMarker.addTo(MM.map);
            break;
        case 'endMarker':
            MM.endMarker = L.marker([lat, lon], { icon: endMarker });
            MM.endMarker.addTo(MM.map);
            break;
        default:
            MM.marker = L.marker([lat, lon]).addTo(MM.map);
            break;
    }
    // Center the map on the given location
    MM.map.setView([lat, lon], zoom);
}