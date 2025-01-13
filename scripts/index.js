document.addEventListener('DOMContentLoaded', () => {

    // Create MM (Mobility Mapper) global namespace to store global variables
    window.MM = window.MM || {}; // || {} ensures that if the namespace already exists, it won't be overwritten

    // Initialise global variables
    MM.currentDevice = null;
    MM.waypoints = [];
    MM.coordinates = []; // Coordinates for the route
    
    // Initialise Leaflet map
    MM.map = L.map('map');
    
    // locate the user's location and set zoom level
    MM.map.locate({setView: true, maxZoom: 6});

    // get the user's location
    MM.map.on('locationfound', e => {
        MM.userLocation = [e.latitude, e.longitude, e.accuracy];
    });

    // if the user's location cannot be found, request location access
    MM.map.on('locationerror', e => {
        alert("Could not get your location. Please allow location access.");
    });
  
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(MM.map);

    // Device selection section: Add event listeners to show/hide device options

    // Toggle display of other device options when clicking the current device row
    document.getElementById('current-device-container').addEventListener('click', () => {
        document.querySelectorAll('.device-option').forEach(item => {
            item.classList.toggle('hidden');
        });
    });

    // Handle the selection of a different device option
    document.querySelectorAll('.device-option').forEach(item => {
        item.addEventListener('click', e => {
        // get the name of the new device (stored in the last child of the clicked element)
        const newDevice = e.currentTarget.lastElementChild.textContent;
        // get the name of the current device 
        const currentDevice = document.getElementById('currentDevice').textContent;
        // Swap values
        document.getElementById('currentDevice').textContent = newDevice;
        e.currentTarget.lastElementChild.textContent = currentDevice;
        });
    });
});