'use strict';

app.directive('openLayersMap', [
    'CoordinateSystem', 'configValue',
    function (CoordinateSystem, configValue)
    {
        /**
         * @typedef {Object} MapArgs
         * @property {boolean} active
         * @property {LatLng} center
         */

        return {
            restrict: 'EA',
            scope: { map: '=openLayersMap' },
            link: function (scope, element)
            {
                var olMap;
                function initMap()
                {
                    olMap = new ol.Map(
                        {
                            controls: ol.control.defaults(
                                {
                                    attribution: false,
                                    rotate: false  // 회전을 막으므로 필요 없다.
                                }).extend(
                                [
                                    new ol.control.ScaleLine()
                                ]
                            ),
                            interactions: ol.interaction.defaults(
                                {
                                    altShiftDragRotate: false,
                                    pinchRotate: false
                                }),
                            target: element[0],
                            view: new ol.View(
                                {
                                    center: ol.proj.fromLonLat([
                                        configValue.MAP_INIT_LON,
                                        configValue.MAP_INIT_LAT
                                    ]),
                                    zoom: configValue.MAP_INIT_ZOOM
                                })
                        });

                    scope.$watch(function ()
                        {
                            return element[0].offsetWidth * 10000 + element[0].offsetHeight;
                        },
                        function (newValue, oldValue)
                        {
                            olMap.updateSize();
                        });

                    scope.map.olMap = olMap;
                    scope.map.initialized = true;
                }

                initMap();
            }
        };
    }]);
