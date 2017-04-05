'use strict';

app.factory('RouteLayer', [
    'configValue',
    function (configValue)
    {
        var routeFeatures = [];
        var routeLayer;

        function createRouteLayer(olMap)
        {
            routeLayer =  new ol.layer.Vector({
                source:  new ol.source.Vector({
                    features: routeFeatures
                })
            });

            return routeLayer;
        }

        function drawRouteData(data)
        {
            routeFeatures = [];

            var circle = new ol.style.Circle({
                opacity : 0.8,
                scale : 1.0,
                radius : 5,
                fill : new ol.style.Fill({
                    color : 'rgba(255, 0, 0, 255)'
                }),
                stroke : new ol.style.Stroke({
                    color : 'rgba(255, 0, 0, 255)',
                    width : 1
                })
            });

            for (var i in data){
                var info = data[i];
                var coordinates = ol.proj.transform([info.lon, info.lat], 'EPSG:4326', 'EPSG:3857');
                var routeFeature = new ol.Feature({
                    geometry: new ol.geom.Point(coordinates)
                });

                routeFeature.setStyle(new ol.style.Style({
                    image : circle
                }));
                routeFeatures.push(routeFeature);
            }

            var source = new ol.source.Vector({
                features: routeFeatures
            });

            routeLayer.setSource(source);
        }

        return {
            createRouteLayer: createRouteLayer,
            drawRouteData : drawRouteData
        };
    }]);
