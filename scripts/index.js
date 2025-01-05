$(document).ready(function () {
    // Toggle display of options when clicking the main device row
    // touchstart registers the moment the user touches the screen rather than waiting for them to lift their finger
    $('#currentDevice').on('click touchstart', function () {
        $('.option').toggleClass('hidden');
    });

    // Handle the selection of a new device
    $('.option').on('click touchstart', function () {
        const newDevice = $(this).find('[data-device]').text();
        const currentDevice = $('#currentDevice').text();

        // Swap values
        $('#currentDevice').text(newDevice);
        $(this).find('[data-device]').text(currentDevice);


    });
});