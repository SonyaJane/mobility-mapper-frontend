import {showElements, capitaliseWords } from './utils.js';
import searchResultsEventListener from './search-results-event-listener.js';

/**
 * Displays the results of a search for a place or address.
 * Creates a title div with an exit button.
 * Then creates a new div for each result with a click event listener.
 */

export default function displaySearchLocationResults(data, outputDivId) {

    // if a results div already exists, remove it
    const existingResultsDiv = document.querySelector('#location-search-results');
    if (existingResultsDiv) {
        existingResultsDiv.remove();
    }

    // create a new div with id #location-search-results
    const resultsDiv = document.createElement('div');
    resultsDiv.id = 'location-search-results';
    resultsDiv.classList.add('px-2', 'px-md-3');

    // Add a div for the Search results title and an exit button
    const titleDiv = document.createElement('div');
    titleDiv.innerHTML = `<h2 class="mb-0">Search results</h2>
                            <button class="btn exit-button"><i class="bi bi-x-square"></i></button>`;
    // add css classes to the div
    titleDiv.classList.add('border-bottom', 'py-1', 'd-flex', 'justify-content-between', 'align-items-center');
    titleDiv.id = 'search-results-title';

    // Add an event listener to the exit button
    titleDiv.querySelector('.exit-button').addEventListener('click', e => {
        // Remove the search results div
        document.querySelector('#location-search-results').remove();
        // Show the hidden elements
        showElements(["start-location-display", "destination-location-display", "other-selection-options", "map"]);
        // reset the map
        MM.map.invalidateSize();
    });

    // Append the titleDiv to the resultsDiv
    resultsDiv.appendChild(titleDiv);

    // Iterate through the data
    for (let place of data) {
        // Create a new div for each result
        const placeDiv = document.createElement('div');
        // add html to the div
        placeDiv.innerHTML = `<p>${capitaliseWords(place.addresstype)}</p>
                          <p>${place.display_name}</p>`;
        // add css classes to the div
        placeDiv.classList.add('border-bottom', 'py-1', 'cursor-pointer');
        // add data attributes to the div
        placeDiv.dataset.lat = place.lat;
        placeDiv.dataset.lon = place.lon;
        placeDiv.dataset.location = place.display_name;

        // add an event listener to the div for choosing the location
        placeDiv.addEventListener('click', e => {
            searchResultsEventListener(e, outputDivId);
        });

        // Append the div to the new div
        resultsDiv.appendChild(placeDiv);
    }
        
    // Append the new div to the main element
    document.querySelector('main').appendChild(resultsDiv);
}