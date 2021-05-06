(function () {
    "use strict";

    function palettonController($scope) {

        var vm = this;

        vm.update = update;

        function init() {
            if (!$scope.model.content) {
                $scope.model.content = "<!-- Palette Sample -->\n" +
                    "<palette>\n" +
                    "<url>http://paletton.com/#uid=1000u0kllllaFw0g0qFqFg0w0aF</url>\n" +
                    "<colorset id=\"primary\" title=\"Primary color\">\n" +
                    "<color id=\"primary-0\" nr=\"0\" rgb=\"AA3939\" r=\"170\" g=\"57\" b=\"57\" r0=\"0.667\" g0=\"0.224\" b0=\"0.224\"/>\n" +
                    "<color id=\"primary-1\" nr=\"1\" rgb=\"FFAAAA\" r=\"255\" g=\"170\" b=\"170\" r0=\"1\" g0=\"0.667\" b0=\"0.667\"/>\n" +
                    "<color id=\"primary-2\" nr=\"2\" rgb=\"D46A6A\" r=\"212\" g=\"106\" b=\"106\" r0=\"0.831\" g0=\"0.416\" b0=\"0.416\"/>\n" +
                    "<color id=\"primary-3\" nr=\"3\" rgb=\"801515\" r=\"128\" g=\"21\" b=\"21\" r0=\"0.502\" g0=\"0.082\" b0=\"0.082\"/>\n" +
                    "<color id=\"primary-4\" nr=\"4\" rgb=\"550000\" r=\"85\" g=\"0\" b=\"0\" r0=\"0.333\" g0=\"0\" b0=\"0\"/>\n</colorset>\n" +
                    "</palette>\n";
            }

            update();
        }

        function getXmlValue(value) {
            try {
                return $.parseXML(value);
            } catch (error) {
                return null;
            }
        }

        function parseContent() {
            var palette = [];
            var xml = getXmlValue($scope.model.content);

            if (xml) {
                
                var colorsets = $(xml).find("colorset");

                angular.forEach(colorsets,
                    function(colorset) {
                        var paletteColorset = {
                            id: $(colorset).attr("id"),
                            title: $(colorset).attr("title"),
                            colors: []
                        };

                        var colors = $(colorset).find("color");

                        angular.forEach(colors,
                            function (color) {
                                var id = $(color).attr("id");
                                var rgb = $(color).attr("rgb");
                                paletteColorset.colors.push({
                                    id: id,
                                    rgb: "#" + rgb
                                });
                            });

                        paletteColorset.colors.splice(2, 0, paletteColorset.colors.splice(0, 1)[0]);

                        palette.push(paletteColorset);
                    });
            }

            return palette;
        }

        function update() {
            $scope.model.palette = parseContent();

            if ($scope.model.palette.length) {
                $scope.isValid = true;
                $scope.submit($scope.model);
            } else {
                $scope.isValid = false;
            }
        }
        
        $scope.$on('paletteChange', function (event, model) {
            angular.forEach($scope.model.palette,
                function(colorset) {
                    angular.forEach(colorset.colors,
                        function (color) {
                            var pattern = "(<color\\sid\\=\"" + color.id + "\"[^>]*\\srgb=\")([\\dA-Z]{3,6})(\"[^>]*>)";
                            var re = new RegExp(pattern, "ig");
                            var rgb = color.rgb.substring(1);
                            $scope.model.content = $scope.model.content.replace(re, '$1' + rgb + '$3');
                        });
                });
        });

        init();
    }

    angular.module("umbraco").controller("Vizioz.PalettePicker.Provider.PalettonController", palettonController);

})();