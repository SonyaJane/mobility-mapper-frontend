export default function createZoomToLocationButton() {
    const zoomButton = L.control({ position: 'topright' });

    zoomButton.onAdd = () => {
        const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        div.innerHTML = '<button id="zoom-to-location" title="Zoom to your location"><i class="bi bi-crosshair py-1"></i></button>';
        return div;
    };

    zoomButton.addTo(MM.map);

    document.getElementById('zoom-to-location').addEventListener('click', async () => {
        try {
            MM.userLocation = await locateUser();

            if (MM.userLocation) {
                MM.map.setView([MM.userLocation.lat, MM.userLocation.lon], 15);
            } else {
                alert("Could not get your location. Please allow location access.");
            }
        } catch (error) {
            console.error("Error locating user:", error);
            alert("Could not get your location. Please allow location access.");
        }
    });
}