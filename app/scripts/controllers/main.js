'use strict';

angular.module('fullApp')
  .controller('MainCtrl', function ($scope, $http, MapsService) {  
  	var URL = window.location.href;
  	var mapControl = document.getElementById('map-canvas');

    $scope.vote = function(item, bit) {
		$http.get('/api/votacao/'+ item._id +'/'+ bit).then(function() {
			$scope.load();
		});
		if (bit) {
			var msg = "Sou a favor da manifestação '"+ item.titulo +"', vote tb!";
		} else {
			var msg = "Sou contra a manifestação '"+ item.titulo +"', vote tb!";
		}	
		window.open('http://twitter.com/share?text='+ msg +'&url='+ URL, 'twitter-share', 'width=550,height=235');   
	}

	$scope.map = function(item) {
		var pieces = item.latlng.split(',');
		MapsService.setPosition(pieces[0], pieces[1]);
	}

	$scope.search = function() {
		$http.get('/api/manifestacoes/?cidade='+ $scope.cidade).then(function(res){
            $scope.manifestacoes = res.data;
        });
	}

	$scope.register = function() {
		var data = { 
			titulo: $scope.titulo,
			dataHora: $scope.dataHora,
			pontoEncontro: $scope.pontoEncontro,
			tags: getTags($scope.causas),
			cidade: $scope.cidade,
			latlng: $scope.latlng,
		}

		if (data.tags == "") {
			alert("Escolha pelo menos uma causa");
			return;
		}

		$http.post('/api/manifestacoes/', data).then(function() {
			$scope.load();
		});

		clearForm();
	}

	$scope.load = function() {
		MapsService.setPosition(-23.555644, -46.637871); //São Paulo
		$http.get('/api/manifestacoes').success(function(manifestacoes) {
	      $scope.manifestacoes = manifestacoes;
	      MapsService.addMarkers($scope.manifestacoes);
	    });
	}

	function clearForm() {
		$scope.titulo = "";
		$scope.dataHora = "";
		$scope.pontoEncontro = "";
		$scope.descricao = "";
		$scope.causas = "";
		$scope.cidade = "";
		$scope.latlng = "";
	}	

	function getTags(obj) {
		var result = "";
		for(var name in obj) {
			if(obj[name]) {
				result += "#" + name + " ";
			}
		}
		return result;
	}

	function config() {
		var txtCidade = document.getElementById('cidade');
	    var txtPontoEncontro = document.getElementById('pontoencontro');

	    var pontoencontro = new google.maps.places.Autocomplete(txtPontoEncontro, {
	        componentRestrictions: { 'country': 'br' }
	    });

	    google.maps.event.addListener(pontoencontro, 'place_changed', function() {
	    	var place = pontoencontro.getPlace();
	    	$scope.pontoEncontro = place.formatted_address;
	    	$scope.latlng = place.geometry.location.lat() +", "+ place.geometry.location.lng();
	    });

	    var cidade = new google.maps.places.Autocomplete(txtCidade, {
	        types: ['(cities)'],
	        componentRestrictions: { 'country': 'br' }
	    });

	    google.maps.event.addListener(cidade, 'place_changed', function() {
	    	var place = cidade.getPlace();
	    	$scope.cidade = place.formatted_address;
	    	MapsService.setPosition(place.geometry.location.lat(), place.geometry.location.lng());
	    });		
	}


	//init
	MapsService.setCurrentPosition(mapControl);	
	$scope.load();
	config();

  });
