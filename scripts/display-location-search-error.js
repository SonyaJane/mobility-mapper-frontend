/**
 * Display a Nominatim location search error message in a modal
 */
export default function displayLocationSearchError() {
    let title = document.getElementById('errorModalTitle');
    let message = document.getElementById('errorModalMessage');
    
    title.innerText = "Location search error";
    message.innerText = "An error has occurred during the location search. Please try again.";
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('errorModal'));
    modal.show();
}