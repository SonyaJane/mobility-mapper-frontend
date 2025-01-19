import locateUser from "./locate-user.js";

export default function createZoomToLocationButton() {
    const zoomButton = L.control({ position: 'topright' });

    zoomButton.onAdd = () => {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        div.innerHTML = '<button id="zoom-to-location" title="Zoom to your location"><i class="bi bi-crosshair py-1"></i></button>';
        // Prevent map click events when interacting with the button
        L.DomEvent.disableClickPropagation(div); // Disables click propagation to the map
        return div;
    };

    zoomButton.addTo(MM.map);

    document.getElementById('zoom-to-location').addEventListener('click', async () => {
        try {                 
            MM.userLocation = await locateUser(MM.map);
            if (MM.userLocation) {
                MM.map.setView([MM.userLocation.lat, MM.userLocation.lon]);

                // Add a circle to indicate accuracy
                const accuracyCircle = L.circle([MM.userLocation.lat, MM.userLocation.lon], {
                    radius: MM.userLocation.accuracy, // Use accuracy as the radius
                    color: 'none',
                    fillColor: 'lightblue',
                    fillOpacity: 0.4
                }).addTo(MM.map);

                const circleBounds = accuracyCircle.getBounds();
                // Set the map view and add the accuracy circle
                MM.map.fitBounds(circleBounds);
                //MM.map.fitBounds(circleBounds, { padding: [5, 5] });

                // Remove the circle after 2 seconds
                setTimeout(() => {
                    MM.map.removeLayer(accuracyCircle);
                }, 2000);

            }
        } catch (error) {
            console.error("Error getting user location: ", error);
        }
    });
}