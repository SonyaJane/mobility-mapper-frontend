/**
 * Add event listener to the exit button in the div popup.
 * This will remove the popup div and show the hidden start and end divs.
 * Finally, resizes map to fit the new container size.
 */
export default function addEventListenerToExitButton() {
    // Add click event listener to the button in the popup
    document.getElementById('go-back').addEventListener('click', e => {

        // Remove the popup div
        document.getElementById('fixed-popup').remove();

        // show hidden divs
        document.getElementById("start-end-display").classList.remove('hidden');

        // Ensure map resizes to fit the new container size
        MM.map.invalidateSize();
    });
}