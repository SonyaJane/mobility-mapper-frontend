import latLonToAddress from "./lat-lon-to-address.js";
import showClickedLocationDiv from "./show-clicked-location-div.js";
import { hideElements } from "./utils.js";
import addEventListenerToUseLocationButton from "./use-location-button-listener.js";    
    
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

        // TODO: change this to link marker to current waypoint
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
    });

}