(function(){
    'use strict';

    angular.module('classes')
        .service('classService', ['$q', ClassService]);

    /**
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function ClassService($q){
        var classes = [
            {
                className: 'Math',
                professor: 'Chris Butler'
            },
            {
                className: 'Java',
                professor: 'Harold Smith'
            }
        ];

        // Promise-based API
        return {
            loadAllClasses : function() {
                // Simulate async nature of real remote calls
                return $q.when(classes);
            }
        };
    }

})();