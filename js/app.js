window.onload = function() {

    $('#bt-calcular').click(function(){
        var value = $('#enderDe').attr('value');
        $('#map_canvas').html("Carregando...");
        initialize(value);
    });
    
    var map, geocoder;
    var mapDisplay, directionsService;

    function initialize(value) {
        var myOptions = {zoom: 15,mapTypeId: google.maps.MapTypeId.ROADMAP};
        
        map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
        geocoder = new google.maps.Geocoder();

        if ( navigator.geolocation ){
             navigator.geolocation.getCurrentPosition( function( posicao ){

                var latitude  = posicao.coords.latitude;
                var longitude = posicao.coords.longitude;

                var enderDe = 'R. das Palmeiras, 710 - Santa Lúcia Vitória - ES, 29056-210';
                var enderAte = ( latitude + ' ' +  longitude );

                geocoder.geocode( { 'address': enderAte, 'region' : 'BR'},trataLocs);
                initializeDirections ();
                calcRota (enderDe, enderAte);
        
            });
        } else {
            var msg = document.getElementById('msg');
            msg.innerHTML = ' Fuck IE';
        }
    }

    function initializeDirections () {
        directionsService = new google.maps.DirectionsService();
        mapDisplay = new google.maps.DirectionsRenderer();
        mapDisplay.setMap(map);
        $('#panel').html('');
        mapDisplay.setPanel(document.getElementById("panel"));
    }

    function calcRota(endDe, endPara) {
        var request = {
            origin:endDe, 
            destination:endPara,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            mapDisplay.setDirections(response);
        }
        });
    }

    function trataLocs (results, status) {
        var elem = document.getElementById('msg');
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map, 
                position: results[0].geometry.location  
            });

            if (results.length > 1) {
                var i, txt = '<select style="font-family:Verdana;font-size:8pt;width=550px;" onchange="mostraEnd(this.options[this.selectedIndex].text);">';
                elem.innerHTML = 'O endereço exato não foi localizado - há ' +  results.length.toString() + ' resultados aproximados.<br />';
            
                for (i = 0; i < results.length; i++) {
                    txt = txt + '<option value="' + i.toString() + '"';
                    
                    if (i == 0)
                    txt = txt + ' selected="selected"'; 
                    txt = txt + '>' + results[i].formatted_address + '</option>';
                }
                
                txt = txt + '</select>'
                elem.innerHTML = elem.innerHTML + txt;
            }
        } else
            elem.innerHTML = 'Erro no tratamento do endereço :<br /><b>' + status + '</b>';
    }

}