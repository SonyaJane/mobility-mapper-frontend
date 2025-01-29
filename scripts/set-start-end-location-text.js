export default function setStartEndLocationText(placeName, divId) {
    console.log("Place name:", placeName);
    // Display the name of the seleted location in the div with the given id
    let div = document.getElementById(divId);
    if (placeName) {
        if (placeName.split(",").length > 1) {
            div.textContent = placeName.split(",")[0];
        } else {
            div.textContent = placeName;
        }
    } else {
        div.textContent = "Unknown location";
    }
}