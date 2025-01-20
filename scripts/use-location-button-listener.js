import { startMarker, endMarker } from './markers.js';
import addCoordinatesToRoute from './add-coordinates-to-route.js';
import setStartEndLocationText from './set-start-end-location-text.js';

export default function addEventListenerToUseLocationButton(lat, lon, placeName, btnID) {
    // Add click event listener to the button in the popup
    document.getElementById(btnID).addEventListener('click', e => {
        // get output div id given the button id
        let outputDivId;
        switch (btnID) {
            case "start-here":
                outputDivId = "currentStart";
                // remove other start marker
                if (MM.startMarker) { MM.map.removeLayer(MM.startMarker) };
                // change the marker to a start marker
                MM.startMarker = L.marker([lat, lon], { icon: startMarker }).addTo(MM.map);
                // remove marker we've replaced with a start marker
                if (MM.marker) { MM.map.removeLayer(MM.marker) };
                //addRouteMarker(lat, lon, startMarkerUrl);
                break;
            case "end-here":
                outputDivId = "currentDestination";
                // remove other end marker
                if (MM.endMarker) { MM.map.removeLayer(MM.endMarker) };
                // change the marker to a end marker
                MM.endMarker = L.marker([lat, lon], { icon: endMarker }).addTo(MM.map);
                // remove marker we've replaced with an end marker
                if (MM.marker) { MM.map.removeLayer(MM.marker) };
                //addRouteMarker(lat, lon, endMarkerUrl);
                break;
        }
        // add lat and lon to global coordinates 
        addCoordinatesToRoute(lat, lon, outputDivId);

        // Display the place name in the start location div
        setStartEndLocationText(placeName, outputDivId);

        // add coordinates as a data attribute to the div
        document.getElementById(outputDivId).dataset.latLon = `${lat}, ${lon}`;
        
        // Remove the popup
        // TODO removePopupWithSlide();
        document.getElementById('fixed-popup').remove();

        // show hidden divs
        document.getElementById("start-end-display").classList.remove('hidden');
        // TODO showElementsSlide();

        // return the map to its original size
        //exitMapFullScreen(lat, lon);
        // Ensure map resizes to fit the new container size
        MM.map.invalidateSize();
        // reset view to center on selected location
        MM.map.setView([lat, lon]), undefined, { animate: false };
    });
};