$(document).ready(function() {
        
	/* google maps -----------------------------------------------------*/
	google.maps.event.addDomListener(window, 'load', initialize);

	function initialize() {

	  var latlng = new google.maps.LatLng(-23.555644, -46.637871);

	  var mapOptions = {
	    center: latlng,
	    scrollWheel: false,
	    zoom: 13
	  };
	  
	  var marker = new google.maps.Marker({
	    position: latlng,
	    url: '/',
	    animation: google.maps.Animation.DROP
	  });
	  
	  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	  marker.setMap(map);

	};
	/* end google maps -----------------------------------------------------*/
        
});