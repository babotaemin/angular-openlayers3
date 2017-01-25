'use strict';

angular.module('config', [])
    .constant('configValue', {
        IMG_URL : 'app/img/',
        MAP_INIT_LON : 36.32087,
        MAP_INIT_LAT : 128.056,
        MAP_INIT_ZOOM : 8
    });