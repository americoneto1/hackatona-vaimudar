'use strict';

angular.module('fullApp')
  .controller('MainCtrl', function ($scope, $http) {  
  	var URL = "http://www.google.com.br";  

    $scope.votar = function(id, bit) {
		var manif = getById(id);
		$http.get('/api/votacao/' + id + '/' + bit).then(function() {			
			$scope.load();			    
		});
		if (bit) {
			var msg = "Sou a favor da manifestação "+ manif.titulo +", vote tb!";
		} else {
			var msg = "Sou contra a manifestação "+ manif.titulo +", vote tb!";
		}	
		window.open('http://twitter.com/share?text='+ msg +'&url='+ URL, 'twitter-share', 'width=550,height=235');   
	}

	$scope.buscar = function() {
		$http.get('/api/manifestacoes/'+ $scope.estado +'/'+ $scope.cidade).then(function(res){
            $scope.manifestacoes = res.data;
        });
	}

	$scope.cadastrar = function() {
		var data = { 
			titulo: $scope.titulo,
			dataHora: $scope.dataHora,
			pontoEncontro: $scope.pontoEncontro,
			tags: getTags($scope.causas),
			cidade: $scope.cidade,
			latlng: $scope.latlng,
		}

		$http.post('/api/manifestacoes/', data).then(function() {
			$scope.load();
		});
	}

	$scope.load = function() {
		$http.get('/api/manifestacoes').success(function(manifestacoes) {
	      $scope.manifestacoes = manifestacoes;
	      for (var i = 0; i < $scope.manifestacoes.length; i++) {
	      	addMarker($scope.manifestacoes[i].latlng);
	      };
	    });
	}

	function getById(id) {
		for (var i = $scope.manifestacoes.length - 1; i >= 0; i--) {
			if($scope.manifestacoes[i]._id == id) {
				return $scope.manifestacoes[i]; 
			}
		};
	}

	$scope.load();

	function getTags(obj) {
		var result = "";
		for(var name in obj) {
			if(obj[name]) {
				result += "#" + name + " ";
			}
		}
		return result;
	}

    function showMap(lat, lng) {
		var latlng = new google.maps.LatLng(lat, lng);

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
    }

    function addMarker(latlng) {
    	if (typeof latlng != "undefined") {
    		return;
    	}
    	var pieces = latlng.split(',');   
    	var latlng = new google.maps.LatLng(pieces[0], pieces[1]);
    	var mapOptions = {
	      center: latlng,
	      scrollWheel: false,
	      zoom: 13
	    };	
    	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    	var marker = new google.maps.Marker({
	      position: latlng,
	      map: map,
	      animation: google.maps.Animation.DROP
	    });	    
    }

    showMap(-23.555644, -46.637871);

    var txtCidade = document.getElementById('cidade');
    var txtPontoEncontro = document.getElementById('pontoencontro');

    //autocomplete
    var pontoencontro = new google.maps.places.Autocomplete(txtPontoEncontro, {
        componentRestrictions: { 'country': 'br' }
    });

    google.maps.event.addListener(pontoencontro, 'place_changed', function() {
    	var place = pontoencontro.getPlace();
    	$scope.pontoEncontro = place.name;
    	$scope.latlng = place.geometry.location.lat() +", "+ place.geometry.location.lng();
    });

    var cidade = new google.maps.places.Autocomplete(txtCidade, {
        types: ['(cities)'],
        componentRestrictions: { 'country': 'br' }
    });

    google.maps.event.addListener(cidade, 'place_changed', function() {
    	$scope.cidade = cidade.getPlace().name;
    });

  });
