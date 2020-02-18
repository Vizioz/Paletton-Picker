---
layout: default
title: Overview
styles: example
scripts: example
---

<h2 class="complement-4 border-complement-2">Palette Picker. A customizable colour template data type for Umbraco.</h2>

Palette Picker allows editors to select a predefined colour template for any particular page of their site.

This can be especially useful for document types where we want colours to change often or be customizable.

It makes it really simple for editors to change the colour template value, while it requests only a minimum configuration from developers to set up the available colour templates. It will generate a series of CSS rules that can imported into any view, and then use the specific classes accordingly on any colour-custom element of the view. The CSS rules included contain the properties color, background-color and border-color for main classes, as well as for other optional pseudo-elements and pseudo-classes. For more info, please refer to the <a href="{{ site.baseurl }}/documentation#reference-css" class="primary-0 hover-primary-0">Reference section</a> of the documentation page.

The colour templates are based on <a href="https://paletton.com/" class="primary-0 hover-primary-0">Paletton.com</a>. The templates can be configured and imported from there into the Palette Picker data type. The current version of Palette Picker only accepts the colour information imported as XML.

<h2 class="complement-4 border-complement-2">Working Example</h2>

Here you can check an example of how Palette Picker will work on your site.

Below is a snippet replicating a property of a content node in the Umbraco back office. Simply change the value of the colour template and see why your editors will love it.

{% include example.html %}
