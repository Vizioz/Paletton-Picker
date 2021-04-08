(function () {
    "use strict";

    function paletteValuePickerController($scope) {

        var vm = this;

        vm.select = select;
        vm.close = close;
        vm.submit = submit;
        vm.tooltipOver = tooltipOver;
        vm.tooltipLeave = tooltipLeave;
        vm.prefix = $scope.model.value.prefix;
        vm.parentClass = $scope.model.value.parentClass;

        $scope.selectedIndex = null;
        $scope.prefixTooltip = { show: false, event: null };
        $scope.parentTooltip = { show: false, event: null };

        function tooltipOver($event, tooltip) {
            tooltip.show = true;
            tooltip.event = $event;
        }
        
        function tooltipLeave(tooltip) {
            tooltip.show = false;
            tooltip.event = null;
        }

        function select($index) {
            $scope.selectedIndex = $index;
        }

        function close() {
            if ($scope.model.close) {
                $scope.model.close();
            }
        }

        function submit() {
            if ($scope.model.submit) {
                var palette = $scope.model.config.palettes[$scope.selectedIndex];
                palette.prefix = vm.prefix;
                palette.parentClass = vm.parentClass;
                console.log(palette)
                $scope.model.submit(palette);
            }
        }

        angular.forEach($scope.model.config.palettes,
            function(palette, index) {
                if (palette.type === $scope.model.value.type && palette.content === $scope.model.value.content) {
                    $scope.selectedIndex = index;
                }
            });
    }

    angular.module("umbraco").controller("Vizioz.PalettePicker.ValuePickerController", paletteValuePickerController);
})();