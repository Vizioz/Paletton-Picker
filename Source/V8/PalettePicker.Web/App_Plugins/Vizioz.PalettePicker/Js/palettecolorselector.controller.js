(function () {
    "use strict";

    function colorSelectorController($scope, $http, $routeParams, entityResource) {

        var vm = this;

        vm.colorSelect = colorSelect;

        function init() {
            if ($scope.model.config.palette.query) {
                var rootId = $routeParams.id;
                entityResource.getByQuery($scope.model.config.palette.query, rootId, "Document").then(function (ent) {
                    $scope.model.value = {
                        nodeId: ent.udi,
                        propertyAlias: $scope.model.config.palette.propertyAlias,
                        colorId: $scope.model.value.colorId
                    };
                    getPalettConfig();
                });
            } else {
                $scope.model.value = {
                    nodeId: $scope.model.config.palette.id,
                    propertyAlias: $scope.model.config.palette.propertyAlias,
                    colorId: $scope.model.value.colorId
                };
                getPalettConfig();
            }
        }

        function getPalettConfig() {
            $http.get("/umbraco/backoffice/PalettePicker/PalettePicker/GetPaletteValue?id=" +
                $scope.model.value.nodeId +
                "&propertyAlias=" +
                $scope.model.value.propertyAlias).then(function(response) {
                    $scope.palette = JSON.parse(response.data);
            });
        }

        function colorSelect(color) {
            $scope.model.value.colorId = color.id;
        }

        init();
    }

    angular.module("umbraco").controller("Vizioz.PaletteColorSelector.Controller", colorSelectorController);
})();