geocoder = new google.maps.Geocoder();

var mapcenter = new google.maps.LatLng(41.3100, -72.9236);

var locations = ["old campus yale", "woolsey hall yale", "sprague hall yale", 
"180 York Street", "Kroon Hall yale", "Lawrance Hall yale", "33 Edgewood Avenue new haven"];

var markers = [];
var map;

function initialize() {
  var mapOptions = {
    zoom: 14,
    center: mapcenter
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  DrawCircle(1);
}

function getCoordinates(address, callback) {
  var coordinates;
  geocoder.geocode({ address: address}, function (results, status) {
   coords_obj = results[0].geometry.location;
   coordinates = [coords_obj.B,coords_obj.k];
   callback(coordinates);
   })
}

function createMarkers() {
    for (var j = 0; j < locations.length; j++) {
      addMarker(j);
    }
}

function creatInfoWindow() {
  return new google.maps.InfoWindow({
      content: "foobar"
  });
};

function linkInfoWindowToMarker(marker, infoWindow) {
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.open(map, marker);
    }); 
};

function addMarker(j) {
  getCoordinates(locations[j], function(coords){
    
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(coords[1], coords[0]),
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP
    })

    markers.push(marker);
    linkInfoWindowToMarker(marker, creatInfoWindow());
  });
};

var marker = new google.maps.Marker({
    position: mapcenter,
    map: map,
    title: 'Uluru (Ayers Rock)'
});

var radius; // Radius of circle in miles.
var draw_circle = null;  // object of google maps polygon for redrawing the circle

function DrawCircle(rad) {
  rad *= 1600; // convert to meters if in miles
  if (draw_circle != null) {
      draw_circle.setMap(null);
  }
  draw_circle = new google.maps.Circle({
      center: mapcenter,
      radius: rad,
      strokeWeight: 1,
      // fillColor: "#000000",
      fillOpacity: 0.00,
      map: map
  });
}


window.onload = createMarkers();
