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
        self.classes = [];
        self.selectClass = selectClass;
        self.toggleList = toggleClassesList;

        classService
            .loadAllClasses()
            .then(function (classes) {
                var query = new Parse.Query("Course");
                var course = " ";

                query.find().then(function(results) {
                    classes = results;
                    course = classes[0];
                    console.log(course.get('Name'));
                    console.log(course.get('Professor'));
                });

                self.classes = [].concat(classes);
                self.selected = course;
            });


        function selectClass(course) {
            self.selected = angular.isNumber(course) ? $scope.classes[course] : course;
            self.toggleList();
        }

        function toggleClassesList() {
            var pending = $q.when(true);

            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }
    }

})();