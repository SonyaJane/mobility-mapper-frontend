import prepareForNewRoute from './prepare-for-new-route.js';
import generateRoute from './generate-route.js';

/**
 * Prepare the map for a new route.
 * Generate a route and display it on the map.
 */
export default async function startRoutePlanning() {
    // Prepare for a new route
    await prepareForNewRoute();
      
    // Generate the route and display it on the map
    await generateRoute("wheelchair", "false");

    // Remove the orange background from the waypoint divs
    document.querySelectorAll('.waypoint').forEach(waypoint => {
        waypoint.classList.remove('background-orange');
    });
}