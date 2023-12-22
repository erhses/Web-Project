// Function to initialize the map
function initMap() {
    // Create a Leaflet map centered above Paris
    var map = L.map('map').setView([48.8566, 2.3522], 12);

    // Add a base tile layer (using OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers and draw route
    AddMarkersAndDrawRoute(map);
}

// AddMarkersAndDrawRoute function
function AddMarkersAndDrawRoute(map) {
    // Add marker for Eiffel Tower
    L.marker([48.858844, 2.294351]).addTo(map)
        .bindPopup('<b>Eiffel Tower</b>');

    // Add marker for Louvre Museum
    L.marker([48.860611, 2.337644]).addTo(map)
        .bindPopup('<b>Louvre Museum</b>');

    // Draw route between Eiffel Tower and Louvre Museum
    DrawRoute(map, [
        [48.858844, 2.294351], // Eiffel Tower
        [48.860611, 2.337644]  // Louvre Museum
    ]);
}

// DrawRoute function
function DrawRoute(map, routeLatLngs) {
    L.Routing.control({
        waypoints: routeLatLngs.map(function (latLng) {
            return L.latLng(latLng[0], latLng[1]);
        }),
        routeWhileDragging: true,
        show: true,
        createMarker: function (i, waypoint, n) {
            return L.marker(waypoint.latLng, {
                draggable: true,
                icon: L.divIcon({ className: 'leaflet-div-icon', html: '<span>' + (i + 1) + '</span>' })
            });
        }
    }).addTo(map);
}

// Call the initMap function when the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initMap();
});
