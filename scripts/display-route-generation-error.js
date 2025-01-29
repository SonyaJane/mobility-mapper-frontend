export default function displayRouteGenerationError(error) {
    // Set message depending on the error code
    let title = document.getElementById('errorModalTitle');
    let message = document.getElementById('errorModalMessage');
    
    title.innerText = "Route generation error";
    message.innerText = "No route found. Please try again with different locations.";
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('errorModal'));
    modal.show();
}