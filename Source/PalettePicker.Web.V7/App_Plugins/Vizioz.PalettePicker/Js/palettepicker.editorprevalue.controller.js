(function () {
    "use strict";

    function paletteEditorPrevalueController($scope) {

        var vm = this;

        vm.submit = submit;
        vm.close = close;
        
        $scope.editModel = $scope.dialogData.value ? angular.copy($scope.dialogData.value) : { type: 1 };
        $scope.title = $scope.dialogData.title;
        
        function submit() {
            if ($scope.submit) {
                if ($scope.editModel.content && $scope.editModel.valid) {
                    $scope.submit($scope.editModel);
                } 
            }
        }

        function close() {
            if ($scope.close) {
                $scope.close();
            }
        }

    }

    angular.module("umbraco").controller("Vizioz.PalettePicker.EditorPrevalueController", paletteEditorPrevalueController);
})();