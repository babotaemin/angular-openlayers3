'use strict';

app.factory('BaseLayer', [
    function ()
    {
        function createMapLayer()
        {
            var olSource;

            olSource = new ol.source.OSM();
            return new ol.layer.Tile({
                source: olSource
            });
        }

        return {
            createMapLayer: createMapLayer
        };
    }]);