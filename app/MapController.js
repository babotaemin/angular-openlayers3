app.controller('MapController', ['$scope', 'configValue', 'BaseLayer', 'PinPointLayer',
    function($scope, configValue, BaseLayer, PinPointLayer){
        $scope.model = {
            map : {
                mapInitArgs :{
                    center :{
                        latitude : configValue.MAP_INIT_LAT,
                        longitude : configValue.MAP_INIT_LON
                    },
                    zoom : configValue.MAP_INIT_ZOOM
                },
                initialized: false
            },
            currentPane : undefined,
            isAeroMap : false
        }

        function initMap()
        {
            var olMap;

            olMap = $scope.model.map.olMap;
            olMap.addLayer(BaseLayer.createMapLayer());
            olMap.addLayer(PinPointLayer.createLayer(olMap));
        }

        $scope.$watch('model.map.initialized', function (newVal, oldVal)
        {
            if (newVal) {
                initMap();
            }
        });
    }
]);
