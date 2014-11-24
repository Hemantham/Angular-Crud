app.controller("myCtrl", function($scope) {
    $scope.firstname = "John";
    $scope.lastname = "Doe";
});

app.controller("formController", function($scope) {
    $scope.master = { firstName: "John", lastName: "Doe" };
    $scope.reset = function () {
        $scope.user = angular.copy($scope.master);
    };
    $scope.reset();
});

app.controller("validateCtrl", function ($scope) {
    $scope.user = 'John Doe';
    $scope.email = 'john.doe@gmail.com';
});



app.controller("userController", function ($scope) {

    $scope.current = { id: 0, fName: '', lName: '' , passw1 : '' , passw2 : '' };
    
    $scope.users = [
    { id: 1, fName: 'Hege', lName: "Pege" },
    { id: 2, fName: 'Kim', lName: "Pim" },
    { id: 3, fName: 'Sal', lName: "Smith" },
    { id: 4, fName: 'Jack', lName: "Jones" },
    { id: 5, fName: 'John', lName: "Doe" },
    { id: 6, fName: 'Peter', lName: "Pan" }
    ];
    $scope.edit = false;
    $scope.error = false;
    $scope.incomplete = false;

    $scope.editUser = function (id) {

        $scope.edit = true;
        

        if (id == 'new') {
         
            $scope.current = { id: 0, fName: '', lName: '', passw1: '', passw2: '' };

        } else {
           
            $scope.current = $.grep($scope.users, function (v, i) {
                return (id == v.id);
            })[0];
        }
    };

    $scope.save = function() {

        if ($scope.current.id > 0) {
            $.each($scope.users, function(i, v) {
                if ($scope.current.id == v.id) {
                    v = $scope.current;
                    return false;
                }
            });
        } else {
            var ids = $.map($scope.users, function (v, i) {
                return  v.id;
            });
            $scope.current.id = Math.max.apply(Math, ids) + 1;
            $scope.users.push($scope.current);
        }
    };
    
    $scope.test = function () {

        if ($scope.passw1 !== $scope.passw2) {
            $scope.error = true;
        } else {
            $scope.error = false;
        }

        if ($scope.edit && (!$scope.fName.length || !$scope.lName.length || !$scope.passw1.length || !$scope.passw2.length)) {
            $scope.incomplete = true;
        } else {
            $scope.incomplete = false;
        }
    };

    $scope.$watch('passw1', $scope.test);
    $scope.$watch('passw2', $scope.test);
    $scope.$watch('fName', $scope.test);
    $scope.$watch('lName', $scope.test);

});


