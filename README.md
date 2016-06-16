# Boston-Map-API

I will develop a single-page application featuring a map of my favorite places I would like to visit. I will then add additional functionality to this application, including: map markers to identify popular locations or places I’d like to visit, a search function to easily discover these locations, and a listview to support simple browsing of all locations. I will then research and implement third-party APIs that provide additional information about each of these locations with Yelp reviews. This app is usable across modern desktop, tablet, and phone browsers.

* To visit the app online go to: [Boston-Map-API](http://bostonhuman.github.io/boston-map-api/).
* Or run the app locally without Google Maps API key:
  * In your terminal:
   ```
   git clone https://github.com/bostonhuman/boston-map-api
   ```
  * Open `index.html` to run the app.
  * API key is not require and the app should run without error.
* **Optional**:
  * You can run this app with your own API key if you like, example:
    
  ```
  <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initializeMap" onerror="mapError()" async defer></script>
  ```

## Components for making the app running 

List of all frameworks and libraries:
* Framework:
  * Bootstrap v3.3.5
* Libraries:
  * jQuery v2.2.4
  * Knockout JavaScript library v3.4.0
* Build tool:
  * Grunt
* API:
  * Google Maps APIs
  * Yelp API 2.0
  
## How to use Google-Map-API app

A text input field that filters the map markers and list items to locations matching the text input.
![text-input](https://cloud.githubusercontent.com/assets/18538482/16018113/f9156ebc-3170-11e6-992d-ad073156bf83.png)

A list-view of location names is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied.

![list-view](https://cloud.githubusercontent.com/assets/18538482/16018191/616dc7de-3171-11e6-90a5-68d5ca49769f.png)

Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied. Clicking a marker displays unique information about a location in an `infoWindow`. Markers should animate bouncing when clicked.

![infowindow](https://cloud.githubusercontent.com/assets/18538482/16018450/8059aa9a-3172-11e6-89ad-cf018f37ce69.png)

