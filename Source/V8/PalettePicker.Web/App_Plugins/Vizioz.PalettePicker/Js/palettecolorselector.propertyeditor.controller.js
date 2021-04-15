(function () {
    "use strict";

    function colorSelectorPropertyEditorController($scope, $http, editorService, entityResource, iconHelper) {
        
        var vm = this;

        vm.openPalettePicker = openPalettePicker;
        vm.clear = clear;
        
        if (!$scope.model) {
            $scope.model = {};
        }

        if (!$scope.model.value) {
            $scope.model.value = {};
        }

        if ($scope.model.value.id) {
            entityResource.getById($scope.model.value.id, "Document").then(function (item) {
                populate(item);
            });
        }

        var dialogOptions = {
            title: "Select the node containing the palette",
            size: "small",
            multiPicker: false,
            submit: function (model) {
                var item = model.selection[0];
                populate(item);
                editorService.close();
            },
            close: function () {
                editorService.close();
            }
        };

        function clear() {
            $scope.model.value.id = null;
            $scope.node = null;
            $scope.model.value.query = null;
        }

        function populate(item) {
            clear();
            item.icon = iconHelper.convertFromLegacyIcon(item.icon);
            $scope.node = item;
            $scope.node.path = "";
            $scope.model.value.id = item.udi;
            entityResource.getUrl(item.id, "Document").then(function (data) {
                $scope.node.path = data;
            });

            $http.get(
                "/umbraco/backoffice/PalettePicker/PalettePicker/GetPalettePickerPropertiesInDocumentType?alias=" +
                $scope.node.metaData.ContentTypeAlias).then(function(response) {
                    $scope.propertyOptions = response.data;
            });

        }

        function openPalettePicker() {
            editorService.contentPicker(dialogOptions);
        }
    }

    angular.module("umbraco").controller("Vizioz.PaletteColorSelector.PropertyEditorController", colorSelectorPropertyEditorController);
})();