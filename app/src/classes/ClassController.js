(function () {

    angular
        .module('classes')
        .controller('ClassController', [
            '$mdSidenav', 'classService', '$q', '$scope', '$mdDialog',
            ClassController
        ])
        .directive('chooseFileButton', function() {
            return {
                restrict: 'E',
                link: function (scope, elem, attrs) {
                    var button = elem.find('button');
                    var input = elem.find('input');
                    input.css({ display:'none' });
                    button.bind('click', function() {
                        input[0].click();
                    });
                }
            };
        });


    function ClassController($mdSidenav, classService, $q, $scope, $mdDialog) {
        $scope.currentUser = Parse.User.current();

        $scope.signUp = function(form) {
            var user = new Parse.User();
            user.set("email", form.email);
            user.set("username", form.username);
            user.set("password", form.password);

            user.signUp(null, {
                success: function(user) {
                    $scope.currentUser = user;
                    $scope.$apply(); // Notify AngularJS to sync currentUser
                },
                error: function(user, error) {
                    alert("Unable to sign up:  " + error.code + " " + error.message);
                }
            });
        };

        $scope.login = function(form) {
            Parse.User.logIn(form.username, form.password, {
                success: function(user) {
                    console.log("SUCCESFUL LOGIN", form);
                    $scope.login = function(login) {
                        $mdDialog.hide(login);
                    };
                },
                error: function(user, error) {
                    // The login failed. Check error to see why.
                }
            });
        }

        $scope.logOut = function(form) {
            Parse.User.logOut();
            $scope.currentUser = null;
        };

        $scope.showLogin = function(ev) {
            $mdDialog.show({
                controller: ClassController,
                templateUrl: 'dialog1.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };

        $scope.showCreateAccount = function(ev) {
            $mdDialog.show({
                controller: ClassController,
                templateUrl: 'dialog2.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
        };

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

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.signUp = function(signUp) {
                $mdDialog.hide(signUp);
            };
        }

        $scope.alert = '';
        $scope.showAddNote = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                template: '<md-dialog aria-label="Form"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> </div>' +
                '<md-input-container flex> <label>Description</label> <input ng-model="user.description"> </md-input-container> ' +
                '<md-input-container flex> <label>Notes</label> <textarea ng-model="user.biography" columns="1" md-maxlength="300"></textarea> </md-input-container> </form> </md-content> ' +
                '<choose-file-button> <md-button aria-label="Upload a file" class="md-raised md-primary"> Upload a Photo </md-button> <input type="file"> </choose-file-button>' +
                '<div class="md-actions" layout="row"> <span flex></span> ' +
                '<md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
                targetEvent: ev,
            })
                .then(function(answer) {
                    $scope.alert = 'You said the information was "' + answer + '".';

                }, function() {
                    $scope.alert = 'You cancelled the dialog.';
                });
        }

        $scope.alert = '';
        $scope.showAddClass = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                template: '<md-dialog aria-label="Form"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> ' +
                '<md-input-container flex> <label>First Name</label> <input ng-model="user.firstName"> </md-input-container> ' +
                '<md-input-container flex> <label>Last Name</label> <input ng-model="user.lastName"> </md-input-container> </div> ' +
                '<md-input-container flex> <label>Notes</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> ' +
                '<div class="md-actions" layout="row"> <span flex></span> ' +
                '<md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
                targetEvent: ev,
            })
                .then(function(answer) {
                    $scope.alert = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.alert = 'You cancelled the dialog.';
                });
        }



    }

})();