var locations = [
   ['Bondi Beach', -33.890542, 151.274856, 4],
   ['Coogee Beach', -33.923036, 151.259052, 5],
   ['Cronulla Beach', -34.028249, 151.157507, 3],
   ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
   ['Maroubra Beach', -33.950198, 151.259302, 1]
]

var map = new google.maps.Map(document.getElementById('map'), {
   zoom: 10,
   center: new google.maps.LatLng(-33.92, 151.25),
   mapTypeId: google.maps.MapTypeId.ROADMAP
})

var infowindow = new google.maps.InfoWindow()

var marker, k
var markers = []

for (k = 0; k < locations.length; k++) {
   marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[k][1], locations[k][2]),
      map: map
   })

   markers.push(marker)

   console.log(markers)

   google.maps.event.addListener(marker, 'click', ( function (marker, k) {
      return function () {
         infowindow.setContent(locations[k][0])
         infowindow.open(map, marker)
      }
   } )(marker, k))
}

console.log(markers[0])
