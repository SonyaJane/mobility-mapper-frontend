// Create and show location selection options div below the clicked waypoint div
// To be shown when user wants to select a start or destination location
import addEventListenersToLocationSelectionOptions from './location-selection-options-listener.js';
import waypointSelectionOptionsContent from './waypoint-selection-options-content.js';

export default function showLocationSelectionOptions(e) {
    // Create a new div element
    const newDiv = document.createElement('div');
    // Add multiple classes to the new div
    newDiv.classList.add('px-2', 'pt-1', 'pb-2');
    newDiv.id = 'waypoint-selection-options';
    // Add the text from the locationOptions.html file
    newDiv.innerHTML = waypointSelectionOptionsContent;
    // get next sibling of e.target and insert newDiv before it
    e.currentTarget.parentNode.insertBefore(newDiv, e.currentTarget.nextSibling);

    // add click event listeners to the location selection options
    // get id of last child div of div that was clicked 
    // (requred to display the selected location, and store the coordinates)
    const lastChildId = e.currentTarget.lastElementChild.id;
    // add click event listeners to the location selection options
    addEventListenersToLocationSelectionOptions(lastChildId);
};