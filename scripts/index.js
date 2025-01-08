$(document).ready(function () {

    // Create map on load
    // make mapObject a global variable so it can be accessed by other functions

    window.mapObject = createMap([51.97, -4.64], 10);
        
    // Create a map with the given centre coordinates and zoom level
    function createMap(centerCoords, zoomLevel) {
    
        // Initialise Leaflet map
        const map = L.map('map').setView(centerCoords, zoomLevel);
    
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    
        return map;
    }

    // Toggle display of options when clicking the main device row
    // touchstart registers the moment the user touches the screen rather than waiting for them to lift their finger
    $('#currentDevice').on('click touchstart', function () {
        $('.option').toggleClass('hidden');
    });

    // Handle the selection of a new device
    $('.option').on('click touchstart', function () {
        const newDevice = $(this).find('[data-device]').text();
        const currentDevice = $('#currentDevice').text();

        // Swap values
        $('#currentDevice').text(newDevice);
        $(this).find('[data-device]').text(currentDevice);

    });


});