/*
app.js responds to a specific page load, in this case Phoenix.html, and loads both the Leaflet API map, the tile layer for it, as well as several 5 mi radius circles representing
locations where "sick" was tweeted from.

Currently it draws a circle on the response GPS coordinates, but in the future it will be developed to act dynamically to a much larger collection of twitter data, parsed and passed back
as the user zooms in and out of a location.
*/

$(document).ready(function() {
  $.ajax({
    url: "http://localhost:8080/",
    method: "GET"
  }).then(function(response) {

    var data = response;

    var mymap = L.map("mapDiv",{
      center: [33.44838, -112.0740401],
      zoom: 10
    })

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

    for (var i = 0; i < data.length; i++){
    var cord = [data[i].lon, data[i].lat];
    var zone = L.circle(cord,{
      color: 'red',
      fillColor:'red',
      opacity: 0.25,
      radius:8000
    }).addTo(mymap);
  };

});
})