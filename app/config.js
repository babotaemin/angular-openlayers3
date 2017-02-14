'use strict';

angular.module('config', [])
    .constant('configValue', {
        IMG_URL : 'app/assets/imgs/',
        MAP_INIT_LAT : 36.32087,
        MAP_INIT_LON : 128.056,
        MAP_INIT_ZOOM : 8
    });
