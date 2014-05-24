
function MainCtrl($scope, $http) {
	var URL = "http://www.google.com.br";

	$scope.load = function() {
		$http.get('/api/manifestacoes').then(function(res){
            $scope.manifestacoes = res.data;
        });
		$scope.manifestacoes = [
			{
				id: 1,
				titulo: "Movimento dos Sem Teto (MST)1",
				dataHora: "22/05 às 14h",
				pontoEncontro: "Av. Paulista (MASP)",
				afavor: 123,
				contra: 40,
				tags: '#moradia #copa'
			},
			{
				id: 2,
				titulo: "Movimento dos Sem Teto (MST)2",
				dataHora: "20/05 às 14h",
				pontoEncontro: "Av. Paulista (MASP)",
				afavor: 20,
				contra: 10,
				tags: '#educacao #transporte'
			},
			{
				id: 3,
				titulo: "Movimento dos Sem Teto (MST)3",
				dataHora: "22/05 às 14h",
				pontoEncontro: "Av. Paulista (MASP)",
				afavor: 123,
				contra: 90,
				tags: '#preconceito #transporte'
			},
			{
				id: 4,
				titulo: "Movimento dos Sem Teto (MST)4",
				dataHora: "22/05 às 14h",
				pontoEncontro: "Av. Paulista (MASP)",
				afavor: 123,
				contra: 90,
				tags: '#copa #pecs'
			}
		];
	}
	

	$scope.votar = function(id, bit) {
		var manif = getById(id);
		salvarVoto(id, bit);
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
		console.log('scope:', $scope.causas);
	}

	function salvarVoto(id, bit) {
		$http.get('/api/votar/' + id + '/' + bit).then(function() {
			$scope.load();
		});
	}

	function getById(id) {
		for (var i = $scope.manifestacoes.length - 1; i >= 0; i--) {
			if($scope.manifestacoes[i].id == id) {
				return $scope.manifestacoes[i]; 
			}
		};
	}

	$scope.load();
};


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

	  //autocomplete
	  var input = document.getElementById('pontoencontro');
	  var searchBox = new google.maps.places.Autocomplete(input);

	};
	/* end google maps -----------------------------------------------------*/	
        
});