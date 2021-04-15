(function () {
    "use strict";

    function xmlHelper() {

        var helper = {};

        function parsePaletteContent (content) {
            var result = { palette: [], valid: false };

            var xml;

            try {
                xml = $.parseXML(content);
                result.valid = true;
            } catch (error) {
                result.valid = false;
                return result;
            }

            var colorsets = $(xml).find("colorset");

            angular.forEach(colorsets,
                function (colorset) {
                    var paletteColorset = {
                        id: $(colorset).attr("id"),
                        title: $(colorset).attr("title"),
                        colors: []
                    };

                    var colors = $(colorset).find("color");
                    var width = 100 / (colors.length + 1);
                    var midPoint = Math.floor(colors.length / 2);

                    var base = colors[0];
                    var left = colors.slice(1, midPoint + 1);
                    var right = colors.slice(midPoint + 1);
                    left.push(base);
                    left = $.merge(left, right);
                    
                    angular.forEach(left,
                        function (color, index) {
                            var id = $(color).attr("id");
                            var nr = $(color).attr("nr");
                            var rgb = $(color).attr("rgb");
                            var colorWidth = index === midPoint ? width * 2 : width;
                            var colorLeft = index > midPoint ? ((index + 1) * width) : (index * width);

                            paletteColorset.colors.push({
                                id: id,
                                nr: nr,
                                rgb: "#" + rgb,
                                left: colorLeft,
                                width: colorWidth
                            });
                        });

                    result.palette.push(paletteColorset);
                });

            return result;
        }

        function changePaletteColor (content, color, rgb)
        {
            var re = new RegExp("(<color id=\"" + color.id + "\".+rgb=\")([a-f,0-9]{3,6})(\".+/>)", "gmi");
            return content.replace(re, "$1" + rgb.trimStart("#") + "$3");
        }

        return {
            parsePaletteContent: parsePaletteContent,
            changePaletteColor: changePaletteColor
        }
    }

    angular.module("umbraco").factory("palettePickerXmlHelper", xmlHelper);
})();