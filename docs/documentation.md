---
layout: documentation_layout
title: Quick Guide
---

The following steps explain how to configure and use Palette Picker from the creating of the available data types to using them in the views.

We assume the package has been installed already. Otherwise, please refer to the [Resources]({{ site.baseurl }}/resources) section.

## Palette Picker data type {#guide-palette}

This data type allows editors to choose a colour palette to use on a page from a predefined selection of colour palettes. We can then use the selected palette to render a CSS stylesheet that will include the colours selected.

### Configure {#guide-palette-data-type}

To create Palette Picker the data type we do as for any other data type that we want to create in the Umbraco backoffice. In Umbraco V8, we find our collection of data types in the Settings section, while in previous versions we can find it in the Developer section. In any case, the process is the same and we can create a new one by clicking on the three dots next to the "Data Types" title on the left hand side tree.

![Create Data Type]({{ site.baseurl }}/images/Developer-1.jpg)

From the property editor dropdown, we need to select "Palette Picker". Once selected, we can see a new configuration property underneath for "Colour palettes". Here we will configure the colour templates that will be available to use on our document types. We can add new ones by clicking on the "Add" button. We will be prompted then by a side panel where we can choose a palette provider and define a new palette of colours. By default, "Paletton" is selected and a default palette is added.

![Configure Palette Picker]({{ site.baseurl }}/images/Developer-3.jpg)

Palette picker allows multiple palette providers from which we can add colour templates. Providers can be extended, and it is possible to configure and create new providers to use with the package. For further information about providers, please refer to the [Providers Section]({{ site.baseurl }}/api). By default, Palette Picker includes a "manual" provider and a "Paletton" provider. We will use the "Paletton" provider in this documentation.

The "Paletton" provider is based on [Paletton.com](https://paletton.com/). We can get our colour palette from there. The paletton interface is very intuitive. We can have a play with it until we find the right colours. Generally, it will let us choose up to 4 different colours, each one configuring a colour set. Each colour set will then split into 5 different shades, making our full palette. Once happy, if we click on "Tables/Export" on the bottom right corner, and then click on "as XML", it will generate the XML snippet with all selected colours. Palette picker will accept any colour configuration with sets of primary, secondary and complement colours, but the current version will only accept snippets in XML format. Alternatvily, we can use a snippet from any other source as long as it is in the same XML format.

![Paletton]({{ site.baseurl }}/images/Paletton-1.jpg)

![Paletton XML]({{ site.baseurl }}/images/Paletton-2.jpg)

Once we have selected the "Paletton" provider from the dropdown, we then copy the snippet into the textbox. If it is well formatted, we will see the template preview below it, otherwise it means the snippet is not well formatted or contains errors.

Once the snippet is added (and is valid), we can perform some fine tuning before saving it and manually configure any of the colors of the palette, by clicking on the different colors of the preview, as if a standard color picker.

![Palette Picker Colour Template]({{ site.baseurl }}/images/Developer-4.jpg)

We can add as many templates as we like, which are visible in the data type configuration. Templates can use different providers within the same data type. Each provider will have its own configuration. The palette preview will be visible and available for all provider configurations and will still allow fine tuning.

Finally, we give a name to our newly created data type and save it.

![Palette Picker Data Type]({{ site.baseurl }}/images/Developer-5.jpg)

For editors to be able to use the Palette Picker in the content nodes, we will have to add it previously as a property in our document types.

![Add Palette Picker Property]({{ site.baseurl }}/images/Developer-6.jpg)

## Editors {#guide-palette-editors}

Editors can very easily change the selected value of the Palette Picker in content nodes. The property is displayed in a similar way to a content picker. Editors can add a single colour template or remove it.

As an addition to the selected template, it is also possible to define a prefix for the genereated CSS classes, or a parent class, so the styles can be applied to more specific elements inside the views. So we can have multiple colour templates for a same node, each one of them targetting different components.

The prefix field expects just the prefix and it will automatically add it to the generated classes followed by a dash (-) character.

The parent class field expects just the parent class name (please avoid the dot (.) character in front).

![Content Property - Empty]({{ site.baseurl }}/images/Editor-1.jpg)

![Content Property - Picker]({{ site.baseurl }}/images/Editor-2.jpg)

![Content Property - Value Selected]({{ site.baseurl }}/images/Editor-3.jpg)

## Add to view {#guide-palette-view}

This is the part that involves a bit of code.

The first thing to do is to import the colour template styles into our view. We use the Palette Picker extension methods to do this. Don't forget to include the @using statement. 

There are several methods to render the styles in the views. We can either use HTML helper, or use extension methods on the model. The extension methods are compatible with Models Builder.

````csharp
// HTML helper
@using Vizioz.PalettePicker

@Html.GetCssStyles(Model, "palettePickerPropertyAlias")
````

````csharp
// With PublishedContentModel (Models Builder)
@using Vizioz.PalettePicker

@Html.Raw(Model.PalettePickerProperty.GetCssStyles())
````

````csharp
// With IPublishedContent
@using Vizioz.PalettePicker

@Html.Raw(Model.GetCssStyles("palettePickerPropertyAlias"))
````

This will render an internal CSS stylesheet with a series of rules from to the colours contained in the Palette Picker value. These rules will have class selectors containing properties for color, background-color and bordercolor, for every colour defined in the Palette Picker value, as in the example below.

````html
<style type="text/css">
  .primary-0{
    color:#582A72 !important;
  }
  .bg-primary-0{
    background-color:#582A72 !important;
  }
  .border-primary-0{
    border-color:#582A72 !important;
  }
  .primary-1{
    color:#9775AA !important;
  }
  .bg-primary-1{
    background-color:#9775AA !important;
  }
  .border-primary-1{
    border-color:#9775AA !important;
  }
  .primary-2{
    color:#764B8E !important;
  }
  .bg-primary-2{
    background-color:#764B8E !important;
  }
  .border-primary-2{
    border-color:#764B8E !important;
  }
  .primary-3{
    color:#3D1255 !important;
  }
  .bg-primary-3{
    background-color:#3D1255 !important;
  }
  .border-primary-3{
    border-color:#3D1255 !important;
  }
  .primary-4{
    color:#260339 !important;
  }
  .bg-primary-4{
    background-color:#260339 !important;
  }
  .border-primary-4{
    border-color:#260339 !important;
  }
</style>
````

For different color sets, or different color ids, the rules will have similar class selectors, for instance, bg-secondary-1-1, bg-complement-1. For full reference, please go to [CSS rules]({{ site.baseurl }}/cssrules).

Besides class selector, we can generate selectors for pseudo classes and pseudo elements. For full specification, please go to the [API section]({{ site.baseurl }}/api).

If we added a prefix or a parent class to the property value, the generated CSS rules will include them, as in the examples below/

````css
  // with a prefix
  .prefix-primary-0{
    color:#582A72 !important;
  }
````

````css
  // with a parent class
  .parent-class .primary-0{
    color:#582A72 !important;
  }
````

We now can apply the necessary classes to our HTML elements. For instance:

````html
<div class="primary-0 bg-primary-1 border-primary-4">I love Palette Picker</div>
````

Will result in something similar to:

![View Example]({{ site.baseurl }}/images/view-example.png)

By changing the value of the Palette Picker property in the content nodes, the colours displayed in the view will change accordingly.

![View Example]({{ site.baseurl }}/images/view-example-2.png)

## Palette Color Selector data type {#guide-color}

This data type allows editors to select a particular colour out of a particular palette to use on a page from a predefined selection of colour palettes. This is a dynamic color picker, where the selected value comes from the available colours in the selected palette. So if the editors change the palette, the colour selector value will change accordingly and the colours avaialable will also be different.

### Configure {#guide-color-data-type}

To create the data type we select "Palette Color Selector" as the property editor.

We can now configure the palette root node from which the template colours will be selected. This configuartion is very similar to the Node type (startNode) configuration for the Multinode Treepicker data type. 

There are 2 parameters that we need to define here.

First, we need to choose the "start node" from which the palette will be selected. We can either choose a static node from the content tree, or use xpath to reference it. The xpath option is particularly useful if we want to reference the current node, or a parent node, for instance.

The second parameter we need to define is the property alias of the selected node that will contain the palette. If we choose a fixed node from the tree, this will be a dropdown that only allows us to pick "palette picker" properties. If, otherwise, we choose an xpath node, we must fill in the property alias ourselves.

![Configure Palette Color Selector]({{ site.baseurl }}/images/Color-Selector-1.jpg)

![Configure Palette Color Selector]({{ site.baseurl }}/images/Color-Selector-2.jpg)

For editors to be able to use the Palette Color Selector in the content nodes, we will have to add it previously as a property in our document types.

### Editors {#guide-color-editors}

Editors can very easily change the value of the Color Selector in content nodes. The property displays the selected palette, and editor can simply pick a colour among the available ones. 

The Color Selector does not save the color value itself, but it rather saves the colour id and the referenced node.

When the palette property in the referenced node changes, the colours available as well as the value selected change too.

![Content Property - Palette Color Selector]({{ site.baseurl }}/images/Color-Selector-3.jpg)

### Add to view {#guide-color-view}

To get the value of the Palette Color Selector, we can use extension methods on the model. 

````csharp
// With PublishedContentModel (Models Builder)
@using Vizioz.PalettePicker

@Model.ColorSelectorProperty.GetPaletteColorSelector())
````

````csharp
// With IPublishedContent
@using Vizioz.PalettePicker

@Model.GetPaletteColorSelector("colorSelectorPropertyAlias"))
````

Both methods will return the selected color in HEX format, i.e. #582A72.