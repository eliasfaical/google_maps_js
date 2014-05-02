/**
 * Referências: 
 * http://blog.thulioph.com/post/72436969224/api-google-maps-v3
 * https://developers.google.com/maps/documentation/javascript/tutorial?hl=pt-br
 **/

function initialize() {

	// Exibir mapa;
	var myLatlng   = new google.maps.LatLng(-8.0631495, -34.87131120000004);
	var mapOptions = {
		zoom: 17,
		center: myLatlng,
		panControl: true, 							// false  (controle panorâmico);
		zoomControl: true, 							// false  (controle de zoom);
		mapTypeControl: true, 						// false  (controle do tipo de mapa);
		scaleControl: true, 						// false  (controle de escala);
		streetViewControl: true, 					// false  (controle do street view);
		overviewMapControl: true, 					// false  (controle de visão geral do mapa);
		disableDefaultUI: false, 					// true   (desabilita os controles)
		mapTypeId: google.maps.MapTypeId.ROADMAP 	// opções (SATELLITE - HYBRID - TERRAIN)
	}

	// Parâmetros do texto que será exibido no clique;
  	var contentString = '<h2>Balaio Design</h2>' + '<a href="#">Mais informações</a>';
  	var infowindow = new google.maps.InfoWindow({
      	content: contentString,
      	maxWidth: 700
  	});

	// Exibir o mapa na div #mapa;
	var map = new google.maps.Map(document.getElementById("mapa"), mapOptions);

	// Marcador personalizado;
	var image = 'https://cdn1.iconfinder.com/data/icons/gpsmapicons/blue/gpsmapicons01.png';
	var marcadorPersonalizado = new google.maps.Marker({
		position: myLatlng,
		map: map,
		icon: image,
		title: 'Marco Zero - Recife/PE',
		animation: google.maps.Animation.DROP // BOUNCE 
	});

	// Exibir texto ao clicar no pin;
	google.maps.event.addListener(marcadorPersonalizado, 'click', function() {
  		infowindow.open(map,marcadorPersonalizado);
	});

	// Estilizando o mapa;
	// Criando um array com os estilos
	// var styles = [
	// 	{
	// 		stylers: [
	// 			{ hue: "#41a7d5" },
	// 			{ saturation: 0 },
	// 			{ lightness: 0 },
	// 			{ gamma: 0 }
	// 		]
	// 	},
	// 	{
	// 		featureType: "road",
	// 		elementType: "geometry", // opções: geometry.fill(seleciona apenas o preenchimento da geometria) geometry.stroke(seleciona apenas a textura da geometria), labels(seleciona apenas rótulos textuais), labels.icon(seleciona apenas o ícone do rótulo), labels.text(seleciona apenas o texto do rótulo), labels.text.fill(seleciona apenas o preenchimento do rótulo), labels.text.stroke(seleciona apenas a textura do texto);
	// 		stylers: [
	// 			{ lightness: 100 },
	// 			{ visibility: "simplified" }
	// 		]
	// 	},
	// 	{
	// 		featureType: "road",
	// 		elementType: "labels"
	// 	}
	// ];

	// crio um objeto passando o array de estilos (styles) e definindo um nome para ele;
	// var styledMap = new google.maps.StyledMapType(styles, {
	// 	name: "Mapa Style"
	// });

	// Aplicando as configurações do mapa
	// map.mapTypes.set('map_style', styledMap);
	// map.setMapTypeId('map_style');

}

// Função para carregamento assíncrono
function loadScript() {
	var script  = document.createElement("script");
	script.type = "text/javascript";
	script.src  = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBx0rAX8w87Ii7hBMItVnyXmcVP23w5dQw&sensor=true&callback=initialize";

	document.body.appendChild(script);
}

window.onload = loadScript;