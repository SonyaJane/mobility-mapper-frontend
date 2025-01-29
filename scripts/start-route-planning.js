import prepareForNewRoute from './prepare-for-new-route.js';
import generateRoute from './generate-route.js';

export default async function startRoutePlanning() {
    // Await prepareForNewRoute to complete before proceeding
    console.log("Preparing for new route...");

    await prepareForNewRoute();
    
    console.log("Map is ready, generating route...");
    
    // Generate the route and display it on the map
    await generateRoute("wheelchair", "false");

    // Remove the orange background from the waypoint divs
    document.querySelectorAll('.waypoint').forEach(waypoint => {
        waypoint.classList.remove('background-orange');
    });
}