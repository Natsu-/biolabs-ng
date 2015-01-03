'use strict';

angular.module('biolabsApp')
.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
])
.service('GeoJsonService', ['$q', '$http', '$resource', 'settings', function($q, $http, $resource, settings) {

    this.convertAPIDataToMarkers = function(data) {
        var markers = [];

        angular.forEach(data, function(lab) {
            markers.push({
                lat: parseFloat(lab.latitude),
                lng: parseFloat(lab.longitude),
                message: lab.name + '<br/>' + lab.description + '<br/>' + lab.adress
            })
        });

        return markers;
    };

    this.getData = function() {
        var LabsResource = $resource(settings.API_ENDPOINT),
            deferred = $q.defer(),
            _this = this;

        LabsResource.get(function(data) {
            var results = data.results;
            deferred.resolve(_this.convertAPIDataToMarkers(results));
        })

        return deferred.promise;
    };

  }]);