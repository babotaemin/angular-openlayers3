'use strict';

app.factory('CoordinateSystem', [
    function ()
    {
        var Projection = 'EPSG:5179';
        var CSLngLat = 'EPSG:4326';

        /**
         * @typedef {Object} LatLng
         * @property {number} lat
         * @property {number} lng
         */
        /**
         * @typedef {ol.Coordinate} Coord4326 - EPSG:4326 coordinate. [ lng, lat ]
         */
        /**
         * @typedef {ol.Coordinate} Coord3093 - EPSG:3093 coordinate. [ x, y ]
         */
        /**
         * @typedef {ol.Coordinate} CoordView - view projected coordinate. [ x, y ]
         */


        /**
         * @param {Coord3093} coord
         * @returns {CoordView}
         */
        function fromEpsg3093(coord)
        {
            return ol.proj.transform(coord, 'EPSG:3093', Projection);
        }

        /**
         * @param {Coord4326} coord
         * @returns {CoordView}
         */
        function fromLngLat(coord)
        {
            return ol.proj.transform(coord, CSLngLat, Projection);
        }

        /**
         * @param {CoordView} coord
         * @returns {Coord4326}
         */
        function toLngLat(coord)
        {
            return ol.proj.transform(coord, Projection, CSLngLat);
        }

        return {
            Epsg3093: 'EPSG:3093',
            LngLat: CSLngLat,
            Projection: Projection,
            fromLngLat: fromLngLat,
            fromEpsg3093: fromEpsg3093,
            toLngLat: toLngLat
        };
    }]);
