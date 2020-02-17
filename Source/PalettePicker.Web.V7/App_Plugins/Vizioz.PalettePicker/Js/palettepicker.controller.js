(function () {
    "use strict";

    function paletteController($scope, dialogService) {

        var vm = this;
        
        vm.remove = remove;
        vm.edit = edit;

        function remove () {
            $scope.model.value = null;
        }

        function setPaletteValue(item) {
            $scope.model.value = item;
        }

        function edit() {
            dialogService.open({
                template: "/App_Plugins/Vizioz.PalettePicker/Views/palettepicker.valuepicker.html",
                dialogData: {
                    title: "Select a color template",
                    value: $scope.model.value,
                    config: $scope.model.config
                },
                callback: function (model) {
                    setPaletteValue(model);
                }
            });
        }
    }

    angular.module("umbraco").controller("Vizioz.PalettePicker.Controller", paletteController);
})();