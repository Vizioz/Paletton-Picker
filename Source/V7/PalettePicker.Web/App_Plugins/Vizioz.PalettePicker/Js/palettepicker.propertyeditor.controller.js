(function () {
    "use strict";

    function palettePropertyEditorController($scope, dialogService) {

        var vm = this;
        var editIndex = null;

        vm.add = add;
        vm.edit = edit;
        vm.remove = remove;
        
        $scope.sortableOptions = {
            axis: "y",
            cursor: "move",
            handle: ".icon-navigation"
        };

        var dialogOptions = {
            template: "/App_Plugins/Vizioz.PalettePicker/Views/palettepicker.editorprevaluedialog.html",
            dialogData: {
                title: "Add a colour palette",
                value: null
            },
            
            callback: function (model) {
                if (editIndex !== null) {
                    $scope.model.value[editIndex] = model;
                } else {
                    if (Array.isArray($scope.model.value)) {
                        $scope.model.value.push(model);
                    } else {
                        $scope.model.value = [model];
                    }
                }
            }
        };
        
        function add() {
            editIndex = null;
            dialogOptions.dialogData.value = null;
            openEditor();
        }

        function edit($index) {
            editIndex = $index;
            dialogOptions.dialogData.value = $scope.model.value[$index];
            openEditor();
        }

        function remove (index) {
            $scope.model.value.splice(index, 1);
        }

        function openEditor() {
            dialogService.open(dialogOptions);
        }

    }

    angular.module("umbraco").controller("Vizioz.PalettePicker.PropertyEditorController", palettePropertyEditorController);
})();