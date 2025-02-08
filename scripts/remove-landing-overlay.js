/**
 * Remove the landing overlay from the DOM
 */
export default function removeLandingOverlay() {
    const overlay = document.getElementById("landingOverlay");
    if (overlay) {
      overlay.remove();
    }
  }