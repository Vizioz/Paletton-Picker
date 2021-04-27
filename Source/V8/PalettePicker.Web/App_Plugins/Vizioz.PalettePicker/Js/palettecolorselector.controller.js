(function () {
    "use strict";

    function colorSelectorController($scope, $routeParams, entityResource, palettePickerResource) {

        var vm = this;

        vm.colorSelect = colorSelect;

        function init() {
            if ($scope.model.config.palette.query) {
                 entityResource.getByQuery($scope.model.config.palette.query, $routeParams.id, "Document").then(
                    function (response) {
                        $scope.model.value = {
                            nodeId: response.udi,
                            propertyAlias: $scope.model.config.palette.propertyAlias,
                            colorId: $scope.model.value.colorId
                        };
                        getPaletteConfig();
                    });
            } else {
                $scope.model.value = {
                    nodeId: $scope.model.config.palette.id,
                    propertyAlias: $scope.model.config.palette.propertyAlias,
                    colorId: $scope.model.value.colorId
                };
                getPaletteConfig();
            }
        }

        function getPaletteConfig() {
            palettePickerResource.getPaletteConfig($scope.model.value.nodeId, $scope.model.value.propertyAlias)
                .then(function (response) {
                    $scope.palette = response;
                });
        }

        function colorSelect(color) {
            $scope.model.value.colorId = color.id;
        }

        init();
    }

    angular.module("umbraco").controller("Vizioz.PaletteColorSelector.Controller", colorSelectorController);
})();