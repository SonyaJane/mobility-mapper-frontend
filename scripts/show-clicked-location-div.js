export default function showClickedLocationDiv(placeName, lat, lon) {
    // Remove any existing popups
    const existingPopup = document.getElementById('fixed-popup');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create popup content with the location and a button
    // Create the popup element
    const popup = document.createElement('div');
    popup.className = 'fixed-popup';
    popup.id = 'fixed-popup';
    popup.innerHTML = `
    <div class="p-2 text-center">
        <p class="mb-1">${placeName}</p>
        <hr class="my-2">
        <p class="mb-1">${lat.toFixed(6)}, ${lon.toFixed(6)}</p>
        <button id="start-here" class="btn btn-use-this m-2">
        Start Here</button>
        <button id="end-here" class="btn btn-use-this m-2">
        Set as Destination</button>
        <button id="go-back" class="btn btn-use-this m-2">
        Go Back</button>
    </div>
    `;
    // Add the popup below the map container
    document.getElementById('map').insertAdjacentElement('afterend', popup);
    // return height of popup
    return popup.clientHeight;
}