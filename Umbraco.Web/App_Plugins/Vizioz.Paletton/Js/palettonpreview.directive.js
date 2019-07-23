angular.module("umbraco.directives")
    .directive("palettonPreview", function () {
        return {
            scope: {
                value: "=",
                type: "=",
                hideLabels: "="
            },
            restrict: "E",
            replace: true,
            transclude: "true",
            templateUrl: "/App_Plugins/Vizioz.Paletton/Views/paletton.preview.html",
            link: function (scope) {

                var preview = function () {

                    scope.palette = [];

                    var xml;
                    
                    try {
                        xml = $.parseXML(scope.value);
                    } catch(error) {
                        console.log(error); // Invalid XML
                        return;
                    }
                    
                    var colorsets = $(xml).find("colorset");

                    angular.forEach(colorsets,
                        function (colorset) {
                            var paletteColorset = [];

                            var colors = $(colorset).find("color");
                            var width = 100 / (colors.length + 1);
                            var midPoint = Math.floor(colors.length / 2);

                            var base = colors[0];
                            var left = colors.slice(1, midPoint + 1);
                            var right = colors.slice(midPoint + 1);
                            left.push(base);
                            left = $.merge(left, right);

                            angular.forEach(left,
                                function(color, index) {
                                    var id = $(color).attr("id");
                                    var nr = $(color).attr("nr");
                                    var rgb = $(color).attr("rgb");
                                    var colorWidth = nr === "0" ? width * 2 : width;
                                    var colorLeft = parseInt(nr) > midPoint ? ((index + 1) * width) : (index * width);

                                    paletteColorset.push({
                                        id: id,
                                        rgb: "#" + rgb,
                                        left: colorLeft,
                                        width: colorWidth
                                    });
                                });


                            scope.palette.push(paletteColorset);
                        });
                };

                scope.$watch("[value, type]",
                    function() {
                        preview();
                    });

                preview();
            }
        };
    });