// custom start and destination markers
const startMarkerUrl = './images/marker_start.png';
const endMarkerUrl =  './images/marker_end.png';

const startMarker = L.icon({
    iconUrl: startMarkerUrl,
    iconSize: [50, 50],
    iconAnchor: [25, 50], // location of marker's tip 
    popupAnchor: [0, -50], // where a popup would open relative to the iconAnchor
});

const endMarker = L.icon({
    iconUrl: endMarkerUrl,
    iconSize: [50, 50],
    iconAnchor: [25, 50], // location of marker's tip 
    popupAnchor: [0, -50], // where a popup would open relative to the iconAnchor
});

export { startMarker, endMarker, startMarkerUrl, endMarkerUrl };