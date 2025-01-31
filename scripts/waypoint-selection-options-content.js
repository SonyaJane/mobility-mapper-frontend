const waypointSelectionOptionsContent = `<!-- Text search for a place or address -->
<div class="d-flex align-items-center py-1" id="text-search">
    <input type="text" id="text-search-input" placeholder="Search for place" class="form-control">
    <button id="text-search-submit" class="btn btn-secondary d-flex justify-content-center align-items-center">
        <i class="bi bi-search"></i>
    </button>
</div>

<!-- Other Location selection options -->
<div class="pt-2" id="other-selection-options">
    <div class="d-flex justify-content-between">

        <!-- Use current location -->
        <div class="square-box d-flex flex-column justify-content-center cursor-pointer" id="use-current-location">
            <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
                <div class="text-center icon-container mb-0"><i class="bi bi-crosshair m-0 p-0"></i></div>
                <div class="text-center text-container mb-0 p-0"><p class="m-0 p-0"><span>Current</span> <span>Location</span></p></div>
            </div>
        </div>

        <!-- Select on map -->
        <div class="square-box d-flex flex-column justify-content-center cursor-pointer" id="select-on-map">
            <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
                <div class="text-center icon-container mb-0"><i class="bi bi-map m-0 p-0"></i></div>
                <div class="text-center text-container mb-0 p-0"><p class="m-0 p-0"><span>Map</span> <span>Select</span></p></div>
            </div>
        </div>

        <!-- Select from saved places -->
        <div class="square-box d-flex flex-column justify-content-center cursor-pointer" id="select-from-saved-places">
            <div class="d-flex flex-column flex-md-row align-items-center justify-content-center">
                <div class="text-center icon-container mb-0"><i class="bi bi-bookmark m-0 p-0"></i></div>
                <div class="text-center text-container mb-0 p-0"><p class="m-0 p-0"><span>Saved</span> <span>Places</span></p></div>
            </div>
        </div>
    </div>
</div>`

export default waypointSelectionOptionsContent;