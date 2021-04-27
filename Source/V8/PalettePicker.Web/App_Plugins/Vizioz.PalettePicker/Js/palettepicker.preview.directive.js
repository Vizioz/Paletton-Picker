angular.module("umbraco.directives")
    .directive("palettePreview", function () {
        return {
            scope: {
                value: "=",
                hideLabels: "=",
                editable: "=",
                selectable: "<",
                selected: "<",
                onColorSelect: "&"
            },
            restrict: "E",
            replace: true,
            transclude: "true",
            templateUrl: "/App_Plugins/Vizioz.PalettePicker/Views/palettepicker.preview.html",
            link: function (scope) {
                var preview = function () {
                    scope.drawPalette();
                    
                    if (!scope.value || !scope.value.length) {
                        return;
                    } else {
                        scope.hasTooltip = scope.hideLabels === true;
                        scope.makePaletteEditable();
                    }

                    if (scope.selected) {
                        angular.forEach(scope.value,
                            function (colorset) {
                                angular.forEach(colorset.colors,
                                    function (c) {
                                        if (c.id === scope.selected) {
                                            c.selected = true;
                                        }
                                    });
                            });
                    }
                };

                scope.$watch("value",
                    function () {
                        preview();
                    }, true);
            },
            controller: function ($scope, $element, $timeout, angularHelper, assetsService) {

                $scope.tooltip = {
                    show: false,
                    event: null
                };

                function changeColor(color, rgb) {
                    angularHelper.safeApply($scope,
                        function() {
                            color.rgb = rgb;
                        });
                }

                function addSpectrum() {
                    angular.forEach($scope.value,
                        function(colorset) {
                            angular.forEach(colorset.colors,
                                function(color) {
                                    var elem = $element.find(".color-block[data-color-id='" +
                                        color.id +
                                        "'] input.spectrum-color-picker");
                                    elem.spectrum({
                                        color: color.rgb,
                                        showInitial: false,
                                        chooseText: "choose",
                                        cancelText: "cancel",
                                        preferredFormat: "hex",
                                        showInput: true,
                                        clickoutFiresChange: true,
                                        hide: function hide() {
                                            $element.find(".btn.add").show();
                                        },
                                        change: function change(c) {
                                            changeColor(color, c.toHexString());
                                        },
                                        show: function show() {
                                            $element.find(".btn.add").hide();
                                        }
                                    });
                                });
                        });
                }

                $scope.mouseOver = function ($event, color) {
                    if ($scope.hasTooltip) {
                        $scope.tooltip = { show: true, event: $event };
                        color.tooltip = { show: true };
                    }
                };

                $scope.mouseLeave = function (color) {
                    if ($scope.hasTooltip) {
                        $scope.tooltip = { show: false, event: null };
                        color.tooltip = { show: false };
                    }
                };

                $scope.onColorClick = function (color) {
                    if ($scope.selectable === true) {
                        angular.forEach($scope.value,
                            function(colorset) {
                                angular.forEach(colorset.colors,
                                    function(c) {
                                        if (c.id === color.id) {
                                            c.selected = !c.selected
                                        } else {
                                            c.selected = false;
                                        }
                                    });
                            });
                        if (typeof $scope.onColorSelect === "function") {
                            $scope.onColorSelect({ color: color });
                        }
                    }
                }

                $scope.drawPalette = function () {
                    angular.forEach($scope.value,
                        function (colorset) {
                            if (colorset && colorset.colors && colorset.colors.length) {
                                var width = 100 / (colorset.colors.length + 1);
                                var midPoint = Math.floor(colorset.colors.length / 2);
                                angular.forEach(colorset.colors,
                                    function (color, index) {
                                        color.width = index === 0 ? width * 2 : width;
                                        color.left = index === 0 ? midPoint * width : index > midPoint ? ((index + 1) * width) : ((index - 1) * width);
                                    });
                            }
                        });
                };

                $scope.makePaletteEditable = function () {
                    assetsService
                        .load([
                                "/App_Plugins/Vizioz.PalettePicker/vendor/spectrum/spectrum.js",
                                "/App_Plugins/Vizioz.PalettePicker/vendor/spectrum/spectrum.css"
                            ],
                            $scope).then(function () {
                                $timeout(function() {
                                    addSpectrum();
                                });

                        });
                };
                
                $scope.colorBlockStyles = function(color) {
                    return {
                        "left": color.left + "%",
                        "width": color.width + "%"
                    }
                };

                $scope.colorInnerStyles = function(color) {
                    return {
                        "background-color": color.rgb
                    }
                };
            }
        };
    });