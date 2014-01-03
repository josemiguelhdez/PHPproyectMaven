//Variables Globales
var tsp;
var map;
var dirRenderer;
var mode;
var pointsGroup = [];
//Contador de puntos que se le asignan a la ruta
var countPoints=0;
//Numero maximo de puntos que se pueden añadir
var maxPointsAdd=11;
var markersArray = [];
var Transporte = 0;//Caminando = 0, Conduciendo = 1;
var SinAutopista = false;

var TAventura = [];
var TSolPlaya = [];
var TMontaña = [];
var TCiudad = [];
var TOcio = [];


var CentrosDeBuceo = false;
var PuertoDeportivos = false;
var PiscinasNAturales = false;
var Playas = false;
var EspaciosNaturales = false;
var CentrosHistoricos = false;
var Spa = false;
var CamposDeGolf = false;
var ParquesDeOcio = false;

/**
 * @brief Ajax
 * @note Petición de Ajax
 */
//Petición AJAX
function createXmlHttpRequest() {
 try {
   if (typeof ActiveXObject != 'undefined') {
     return new ActiveXObject('Microsoft.XMLHTTP');
   } else if (window["XMLHttpRequest"]) {
     return new XMLHttpRequest();
   }
 } catch (e) {
   changeStatus(e);
 }
 return null;
};

/**
 * @brief LOAD xml o URL
 * @param URL url a usar
 * @param callback llamada devuelta de la función
 * @note Cargar Datos de archivo XML o una URL
 */
//Cargar Datos de archivo XML o una URL
function downloadUrl(url, callback) {
  var status = -1;
  var request = createXmlHttpRequest();
  if (!request) {
     return false;
  }

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      try {
        status = request.status;
      } catch (e) {
        // Usually indicates request timed out in FF.
      }
      if ((status == 200) || (status == 0)) {
        callback(request.responseText, request.status);
        request.onreadystatechange = function() {};
      }
    }
  }
  request.open('GET', url, true);
  try {
    request.send(null);
  } catch (e) {
    changeStatus(e);
  }
};

//Crear HTML para acceder a el mediante el objeto DOM
function xmlParse(str) {
  if (typeof ActiveXObject != 'undefined' && typeof GetObject != 'undefined') {
    var doc = new ActiveXObject('Microsoft.XMLDOM');
    doc.loadXML(str);
    return doc;
  }

  if (typeof DOMParser != 'undefined') {
    return (new DOMParser()).parseFromString(str, 'text/xml');
  }

  return createElement('div', null);
}



//Creamos el objeto BptspSolver
function loadAtStart() {
    directionsPanel = document.getElementById("Puntos");
    
    tsp = new BpTspSolver(map, directionsPanel);
    google.maps.event.addListener(tsp.getGDirectionsService(), "error", function() {
    alert("Request failed: " + reasons[tsp.getGDirectionsService().getStatus().code]);
    });
}

//Añadir punto al BtpspSolver
function addWaypointWithLabel(latLng, label) {
    tsp.addWaypointWithLabel(latLng, label, null);
}

//Configurar parametros de ruta(vehiculo,circuito o union de puntos) y cálculo de ruta mediante el TSP.solve y llamada
// a la función para dibujar la ruta mediante el callback
function directions(m) {
    mode = m;
    tsp.setAvoidHighways(SinAutopista);
    if (Transporte == 0){
        tsp.setTravelMode(google.maps.TravelMode.WALKING);
      }
    else if (Transporte == 1){
        tsp.setTravelMode(google.maps.TravelMode.DRIVING);
    }
    if (m == 0)
        tsp.solveRoundTrip(DibujarRuta);
    else
        tsp.solveAtoZ(DibujarRuta);
}

//Estructura,diseña y devuelve tabla de direcciones
function PanelRuta(directions){
  var addr = tsp.getAddresses();
  var labels = tsp.getLabels();
  var order = tsp.getOrder();

  //Limpiar cabecera de sitios
  $('#header_Puntos_Container').empty();
  //Cargar cabecera en la que estará el enlace para cargar los puntos de nuevo.
  $('#header_Puntos_Container').append("<ul id='Navbar'><li><a id='sitios' href='#'>Seleccionar más sitios</a></li></ul>");

  var HTMLStruct = $("<div id='accordion'></div>");
  for (var i = 0; i < directions.legs.length; ++i) {
    var route = directions.legs[i];
    HTMLStruct.append("<h4>"+ route.start_address +"</h4>");
	  container = $('<div></div>');
    for (var j = 0; j < route.steps.length; ++j) {
      container.append("<p class='Item'>"+j+"."+ route.steps[j].instructions.replace('div','br')+" <br/><span>"+ route.steps[j].distance.text +"</span></p>");
    }
	  HTMLStruct.append(container);
  }
  if (mode == 1){
    HTMLStruct.append("<h4>"+ directions.legs[directions.legs.length-1].end_address +"</h4>");
  }
  if (mode == 0){
    HTMLStruct.append("<h4>"+ directions.legs[0].start_address +"</h4>");
  }
  return HTMLStruct;
}

//Dibujar ruta en el mapa y llamada a la tabla de direcciones
function DibujarRuta(myTsp){
    var dirRes = tsp.getGDirections();
    if (Transporte == 0){
      dirRes.Mb = {travelMode: google.maps.TravelMode.WALKING};
    }else if (Transporte == 1){
      dirRes.Mb = {travelMode: google.maps.TravelMode.DRIVING};  
    }
    if (Transporte == 0){
      dirRes.Nb = {travelMode: google.maps.TravelMode.WALKING};
    }else if (Transporte == 1){
      dirRes.Nb = {travelMode: google.maps.TravelMode.DRIVING};  
    }
    var dir = dirRes.routes[0];

    //Dibujamos los marcadores
    borrarMarcadores();
    var point = dir.legs[0].start_location;
    var name = dir.legs[0].start_address; 
    var myicon = new google.maps.MarkerImage("/marker/?text=1&color=azul");
    var marker = new google.maps.Marker({
          position: point,
          map: map,
          icon: myicon,
          title: name
    });
    markersArray.push(marker);

    for (var i = 0; i < dir.legs.length; ++i) {
        var route = dir.legs[i];
        var point = route.end_location;
        var name = route.end_address;
        if (i != dir.legs.length - 1 || mode != 0) {
          var myicon1 = new google.maps.MarkerImage("/marker/?text="+(i+2)+"&color=azul");
          var marker = new google.maps.Marker({
            position: point,
            map: map,
            icon: myicon1,
            title: name
          });
          markersArray.push(marker);
        }
    }

    //Limpiar el mapa
    if (dirRenderer != null) {
      dirRenderer.setMap(null);
    }
    //Pintar camino
    
    dirRenderer = new google.maps.DirectionsRenderer({
      directions: dirRes,
      hideRouteList: true,
      map: map,
      panel: null,
      preserveViewport: false,
      suppressInfoWindows: false,
      suppressMarkers: true,
    });
    //Cargamos la tabla de direcciones en el contenedor en Ruta Manual llamando a la función panel ruta mediante el callback
    $("#Puntos").html(PanelRuta(dir));
    //Cargamos la tabla de direcciones en el contenedor en Ruta Guiada llamando a la función panel ruta mediante el callback
    $("#PanelRuta").html(PanelRuta(dir));

}

//Borrar marcadores del mapa
function borrarMarcadores() {
    for (var i = 0; i < markersArray.length; ++i) {
      markersArray[i].setMap(null);
    }
    markersArray = new Array();
}

//Función para crear los puntos en el mapa y añadirlos para el calculo de ruta.
function CrearPuntos(Points,count){
  // create the marker
  myicon = new google.maps.MarkerImage("/marker/?text="+count+"&color="+Points['icon']);
  var marker = new google.maps.Marker({
    position: Points['point'],
    map: map,
    title: Points['name'],
    icon: myicon
  });
  markersArray.push(marker);
  addWaypointWithLabel(Points['point'],Points['name']);
}

//Funcion inicializar mapa
function initialize() {
  //Crear mapa
//  var mapOptions = {
//    center: new google.maps.LatLng(28.274, -16.629),
//    zoom: 10,
//    mapTypeId: google.maps.MapTypeId.ROADMAP
//  };
  //map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
  map = IDECanarias_InicializarMapa("wms_OU,wms_CA,wms_MIX,wms_TOPO",28.274, -16.629,10);

  loadAtStart();
  //Cargar los puntos
  CargarPuntos(0);
  CargarPuntos(1);
  
  navigator.geolocation.getCurrentPosition(function(position){
    var PointLocal = {
      point: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      name: "Mi Localización",
      icon: "blanco"
    }
    countPoints++;
    CrearPuntos(PointLocal,countPoints);
  });


}

//Cargar puntos en la barra de puntos
function CargarPuntos(TipoLLamada){
  if (TipoLLamada == 0){
    //Limpiar el contenedor puntos
    $('#Puntos').empty();
    //Limpiar cabecera de sitios
    $('#header_Puntos_Container').empty();
    //Cargar la cabecera de Sitios
    $('#header_Puntos_Container').append('<div id="header_Puntos">Sitios</div>');
  }
  downloadUrl("/genxml.php", function(doc) {
    var xmlDoc = xmlParse(doc);
    var markers = xmlDoc.documentElement.getElementsByTagName("marker");
    for (var i = 0; i < markers.length; i++) {
      // obtain the attribues of each marker
      var lat = parseFloat(markers[i].getAttribute("lat"));
      var lng = parseFloat(markers[i].getAttribute("lng"));
      var point = new google.maps.LatLng(lat,lng);
      var label = markers[i].getAttribute("cat");
      var name = markers[i].getAttribute("name");
      var icon = markers[i].getAttribute("icon");

      var pointInfo = {
        name: name,
        point: point,
        label: label,
        icon: icon,
        lat: lat,
        lng:lng
      }

      pointsGroup.push(pointInfo);
      if (TipoLLamada == 0){
        $('#Puntos').append('<div class="Item_Punto"><img src="/marker/?text=&color='+icon+'" width="15px" height="20px"><a href="#" class="punto" data-id="'+(pointsGroup.length -1)+'">'+name+'</a></div>')
      }
      if (TipoLLamada == 1){
        $('#Puntos1').append('<div class="Item_Punto"><img src="/marker/?text=&color='+icon+'" width="15px" height="20px"><a href="#" class="punto" data-id="'+(pointsGroup.length -1)+'">'+name+'</a></div>')
      }      
    }
  });
}

//Cargar datos de geoname para puntos cercanos
function CargarPuntosCercanos(Points){
  borrarMarcadores();
  CrearPuntos(Points,1);
  map.setZoom(15);
  map.setCenter(new google.maps.LatLng(Points['lat'], Points['lng']));
  downloadUrl("http://api.geonames.org/findNearbyPOIsOSM?lat="+Points['lat']+"&lng="+Points['lng']+"&username=pedro3900@hotmail.com", function(doc) {
    var xmlDoc = xmlParse(doc);
    var markers = xmlDoc.documentElement.getElementsByTagName("poi");
    for (var i = 0; i < markers.length; i++) {
      // obtener atributos de cada marcador
      var lat = parseFloat(markers[i].childNodes[9].textContent);
      var lng = parseFloat(markers[i].childNodes[7].textContent);
      var point = new google.maps.LatLng(lat,lng);
      var label = markers[i].childNodes[3].textContent;
      var name = markers[i].childNodes[1].textContent;
      var pointInfo = {
        name: name,
        point: point,
        label: label,
        icon: "azul"
      }
      countPoints++;
      CrearPuntos(pointInfo,countPoints);
    }
  });

}


//Cargar datos de geoname para información de puntos
function CargarInfoPuntos(Points){
  borrarMarcadores();
  CrearPuntos(Points,1);
  map.setZoom(15);
  map.setCenter(new google.maps.LatLng(Points['lat'], Points['lng']));
  downloadUrl("http://api.geonames.org/findNearbyWikipedia?lat="+Points['lat']+"&lng="+Points['lng']+"&lang=es&username=pedro3900@hotmail.com", function(doc) {
    var xmlDoc = xmlParse(doc);
    var markers = xmlDoc.documentElement.getElementsByTagName("entry");
    for (var i = 0; i < markers.length; i++) {
      // obtener atributos de cada entrada
      var summary = markers[i].childNodes[5].textContent;
      var name = markers[i].childNodes[3].textContent;
      $('#info_Container').append('<h2>'+name+'</h1><p>'+summary+'</p>');
    }
  });

}


//función que realiza la ruta manual
function RutaPersonal(){
  var TipoTrayecto;
  var VTAventura;
  var VTSolPlaya;
  var VTMontaña;
  var VTCiudad;
  var VTOcio;
  var TipoTransporte;
//Cogemos los valores del formulario
  var elementos = document.getElementsByName("TAventura");
 
  for(var i=0; i<elementos.length; i++) {
    if (elementos[i].checked){
      VTAventura =  elementos[i].value;
    }
  }

  var elementos = document.getElementsByName("TSolPlaya");
 
  for(var i=0; i<elementos.length; i++) {
    if (elementos[i].checked){
      VTSolPlaya =  elementos[i].value;
    }
  }

  var elementos = document.getElementsByName("TMontaña");
 
  for(var i=0; i<elementos.length; i++) {
    if (elementos[i].checked){
      VTMontaña =  elementos[i].value;
    }
  }

  var elementos = document.getElementsByName("TCiudad");
 
  for(var i=0; i<elementos.length; i++) {
    if (elementos[i].checked){
      VTCiudad =  elementos[i].value;
    }
  }

  var elementos = document.getElementsByName("TOcio");
 
  for(var i=0; i<elementos.length; i++) {
    if (elementos[i].checked){
      VTOcio =  elementos[i].value;
    }
  }

  var elementos = document.getElementsByName("TipoTrayecto");
 
  for(var i=0; i<elementos.length; i++) {
    if (elementos[i].checked){
      TipoTrayecto =  elementos[i].value;
    }
  }  

  var elementos = document.getElementsByName("TipoTransporte");
 
  for(var i=0; i<elementos.length; i++) {
    if (elementos[i].checked){
      TipoTransporte =  elementos[i].value;
    }
  }  

//Clasificamos los puntos por categorias
  for (var i = 0; i < pointsGroup.length; i++) {
    if ((pointsGroup[i].label == "Centros de buceo") || (pointsGroup[i].label == "Puertos deportivos")){
      TAventura.push(pointsGroup[i]);
    };
    if ((pointsGroup[i].label == "Piscinas naturales") || (pointsGroup[i].label == "Playas")){
      TSolPlaya.push(pointsGroup[i]);
    };
    if ((pointsGroup[i].label == "Espacios naturales")){
      TMontaña.push(pointsGroup[i]);
    };
    if ((pointsGroup[i].label == "Centros históricos")){
      TCiudad.push(pointsGroup[i]);
    };
    if ((pointsGroup[i].label == "Spa") || (pointsGroup[i].label == "Campos de golf") || (pointsGroup[i].label == "Parques de ocio")){
      TOcio.push(pointsGroup[i]);
    };
  };
//Calculamos cuantos puntos le corresponden a cada categoría

//Suma de valores totales de las categorias
  var SumaVTotales = Number(VTAventura) + Number(VTSolPlaya) + Number(VTMontaña) + Number(VTCiudad) +Number(VTOcio);

//Número de puntos que se asiganaran por categoria
  var NumPuntosAventura;
    NumPuntosAventura = Math.floor((VTAventura * (maxPointsAdd-1))/ SumaVTotales);

  var NumPuntosSolPlaya;
    NumPuntosSolPlaya = Math.floor((VTSolPlaya * (maxPointsAdd-1))/ SumaVTotales);

  var NumPuntosMontaña;
    NumPuntosMontaña = Math.floor((VTMontaña * (maxPointsAdd-1))/ SumaVTotales);

  var NumPuntosCiudad;
    NumPuntosCiudad = Math.floor((VTCiudad * (maxPointsAdd-1))/ SumaVTotales);

  var NumPuntosOcio;
    NumPuntosOcio = Math.floor((VTOcio * (maxPointsAdd-1))/ SumaVTotales);

  //Añadimos el número de puntos de cada categoria que se ha elegido en el formulario
  addTAventura(NumPuntosAventura);
  addTSolPlaya(NumPuntosSolPlaya);
  addTMontaña(NumPuntosMontaña);
  addTCiudad(NumPuntosCiudad);
  addTOcio(NumPuntosOcio);
  //Rellenamos con puntos de la categoria más alta si no se ha llegado al número máximo de puntos posibles
  if (countPoints<maxPointsAdd){
    //número de puntos que faltan por añadir
    var NumPointsAdd=0;
    NumPointsAdd = maxPointsAdd - countPoints;
    //Lista de las variables del numero de puntos de cada categoria
    var NumPuntos = [{name:'NumPuntosAventura', valor : NumPuntosAventura},{name:'NumPuntosSolPlaya', valor :NumPuntosSolPlaya},{name:'NumPuntosMontaña', valor:NumPuntosMontaña},{name: 'NumPuntosCiudad', valor: NumPuntosCiudad},{name:"NumPuntosOcio", valor:NumPuntosOcio}]

    //Devuelve la categoria mas votada.
    var catAdd = _.max(NumPuntos,function(NumPuntos){ return NumPuntos.valor; });
    if (catAdd.name == 'NumPuntosAventura'){
      addTAventura(NumPointsAdd);
    }
    if (catAdd.name == 'NumPuntosSolPlaya'){
      addTSolPlaya(NumPointsAdd);
    }
    if (catAdd.name == 'NumPuntosMontaña'){
      addTMontaña(NumPointsAdd);
    }
    if (catAdd.name == 'NumPuntosCiudad'){
      addTCiudad(NumPointsAdd);
    }
    if (catAdd.name == 'NumPuntosOcio'){
      addTOcio(NumPointsAdd);
    }
  }

//Elegimos el tipo de transporte
  Transporte = TipoTransporte;
//Llamamos a la función que cálcula la ruta con los puntos añadidos anteriormente
  directions(TipoTrayecto);
}

function addTAventura(N){
  var j=0;
  var i=0;
  while ((j<N) && (i<TAventura.length) && (countPoints<maxPointsAdd)){ 
    if ((TAventura[i].label == "Centros de buceo") && (CentrosDeBuceo == false)){
      CentrosDeBuceo = true;
      j = j+1;
      countPoints++;
      CrearPuntos(TAventura[i],countPoints);
      TAventura[i].label = "0";
    };
    if (TAventura[i].label == "Puertos deportivos"){
      CentrosDeBuceo = false;
      j = j+1;
      countPoints++;
      CrearPuntos(TAventura[i],countPoints);
      TAventura[i].label = "0";
      i=0;
    };
    i++;
  };
}

function addTSolPlaya(N){
  var j=0;
  var i=0;
  while ((j<N) && (i<TSolPlaya.length) && (countPoints<maxPointsAdd)){ 
    if ((TSolPlaya[i].label == "Piscinas naturales") && (PiscinasNAturales == false)){
      PiscinasNAturales = true;
      j = j+1;
      countPoints++;
      CrearPuntos(TSolPlaya[i],countPoints);
      TSolPlaya[i].label = "0";
    };
    if (TSolPlaya[i].label == "Playas"){
      PiscinasNAturales = false;
      j = j+1;
      countPoints++;
      CrearPuntos(TSolPlaya[i],countPoints);
      TSolPlaya[i].label = "0";
      i=0;
    };
    i++;
  };
}

function addTMontaña(N){
  var j=0;
  var i=0;
  while ((j<N) && (i<TMontaña.length) && (countPoints<maxPointsAdd)){ 
    if ((TMontaña[i].label == "Espacios naturales")){
      j = j+1;
      countPoints++;
      CrearPuntos(TMontaña[i],countPoints);
      TMontaña[i].label = "0";
    };
    i++;
  };
}

function addTCiudad(N){
  var j=0;
  var i=0;
  while ((j<N) && (i<TCiudad.length) && (countPoints<maxPointsAdd)){ 
    if ((TCiudad[i].label == "Centros históricos")){
      j = j+1;
      countPoints++;
      CrearPuntos(TCiudad[i],countPoints);
      TCiudad[i].label = "0";
    };
    i++;
  };
}

function addTOcio(N){
  var j=0;
  var i=0;
  while ((j<N) && (i<TOcio.length) && (countPoints<maxPointsAdd)){ 
    if ((TOcio[i].label == "Parques de ocio") && (ParquesDeOcio == false)){
      ParquesDeOcio = true;
      j = j+1;
      countPoints++;
      CrearPuntos(TOcio[i],countPoints);
      TOcio[i].label = "0";
    };
    if ((TOcio[i].label == "Campos de golf") && (CamposDeGolf == false)){
      CamposDeGolf = true;
      j = j+1;
      countPoints++;
      CrearPuntos(TOcio[i],countPoints);
      TOcio[i].label = "0";
    };
    if (TOcio[i].label == "Spa"){
      CamposDeGolf = false;
      ParquesDeOcio = false;
      j = j+1;
      countPoints++;
      CrearPuntos(TOcio[i],countPoints);
      TOcio[i].label = "0";
      i=0;
    };
    i++;
  };
}

//Funcionalidad Muestra los puntos mas cercanos por categorias
function PointPorCat(catSelected, latitud, longitud){
  //Clasificamos los puntos por categorias
  for (var i = 0; i < pointsGroup.length; i++) {
    if ((pointsGroup[i].label == "Centros de buceo") || (pointsGroup[i].label == "Puertos deportivos")){
      TAventura.push(pointsGroup[i]);
    };
    if ((pointsGroup[i].label == "Piscinas naturales") || (pointsGroup[i].label == "Playas")){
      TSolPlaya.push(pointsGroup[i]);
    };
    if ((pointsGroup[i].label == "Espacios naturales")){
      TMontaña.push(pointsGroup[i]);
    };
    if ((pointsGroup[i].label == "Centros históricos")){
      TCiudad.push(pointsGroup[i]);
    };
    if ((pointsGroup[i].label == "Spa") || (pointsGroup[i].label == "Campos de golf") || (pointsGroup[i].label == "Parques de ocio")){
      TOcio.push(pointsGroup[i]);
    };
  };

  var PuntoA = new google.maps.LatLng(latitud, longitud);
  //Array de distancias desde localizacion a los diferentes puntos
  var ArrayDistancias = [];
  if (catSelected == 0){
    for (var i = 0; i < TAventura.length; i++) {
      //Hash intermedio para guardar clave valor en el array
      var distanciaX;
      var PuntoB = new google.maps.LatLng(TAventura[i].lat, TAventura[i].lng);
      var distancia = google.maps.geometry.spherical.computeDistanceBetween(PuntoA, PuntoB);
      distanciaX = {indice : i, distancia: distancia};
      ArrayDistancias.push(distanciaX);
    }
    var PointSelected =_.min(ArrayDistancias,function(ArrayDistancias){ return ArrayDistancias.distancia; });
    countPoints++;
    CrearPuntos(TAventura[PointSelected.indice],countPoints);
  }
  if (catSelected == 1){
    for (var i = 0; i < TSolPlaya.length; i++) {
      //Hash intermedio para guardar clave valor en el array
      var distanciaX;
      var PuntoB = new google.maps.LatLng(TSolPlaya[i].lat, TSolPlaya[i].lng);
      var distancia = google.maps.geometry.spherical.computeDistanceBetween(PuntoA, PuntoB);
      distanciaX = {indice : i, distancia: distancia};
      ArrayDistancias.push(distanciaX);
    }
    var PointSelected =_.min(ArrayDistancias,function(ArrayDistancias){ return ArrayDistancias.distancia; });
    countPoints++;
    CrearPuntos(TSolPlaya[PointSelected.indice],countPoints);

  }
  if (catSelected == 2){
    for (var i = 0; i < TMontaña.length; i++) {
      //Hash intermedio para guardar clave valor en el array
      var distanciaX;
      var PuntoB = new google.maps.LatLng(TMontaña[i].lat, TMontaña[i].lng);
      var distancia = google.maps.geometry.spherical.computeDistanceBetween(PuntoA, PuntoB);
      distanciaX = {indice : i, distancia: distancia};
      ArrayDistancias.push(distanciaX);
    }
    var PointSelected =_.min(ArrayDistancias,function(ArrayDistancias){ return ArrayDistancias.distancia; });
    countPoints++;
    CrearPuntos(TMontaña[PointSelected.indice],countPoints);

  }
  if (catSelected == 3){
    for (var i = 0; i < TCiudad.length; i++) {
      //Hash intermedio para guardar clave valor en el array
      var distanciaX;
      var PuntoB = new google.maps.LatLng(TCiudad[i].lat, TCiudad[i].lng);
      var distancia = google.maps.geometry.spherical.computeDistanceBetween(PuntoA, PuntoB);
      distanciaX = {indice : i, distancia: distancia};
      ArrayDistancias.push(distanciaX);
    }
    var PointSelected =_.min(ArrayDistancias,function(ArrayDistancias){ return ArrayDistancias.distancia; });
    countPoints++;
    CrearPuntos(TCiudad[PointSelected.indice],countPoints);
  }
  if (catSelected == 4){
    for (var i = 0; i < TOcio.length; i++) {
      //Hash intermedio para guardar clave valor en el array
      var distanciaX;
      var PuntoB = new google.maps.LatLng(TOcio[i].lat, TOcio[i].lng);
      var distancia = google.maps.geometry.spherical.computeDistanceBetween(PuntoA, PuntoB);
      distanciaX = {indice : i, distancia: distancia};
      ArrayDistancias.push(distanciaX);
    }
    var PointSelected =_.min(ArrayDistancias,function(ArrayDistancias){ return ArrayDistancias.distancia; });
    countPoints++;
    CrearPuntos(TOcio[PointSelected.indice],countPoints);
  }
  Transporte = 1;
//Llamamos a la función que cálcula la ruta con los puntos añadidos anteriormente
  directions(1);
/////////////////////////////////////////////////////////////////////////////////
}




$(document).ready(function(){

  initialize();
/////////////////////Funcionalidad para Ruta Guiada\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  //Mostrar el formulario
  $('#myModal').modal('show');

  //Cuando clickamos en Save Changes en el formulario cargamos la función RutaPersonal para crear la ruta.
  $('.modal-footer').on('click','.btn-primary',function(e) {
     RutaPersonal();
  });

//////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////Funcionalidad para Ruta Manual\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  //Cargamos los puntos en el mapa cuando los clickamos en la barra de puntos
  $('#Puntos').on('click','a.punto',function(e) {
    e.preventDefault(); //Evitar que haga la accion del enlace
    countPoints++;
    CrearPuntos(pointsGroup[$(this).data('id')],countPoints);
  });
  //Controlar los botones para realizar el calculo de la ruta, con los puntos ya añadidos, y del tipo que se desee(Rountrip ó A-Z).
  $('body').on('click','.btn',function(e) {
    if ($(this).attr('id') == 'Round'){
      directions(0);
    } else if ($(this).attr('id') == 'A-Z'){
      directions(1);
    }
  });
  //Setear las variables de transporte y autopistas
  $('input[name^="Transporte"]').change(function(e){
    Transporte = $(this).val();
    //Ocultamos o mostramos la opcion de autopistas dependiendo del transporte
    if (Transporte == 1){
      $('#SinAutopista').animate({opacity:1});
      $('#fondo1').animate({opacity:1});
    }else{
      $('#SinAutopista').animate({opacity:0});
      $('#fondo1').animate({opacity:0});
    }
  });

  $('input[name^="SinAutopista"]').change(function(e){
    SinAutopista = $(this).is(':checked');
  });
  //Ocultamos autopistas ya que en principio viene predeterminado Caminando
  $('#SinAutopista').animate({opacity:0});
  $('#fondo1').animate({opacity:0});

  //Cargar puntos al clickar en navbar Sitios
  $('body').on('click','#sitios',function(e) {
    CargarPuntos(0);
  });
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////// Funcionalidad Puntos Cercanos ////////////////////////////////////////
  //Cargar puntos cercanos al punto seleccionado en la funcionalidad Puntos cercanos
  $('#Puntos_Container1').on('click','a.punto',function(e) {
    countPoints = 1;
    e.preventDefault(); //Evitar que haga la accion del enlace
    CargarPuntosCercanos(pointsGroup[$(this).data('id')]);
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////Funcionalidad Puntos por Categorias///////////////////////////////////////////

  $('#fondo_categorias').on('click','input',function(e) {
    var catSelected;
    $('input[name^="Categoria"]').change(function(e){
      catSelected = $(this).val();
    });
    catSelected = this.value;
    navigator.geolocation.getCurrentPosition(function(position){
      latitud = position.coords.latitude;
      longitud = position.coords.longitude;

    PointPorCat(catSelected, latitud, longitud);
    });
  });
////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////// Funcionalidad Información puntos ////////////////////////////////////////
  $('#Puntos_Container_info').on('click','a.punto',function(e) {
    e.preventDefault(); //Evitar que haga la accion del enlace
    CargarInfoPuntos(pointsGroup[$(this).data('id')]);
  });
});