'use strict';

angular.module('fullApp')
  .service('MapsService', function () {
  	var map;
  	var markers = [];

  	this.setCurrentPosition = function(mapControl) {
  		map = new google.maps.Map(mapControl, {
	      zoom: 13,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    });

  		if(navigator.geolocation) {
    		navigator.geolocation.getCurrentPosition(function(position) {    
			    map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
    		});
  		}
  	}

  	this.setPosition = function(lat, lng) {
  		map.setCenter(new google.maps.LatLng(lat, lng));
  		this.animateMarker(lat, lng);
  	}

  	this.animateMarker = function(lat, lng) {
  		if (markers) { 
  			for (var i = markers.length - 1; i >= 0; i--) {
  				var position = markers[i].getPosition();
  				if (position.lat() == lat && position.lng() == lng) {
  					markers[i].setAnimation(google.maps.Animation.DROP);	
  				}
  			}
  		}
  	}
  	
  	this.addMarkers = function(list) {	
	    var infowindow = new google.maps.InfoWindow();
	    var marker, i;

	    for (i = 0; i < list.length; i++) {
    		var pieces = list[i].latlng.split(',');
	      	marker = new google.maps.Marker({
	        	position: new google.maps.LatLng(pieces[0], pieces[1]),
	        	map: map
	      	});

	      	markers.push(marker);

	      	google.maps.event.addListener(marker, 'click', (function(marker, i) {
	        	return function() {
	        		infowindow.setContent("<strong>"+ list[i].titulo +"</strong><br />"+ 
	        							  list[i].dataHora +"<br />"+
	        							  list[i].pontoEncontro +"<br />"+
	        							  list[i].tags);

	          		infowindow.open(map, marker);
	        	}
	      	})(marker, i));
	    }
  	}

  });