export default function addEventListenerToExitButton() {
    // Add click event listener to the button in the popup
    document.getElementById('go-back').addEventListener('click', e => {

        // Remove the popup
        document.getElementById('fixed-popup').remove();

        // show hidden divs
        document.getElementById("start-end-display").classList.remove('hidden');

        // Ensure map resizes to fit the new container size
        MM.map.invalidateSize();
    });
}