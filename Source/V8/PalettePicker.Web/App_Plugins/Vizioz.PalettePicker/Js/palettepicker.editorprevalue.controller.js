(function () {
    "use strict";

    function paletteEditorPrevalueController($scope) {

        var vm = this;

        vm.submit = submit;
        vm.close = close;

        if ($scope.model.value) {
            $scope.editModel = angular.copy($scope.model.value);
        } else {
            $scope.editModel = {
                type: 1,
                content: "<!-- Sample palette -->\r\n" +
                    "<palette>\r\n" +
                    "<colorset id=\"primary\" title=\"Primary color\">\r\n" +
                    "<color id=\"primary-0\" nr=\"0\" rgb=\"AA3939\" r=\"170\" g=\"57\" b=\"57\" r0=\"0.667\" g0=\"0.224\" b0=\"0.224\"/>\r\n" +
                    "<color id=\"primary-1\" nr=\"1\" rgb=\"FFAAAA\" r=\"255\" g=\"170\" b=\"170\" r0=\"1\" g0=\"0.667\" b0=\"0.667\"/>\r\n" +
                    "<color id=\"primary-2\" nr=\"2\" rgb=\"D46A6A\" r=\"212\" g=\"106\" b=\"106\" r0=\"0.831\" g0=\"0.416\" b0=\"0.416\"/>\r\n" +
                    "<color id=\"primary-3\" nr=\"3\" rgb=\"801515\" r=\"128\" g=\"21\" b=\"21\" r0=\"0.502\" g0=\"0.082\" b0=\"0.082\"/>\r\n" +
                    "<color id=\"primary-4\" nr=\"4\" rgb=\"550000\" r=\"85\" g=\"0\" b=\"0\" r0=\"0.333\" g0=\"0\" b0=\"0\"/>\r\n" +
                    "</colorset>\r\n" +
                    "</palette>\r\n",
                valid: true
            };
        }
        
        $scope.isEditable = true;
        
        function submit() {
            if ($scope.model.submit) {
                if ($scope.editModel.content && $scope.editModel.valid) {
                    $scope.model.submit($scope.editModel);
                } 
            }
        }

        function close() {
            if ($scope.model.close) {
                $scope.model.close();
            }
        }
    }

    angular.module("umbraco").controller("Vizioz.PalettePicker.EditorPrevalueController", paletteEditorPrevalueController);
})();