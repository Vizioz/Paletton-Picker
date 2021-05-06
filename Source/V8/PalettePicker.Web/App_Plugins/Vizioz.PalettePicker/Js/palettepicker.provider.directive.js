angular.module("umbraco.directives")
    .directive("paletteProvider", function () {
        return {
            scope: {
                model: "=",
                providerView: "=",
                onChange: "&"
            },
            restrict: "E",
            replace: true,
            template: "<ng-include src='getTemplateUrl()'>",
            controller: function ($scope) {
                $scope.getTemplateUrl = function () {
                    return $scope.providerView;
                };
                $scope.submit = function (model) {
                    if (typeof $scope.onChange === "function" && model.palette && model.palette.length) {
                        $scope.onChange({ model: model });
                    }
                };
                $scope.$watch("model",
                    function() {
                        $scope.$broadcast("paletteChange", $scope.model);
                    }, true);
            }
        };
    });