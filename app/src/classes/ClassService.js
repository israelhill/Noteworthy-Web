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
        var classes = [];
        var query = new Parse.Query("Course");
        console.log(query);

        query.each(function(item){
            classes.push(item);
        });

        // Promise-based API
        return {
            loadAllClasses : function() {
                // Simulate async nature of real remote calls
                return classes;
            }
        };
    }

})();