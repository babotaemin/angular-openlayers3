'use strict';

app.factory('PinPointLayer', [
    'configValue',
    function (configValue)
    {
        const PINS = {
            YELLOW : 'ylw-pushpin.png',
            GREEN : 'grn-pushpin.png'
        };
        var pilotIconFeatures = [];
        var pilotIconLayer;

        function createLayer(olMap)
        {
            pilotIconLayer =  new ol.layer.Vector({
                source:  new ol.source.Vector({
                    features: pilotIconFeatures
                })
            });

            function onMapPointClick(e)
            {
                var coordinate = e.coordinate;
                var selectedPilotPins = [];

                var pixel = olMap.getPixelFromCoordinate(coordinate);
                olMap.forEachFeatureAtPixel(pixel, function(feature){
                    selectedPilotPins.push(feature);
                });

                if (selectedPilotPins.length > 0)
                {
                    console.log(selectedPilotPins[0]);
                }
                else
                {
                    addPilotPoint(coordinate);
                }
            }

            olMap.on('click', onMapPointClick);

            return pilotIconLayer;
        }

        function addPilotPoint(coordinate)
        {
            var pilotIconFeature = new ol.Feature({
                geometry: new ol.geom.Point(coordinate)
            });

            pilotIconFeature.setStyle(new ol.style.Style({
                image: new ol.style.Icon({
                    scale: 1,
                    src: configValue.IMG_URL + PINS.YELLOW
                })
            }));
            pilotIconFeatures.push(pilotIconFeature);

            var source = new ol.source.Vector({
                features: pilotIconFeatures
            });

            pilotIconLayer.setSource(source);
        }

        return {
            createLayer: createLayer,
            addPilotPoint : addPilotPoint
        };
    }]);