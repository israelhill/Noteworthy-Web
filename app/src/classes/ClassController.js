(function () {

    angular
        .module('classes')
        .controller('ClassController', [
            '$mdSidenav', 'classService', '$q',
            ClassController
        ]);

    function ClassController($mdSidenav, classService, $q) {
        var self = this;

        self.selected = null;
        self.classes = [ ];
        self.toggleList = toggleClassesList;
        self.selectClass = selectClass;


        classService.loadAllClasses()
            .then(function(classes) {
                self.classes = [].concat(classes);
                self.selected = classes[0];
            })
    }

    function selectClass(course) {
        self.selected = angular.isNumber(course) ? $q.classes[course] : course;
        self.toggleList();
    }

    function toggleClassesList() {
        var pending = $q.when(true);

        pending.then(function(){
            $mdSidenav('left').toggle();
        });
    }


})();