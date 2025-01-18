export default function setStartEndLocationText(placeName, divId) {
    // TODO: Needs improvement incase clicks in middle of sea, or address with number
    // Display the name of the seleted location in the div with the given id
    console.log(`In setStartEndLocationText() placeName ${placeName}, divId ${divId}`);
    document.getElementById(divId).textContent = placeName.split(",")[0];
}