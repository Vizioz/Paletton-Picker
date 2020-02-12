---
layout: default
title: Overview
---

## Paletton Picker. A customizable color template data type for Umbraco.

Paletton Picker allows editors to select a predefined color template for any particular page of their site.

This can be especially useful for document types where we want colors to change often or be customizable.

It makes it really simple for editors to change the color pattern, while it requests only a minimum configuration from developers to set up the available color templates. It will generate a series of CSS rules that can imported into any view, and then use the specific classes accordingly on any color-custom element of the view. The CSS rules include font color, background color and border color for main classes, as well as for other optional pseudo-elements and pseudo-classes. For more info, please refer to the [reference section]({{ site.baseurl }}/documentation#reference-css) of the documentation page.

The color templates are based on [Paletton.com](https://paletton.com/). The templates can be configured and imported from there into the Paletton Picker data type. The current version of Paletton Picker only accepts the color information imported as XML.

<!--
To familiarize with the package, please watch the video below, or read the [documentation]({{ site.baseurl }}/documentation).

<div class="video">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/2fngvQS_PmQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
-->
