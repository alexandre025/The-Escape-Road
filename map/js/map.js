"use strict";

var locations = [
  ['<a href="./inc/left/sk_1.html" class="marker-content"><strong>MegabiSkate</strong><span>Skateboarding in Addis Abeba, Ethiopie</span><em>View again</em></a>', 8.9806034, 38.7577605, 1],
  ['<a href="./inc/left/sk_2.html" class="marker-content"><strong>This Ain\'t California</strong><span>Skateboarding in East Berlin (GDR), Germany</span><em>View again</em></a>', 52.5200066, 13.4049540, 2],
  ['<a href="./inc/left/sk_3.html" class="marker-content"><strong>Skateboarding in India</strong><span>Skateboarding in Bangalore, India</span><em>View again</em></a>', 12.9715987, 77.5945627, 3],
  ['<a href="./inc/left/sk_4.html" class="marker-content"><strong>The Modern Skate</strong><span>Skateboarding in Dordogne, France</span><em>View again</em></a>', 45.1493094, 0.7606537, 4],
  ['<a href="./inc/right/sk_1.html" class="marker-content"><strong>Skateistan</strong><span>Skateboarding in Kabul, Afghanistan</span><em>View again</em></a>', 34.5333330, 69.1666670, 5],
  ['<a href="./inc/right/sk_2.html" class="marker-content"><strong>I’am a Thalente</strong><span>Skateboarding in Durban, South Africa</span><em>View again</em></a>', -29.8714083, 31.0304235, 6],
  ['<a href="./inc/right/sk_3.html" class="marker-content"><strong>Youth of Yangon</strong><span>Skateboarding in Yangon, Burma</span><em>View again</em></a>', 16.7808330, 96.1497220, 7],
  ['<a href="./inc/right/sk_4.html" class="marker-content"><strong>Cuba Skate</strong><span>Skateboarding in Havana, Cuba</span><em>View again</em></a>', 23.0511477, -82.3367776, 8]
        ];


var map = new google.maps.Map(document.getElementById('map-canvas'), {
  zoom: 3,
  zoomControl: false,
  maxZoom : 4,
  minZoom : 2,
  mapTypeControl: false,
  streetViewControl : false,
  panControl: false,
  center: new google.maps.LatLng(24.071876, 15.441456),

  styles: [
  {"stylers":[{"visibility":"off"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#2f343b"}]},
  // {"featureType":"landscape","stylers":[{"visibility":"off"},{"color":"#703030"}]},
  {"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"off"},{"color":"#2f343b"},{"weight":1}]}]
});

// LOGO marker
var logoImage = {
  url : "./img/logo_v1.png",
  scaledSize: new google.maps.Size(100, 100)
}

var logoMarker = new google.maps.Marker({
        position: new google.maps.LatLng(50, -30),
        map: map,
        clickable: false,
        icon: logoImage
    });

// Icons markers
    var markerRed = {
      url :'./img/marker_red.png',
      scaledSize: new google.maps.Size(35, 35)
    }

    var markerGrey = {
      url:'./img/marker_grey.png',
      scaledSize: new google.maps.Size(35, 35)
    }

  

var infowindow = new google.maps.InfoWindow({

});

var marker, i;

for (i = 0; i < locations.length; i++) {
 //si localStorage.getItem(i)=="yes"
  marker = new google.maps.Marker({
    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
    map: map,
    icon: markerRed,
  });

  google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
    return function() {
      infowindow.setContent(locations[i][0]);
      infowindow.open(map, marker);
    }
  })(marker, i));
}




