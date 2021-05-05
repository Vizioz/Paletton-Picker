(function () {
    "use strict";

    function paletteEditorPrevalueController($scope, assetsService, palettePickerResource) {

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
                $scope.editModel = { type: "Paletton" }
            }
        }

        function selectProvider(provider) {
            vm.selectedProvider = provider;
            $scope.template = vm.selectedProvider.path + "/" + vm.selectedProvider.view;
            if ($scope.model && $scope.model.value && $scope.model.value.type === provider.name) {
                $scope.editModel = angular.copy($scope.model.value);
            } else {
                $scope.editModel = {
                    content: "",
                    palette: [],
                    type: provider.name
                };
            }
            $scope.editModel.type = provider.name;
            loadProviderStyles();
        }

        function loadProviderStyles() {
            if (vm.selectedProvider.styleSheets && vm.selectedProvider.styleSheets.length) {
                var styles = [];
                for (var i = 0; i < vm.selectedProvider.styleSheets.length; i++) {
                    styles.push(vm.selectedProvider.path + "/" + vm.selectedProvider.styleSheets[i]);
                }
                assetsService.load(styles);
            }
        }

        function onChange(model) {
            $scope.editModel = model;
        }
        
        function submit() {
            $scope.error = null;
            if ($scope.model.submit) {
                if ($scope.editModel.palette && $scope.editModel.palette.length) {
                    $scope.model.submit($scope.editModel);
                } else {
                    $scope.error = "The palette value is mandatory";
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