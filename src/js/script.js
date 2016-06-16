/*===Model for all locations===*/
var myLocations = [{
        name: 'Prudential Center',
        lat: 42.34852,
        lng: -71.08230,
        address: '800 Boylston St, Boston, MA 02199',
        neighborhood: 'Boston, MA'
    }, {
        name: 'Central Library',
        lat: 42.34942,
        lng: -71.07883,
        address: '700 Boylston St, Boston, MA 02116',
        neighborhood: 'Boston, MA'
    }, {
        name: 'Boston Common',
        lat: 42.34813,
        lng: -71.06776,
        address: 'Tremont St, Boston, MA 02116',
        neighborhood: 'Boston, MA'
    }, {
        name: 'AMC Loews Boston',
        lat: 42.35313,
        lng: -71.06392,
        address: '175 Tremont St, Boston, MA 02111',
        neighborhood: 'Boston, MA'
    }, {
        name: 'Museum of Fine Arts',
        lat: 42.33946,
        lng: -71.09414,
        address: '465 Huntington Ave, Boston, MA 02115',
        neighborhood: 'Boston, MA'
    }, {
        name: 'Museum of Science',
        lat: 42.36773,
        lng: -71.07149,
        address: '1 1 Science Park, Boston, MA 02114',
        neighborhood: 'Boston, MA'
    }, {
        name: 'Franklin Park Zoo',
        lat: 42.30279,
        lng: -71.08681,
        address: '1 Franklin Park Rd, Boston, MA 02121',
        neighborhood: 'Boston, MA'
    }, {
        name: 'Zoo New England',
        lat: 42.30279,
        lng: -71.08681,
        address: '1 Franklin Park Rd, Dorchester, MA 02121',
        neighborhood: 'Boston, MA'
    },

];

// Initialize the map
var map;



// Set up the viewModel
var viewModel = function() {
    'use strict';
    // Use observables rather than forcing refreshes manually
    var self = this;
    self.bostonList = ko.observableArray([]);
    self.filterBostonList = ko.observableArray([]);

    // Create the list of boston locations from the model
    self.createBostonLocations = function() {
        myLocations.forEach(function(bostonItem) {
            // array bostonList
            self.bostonList.push(new Boston(bostonItem));
        });
    };

    // Set up an event listener for clicks for each boston
    self.setBostonClick = function() {
        self.bostonList().forEach(function(boston) {
            google.maps.event.addListener(boston.marker(), 'click', function() {
                self.bostonClick(boston);
            });
        });
    };

    // Initialize the default infoWindow
    var infoWindow = new google.maps.InfoWindow({
        // default content
        content: '<div><h4 id="boston-name"></h4><p id="boston-address"></p><p id="yelp"></p></div>'
    });

    self.bostonClick = function(boston) {
        // Set the content of the infoWindow
        var infoContent = '<div><h4 id="boston-name">' + boston.name() + '</h4>' +
            '<h5 id="boston-address">' + boston.address() + '</h5>' +
            '<h6 id="boston-neighborhood">' + boston.neighborhood() + '</h6>' +
            '<p id="text">Rating on <a id="yelp-url">yelp</a>: ' +
            '<img id="yelp"></p></div>';
        infoWindow.setContent(infoContent);
        self.getYelpData(boston);

        // Make the clicked on boston the center of the map
        map.panTo(new google.maps.LatLng(boston.lat(), boston.lng()));

        // Open the infoWindow at the marker location
        infoWindow.open(map, boston.marker());

        // Current boston marker bounces once when clicked
        self.setMarkerAnimation(boston);
    };

    // Sets the currenter marker to bounce once when clicked
    self.setMarkerAnimation = function(boston) {
        boston.marker().setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            boston.marker().setAnimation(null);
        }, 750);
    };

    // Function to handle filtering based on the search form
    self.filterBoston = function() {
        // Set the filtered boston list to an empty array
        self.filterBostonList([]);
        //self.bostonClick();

        // Get the search string and the length of the original boston list
        // Knockout observable for the query
        var searchString = ko.observable('').val().toLowerCase();
        var len = self.bostonList().length;

        // Loop through each boston in the boston list
        for (var i = 0; i < len; i++) {
            // Get the current boston name & neighborhood
            var bostonName = self.bostonList()[i].name().toLowerCase();
            var bostonNeighborhood = self.bostonList()[i].neighborhood().toLowerCase();

            // If the name or neighborhood match the search string,
            // add the boston to the filtered boston list
            if (bostonName.indexOf(searchString) > -1 ||
                bostonNeighborhood.indexOf(searchString) > -1) {
                self.filterBostonList.push(self.bostonList()[i]);
                // Set the map property of the marker to the map
                self.bostonList()[i].marker().setMap(map);
            } else {
                // Set the map property of the marker to null so it won't be visible
                self.bostonList()[i].marker().setMap(null);
            }
        }
    };

    self.getYelpData = function(boston) {
        // Uses the oauth-signature package https://github.com/bettiolo/oauth-signature-js

        // Use the GET method for the request
        var httpMethod = 'GET';

        // Yelp API request url
        var yelpURL = 'http://api.yelp.com/v2/search/';

        // nonce generator
        // function from: https://blog.nraboy.com/2015/03/create-a-random-nonce-string-using-javascript/
        var nonce = function(length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        // Set required parameters for authentication & search
        var parameters = {
            oauth_consumer_key: '5AeOFx9AMNxBJTgnyBRi-A',
            oauth_token: 'mwDAZhr4v2D1XIvr7279B-SfnVSjOZKp',
            oauth_nonce: nonce(20),
            oauth_timestamp: Math.floor(Date.now() / 1000),
            oauth_signature_method: 'HMAC-SHA1',
            oauth_version: '1.0',
            callback: 'cb',
            term: boston.name(),
            location: 'Boston, MA',
            limit: 1
        };

        // Set other API parameters
        var consumerSecret = 'XbxEEnJF34PvOrbQ_o3Pr4UBwjM';
        var tokenSecret = 'isx3A_VZDb35nX0UzSTDC2wowQU';

        var signature = oauthSignature.generate(httpMethod, yelpURL, parameters, consumerSecret, tokenSecret);

        // Add signature to list of parameters
        parameters.oauth_signature = signature;

        // Set up the ajax settings
        var ajaxSettings = {
            url: yelpURL,
            data: parameters,
            cache: true,
            dataType: 'jsonp',
            success: function(response) {
                // Update the infoWindow to display the yelp rating image
                $('#yelp').attr("src", response.businesses[0].rating_img_url);
                $('#yelp-url').attr("href", response.businesses[0].url);
            },
            // Data requests that fail are handled gracefully using common fallback techniques
            error: function() {
                $('#text').html('Unable to retrieve data from Yelp');
            }
        };

        // Send off the ajax request to Yelp
        $.ajax(ajaxSettings);
    };

    // Add the listener for loading the page
    google.maps.event.addDomListener(window, 'load', function() {
        self.createBostonLocations();
        self.setBostonClick();
        self.filterBostonList();
        self.bostonList();
    });

    // Boston constructor to create boston & marks from the model
    var Boston = function(data) {
        'use strict';

        // Set all the properties as knockout observables
        var marker;
        this.name = ko.observable(data.name);
        this.lat = ko.observable(data.lat);
        this.lng = ko.observable(data.lng);
        this.address = ko.observable(data.address);
        this.neighborhood = ko.observable(data.neighborhood);

        // Google Maps Marker for this location
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lat(), this.lng()),
            map: map,
            title: this.name()
        });

        // Set the marker as a knockout observable
        this.marker = ko.observable(marker);
    };
    // Search functionality on location names
    self.query = ko.observable(''); //Creates an observable for the search bar

    self.filterBostonList = ko.computed(function() {
        return ko.utils.arrayFilter(self.bostonList(), function(boston) {
            //Match search with items in observable array
            var listFilter = boston.name().toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
            if (listFilter) { //if user input matches any of the location names, show only the matches
                boston.marker().setVisible(true);
            } else {
                boston.marker().setVisible(false); //hide markers and list items that do not match results
            }

            return listFilter;

        });
    });
};

//function initializeMap()
function initializeMap() {
    //Map Data
    var mapCanvas = document.getElementById('map');
    var cenLatLng = new google.maps.LatLng(42.34852, -71.08230);
    var mapOptions = {
        center: cenLatLng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(mapCanvas, mapOptions);

    ko.applyBindings(new viewModel());
}

//Alerts user of an error with google map
function mapError() {
    alert("Unable to load Google Map API. Please try again later.");
    console.log('Google Map API is error');
}