---
layout: default
title: Overview
---

## Palette Picker. A customizable colour template data type for Umbraco.

Palette Picker allows editors to select a predefined colour template for any particular page of their site.

This can be especially useful for document types where we want colours to change often or be customizable.

It makes it really simple for editors to change the colour template value, while it requests only a minimum configuration from developers to set up the available colour templates. It will generate a series of CSS rules that can imported into any view, and then use the specific classes accordingly on any colour-custom element of the view. The CSS rules included contain the properties color, background-color and border-color for main classes, as well as for other optional pseudo-elements and pseudo-classes. For more info, please refer to the [reference section]({{ site.baseurl }}/documentation#reference-css) of the documentation page.

The colour templates are based on [Paletton.com](https://paletton.com/). The templates can be configured and imported from there into the Palette Picker data type. The current version of Palette Picker only accepts the colour information imported as XML.
