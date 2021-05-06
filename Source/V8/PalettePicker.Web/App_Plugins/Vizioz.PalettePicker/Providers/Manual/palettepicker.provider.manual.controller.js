(function () {
    "use strict";

    function manualController($scope, $timeout, angularHelper, assetsService) {

        var vm = this;
        var colorIndex = 0;
        var assets = false;

        vm.addColor = addColor;
        vm.remove = remove;

        function init() {
            if (!$scope.model.content) {
                $scope.paletteContent = [];
            } else if (!$scope.model.palette || !$scope.model.palette.length) {
                $scope.paletteContent = JSON.parse($scope.model.content);
            } else {
                $scope.paletteContent = angular.copy($scope.model.palette[0].colors);
            }

            addSpectrum();

            $timeout(function () {
                update();
            });
        }

        function addSpectrum() {
            if (!assets) {
                assetsService
                    .load([
                            "/App_Plugins/Vizioz.PalettePicker/vendor/spectrum/spectrum.js",
                            "/App_Plugins/Vizioz.PalettePicker/vendor/spectrum/spectrum.css"
                        ],
                        $scope).then(function() {
                        $timeout(function() {
                            angular.forEach($scope.paletteContent,
                                function (c) {
                                    addSpectrumToColor(c);
                                });
                        });
                    });
            } else {
                angular.forEach($scope.paletteContent,
                    function (c) {
                        addSpectrumToColor(c);
                    });
            }
        }

        function addSpectrumToColor(color) {
            var picker = angular.element(".palette-manual .palette-manual-color[data-color-id='" + color.id + "'] .spectrum-color-picker");
            picker.spectrum({
                type: "component",
                color: color.rgb,
                chooseText: "choose",
                cancelText: "cancel",
                clearText: "clear",
                preferredFormat: "hex",
                showInput: true,
                showInitial: true,
                showAlpha: false,
                clickoutFiresChange: true,
                change: function change(c) {
                    var val = c ? c.toHexString() : "";
                    changeColor(color, val);
                }
            });
        }

        function changeColor(color, value) {
            color.rgb = value;
            update();
        }

        function addColor() {
            var c = { id: colorIndex, rgb: "#000000" };
            $scope.paletteContent.push(c);
            $timeout(function () {
                addSpectrumToColor(c);
                update();
            });
            
            colorIndex++;
        }

        function remove(index) {
            $scope.paletteContent.splice(index, 1);
            $timeout(function () {
                update();
            });
        }

        function update() {
            $scope.model.content = JSON.stringify($scope.paletteContent);
            var paletteColors = [];
            var i = 0;
            angular.forEach($scope.paletteContent,
                function (c) {
                    paletteColors.push({ id: "color-" + i, rgb: c.rgb });
                    i++;
                });

            if (paletteColors.length) {
                $scope.isValid = true;
                $scope.model.palette = [{ id: "palette", title: "Palette", colors: paletteColors }];
                angularHelper.safeApply($scope,
                    function () {
                        $scope.submit($scope.model);
                    });
                
            } else {
                $scope.isValid = false;
                $scope.model.palette = [];
            }
        }
        
        $scope.$on('paletteChange', function (event, model) {
            if (model.palette && model.palette.length) {
                angular.forEach(model.palette[0].colors,
                    function (c, index) {
                        if ($scope.paletteContent.length > index) {
                            $scope.paletteContent[index].rgb = c.rgb;
                        }
                    });
                $scope.model.content = JSON.stringify($scope.paletteContent);
                addSpectrum();
            }
        });

        init();
    }

    angular.module("umbraco").controller("Vizioz.PalettePicker.Provider.ManualController", manualController);

})();