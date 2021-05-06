(function () {
    "use strict";

    function palettePickerResource($http, entityResource, iconHelper) {

        var path = "/umbraco/backoffice/PalettePicker/PalettePicker/";

        function getPaletteConfig(nodeId, propertyAlias) {
            return $http.get(path + "GetPaletteValue", { params: { id: nodeId, propertyAlias: propertyAlias } }).then(
                function (response) {
                    return response.data;
                });
        }

        function getPalettePropertiesInDocument(alias) {
            return $http.get(path + "GetPalettePickerPropertiesInDocumentType", { params: { alias: alias } }).then(function (response) {
                return response.data;
            });
        }

        function getProviderOptions() {
            return $http.get(path + "GetProviderOptions").then(function (response) {
                return response.data;
            });
        }

        return {
            getPaletteConfig: getPaletteConfig,
            getPalettePropertiesInDocument: getPalettePropertiesInDocument,
            getProviderOptions: getProviderOptions
        }
    }

    angular.module("umbraco").factory("palettePickerResource", palettePickerResource);
})();