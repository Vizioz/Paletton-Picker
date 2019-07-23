(function () {
    "use strict";

    function palettonController($scope, editorService) {

        var vm = this;
        
        vm.remove = remove;
        vm.edit = edit;

        function remove () {
            $scope.model.value = null;
        }

        function setPatternValue(item) {
            $scope.model.value = item;
        }

        function edit() {
            var dialogOptions = {
                title: "Select a color pattern",
                view: "/App_Plugins/Vizioz.Paletton/Views/paletton.valuepicker.html",
                size: "small",
                value: $scope.model.value,
                config: $scope.model.config,
                submit: function (model) {
                    setPatternValue(model);
                    editorService.close();
                },
                close: function () {
                    editorService.close();
                }
            };

            editorService.open(dialogOptions);
        }
    }

    angular.module("umbraco").controller("Vizioz.Paletton.Controller", palettonController);
})();