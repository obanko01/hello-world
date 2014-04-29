var geocoder;
var directionsDisplay;
var directionsService 
var map; var start, end;     


function initialize() {
    // showLocation();
    directionsDisplay = new google.maps.DirectionsRenderer();
    geocoder = new google.maps.Geocoder();
    directionsService = new google.maps.DirectionsService();
    var mapOptions = {
        zoom: 7
    }
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    directionsDisplay.setMap(map)
}

function showLocation() {
    // ur1 = document.forms[0].address1.value;
    // ur2 = document.forms[0].address2.value;
    ur1 = 'Tufts University';
    ur2 = 'Davis Square';
    geocoder.geocode({'address': ur1}, function (response, status) {
        if (status == google.maps.GeocoderStatus.OK)
        {
            // var Lat = response[0].geometry.location.A;
            // var Lng = response[0]["geometry"].location.k;
            map.setCenter(response[0].geometry.location)
            start = response[0].geometry.location;
            geocoder.geocode({'address': ur2}, function (res, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    // var Lat1 = res["results"][0]["geometry"].location.lat;
                    // var Lng1 = res["results"][0]["geometry"].location.lng;
                    // console.log(Lat1); console.log(Lat)
                    end = res[0].geometry.location;
                    //transitRoute(start, end);
                }
                else{
                    alert("Sorry, we were unable to geocode the second address")
                }
            });  
        }       
        else{
            alert("Sorry, we were unable to geocode the first address");
        }
     });
}


//this to show the route depending on what mode is selected or calculate the shortest mode
function transitRoute(start, end) {
  var request = {
      origin: start,
      destination: end,
      // Note that Javascript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode['transit']
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function showMap() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom: 14,
    center: start
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
  transitRoute();
}
