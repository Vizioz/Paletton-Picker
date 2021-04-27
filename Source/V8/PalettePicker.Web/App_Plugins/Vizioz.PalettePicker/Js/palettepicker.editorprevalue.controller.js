(function () {
    "use strict";

    function paletteEditorPrevalueController($scope, $timeout, palettePickerResource) {

        var vm = this;

        vm.submit = submit;
        vm.close = close;
        vm.onChange = onChange;
        vm.selectProvider = selectProvider;
        vm.selectedProvider = null;

        $scope.providers = [];

        function init() {
            setModel();
            getAvailableOptions();
            $scope.isEditable = true;
        }

        function getAvailableOptions() {
            palettePickerResource.getProviderOptions().then(function (response) {
                $scope.providers = response;
                var provider = $scope.providers.find(function (p) {
                    return p.name === $scope.editModel.type;
                });
                if (provider) {
                    selectProvider(provider);
                }
            });
        }

        function setModel() {
            if ($scope.model.value) {
                $scope.editModel = angular.copy($scope.model.value);
            } else {
                $scope.editModel = { type: "Json" }
            }
        }

        function selectProvider(provider) {
            vm.selectedProvider = provider;
            $scope.template = vm.selectedProvider.path + "/" + vm.selectedProvider.view;
            $scope.editModel.type = provider.name;
        }

        function onChange(model) {
            $scope.editModel = model;
        }
        
        function submit() {
            if ($scope.model.submit) {
                if ($scope.editModel.palette && $scope.editModel.valid) {
                    $scope.model.submit($scope.editModel);
                } 
            }
        }

        function close() {
            if ($scope.model.close) {
                $scope.model.close();
            }
        }

        init();
    }

    angular.module("umbraco").controller("Vizioz.PalettePicker.EditorPrevalueController", paletteEditorPrevalueController);
})();