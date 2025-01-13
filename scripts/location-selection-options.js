// Location selection options 
// To be shown when user wants to select a start, destination, or waypoint
const htmlContent = `
    <!-- Text search for a place or address -->
    <div class="row py-1" id="text-search">
        <div class="col-11">
            <!-- text input to enter place or address -->
            <input type="text" id="text-search-input" placeholder="Search for place or address" class="w-100">
        </div>
        <div class="col-1">
            <!-- Search button -->
            <button id="text-search-submit" class="w-100"><i class="bi bi-search py-1"></i></button>
        </div>
    </div>

    <!-- Other Location selection options -->
    <div class="row pt-2" id="other-selection-options">
        <div class="col-12 d-flex justify-content-between">

            <!-- Use current location -->
            <div class="square-box d-flex flex-column justify-content-center" id="use-current-location">
                <div class="d-flex justify-content-center"><i class="bi bi-crosshair py-1"></i></div>
                <div class="text-center"><p>Current Location</p></div>
            </div>

            <!-- Select on map -->
            <div class="square-box d-flex flex-column justify-content-center" id="select-on-map">
                <div class="d-flex justify-content-center"><i class="bi bi-map py-1"></i></div>
                <div class="text-center"><p>Select on Map</p></div>
            </div>

            <!-- Select from saved places -->
            <div class="square-box d-flex flex-column justify-content-center" id="select-from-saved-places">
                <div class="d-flex justify-content-center"><i class="bi bi-bookmark py-1"></i></div>
                <div class="text-center"><p>Saved Places</p></div>
            </div>
        </div>
    </div>

</div>
`
function showLocationSelectionOptions(e) {
    const newDiv = document.createElement('div');
    newDiv.className = 'py-1';
    newDiv.id = 'waypoint-selection-options';
    newDiv.innerHTML = htmlContent;
    // get next sibling of e.target and insert newDiv before it
    e.currentTarget.parentNode.insertBefore(newDiv, e.currentTarget.nextSibling);
};