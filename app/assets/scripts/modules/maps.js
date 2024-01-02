function initMap() {
    var map = L.map('map').setView([37.7749, -122.4194], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    var selectedItems = JSON.parse(localStorage.getItem('selectedItems'));

    if (selectedItems && selectedItems.length >= 2) {
        var startWaypoint = L.latLng(selectedItems[0].long, selectedItems[0].lat);
        var endWaypoint = L.latLng(selectedItems[1].long, selectedItems[1].lat);

        L.Routing.control({
            waypoints: [startWaypoint, endWaypoint],
            routeWhileDragging: true,
            show: true,
            router: L.Routing.mapbox('pk.eyJ1IjoiZXJoc2VzIiwiYSI6ImNscXZ4cXgxdTUxd3oya280YjQ5ZDU4NTMifQ.BypQD2x71oOXPLpGmWp7ew'), // Replace with your actual Mapbox Access Token
            createMarker: function (i, waypoint, n) {
                return L.marker(waypoint.latLng, {
                    draggable: true,
                    icon: L.divIcon({ className: 'leaflet-div-icon', html: '<span>' + (i + 1) + '</span>' })
                });
            }
        })
        .on('routesfound', function(e) {
            console.log('Routes found:', e.routes);
        })
        .on('routingerror', function(e) {
            console.error('Routing error:', e.error);
        })
        .addTo(map);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initMap();
});