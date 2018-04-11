$(document).ready(function() {
  $.ajax({
    url: "http://localhost:8080/app/33.4483800,-112.07404010,20mi/",
    method: "GET"
  }).then(function(response) {

    var data = response
    console.log(data)

    var mymap = L.map("mapid").setView([33.44838, -112.0740401], 10);
    L.tileLayer(
      "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken:
          "pk.eyJ1IjoidHNjaGFla2VuIiwiYSI6ImNqZnUwOXA5eDBpYjYyd252eG1iczNmdnIifQ.3fUaJSyXZnRt9UCDNrYjcg"
      }
    ).addTo(mymap);
      
      // var latlng = L.latLng(geo1);
      // var circleMarker = L.circle([latlng], {
      //   color: "red",
      //   fillColor: "#f03",
      //   fillOpacity: 0.5,
      //   radius: 50
      // }).addTo(mymap);

      for (var i=0;i<data.length;i++)
{
    var data=data[i];
    console.log(data)
    var m = L.marker(new L.LatLng(data.geo)).addTo(mymap);
}


  });
});
