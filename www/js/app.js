angular
  .module('starter', ['ionic'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .controller('weatherCtrl', function ($http) {
    var weather = this;

    var apikey = '2a09c4ac098a3bcd';
    var url = '/api/' + apikey + '/conditions/q/';

    $http.get(url + 'autoip.json').then(parseWUData);

    navigator.geolocation.getCurrentPosition(function (geopos) {
      var lat = geopos.coords.latitude;
      var long = geopos.coords.longitude;

      $http
        .get(url + lat + ', ' + long + '.json')
        .then(parseWUData);
    });

    weather.temp = '--';

    weather.search = function () {
      $http
        .get (url + weather.searchQuery + '.json')
        .then(parseWUData);
    }

    function parseWUData(res) {
      var data = res.data.current_observation;

      weather.location = data.display_location.full;
      weather.temp = parseInt(data.temp_f);
      weather.image = data.icon_url;
    }
  });

