(function () {
    "use strict";

    function palettonValuePickerController($scope) {

        var vm = this;

        vm.select = select;
        vm.close = close;
        vm.submit = submit;

        $scope.selectedIndex = null;

        function select($index) {
            console.log($index);
            $scope.selectedIndex = $index;
        }

        function close() {
            if ($scope.model.close) {
                $scope.model.close();
            }
        }

        function submit() {
            if ($scope.model.submit) {
                $scope.model.submit($scope.model.config.patterns[$scope.selectedIndex]);
            }
        }

    }

    angular.module("umbraco").controller("Vizioz.Paletton.ValuePickerController", palettonValuePickerController);
})();