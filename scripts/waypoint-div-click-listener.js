// Add a click event listener to .waypoint (start and destination) divs
// Adds a div below the waypoint div with ways to select or search for a location
import showLocationSelectionOptions from './show-location-selection-options.js';

export default function addEventListenersToWaypointDivs() { 
    console.log("In addEventListenersToWaypointDivs(), Adding click event listeners to waypoint divs");
    // get all elements with class .waypoint
    document.querySelectorAll('.waypoint').forEach(waypoint => {
        waypoint.addEventListener('click', e => {

            // if waypoint-options div does not exist for either 
            // waypoint div, add it for this waypoint
            // if waypoint-selection-options div already exists for this waypoint, 
            // remove it and finish, else add it for this waypoint
            // if waypoint-selection-options div already exists for another waypoint,
            // remove it then add it for this waypoint

            const existingDiv = document.getElementById('waypoint-selection-options');
            // If it doesnt exist, add it
            if (!existingDiv) {
                // add the location selection options div for this waypoint
                showLocationSelectionOptions(e);
            } else {
                // If it exists for this waypoint, remove it and finish
                if (existingDiv.previousElementSibling === e.currentTarget) {
                    existingDiv.remove();
                    //return;
                } else { // if it exists for another waypoint, remove it and add it for this waypoint
                    existingDiv.remove();
                    // add the location selection options div for this waypoint
                    showLocationSelectionOptions(e);
                }
            }
            // reset map size
            MM.map.invalidateSize();
        });
    });
};