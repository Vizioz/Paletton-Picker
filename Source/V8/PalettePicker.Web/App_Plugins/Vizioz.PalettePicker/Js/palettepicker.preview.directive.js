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
                    var ret = scope.getPalette();

                    if (!ret.valid) {
                        scope.value.valid = false;
                        return;
                    } else {
                        scope.value.valid = true;
                        scope.hasTooltip = scope.hideLabels === true;
                        scope.palette = ret.palette;
                    }

                    if (scope.editable === true) {
                        scope.makePaletteEditable();
                    }

                    if (scope.selected) {
                        angular.forEach(scope.palette,
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
            controller: function ($scope, $element, $timeout, angularHelper, assetsService, palettePickerXmlHelper) {

                function changeColor(color, rgb) {
                    var newPalette = palettePickerXmlHelper.changePaletteColor($scope.value.content, color, rgb);
                    angularHelper.safeApply($scope,
                        function() {
                            $scope.value.content = newPalette;
                        });
                }

                function addSpectrum() {
                    angular.forEach($scope.palette,
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
                        color.tooltip = { show: true, event: $event };
                    }
                };

                $scope.mouseLeave = function (color) {
                    if ($scope.hasTooltip) {
                        color.tooltip = { show: false, event: null };
                    }
                };

                $scope.onColorClick = function (color) {
                    console.log($scope.selectable === true);
                    if ($scope.selectable === true) {
                        angular.forEach($scope.palette,
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

                $scope.getPalette = function() {
                    return palettePickerXmlHelper.parsePaletteContent($scope.value.content);
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