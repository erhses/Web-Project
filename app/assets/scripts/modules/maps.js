function initMap() {
    //mapaa bairshuulh code
    var map = L.map('map');

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

    addMarkersAndDrawRoute(map);
}

function addMarkersAndDrawRoute(map) {
    //markeruud zooj route zurah function
    var selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
    //selectedItems n 2 oos ih tohioldold route zurn
    if (selectedItems.length >= 2) {
        var routeLatLngs = selectedItems.map(function (item) { //coordinate uudiig hadgalj avna
            return [item.long, item.lat];
        });
        //testing
    console.log(L.latLng);
        var bounds = L.latLngBounds(routeLatLngs);//bairshluudaas hamaaran map init iin zoom ee haana taaruulhiig tootsooloh

        routeLatLngs.forEach(function (latLng, index) {
            L.marker(latLng).addTo(map)
                .bindPopup('<b>' + selectedItems[index].title + '</b>');
        });//marker nemeh code

        map.fitBounds(bounds); //map uusgehed zoom center taaruulah

        var waypoints = routeLatLngs.map(function (latLng) {
            return L.latLng(latLng[0], latLng[1]);
        }); //bairshil bolgond waypoint uusgn

        var control = L.Routing.control({
            waypoints: waypoints,
            routeWhileDragging: true,
            router: L.Routing.mapbox('pk.eyJ1IjoiZXJoc2VzIiwiYSI6ImNscXZ4cXgxdTUxd3oya280YjQ5ZDU4NTMifQ.BypQD2x71oOXPLpGmWp7ew'),
            lineOptions: {
                styles: [{ color: 'var(--secondary)', opacity: 1, weight: 5 }]
            },
            createMarker: function (i, waypoint, n) {
                return L.marker(waypoint.latLng, {
                    draggable: true,
                    icon: L.divIcon({ className: 'leaflet-div-icon', html: '<span>' + (i + 1) + '</span>' })
                });
            }
        })
        .addTo(map);
        control.hide();
        console.log(waypoints);
        //waypoint uudaasa hamaaaran route zurj route iin tohirgoo hiisen, daraa n control.hide() aar directions alga bolgsn
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initMap();
});
