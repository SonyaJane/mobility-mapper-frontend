document.addEventListener('DOMContentLoaded', () => {
    
    // Device selection section: Add event listeners to show/hide device options

    // Toggle display of other device options when clicking the current device row
    document.getElementById('current-device-container').addEventListener('click', () => {
        document.querySelectorAll('.device-option').forEach(item => {
            item.classList.toggle('hidden');
        });
    });

    // Handle the selection of a different device option
    document.querySelectorAll('.device-option').forEach(item => {
        item.addEventListener('click', e => {
            // get the name of the new device (stored in the last child of the clicked element)
            const newDevice = e.currentTarget.lastElementChild.textContent;
            // get the name of the current device 
            const currentDevice = document.getElementById('currentDevice').textContent;
            // Swap values
            document.getElementById('currentDevice').textContent = newDevice;
            e.currentTarget.lastElementChild.textContent = currentDevice;
        });
    });

});    