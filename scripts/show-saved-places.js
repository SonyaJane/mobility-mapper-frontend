export default function showSavedPlaces(outputDivId) {
    // create a new div with id #saved-places-list
    const savedPlacesDiv = document.createElement('div');
    savedPlacesDiv.id = 'saved-places-list';
    savedPlacesDiv.classList.add('px-2');

    // Add a title
    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = `<h2 class="mb-0 pt-3 pb-2 border-bottom border-top-orange">Select a saved place</h2>`;
    savedPlacesDiv.appendChild(titleDiv);

    // Iterate through the saved places
    for (let place of MM.savedPlaces) {
        // Create a new div for each result
        const placeDiv = document.createElement('div');
        // add html to the div
        placeDiv.innerHTML = `<p>${place.name}</p>
                                    <p>${place.address}</p>
                                    <p>${place.lat}, ${place.lon}</p>`;
        // add css classes to the div
        placeDiv.classList.add('border-bottom', 'py-2', 'cursor-pointer');
        // add data attributes to the div
        placeDiv.dataset.location = place.name;
        placeDiv.dataset.lat = place.lat;
        placeDiv.dataset.lon = place.lon;

        // add an event listener to the div for choosing the location
        placeDiv.addEventListener('click', e => {
            // add lat and lon to global coordinates 
            addCoordinatesToRoute(place.lat, place.lon, outputDivId);
            // Display the place name
            setStartEndLocationText(place.name, outputDivId);
            // Display the location on the map
            displayLocationOnMap(place.lat, place.lon, zoom = 15);
            // Remove the saved places div
            document.querySelector('#saved-places-list').remove();
            // Show the hidden elements
            showElements(divs_to_hide_2);
        });

        // Append the div to the new div
        savedPlacesDiv.appendChild(placeDiv);
    }

    // Append the new div to the main element
    document.querySelector('main').appendChild(savedPlacesDiv);
}