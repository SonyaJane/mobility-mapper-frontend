const waypointSelectionOptionsContent = `<!-- Text search for a place or address -->
<div class="d-flex align-items-center py-1" id="text-search">
    <input type="text" id="text-search-input" placeholder="Search for place or address" class="form-control">
    <button id="text-search-submit" class="btn btn-secondary d-flex justify-content-center align-items-center">
        <i class="bi bi-search"></i>
    </button>
</div>

<!-- Other Location selection options -->
<div class="row pt-2" id="other-selection-options">
    <div class="col-12 d-flex justify-content-between">

        <!-- Use current location -->
        <div class="square-box d-flex flex-column justify-content-center" id="use-current-location">
            <div class="d-flex justify-content-center"><i class="bi bi-crosshair py-1"></i></div>
            <div class="text-center"><p class="mb-0">Current</p><p class="mb-1">Location</p></div>
        </div>

        <!-- Select on map -->
        <div class="square-box d-flex flex-column justify-content-center" id="select-on-map">
            <div class="d-flex justify-content-center"><i class="bi bi-map py-1"></i></div>
            <div class="text-center"><p class="mb-0">Map</p><p class="mb-1">Select</p></div>
        </div>

        <!-- Select from saved places -->
        <div class="square-box d-flex flex-column justify-content-center" id="select-from-saved-places">
            <div class="d-flex justify-content-center"><i class="bi bi-bookmark py-1"></i></div>
            <div class="text-center"><p class="mb-0">Saved</p><p class="mb-1">Places</p></div>
        </div>
    </div>
</div>`

export default waypointSelectionOptionsContent;