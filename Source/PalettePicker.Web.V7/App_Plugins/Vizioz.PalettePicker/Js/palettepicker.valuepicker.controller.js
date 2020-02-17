(function () {
    "use strict";

    function paletteValuePickerController($scope) {

        var vm = this;

        vm.select = select;
        vm.close = close;
        vm.submit = submit;

        $scope.selectedIndex = null;
        $scope.model = {
            value: $scope.dialogData.value,
            config: $scope.dialogData.config
        };

        $scope.title = $scope.dialogData.title;
        console.log($scope.dialogData);
        function select($index) {
            $scope.selectedIndex = $index;
        }

        function close() {
            if ($scope.close) {
                $scope.close();
            }
        }

        function submit() {
            if ($scope.submit) {
                $scope.submit($scope.model.config.palettes[$scope.selectedIndex]);
            }
        }
    }

    angular.module("umbraco").controller("Vizioz.PalettePicker.ValuePickerController", paletteValuePickerController);
})();