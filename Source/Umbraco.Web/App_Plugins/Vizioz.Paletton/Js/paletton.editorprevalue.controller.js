(function () {
    "use strict";

    function palettonEditorPrevalueController($scope) {

        var vm = this;

        vm.submit = submit;
        vm.close = close;
        
        $scope.editModel = $scope.model.value ? angular.copy($scope.model.value) : { type: 1 };

        function submit() {
            if ($scope.model.submit) {
                $scope.model.submit($scope.editModel);
            }
        }

        function close() {
            if ($scope.model.close) {
                $scope.model.close();
            }
        }

    }

    angular.module("umbraco").controller("Vizioz.Paletton.EditorPrevalueController", palettonEditorPrevalueController);
})();