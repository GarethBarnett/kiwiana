/**set map options*/
var myLatLng = { lat: -40.03, lng: 174.8 };
var mapOptions = {
    center: myLatLng,
    zoom: 7.6,
    disableDefaultUI: true,

    styles: [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#5b6571"
            },
            {
                "lightness": "35"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f3f4f4"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "weight": 0.9
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#83cead"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#fee379"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#1c1c1c"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#282828"
            },
            {
                "saturation": "21"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#7fc8ed"
            }
        ]
    }
]
                };







/**create map*/
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

/**create a DirectionsService*/
var directionsService = new google.maps.DirectionsService();

/**create a DirectionsRenderer - Display Route*/
var directionsDisplay = new google.maps.DirectionsRenderer();

/**bind the DirectionsRenderer to the map*/
directionsDisplay.setMap(map);


/**define calcRoute function*/
function calcRoute(fuelCost) {
    /**create request*/
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    };

    



    /**pass the request to the route method*/
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            /**Get distance*/
            var distanceKm = result.routes[0].legs[0].distance.text ;

            /**Remove Km from value*/
            var kmTravel = +distanceKm.replace(/[^0-9.]/g,"");

            /**Fuelcost by Kms traveled*/
            var outputCost = fuelCost * kmTravel;

            $('#outputfail').addClass('hide');
            $('#outputpass').html("<div class='alert-info'>" + outputCost.toFixed(0) +".00" + "</div>");
            $('#outputkm').html("<div class='alert-info'>" +distanceKm+"</div>");
            /**display route*/
            directionsDisplay.setDirections(result);
        } else {
            /**delete route from map*/
            directionsDisplay.setDirections({ routes: [] });
            /**center map*/
            map.setCenter(myLatLng);
            /**show error message*/
            $('#outputfail').removeClass('hide');
            $('#outputfail').html("<div class='alert-danger'>Could not retrieve driving distance.</div>");
            $('#outputpass').addClass('hide');
            $('#outputkm').addClass('hide');
        }
    });
 
}


var options = {
    types: ['(cities)'],
    componentRestrictions: {country: "nz"}
};


/**Get locations from input*/
var input1 = document.getElementById('from');
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById('to');
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

