---
layout: default
title: Overview
styles: example
scripts: example
---

## Palette Picker. A customizable colour palette picker for Umbraco.

Palette Picker allows an editor to choose a colour palette to use on a page from a predefined selection of colour palettes.

This can be especially useful for pages where you would like colours to change often or be easily customizable.

It makes it really simple for editors to change the colour template value, while it requires only minimum configuration from developers to set up the available colour palettes. Palette Picker will generate a series of CSS rules that can included on any page, these can be used to style elements across the page with the same color theme. The CSS rules included contain the properties color, background-color and border-color for main classes, as well as for other optional pseudo-elements and pseudo-classes. For more info, please refer to the [Documentation]({{ site.baseurl }}/documentation) page.

The colour palettes are based on [Paletton.com](https://paletton.com/). The palettes can be configured and imported from there into the Palette Picker data type. The current version of Palette Picker only accepts the colour information imported as XML.

## Working Example

Here you can check an example of how Palette Picker will work on your site.

Below is a snippet replicating a property of a content node in the Umbraco back office plus and a view snippet to reflect the changes in the Palette Picker property. Simply change the value of the colour palette and see why your editors will love it.

{% include example.html %}
