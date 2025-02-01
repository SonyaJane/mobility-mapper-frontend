import latLonToAddress from "./lat-lon-to-address.js";
import showClickedLocationDiv from "./show-clicked-location-div.js";
import { hideElements } from "./utils.js";
import addEventListenerToUseLocationButton from "./use-location-button-listener.js";    
import addEventListenerToExitButton from "./add-event-listener-to-exit-button.js";

/**
 * Add a click event listener to the map. 
 * 1. Gets the latitude and longitude of the clicked point.
 * 2. Gets the address from the latitute and longitude using the nominatim API.
 * 3. Shows the address, and user action buttons in a popup div below the map
 * 4. Hides the start-end-display div that shows the currently selected start and end locations.
 * 5. Resizes the map to fit the new container size.
 * 6. Removes any existing markers.
 * 7. Adds a marker at the clicked location.
 * 8. Centers the map on the clicked point.
 * 9. Adds click event listeners to the buttons in the popup.
 */

export default function addMapClickListener() {

    // add click event listener to the map
    MM.map.on('click', async function (e) {
        
        // Get the latitude and longitude of the clicked point
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;
        console.log(`Map clicked at Latitude: ${lat}, Longitude: ${lon}`); 

        // get address from lat and lon
        const placeName = await latLonToAddress(lat, lon);

        // add popup at bottom of screen, below map, and get its height
        showClickedLocationDiv(placeName, lat, lon);
                    
        // hide start-end-display div
        hideElements(["start-end-display"]);

        // resize map to fit the new container size
        MM.map.invalidateSize();

        // remove any existing markers
        if (MM.marker) {MM.map.removeLayer(MM.marker)};

        // add marker at clicked location
        MM.marker = L.marker([lat, lon]).addTo(MM.map);

        // Center the map on the clicked point
        // get current zoom level
        const zoom = MM.map.getZoom();
        // zoom to level 15 or remain at current zoom level, whichever is greater
        MM.map.setView([lat, lon], Math.max(15, zoom));

        // Add click event listeners to the buttons in the popup
        ["start-here", "end-here"].forEach(btnId => {
            addEventListenerToUseLocationButton(lat, lon, placeName, btnId);
        })
        
        // Add click event listener to the exit button
        addEventListenerToExitButton();
    });

}