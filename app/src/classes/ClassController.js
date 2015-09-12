(function () {

    angular
        .module('classes')
        .controller('ClassController', [
            '$mdSidenav', 'classService', '$q',
            ClassController
        ]);

    function ClassController($mdSidenav, classService, $q) {
        var self = this;

        self.notes = [];
        self.selected = null;
        self.classes = [];
        self.selectClass = selectClass;
        self.toggleList = toggleClassesList;


        self.isOpen = false;
        self.availableModes = ['md-fling', 'md-scale'];
        self.selectedMode = 'md-fling';
        self.availableDirections = ['up', 'down', 'left', 'right'];
        self.selectedDirection = 'down';

        classService
            .loadAllClasses()
            .then(function (classes) {
                self.classes = classes;
                self.selected = classes[0];
            });


        function selectClass(course) {
            self.selected = angular.isNumber(course) ? $scope.classes[course] : course;
            self.toggleList();
            var notes = [];
            var relation = self.selected.relation("notes_for_course");
            var query = relation.query();
            query.each(function (note) {
                console.log(note.get("title"))
                notes.push(note);
            });
            self.notes = notes;
        }

        function toggleClassesList() {
            var pending = $q.when(true);

            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }
    }

})();