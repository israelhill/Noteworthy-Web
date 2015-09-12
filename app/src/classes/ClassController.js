(function () {

    angular
        .module('classes')
        .controller('ClassController', [
            '$mdSidenav', 'classService', '$q', '$scope',
            ClassController
        ]);

    function ClassController($mdSidenav, classService, $q, $scope) {
        $scope.notes = [];
        $scope.selected = null;
        $scope.classes = [];

        $scope.isOpen = false;
        $scope.availableModes = ['md-fling', 'md-scale'];
        $scope.selectedMode = 'md-fling';
        $scope.availableDirections = ['up', 'down', 'left', 'right'];
        $scope.selectedDirection = 'down';

        $q.myDate = new Date();

        $scope.classes = classService.loadAllClasses();
        $scope.selected = $scope.classes[0];
        console.log("im here");


        $scope.selectClass = function(course) {
            $scope.selected = angular.isNumber(course) ? $scope.classes[course] : course;
            $scope.toggleClassesList();

            var relation = $scope.selected.relation("notes_for_course");
            var query = relation.query();

            $scope.notes = [];
            query.each(function(note) {
                $scope.notes.push(note);
            }).then(function() {
                $scope.$digest();
            });

        }

        $scope.toggleClassesList = function() {
            var pending = $q.when(true);

            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }
    }

})();