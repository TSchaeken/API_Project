var mymap = L.map('mapid',{
    center: [33, -111],
    zoom: 8,
    minZoom: 3,
    maxZoom: 14,
    zoomControl: false,
})



var map = L.tileLayer('https://api.mapbox.com/styles/v1/jenscx8/cjfog9bqi328w2sp90efu1jdc/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamVuc2N4OCIsImEiOiJjamZvZnltM20wNG1vMnFzYjVtYTQwZW9kIn0.HfQHrCI1Tf8xxuDb5aVCDQ', {
    attribution: "keeping it healthy",
    minZoom: 3,
    maxZoom: 50,


}).addTo(mymap);
    
    $("#phoenix").click(function(){
        mymap.setView([33, -111], 5)
        L.circle([33, -111], 5000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap).bindPopup("I am a circle.");
    });

    $("#newyork").click(function(){
        mymap.setView([40, -73], 5)
        L.circle([40.7, -73], 5000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap).bindPopup("I am a circle.");
    });

    $("#losangeles").click(function(){
        mymap.setView([33, -111], 5)
        L.circle([33, -111], 5000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap).bindPopup("I am a circle.");
    });

    $("#chicago").click(function(){
        mymap.setView([33, -111], 5)
        L.circle([33, -111], 5000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap).bindPopup("I am a circle.");
    });

    $("#houston").click(function(){
        mymap.setView([33, -111], 5)
        L.circle([33, -111], 5000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap).bindPopup("I am a circle.");
    });

    $("#philadelphia").click(function(){
        mymap.setView([33, -111], 5)
        L.circle([33, -111], 5000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap).bindPopup("I am a circle.");
    });

    $("#sanantonio").click(function(){
        mymap.setView([33, -111], 5)
        L.circle([33, -111], 5000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap).bindPopup("I am a circle.");
    });

    $("#sandiego").click(function(){
        mymap.setView([33, -111], 5)
        L.circle([33, -111], 5000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap).bindPopup("I am a circle.");
    });

    $("#sanjose").click(function(){
        mymap.setView([33, -111], 5)
        L.circle([33, -111], 5000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap).bindPopup("I am a circle.");
    });

	var popup = L.popup();

	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(mymap);
	}

    mymap.on('click', onMapClick);
    
   console.log(map);