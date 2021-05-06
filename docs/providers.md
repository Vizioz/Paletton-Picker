---
layout: documentation_layout
title: Providers
---

## Providers {#providers}

Palette Picker includes the concept of palette providers. When configuring the Palette Picker datatype, we can choose a specific provider from a dropdown. The provider then will let us add a palette of colours with its own configuration and/or rules. By default, the package includes a "manual" provider and a "paletton" provider. Providers can be extended, so we can add new ones that will alow us to configure palettes in different ways or from different sources.

### How providers work

A provider acts as an intermediate layer between the source of the colour palette and the Palette Picker configured templates. It translates the source data to a standarized value so it can be saved as a prevalue of the Palette Picker data type.

A provider is an AngularJs componenent that works solely on the front end.

### Create a custom provider

To create a new custom provider, we must add a folder named as the provider inside the providers folder of the Palette Picker plugin. Inside this folder we must add a HTML view, an angular controller, and optional css files. We must respect this folder structure so the available providers will be automatically picked by the Palette Picker configuration.

![Custom Provider]({{ site.baseurl }}/images/Provider-1.jpg)

We must also add the angular JS file to the package.manifest, so the controller can be injected in the Umbraco angular application. It is not necessary to add the CSS files.

![Custom Provider - package.manifest]({{ site.baseurl }}/images/Provider-1.jpg)

For examples of actual providers, we can check the default ones already included in the package (manual and paletton);

#### The HTML view

The only requirement for the view is that it attaches the angular controller via the ng-controller directive. 

````html
<div ng-controller="MyCustomPaletteController as vm">
    <!-- view content -->
</div>
````

#### The angular controller

The controller is a default AngularJs controller injected into the umbraco application. Please note we use the name of the controller to attach it to the view.

````javascript
(function () {
    "use strict";

    function myCustomPaletteController($scope) {

        var vm = this;
        
        // controller logic
    }

    angular.module("umbraco").controller("MyCustomPaletteController", myCustomPaletteController);
})();
````

The scope of the controller has a model object and a submit method that sends the model back to the editor. It can also hook to a palette change event, so if the palette is modified outside of the provider (by manually editing the colours in the preview), it can receive and adapt the model properly.

The function of the controller is to translate whatever content there is to a standard palette object.

- **The model**

The model is accessed via the controller scope:

````javascript
$scope.model
````

The model must be an object according to the following schema:

````json
{
    "type": "object",
    "properties": {
        "content": { "type": "string" },
        "type": { "type": "integer" },
        "palette": { 
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": { "type": "string" },
                    "title": { "type": "string" },
                    "colors": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "id": { "type": "string" },
                                "rgb": { "type": "string" },
                            }
                        }
                    }
                }
            }
        }        
    }
}
````

**Content**: The actual stringified source content as used by the provider.

**Type**: The provider name. This property is already populated according to the selected provider and should not be edited.

**Palette**: The standarized palette of colours.

Example of a model:

````json
{
    "content": "<!-- Palette Sample -->\n<palette>\n<url>http://paletton.com/#uid=1000u0kllllaFw0g0qFqFg0w0aF</url>\n<colorset id=\"primary\" title=\"Primary color\">\n<color id=\"primary-0\" nr=\"0\" rgb=\"AA3939\" r=\"170\" g=\"57\" b=\"57\" r0=\"0.667\" g0=\"0.224\" b0=\"0.224\"/>\n<color id=\"primary-1\" nr=\"1\" rgb=\"FFAAAA\" r=\"255\" g=\"170\" b=\"170\" r0=\"1\" g0=\"0.667\" b0=\"0.667\"/>\n<color id=\"primary-2\" nr=\"2\" rgb=\"D46A6A\" r=\"212\" g=\"106\" b=\"106\" r0=\"0.831\" g0=\"0.416\" b0=\"0.416\"/>\n<color id=\"primary-3\" nr=\"3\" rgb=\"801515\" r=\"128\" g=\"21\" b=\"21\" r0=\"0.502\" g0=\"0.082\" b0=\"0.082\"/>\n<color id=\"primary-4\" nr=\"4\" rgb=\"550000\" r=\"85\" g=\"0\" b=\"0\" r0=\"0.333\" g0=\"0\" b0=\"0\"/>\n</colorset>\n</palette>",
    "type": "Paletton",
    "palette": [
        {
            "id": "primary",
            "title": "Primary Color",
            "colors": [
                {
                    "id": "primary-1",
                    "rgb": "#FFAAAA"
                },
                {
                    "id": "primary-2",
                    "rgb": "#D46A6A"
                },
                {
                    "id": "primary-0",
                    "rgb": "#AA3939"
                },
                {
                    "id": "primary-3",
                    "rgb": "#801515"
                },
                {
                    "id": "primary-4",
                    "rgb": "#550000"
                }
            ]
        }
    ]
}
````

- **Submit**

Once the model is edited, we use the submit method to send it as a prevalue to the editor controller. You must make sure the model returned is as specified above.

````javascript
$scope.submit($scope.model)
````

- **Palette change event**

The controller can hook to the palette change event. When the palette is modified outside of the controller (via manually changing the colours of the preview), we can use this event to edit the model accordingliy.

````javascript
$scope.$on('paletteChange', function (event, model) {
    // Pass the model back to the provider controller
});
````