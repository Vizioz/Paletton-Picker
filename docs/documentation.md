---
layout: documentation_layout
title: Documentation
---

## Guide {#guide}

The following steps explain how to configure and use the Paletton Picker from the creating of the data type to using it in the views.

We assume the package has been installed already. Otherwise, please refer to the [Resources]({{ site.baseurl }}/resources) section.

### Configure data types {#guide-data-type}

To create the data type we do as for any other data type that we want to create in the Umbraco backoffice. In Umbraco V8, we find our collection of data types in the Settings section, while in previous versions we can find it in the Developer section. In any case, the process is the same and we can create a new one by clicking on the three dots next to the "Data Types" title on the left hand side tree.

From the property editor dropdown, we need to select "Paletton Picker". Once selected, we can see a new configuration property underneath for "Color patterns". Here we will configure the color patterns that will be available to use on our document types. We can add new ones by clicking on the "Add" button.

We will be prompted then by a side panel to paste a valid XML snippet to define a new palette of colors. Paletton picker is based on [Paletton.com](https://paletton.com/). We can get our color palette from there. The paletton interface is very intuitive. We can have a play with it until we find the right colors. Generally, it will let us choose up to 4 different colors, each one configuring a color set. Each color set will then split into 5 different shades, making then our full palette. Once happy, if we click on "Tables/Export" on the bottom right corner, and then click on "as XML", it will generate the XML snippet with all selected colors. Paletton picker will accept any color configuration with sets of primary, secondary and complement colors. But the current version will only accept snippets in XML format. Future versions of this package might accept other formats. We can use a snippet from any other source as long as it is in XML format.

We then copy the snippet into the textbox. If it is well formatted, we will see the template preview below it, otherwise it means the snippet is not well formatted or contains errors.

We can add as many templates as we like, which are visible in the data type configuration.

Finally, we give a name to our newly created data type and save it.

For editors to be able to use the Paletton Picker in the content nodes, we will have to add it previously as a property in our document types.

### Editors {#guide-editors}

Editors can very easily change the value of the Paletton Picker value in content nodes. The property is displayed in a similar way to a content picker. Editors can add a single color pattern or remove it.

### Add to view {#guide-view}

This is the part that involves a bit of code.

The first thing to do is to import the color template styles into our view. We use the Paletton Picker extension methods to do this. Depending on whether we are using Models Builder or not, we can use the following methods:

````csharp
// With models builder
@Html.Raw(Model.ColorPatternProperty.GetCssStyles())
````

````csharp
// Without models builder
@Html.Raw(Model.GetCssStyles("colorPatterPropertyAlias"))
````

This will render an internal CSS stylesheet with a series of rules from to the colors contained in the Paletton Picker value. These rules will have class selectors for font color, background color and border color, for every color defined in the Paletton Picker value, as in the example below.

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

For secondary and complementary colors, the rules will have similar class selectors, for instance, bg-secondary-1-1, bg-complement-1. For full reference, please go to [CSS rules](#reference-css).

Besides class selector, we can generate selectors for pseudo classes and pseudo elements. For full specification, please go to the [API section](#reference-api).

We now can apply the necessary classes to our HTML elements. For instance:

````html
<div class="primary-0 bg-primary-1 border-primary-4">I love Paletton Picker</div>
````

Will result in something similar to:

![View Example]({{ site.baseUrl }}images/view-example.png)

By changing the value of the Paletton Picker property in the content nodes, the colors displayed in the view will change accordingly.

## Reference {#reference}

### API {#reference-api}

#### Methods {#reference-api-methods}

##### Get CSS styles (with Models Builder)

_**GetCssStyles(this JToken value, bool addStyleTag = true, bool includePseudoElements = false, bool includePseudoClasses = false)** : IHtmlString_

This method will return a CSS stylesheet as an Html string and is used on Paletton Picker properties of PublishedContentModel objects. It is an extension method for the JToken class, which is the actual type of Paletton Picker property returned by Models Builder. It accepts several optional parameters.

**How to use**

````csharp
@{ var styles = Model.ColorPatternProperty.GetCssStyles(); }
@Html.Raw(styles)
````

**Parameters**

parameter | type | mandatory | description
:--- | :--- | :--- | :---
**value** | JToken | mandatory | The actual Paletton Picker value.
**addStyleTag** | boolean | optional (default = true) | Wheter to add the \<style\> tag to the returned Html string. If true, it will return the whole CSS stylesheet within the \<style\> tag. If false, it will return only the CSS rules.
**includePseudoClasses** | boolean | optional (default = false) | Whether to include CSS rules for pseudo elements, such as ::after, ::before, etc.
**includePseudoElements** | boolean | optional (default = false) | Whether to include CSS rules for pseudo classes, such as :focus, :hover, :last-child, etc.

##### Get CSS styles (without Models Builder)

_**IHtmlString GetCssStyles(this IPublishedContent content, string propertyAlias, bool addStyleTag = true, bool includePseudoElements = false, bool includePseudoClasses = false)** : IHtmlString_

This method will return a CSS stylesheet as an Html string and is used on IPublishedContent objects. It is an extension method for the IPublishedContent class. It accepts the same optional parameters as the previous method.

**How to use**

````csharp
@{ var styles = Model.GetCssStyles("colorPatterPropertyAlias"); }
@Html.Raw(styles)
````

**Parameters**

parameter | type | mandatory | description
:--- | :--- | :--- | :---
**content** | IPublishedContent | mandatory | The IPublishedContent from which we want to get the Paletton Picker value.
**propertyAlias** | string | mandatory | The alias of the Paletton Picker property.
**addStyleTag** | boolean | optional (default = true) | Wheter to add the \<style\> tag to the returned Html string. If true, it will return the whole CSS stylesheet within the \<style\> tag. If false, it will return only the CSS rules.
**includePseudoClasses** | boolean | optional (default = false) | Whether to include CSS rules for pseudo elements, such as ::after, ::before, etc.
**includePseudoElements** | boolean | optional (default = false) | Whether to include CSS rules for pseudo classes, such as :focus, :hover, :last-child, etc.

##### Get palette (with Models Builder)

_**GetPalette(JToken value)** : PalettonPalette_

This method will return all colors and color sets information as a PalettonPalette object and is used on Paletton Picker properties of PublishedContentModel objects. It is an extension method for the JToken class, which is the actual type of Paletton Picker property returned by Models Builder.

**How to use**

````csharp
@{ var palette = Model.ColorPatternProperty.GetPalette(); }
````

**Parameters**

parameter | type | mandatory | description
:--- | :--- | :--- | :---
**value** | JToken | mandatory | The actual Paletton Picker value.

##### Get palette (without Models Builder)

_GetPalette(this IPublishedContent content, string propertyAlias)** : PalettonPalette_

This method will return all colors and color sets information as a Paletton Picker object and is used on IPublishedContent objects. It is an extension method for the IPublishedContent class.

**How to use**

````csharp
@{ var palette = Model.GetPalette("colorPatterPropertyAlias"); }
````

**Parameters**

parameter | type | mandatory | description
:--- | :--- | :--- | :---
**content** | IPublishedContent | mandatory | The IPublishedContent from which we want to get the Paletton Picker value.
**propertyAlias** | string | mandatory | The alias of the Paletton Picker property.

#### Models {#reference-api-models}

##### PalettonPalette

It defines the palette object, containing the list of color sets (primary, secondary, complement).

**Properties**

- _**Url (string)**. Optional Url indicating the source of the color palette._

- _**ColorSets (IEnumerable<PalettonColorSet>)**. The list of color sets included in the palette._

**Methods**

- _**ColorSet(string id)** : PalettonColorSet_

  Returns a color set by id (i.e. "primary", "secondary-1", "secondary-2", "complement")

- _**Color(string colorId)** : PalettonColorSet_

  Returns a color from among all color sets by color id (i.e. "primary-0", "secondary-1-0", "secondary-2-0", "complement-0", etc)

- _**Alpha(string colorId, decimal alphaValue)** : string_

  Returns an alpha color from among all color sets by color id (i.e. "primary-0", "secondary-1-0", "secondary-2-0", "complement-0", etc) and an alpha value between 0 and 1, in the form of rgba color.

##### PalettonColorSet

Individual set of colors (primary, secondary or complement) that compose a PalettonColorPalette object.

**Properties**

- _**Id (string)**. The id of the color set (primary, secondary-1, secondary-2, complement)._
- _**Title (string)**. Optional title of the color set._
- _**Colors (IEnumerable<PalettonColor>)**. The list of colors included in the color set._

##### PalettonColor

A single color within a color set.

**Properties**

- _**Id (string)**. The id of the color (i.e. "primary-0", "secondary-1-0", "secondary-2-0", "complement-0", etc)._
- _**Hex (string)**. The color expressed as a hexadecimal value (i.e. AA3939)._
- _**Red (int)**. The red component of the color as an integer between 0 and 255._
- _**Green (int)**. The green component of the color as an integer between 0 and 255._
- _**Blue (int)**. The blue component of the color as an integer between 0 and 255._
- _**HexColor (string)**. The Hex Code (#RRGGBB) of the color (i.e. #AA3939)._
- _**RgbColor (string)**. The Decimal Code (R, G, B) of the color (i.e. rgb(170,57,57))._

**Methods**

- _**Alpha(decimal alphaValue)** : string_

  Returns the color with an alpha transparency between 0 and 1, in the form of rgba color.

### CSS rules {#reference-css}

This is the full list of possible CSS rules that can be rendered using the Paletton Picker methods. The rules available will depend on the color sets used on our template (primary, secondary-1, secondary-2, complement), and whether we are including pseudo elements and pseudo classes.

As a general rule, the naming of the classes used for the CSS selectors consists of 3 parts separated by "-":

1. attribute to apply the color to (empty for color, "bg" for background-color, "border" for border-color).
2. pseudo class or pseudo element name, if any (i.e. "after", "first-of-type", etc).
3. the color id (i.e. "primary-1", "secondary-1-1", "complement-1").

#### Class selectors

##### Primary color

- .primary-0 { color: $primary-0 !important; }
- .bg-primary-0 { background-color: $primary-0 !important; }
- .border-primary-0 { border-color: $primary-0 !important; }
- .primary-1 { color: $primary-1 !important; }
- .bg-primary-1 { background-color: $primary-1 !important; }
- .border-primary-1 { border-color: $primary-1 !important; }
- .primary-2 { color: $primary-2 !important; }
- .bg-primary-2 { background-color: $primary-2 !important; }
- .border-primary-2 { border-color: $primary-2 !important; }
- .primary-3 { color: $primary-3 !important; }
- .bg-primary-3 { background-color: $primary-3 !important; }
- .border-primary-3 { border-color: $primary-3 !important; }
- .primary-4 { color: $primary-4 !important; }
- .bg-primary-4 { background-color: $primary-4 !important; }
- .border-primary-4 { border-color: $primary-4 !important; }

##### Secondary color 1

- .secondary-1-0 { color: $secondary-1-0 !important; }
- .bg-secondary-1-0 { background-color: $secondary-1-0 !important; }
- .border-secondary-1-0 { border-color: $secondary-1-0 !important; }
- .secondary-1-1 { color: $secondary-1-1 !important; }
- .bg-secondary-1-1 { background-color: $secondary-1-1 !important; }
- .border-secondary-1-1 { border-color: $secondary-1-1 !important; }
- .secondary-1-2 { color: $secondary-1-2 !important; }
- .bg-secondary-1-2 { background-color: $secondary-1-2 !important; }
- .border-secondary-1-2 { border-color: $secondary-1-2 !important; }
- .secondary-1-3 { color: $secondary-1-3 !important; }
- .bg-secondary-1-3 { background-color: $secondary-1-3 !important; }
- .border-secondary-1-3 { border-color: $secondary-1-3 !important; }
- .secondary-1-4 { color: $secondary-1-4!important; }
- .bg-secondary-1-4 { background-color: $secondary-1-4!important; }
- .border-secondary-1-4 { border-color: $secondary-1-4!important; }

##### Secondary color 2

- .secondary-2-0 { color: $secondary-2-0 !important; }
- .bg-secondary-2-0 { background-color: $secondary-2-0 !important; }
- .border-secondary-2-0 { border-color: $secondary-2-0 !important; }
- .secondary-2-1 { color: $secondary-2-1 !important; }
- .bg-secondary-2-1 { background-color: $secondary-2-1 !important; }
- .border-secondary-2-1 { border-color: $secondary-2-1 !important; }
- .secondary-2-2 { color: $secondary-2-2 !important; }
- .bg-secondary-2-2 { background-color: $secondary-2-2 !important; }
- .border-secondary-2-2 { border-color: $secondary-2-2 !important; }
- .secondary-2-3 { color: $secondary-2-3 !important; }
- .bg-secondary-2-3 { background-color: $secondary-2-3 !important; }
- .border-secondary-2-3 { border-color: $secondary-2-3 !important; }
- .secondary-2-4 { color: $secondary-2-4 !important; }
- .bg-secondary-2-4 { background-color: $secondary-2-4 !important; }
- .border-secondary-2-4 { border-color: $secondary-2-4 !important; }

##### Complement color

- .complement-0 { color: $complement-0 !important; }
- .bg-complement-0 { background-color: $complement-0 !important; }
- .border-complement-0 { border-color: $complement-0 !important; }
- .complement-1 { color: $complement-1 !important; }
- .bg-complement-1 { background-color: $complement-1 !important; }
- .border-complement-1 { border-color: $complement-1 !important; }
- .complement-2 { color: $complement-2 !important; }
- .bg-complement-2 { background-color: $complement-2 !important; }
- .border-complement-2 { border-color: $complement-2 !important; }
- .complement-3 { color: $complement-3 !important; }
- .bg-complement-3 { background-color: $complement-3 !important; }
- .border-complement-3 { border-color: $complement-3 !important; }
- .complement-4 { color: $complement-4 !important; }
- .bg-complement-4 { background-color: $complement-4 !important; }
- .border-complement-4 { border-color: $complement-4 !important; }

#### Pseudo element selectors

##### Primary color

- .after-primary-0::after { color: $primary-0 !important; }
- .bg-after-primary-0::after { background-color: $primary-0 !important; }
- .border-after-primary-0::after { border-color: $primary-0 !important; }
- .before-primary-0::before { color: $primary-0 !important; }
- .bg-before-primary-0::before { background-color: $primary-0 !important; }
- .border-before-primary-0::before { border-color: $primary-0 !important; }
- .first-letter-primary-0::first-letter { color: $primary-0 !important; }
- .bg-first-letter-primary-0::first-letter { background-color: $primary-0 !important; }
- .border-first-letter-primary-0::first-letter { border-color: $primary-0 !important; }
- .first-line-primary-0::first-line { color: $primary-0 !important; }
- .bg-first-line-primary-0::first-line { background-color: $primary-0 !important; }
- .border-first-line-primary-0::first-line { border-color: $primary-0 !important; }
- .selection-primary-0::selection { color: $primary-0 !important; }
- .bg-selection-primary-0::selection { background-color: $primary-0 !important; }
- .border-selection-primary-0::selection { border-color: $primary-0 !important; }
- .after-primary-1::after { color: $primary-1 !important; }
- .bg-after-primary-1::after { background-color: $primary-1 !important; }
- .border-after-primary-1::after { border-color: $primary-1 !important; }
- .before-primary-1::before { color: $primary-1 !important; }
- .bg-before-primary-1::before { background-color: $primary-1 !important; }
- .border-before-primary-1::before { border-color: $primary-1 !important; }
- .first-letter-primary-1::first-letter { color: $primary-1 !important; }
- .bg-first-letter-primary-1::first-letter { background-color: $primary-1 !important; }
- .border-first-letter-primary-1::first-letter { border-color: $primary-1 !important; }
- .first-line-primary-1::first-line { color: $primary-1 !important; }
- .bg-first-line-primary-1::first-line { background-color: $primary-1 !important; }
- .border-first-line-primary-1::first-line { border-color: $primary-1 !important; }
- .selection-primary-1::selection { color: $primary-1 !important; }
- .bg-selection-primary-1::selection { background-color: $primary-1 !important; }
- .border-selection-primary-1::selection { border-color: $primary-1 !important; }
- .after-primary-2::after { color: $primary-2 !important; }
- .bg-after-primary-2::after { background-color: $primary-2 !important; }
- .border-after-primary-2::after { border-color: $primary-2 !important; }
- .before-primary-2::before { color: $primary-2 !important; }
- .bg-before-primary-2::before { background-color: $primary-2 !important; }
- .border-before-primary-2::before { border-color: $primary-2 !important; }
- .first-letter-primary-2::first-letter { color: $primary-2 !important; }
- .bg-first-letter-primary-2::first-letter { background-color: $primary-2 !important; }
- .border-first-letter-primary-2::first-letter { border-color: $primary-2 !important; }
- .first-line-primary-2::first-line { color: $primary-2 !important; }
- .bg-first-line-primary-2::first-line { background-color: $primary-2 !important; }
- .border-first-line-primary-2::first-line { border-color: $primary-2 !important; }
- .selection-primary-2::selection { color: $primary-2 !important; }
- .bg-selection-primary-2::selection { background-color: $primary-2 !important; }
- .border-selection-primary-2::selection { border-color: $primary-2 !important; }
- .after-primary-3::after { color: $primary-3 !important; }
- .bg-after-primary-3::after { background-color: $primary-3 !important; }
- .border-after-primary-3::after { border-color: $primary-3 !important; }
- .before-primary-3::before { color: $primary-3 !important; }
- .bg-before-primary-3::before { background-color: $primary-3 !important; }
- .border-before-primary-3::before { border-color: $primary-3 !important; }
- .first-letter-primary-3::first-letter { color: $primary-3 !important; }
- .bg-first-letter-primary-3::first-letter { background-color: $primary-3 !important; }
- .border-first-letter-primary-3::first-letter { border-color: $primary-3 !important; }
- .first-line-primary-3::first-line { color: $primary-3 !important; }
- .bg-first-line-primary-3::first-line { background-color: $primary-3 !important; }
- .border-first-line-primary-3::first-line { border-color: $primary-3 !important; }
- .selection-primary-3::selection { color: $primary-3 !important; }
- .bg-selection-primary-3::selection { background-color: $primary-3 !important; }
- .border-selection-primary-3::selection { border-color: $primary-3 !important; }
- .after-primary-4::after { color: $primary-4 !important; }
- .bg-after-primary-4::after { background-color: $primary-4 !important; }
- .border-after-primary-4::after { border-color: $primary-4 !important; }
- .before-primary-4::before { color: $primary-4 !important; }
- .bg-before-primary-4::before { background-color: $primary-4 !important; }
- .border-before-primary-4::before { border-color: $primary-4 !important; }
- .first-letter-primary-4::first-letter { color: $primary-4 !important; }
- .bg-first-letter-primary-4::first-letter { background-color: $primary-4 !important; }
- .border-first-letter-primary-4::first-letter { border-color: $primary-4 !important; }
- .first-line-primary-4::first-line { color: $primary-4 !important; }
- .bg-first-line-primary-4::first-line { background-color: $primary-4 !important; }
- .border-first-line-primary-4::first-line { border-color: $primary-4 !important; }
- .selection-primary-4::selection { color: $primary-4 !important; }
- .bg-selection-primary-4::selection { background-color: $primary-4 !important; }
- .border-selection-primary-4::selection { border-color: $primary-4 !important; }

##### Secondary color 1

- .after-secondary-1-0::after { color: $secondary-1-0 !important; }
- .bg-after-secondary-1-0::after { background-color: $secondary-1-0 !important; }
- .border-after-secondary-1-0::after { border-color: $secondary-1-0 !important; }
- .before-secondary-1-0::before { color: $secondary-1-0 !important; }
- .bg-before-secondary-1-0::before { background-color: $secondary-1-0 !important; }
- .border-before-secondary-1-0::before { border-color: $secondary-1-0 !important; }
- .first-letter-secondary-1-0::first-letter { color: $secondary-1-0 !important; }
- .bg-first-letter-secondary-1-0::first-letter { background-color: $secondary-1-0 !important; }
- .border-first-letter-secondary-1-0::first-letter { border-color: $secondary-1-0 !important; }
- .first-line-secondary-1-0::first-line { color: $secondary-1-0 !important; }
- .bg-first-line-secondary-1-0::first-line { background-color: $secondary-1-0 !important; }
- .border-first-line-secondary-1-0::first-line { border-color: $secondary-1-0 !important; }
- .selection-secondary-1-0::selection { color: $secondary-1-0 !important; }
- .bg-selection-secondary-1-0::selection { background-color: $secondary-1-0 !important; }
- .border-selection-secondary-1-0::selection { border-color: $secondary-1-0 !important; }
- .after-secondary-1-1::after { color: $secondary-1-1 !important; }
- .bg-after-secondary-1-1::after { background-color: $secondary-1-1 !important; }
- .border-after-secondary-1-1::after { border-color: $secondary-1-1 !important; }
- .before-secondary-1-1::before { color: $secondary-1-1 !important; }
- .bg-before-secondary-1-1::before { background-color: $secondary-1-1 !important; }
- .border-before-secondary-1-1::before { border-color: $secondary-1-1 !important; }
- .first-letter-secondary-1-1::first-letter { color: $secondary-1-1 !important; }
- .bg-first-letter-secondary-1-1::first-letter { background-color: $secondary-1-1 !important; }
- .border-first-letter-secondary-1-1::first-letter { border-color: $secondary-1-1 !important; }
- .first-line-secondary-1-1::first-line { color: $secondary-1-1 !important; }
- .bg-first-line-secondary-1-1::first-line { background-color: $secondary-1-1 !important; }
- .border-first-line-secondary-1-1::first-line { border-color: $secondary-1-1 !important; }
- .selection-secondary-1-1::selection { color: $secondary-1-1 !important; }
- .bg-selection-secondary-1-1::selection { background-color: $secondary-1-1 !important; }
- .border-selection-secondary-1-1::selection { border-color: $secondary-1-1 !important; }
- .after-secondary-1-2::after { color: $secondary-1-2 !important; }
- .bg-after-secondary-1-2::after { background-color: $secondary-1-2 !important; }
- .border-after-secondary-1-2::after { border-color: $secondary-1-2 !important; }
- .before-secondary-1-2::before { color: $secondary-1-2 !important; }
- .bg-before-secondary-1-2::before { background-color: $secondary-1-2 !important; }
- .border-before-secondary-1-2::before { border-color: $secondary-1-2 !important; }
- .first-letter-secondary-1-2::first-letter { color: $secondary-1-2 !important; }
- .bg-first-letter-secondary-1-2::first-letter { background-color: $secondary-1-2 !important; }
- .border-first-letter-secondary-1-2::first-letter { border-color: $secondary-1-2 !important; }
- .first-line-secondary-1-2::first-line { color: $secondary-1-2 !important; }
- .bg-first-line-secondary-1-2::first-line { background-color: $secondary-1-2 !important; }
- .border-first-line-secondary-1-2::first-line { border-color: $secondary-1-2 !important; }
- .selection-secondary-1-2::selection { color: $secondary-1-2 !important; }
- .bg-selection-secondary-1-2::selection { background-color: $secondary-1-2 !important; }
- .border-selection-secondary-1-2::selection { border-color: $secondary-1-2 !important; }
- .after-secondary-1-3::after { color: $secondary-1-3 !important; }
- .bg-after-secondary-1-3::after { background-color: $secondary-1-3 !important; }
- .border-after-secondary-1-3::after { border-color: $secondary-1-3 !important; }
- .before-secondary-1-3::before { color: $secondary-1-3 !important; }
- .bg-before-secondary-1-3::before { background-color: $secondary-1-3 !important; }
- .border-before-secondary-1-3::before { border-color: $secondary-1-3 !important; }
- .first-letter-secondary-1-3::first-letter { color: $secondary-1-3 !important; }
- .bg-first-letter-secondary-1-3::first-letter { background-color: $secondary-1-3 !important; }
- .border-first-letter-secondary-1-3::first-letter { border-color: $secondary-1-3 !important; }
- .first-line-secondary-1-3::first-line { color: $secondary-1-3 !important; }
- .bg-first-line-secondary-1-3::first-line { background-color: $secondary-1-3 !important; }
- .border-first-line-secondary-1-3::first-line { border-color: $secondary-1-3 !important; }
- .selection-secondary-1-3::selection { color: $secondary-1-3 !important; }
- .bg-selection-secondary-1-3::selection { background-color: $secondary-1-3 !important; }
- .border-selection-secondary-1-3::selection { border-color: $secondary-1-3 !important; }
- .after-secondary-1-4::after { color: $secondary-1-4!important; }
- .bg-after-secondary-1-4::after { background-color: $secondary-1-4!important; }
- .border-after-secondary-1-4::after { border-color: $secondary-1-4!important; }
- .before-secondary-1-4::before { color: $secondary-1-4!important; }
- .bg-before-secondary-1-4::before { background-color: $secondary-1-4!important; }
- .border-before-secondary-1-4::before { border-color: $secondary-1-4!important; }
- .first-letter-secondary-1-4::first-letter { color: $secondary-1-4!important; }
- .bg-first-letter-secondary-1-4::first-letter { background-color: $secondary-1-4!important; }
- .border-first-letter-secondary-1-4::first-letter { border-color: $secondary-1-4!important; }
- .first-line-secondary-1-4::first-line { color: $secondary-1-4!important; }
- .bg-first-line-secondary-1-4::first-line { background-color: $secondary-1-4!important; }
- .border-first-line-secondary-1-4::first-line { border-color: $secondary-1-4!important; }
- .selection-secondary-1-4::selection { color: $secondary-1-4!important; }
- .bg-selection-secondary-1-4::selection { background-color: $secondary-1-4!important; }
- .border-selection-secondary-1-4::selection { border-color: $secondary-1-4!important; }

##### Secondary color 2

- .after-secondary-2-0::after { color: $secondary-2-0 !important; }
- .bg-after-secondary-2-0::after { background-color: $secondary-2-0 !important; }
- .border-after-secondary-2-0::after { border-color: $secondary-2-0 !important; }
- .before-secondary-2-0::before { color: $secondary-2-0 !important; }
- .bg-before-secondary-2-0::before { background-color: $secondary-2-0 !important; }
- .border-before-secondary-2-0::before { border-color: $secondary-2-0 !important; }
- .first-letter-secondary-2-0::first-letter { color: $secondary-2-0 !important; }
- .bg-first-letter-secondary-2-0::first-letter { background-color: $secondary-2-0 !important; }
- .border-first-letter-secondary-2-0::first-letter { border-color: $secondary-2-0 !important; }
- .first-line-secondary-2-0::first-line { color: $secondary-2-0 !important; }
- .bg-first-line-secondary-2-0::first-line { background-color: $secondary-2-0 !important; }
- .border-first-line-secondary-2-0::first-line { border-color: $secondary-2-0 !important; }
- .selection-secondary-2-0::selection { color: $secondary-2-0 !important; }
- .bg-selection-secondary-2-0::selection { background-color: $secondary-2-0 !important; }
- .border-selection-secondary-2-0::selection { border-color: $secondary-2-0 !important; }
- .after-secondary-2-1::after { color: $secondary-2-1 !important; }
- .bg-after-secondary-2-1::after { background-color: $secondary-2-1 !important; }
- .border-after-secondary-2-1::after { border-color: $secondary-2-1 !important; }
- .before-secondary-2-1::before { color: $secondary-2-1 !important; }
- .bg-before-secondary-2-1::before { background-color: $secondary-2-1 !important; }
- .border-before-secondary-2-1::before { border-color: $secondary-2-1 !important; }
- .first-letter-secondary-2-1::first-letter { color: $secondary-2-1 !important; }
- .bg-first-letter-secondary-2-1::first-letter { background-color: $secondary-2-1 !important; }
- .border-first-letter-secondary-2-1::first-letter { border-color: $secondary-2-1 !important; }
- .first-line-secondary-2-1::first-line { color: $secondary-2-1 !important; }
- .bg-first-line-secondary-2-1::first-line { background-color: $secondary-2-1 !important; }
- .border-first-line-secondary-2-1::first-line { border-color: $secondary-2-1 !important; }
- .selection-secondary-2-1::selection { color: $secondary-2-1 !important; }
- .bg-selection-secondary-2-1::selection { background-color: $secondary-2-1 !important; }
- .border-selection-secondary-2-1::selection { border-color: $secondary-2-1 !important; }
- .after-secondary-2-2::after { color: $secondary-2-2 !important; }
- .bg-after-secondary-2-2::after { background-color: $secondary-2-2 !important; }
- .border-after-secondary-2-2::after { border-color: $secondary-2-2 !important; }
- .before-secondary-2-2::before { color: $secondary-2-2 !important; }
- .bg-before-secondary-2-2::before { background-color: $secondary-2-2 !important; }
- .border-before-secondary-2-2::before { border-color: $secondary-2-2 !important; }
- .first-letter-secondary-2-2::first-letter { color: $secondary-2-2 !important; }
- .bg-first-letter-secondary-2-2::first-letter { background-color: $secondary-2-2 !important; }
- .border-first-letter-secondary-2-2::first-letter { border-color: $secondary-2-2 !important; }
- .first-line-secondary-2-2::first-line { color: $secondary-2-2 !important; }
- .bg-first-line-secondary-2-2::first-line { background-color: $secondary-2-2 !important; }
- .border-first-line-secondary-2-2::first-line { border-color: $secondary-2-2 !important; }
- .selection-secondary-2-2::selection { color: $secondary-2-2 !important; }
- .bg-selection-secondary-2-2::selection { background-color: $secondary-2-2 !important; }
- .border-selection-secondary-2-2::selection { border-color: $secondary-2-2 !important; }
- .after-secondary-2-3::after { color: $secondary-2-3 !important; }
- .bg-after-secondary-2-3::after { background-color: $secondary-2-3 !important; }
- .border-after-secondary-2-3::after { border-color: $secondary-2-3 !important; }
- .before-secondary-2-3::before { color: $secondary-2-3 !important; }
- .bg-before-secondary-2-3::before { background-color: $secondary-2-3 !important; }
- .border-before-secondary-2-3::before { border-color: $secondary-2-3 !important; }
- .first-letter-secondary-2-3::first-letter { color: $secondary-2-3 !important; }
- .bg-first-letter-secondary-2-3::first-letter { background-color: $secondary-2-3 !important; }
- .border-first-letter-secondary-2-3::first-letter { border-color: $secondary-2-3 !important; }
- .first-line-secondary-2-3::first-line { color: $secondary-2-3 !important; }
- .bg-first-line-secondary-2-3::first-line { background-color: $secondary-2-3 !important; }
- .border-first-line-secondary-2-3::first-line { border-color: $secondary-2-3 !important; }
- .selection-secondary-2-3::selection { color: $secondary-2-3 !important; }
- .bg-selection-secondary-2-3::selection { background-color: $secondary-2-3 !important; }
- .border-selection-secondary-2-3::selection { border-color: $secondary-2-3 !important; }
- .after-secondary-2-4::after { color: $secondary-2-4 !important; }
- .bg-after-secondary-2-4::after { background-color: $secondary-2-4 !important; }
- .border-after-secondary-2-4::after { border-color: $secondary-2-4 !important; }
- .before-secondary-2-4::before { color: $secondary-2-4 !important; }
- .bg-before-secondary-2-4::before { background-color: $secondary-2-4 !important; }
- .border-before-secondary-2-4::before { border-color: $secondary-2-4 !important; }
- .first-letter-secondary-2-4::first-letter { color: $secondary-2-4 !important; }
- .bg-first-letter-secondary-2-4::first-letter { background-color: $secondary-2-4 !important; }
- .border-first-letter-secondary-2-4::first-letter { border-color: $secondary-2-4 !important; }
- .first-line-secondary-2-4::first-line { color: $secondary-2-4 !important; }
- .bg-first-line-secondary-2-4::first-line { background-color: $secondary-2-4 !important; }
- .border-first-line-secondary-2-4::first-line { border-color: $secondary-2-4 !important; }
- .selection-secondary-2-4::selection { color: $secondary-2-4 !important; }
- .bg-selection-secondary-2-4::selection { background-color: $secondary-2-4 !important; }
- .border-selection-secondary-2-4::selection { border-color: $secondary-2-4 !important; }

##### Complement color

- .after-complement-0::after { color: $complement-0 !important; }
- .bg-after-complement-0::after { background-color: $complement-0 !important; }
- .border-after-complement-0::after { border-color: $complement-0 !important; }
- .before-complement-0::before { color: $complement-0 !important; }
- .bg-before-complement-0::before { background-color: $complement-0 !important; }
- .border-before-complement-0::before { border-color: $complement-0 !important; }
- .first-letter-complement-0::first-letter { color: $complement-0 !important; }
- .bg-first-letter-complement-0::first-letter { background-color: $complement-0 !important; }
- .border-first-letter-complement-0::first-letter { border-color: $complement-0 !important; }
- .first-line-complement-0::first-line { color: $complement-0 !important; }
- .bg-first-line-complement-0::first-line { background-color: $complement-0 !important; }
- .border-first-line-complement-0::first-line { border-color: $complement-0 !important; }
- .selection-complement-0::selection { color: $complement-0 !important; }
- .bg-selection-complement-0::selection { background-color: $complement-0 !important; }
- .border-selection-complement-0::selection { border-color: $complement-0 !important; }
- .after-complement-1::after { color: $complement-1 !important; }
- .bg-after-complement-1::after { background-color: $complement-1 !important; }
- .border-after-complement-1::after { border-color: $complement-1 !important; }
- .before-complement-1::before { color: $complement-1 !important; }
- .bg-before-complement-1::before { background-color: $complement-1 !important; }
- .border-before-complement-1::before { border-color: $complement-1 !important; }
- .first-letter-complement-1::first-letter { color: $complement-1 !important; }
- .bg-first-letter-complement-1::first-letter { background-color: $complement-1 !important; }
- .border-first-letter-complement-1::first-letter { border-color: $complement-1 !important; }
- .first-line-complement-1::first-line { color: $complement-1 !important; }
- .bg-first-line-complement-1::first-line { background-color: $complement-1 !important; }
- .border-first-line-complement-1::first-line { border-color: $complement-1 !important; }
- .selection-complement-1::selection { color: $complement-1 !important; }
- .bg-selection-complement-1::selection { background-color: $complement-1 !important; }
- .border-selection-complement-1::selection { border-color: $complement-1 !important; }
- .after-complement-2::after { color: $complement-2 !important; }
- .bg-after-complement-2::after { background-color: $complement-2 !important; }
- .border-after-complement-2::after { border-color: $complement-2 !important; }
- .before-complement-2::before { color: $complement-2 !important; }
- .bg-before-complement-2::before { background-color: $complement-2 !important; }
- .border-before-complement-2::before { border-color: $complement-2 !important; }
- .first-letter-complement-2::first-letter { color: $complement-2 !important; }
- .bg-first-letter-complement-2::first-letter { background-color: $complement-2 !important; }
- .border-first-letter-complement-2::first-letter { border-color: $complement-2 !important; }
- .first-line-complement-2::first-line { color: $complement-2 !important; }
- .bg-first-line-complement-2::first-line { background-color: $complement-2 !important; }
- .border-first-line-complement-2::first-line { border-color: $complement-2 !important; }
- .selection-complement-2::selection { color: $complement-2 !important; }
- .bg-selection-complement-2::selection { background-color: $complement-2 !important; }
- .border-selection-complement-2::selection { border-color: $complement-2 !important; }
- .after-complement-3::after { color: $complement-3 !important; }
- .bg-after-complement-3::after { background-color: $complement-3 !important; }
- .border-after-complement-3::after { border-color: $complement-3 !important; }
- .before-complement-3::before { color: $complement-3 !important; }
- .bg-before-complement-3::before { background-color: $complement-3 !important; }
- .border-before-complement-3::before { border-color: $complement-3 !important; }
- .first-letter-complement-3::first-letter { color: $complement-3 !important; }
- .bg-first-letter-complement-3::first-letter { background-color: $complement-3 !important; }
- .border-first-letter-complement-3::first-letter { border-color: $complement-3 !important; }
- .first-line-complement-3::first-line { color: $complement-3 !important; }
- .bg-first-line-complement-3::first-line { background-color: $complement-3 !important; }
- .border-first-line-complement-3::first-line { border-color: $complement-3 !important; }
- .selection-complement-3::selection { color: $complement-3 !important; }
- .bg-selection-complement-3::selection { background-color: $complement-3 !important; }
- .border-selection-complement-3::selection { border-color: $complement-3 !important; }
- .after-complement-4::after { color: $complement-4 !important; }
- .bg-after-complement-4::after { background-color: $complement-4 !important; }
- .border-after-complement-4::after { border-color: $complement-4 !important; }
- .before-complement-4::before { color: $complement-4 !important; }
- .bg-before-complement-4::before { background-color: $complement-4 !important; }
- .border-before-complement-4::before { border-color: $complement-4 !important; }
- .first-letter-complement-4::first-letter { color: $complement-4 !important; }
- .bg-first-letter-complement-4::first-letter { background-color: $complement-4 !important; }
- .border-first-letter-complement-4::first-letter { border-color: $complement-4 !important; }
- .first-line-complement-4::first-line { color: $complement-4 !important; }
- .bg-first-line-complement-4::first-line { background-color: $complement-4 !important; }
- .border-first-line-complement-4::first-line { border-color: $complement-4 !important; }
- .selection-complement-4::selection { color: $complement-4 !important; }
- .bg-selection-complement-4::selection { background-color: $complement-4 !important; }
- .border-selection-complement-4::selection { border-color: $complement-4 !important; }

#### Pseudo class selectors

##### Primary color

- .active-primary-0:active { color: $primary-0 !important; }
- .bg-active-primary-0:active { background-color: $primary-0 !important; }
- .border-active-primary-0:active { border-color: $primary-0 !important; }
- .checked-primary-0:checked { color: $primary-0 !important; }
- .bg-checked-primary-0:checked { background-color: $primary-0 !important; }
- .border-checked-primary-0:checked { border-color: $primary-0 !important; }
- .disabled-primary-0:disabled { color: $primary-0 !important; }
- .bg-disabled-primary-0:disabled { background-color: $primary-0 !important; }
- .border-disabled-primary-0:disabled { border-color: $primary-0 !important; }
- .empty-primary-0:empty { color: $primary-0 !important; }
- .bg-empty-primary-0:empty { background-color: $primary-0 !important; }
- .border-empty-primary-0:empty { border-color: $primary-0 !important; }
- .enabled-primary-0:enabled { color: $primary-0 !important; }
- .bg-enabled-primary-0:enabled { background-color: $primary-0 !important; }
- .border-enabled-primary-0:enabled { border-color: $primary-0 !important; }
- .first-child-primary-0:first-child { color: $primary-0 !important; }
- .bg-first-child-primary-0:first-child { background-color: $primary-0 !important; }
- .border-first-child-primary-0:first-child { border-color: $primary-0 !important; }
- .first-of-type-primary-0:first-of-type { color: $primary-0 !important; }
- .bg-first-of-type-primary-0:first-of-type { background-color: $primary-0 !important; }
- .border-first-of-type-primary-0:first-of-type { border-color: $primary-0 !important; }
- .focus-primary-0:focus { color: $primary-0 !important; }
- .bg-focus-primary-0:focus { background-color: $primary-0 !important; }
- .border-focus-primary-0:focus { border-color: $primary-0 !important; }
- .hover-primary-0:hover { color: $primary-0 !important; }
- .bg-hover-primary-0:hover { background-color: $primary-0 !important; }
- .border-hover-primary-0:hover { border-color: $primary-0 !important; }
- .in-range-primary-0:in-range { color: $primary-0 !important; }
- .bg-in-range-primary-0:in-range { background-color: $primary-0 !important; }
- .border-in-range-primary-0:in-range { border-color: $primary-0 !important; }
- .invalid-primary-0:invalid { color: $primary-0 !important; }
- .bg-invalid-primary-0:invalid { background-color: $primary-0 !important; }
- .border-invalid-primary-0:invalid { border-color: $primary-0 !important; }
- .last-child-primary-0:last-child { color: $primary-0 !important; }
- .bg-last-child-primary-0:last-child { background-color: $primary-0 !important; }
- .border-last-child-primary-0:last-child { border-color: $primary-0 !important; }
- .last-of-type-primary-0:last-of-type { color: $primary-0 !important; }
- .bg-last-of-type-primary-0:last-of-type { background-color: $primary-0 !important; }
- .border-last-of-type-primary-0:last-of-type { border-color: $primary-0 !important; }
- .link-primary-0:link { color: $primary-0 !important; }
- .bg-link-primary-0:link { background-color: $primary-0 !important; }
- .border-link-primary-0:link { border-color: $primary-0 !important; }
- .only-of-type-primary-0:only-of-type { color: $primary-0 !important; }
- .bg-only-of-type-primary-0:only-of-type { background-color: $primary-0 !important; }
- .border-only-of-type-primary-0:only-of-type { border-color: $primary-0 !important; }
- .only-child-primary-0:only-child { color: $primary-0 !important; }
- .bg-only-child-primary-0:only-child { background-color: $primary-0 !important; }
- .border-only-child-primary-0:only-child { border-color: $primary-0 !important; }
- .optional-primary-0:optional { color: $primary-0 !important; }
- .bg-optional-primary-0:optional { background-color: $primary-0 !important; }
- .border-optional-primary-0:optional { border-color: $primary-0 !important; }
- .out-of-range-primary-0:out-of-range { color: $primary-0 !important; }
- .bg-out-of-range-primary-0:out-of-range { background-color: $primary-0 !important; }
- .border-out-of-range-primary-0:out-of-range { border-color: $primary-0 !important; }
- .read-only-primary-0:read-only { color: $primary-0 !important; }
- .bg-read-only-primary-0:read-only { background-color: $primary-0 !important; }
- .border-read-only-primary-0:read-only { border-color: $primary-0 !important; }
- .read-write-primary-0:read-write { color: $primary-0 !important; }
- .bg-read-write-primary-0:read-write { background-color: $primary-0 !important; }
- .border-read-write-primary-0:read-write { border-color: $primary-0 !important; }
- .required-primary-0:required { color: $primary-0 !important; }
- .bg-required-primary-0:required { background-color: $primary-0 !important; }
- .border-required-primary-0:required { border-color: $primary-0 !important; }
- .root-primary-0:root { color: $primary-0 !important; }
- .bg-root-primary-0:root { background-color: $primary-0 !important; }
- .border-root-primary-0:root { border-color: $primary-0 !important; }
- .target-primary-0:target { color: $primary-0 !important; }
- .bg-target-primary-0:target { background-color: $primary-0 !important; }
- .border-target-primary-0:target { border-color: $primary-0 !important; }
- .valid-primary-0:valid { color: $primary-0 !important; }
- .bg-valid-primary-0:valid { background-color: $primary-0 !important; }
- .border-valid-primary-0:valid { border-color: $primary-0 !important; }
- .visited-primary-0:visited { color: $primary-0 !important; }
- .bg-visited-primary-0:visited { background-color: $primary-0 !important; }
- .border-visited-primary-0:visited { border-color: $primary-0 !important; }
- .active-primary-1:active { color: $primary-1 !important; }
- .bg-active-primary-1:active { background-color: $primary-1 !important; }
- .border-active-primary-1:active { border-color: $primary-1 !important; }
- .checked-primary-1:checked { color: $primary-1 !important; }
- .bg-checked-primary-1:checked { background-color: $primary-1 !important; }
- .border-checked-primary-1:checked { border-color: $primary-1 !important; }
- .disabled-primary-1:disabled { color: $primary-1 !important; }
- .bg-disabled-primary-1:disabled { background-color: $primary-1 !important; }
- .border-disabled-primary-1:disabled { border-color: $primary-1 !important; }
- .empty-primary-1:empty { color: $primary-1 !important; }
- .bg-empty-primary-1:empty { background-color: $primary-1 !important; }
- .border-empty-primary-1:empty { border-color: $primary-1 !important; }
- .enabled-primary-1:enabled { color: $primary-1 !important; }
- .bg-enabled-primary-1:enabled { background-color: $primary-1 !important; }
- .border-enabled-primary-1:enabled { border-color: $primary-1 !important; }
- .first-child-primary-1:first-child { color: $primary-1 !important; }
- .bg-first-child-primary-1:first-child { background-color: $primary-1 !important; }
- .border-first-child-primary-1:first-child { border-color: $primary-1 !important; }
- .first-of-type-primary-1:first-of-type { color: $primary-1 !important; }
- .bg-first-of-type-primary-1:first-of-type { background-color: $primary-1 !important; }
- .border-first-of-type-primary-1:first-of-type { border-color: $primary-1 !important; }
- .focus-primary-1:focus { color: $primary-1 !important; }
- .bg-focus-primary-1:focus { background-color: $primary-1 !important; }
- .border-focus-primary-1:focus { border-color: $primary-1 !important; }
- .hover-primary-1:hover { color: $primary-1 !important; }
- .bg-hover-primary-1:hover { background-color: $primary-1 !important; }
- .border-hover-primary-1:hover { border-color: $primary-1 !important; }
- .in-range-primary-1:in-range { color: $primary-1 !important; }
- .bg-in-range-primary-1:in-range { background-color: $primary-1 !important; }
- .border-in-range-primary-1:in-range { border-color: $primary-1 !important; }
- .invalid-primary-1:invalid { color: $primary-1 !important; }
- .bg-invalid-primary-1:invalid { background-color: $primary-1 !important; }
- .border-invalid-primary-1:invalid { border-color: $primary-1 !important; }
- .last-child-primary-1:last-child { color: $primary-1 !important; }
- .bg-last-child-primary-1:last-child { background-color: $primary-1 !important; }
- .border-last-child-primary-1:last-child { border-color: $primary-1 !important; }
- .last-of-type-primary-1:last-of-type { color: $primary-1 !important; }
- .bg-last-of-type-primary-1:last-of-type { background-color: $primary-1 !important; }
- .border-last-of-type-primary-1:last-of-type { border-color: $primary-1 !important; }
- .link-primary-1:link { color: $primary-1 !important; }
- .bg-link-primary-1:link { background-color: $primary-1 !important; }
- .border-link-primary-1:link { border-color: $primary-1 !important; }
- .only-of-type-primary-1:only-of-type { color: $primary-1 !important; }
- .bg-only-of-type-primary-1:only-of-type { background-color: $primary-1 !important; }
- .border-only-of-type-primary-1:only-of-type { border-color: $primary-1 !important; }
- .only-child-primary-1:only-child { color: $primary-1 !important; }
- .bg-only-child-primary-1:only-child { background-color: $primary-1 !important; }
- .border-only-child-primary-1:only-child { border-color: $primary-1 !important; }
- .optional-primary-1:optional { color: $primary-1 !important; }
- .bg-optional-primary-1:optional { background-color: $primary-1 !important; }
- .border-optional-primary-1:optional { border-color: $primary-1 !important; }
- .out-of-range-primary-1:out-of-range { color: $primary-1 !important; }
- .bg-out-of-range-primary-1:out-of-range { background-color: $primary-1 !important; }
- .border-out-of-range-primary-1:out-of-range { border-color: $primary-1 !important; }
- .read-only-primary-1:read-only { color: $primary-1 !important; }
- .bg-read-only-primary-1:read-only { background-color: $primary-1 !important; }
- .border-read-only-primary-1:read-only { border-color: $primary-1 !important; }
- .read-write-primary-1:read-write { color: $primary-1 !important; }
- .bg-read-write-primary-1:read-write { background-color: $primary-1 !important; }
- .border-read-write-primary-1:read-write { border-color: $primary-1 !important; }
- .required-primary-1:required { color: $primary-1 !important; }
- .bg-required-primary-1:required { background-color: $primary-1 !important; }
- .border-required-primary-1:required { border-color: $primary-1 !important; }
- .root-primary-1:root { color: $primary-1 !important; }
- .bg-root-primary-1:root { background-color: $primary-1 !important; }
- .border-root-primary-1:root { border-color: $primary-1 !important; }
- .target-primary-1:target { color: $primary-1 !important; }
- .bg-target-primary-1:target { background-color: $primary-1 !important; }
- .border-target-primary-1:target { border-color: $primary-1 !important; }
- .valid-primary-1:valid { color: $primary-1 !important; }
- .bg-valid-primary-1:valid { background-color: $primary-1 !important; }
- .border-valid-primary-1:valid { border-color: $primary-1 !important; }
- .visited-primary-1:visited { color: $primary-1 !important; }
- .bg-visited-primary-1:visited { background-color: $primary-1 !important; }
- .border-visited-primary-1:visited { border-color: $primary-1 !important; }
- .active-primary-2:active { color: $primary-2 !important; }
- .bg-active-primary-2:active { background-color: $primary-2 !important; }
- .border-active-primary-2:active { border-color: $primary-2 !important; }
- .checked-primary-2:checked { color: $primary-2 !important; }
- .bg-checked-primary-2:checked { background-color: $primary-2 !important; }
- .border-checked-primary-2:checked { border-color: $primary-2 !important; }
- .disabled-primary-2:disabled { color: $primary-2 !important; }
- .bg-disabled-primary-2:disabled { background-color: $primary-2 !important; }
- .border-disabled-primary-2:disabled { border-color: $primary-2 !important; }
- .empty-primary-2:empty { color: $primary-2 !important; }
- .bg-empty-primary-2:empty { background-color: $primary-2 !important; }
- .border-empty-primary-2:empty { border-color: $primary-2 !important; }
- .enabled-primary-2:enabled { color: $primary-2 !important; }
- .bg-enabled-primary-2:enabled { background-color: $primary-2 !important; }
- .border-enabled-primary-2:enabled { border-color: $primary-2 !important; }
- .first-child-primary-2:first-child { color: $primary-2 !important; }
- .bg-first-child-primary-2:first-child { background-color: $primary-2 !important; }
- .border-first-child-primary-2:first-child { border-color: $primary-2 !important; }
- .first-of-type-primary-2:first-of-type { color: $primary-2 !important; }
- .bg-first-of-type-primary-2:first-of-type { background-color: $primary-2 !important; }
- .border-first-of-type-primary-2:first-of-type { border-color: $primary-2 !important; }
- .focus-primary-2:focus { color: $primary-2 !important; }
- .bg-focus-primary-2:focus { background-color: $primary-2 !important; }
- .border-focus-primary-2:focus { border-color: $primary-2 !important; }
- .hover-primary-2:hover { color: $primary-2 !important; }
- .bg-hover-primary-2:hover { background-color: $primary-2 !important; }
- .border-hover-primary-2:hover { border-color: $primary-2 !important; }
- .in-range-primary-2:in-range { color: $primary-2 !important; }
- .bg-in-range-primary-2:in-range { background-color: $primary-2 !important; }
- .border-in-range-primary-2:in-range { border-color: $primary-2 !important; }
- .invalid-primary-2:invalid { color: $primary-2 !important; }
- .bg-invalid-primary-2:invalid { background-color: $primary-2 !important; }
- .border-invalid-primary-2:invalid { border-color: $primary-2 !important; }
- .last-child-primary-2:last-child { color: $primary-2 !important; }
- .bg-last-child-primary-2:last-child { background-color: $primary-2 !important; }
- .border-last-child-primary-2:last-child { border-color: $primary-2 !important; }
- .last-of-type-primary-2:last-of-type { color: $primary-2 !important; }
- .bg-last-of-type-primary-2:last-of-type { background-color: $primary-2 !important; }
- .border-last-of-type-primary-2:last-of-type { border-color: $primary-2 !important; }
- .link-primary-2:link { color: $primary-2 !important; }
- .bg-link-primary-2:link { background-color: $primary-2 !important; }
- .border-link-primary-2:link { border-color: $primary-2 !important; }
- .only-of-type-primary-2:only-of-type { color: $primary-2 !important; }
- .bg-only-of-type-primary-2:only-of-type { background-color: $primary-2 !important; }
- .border-only-of-type-primary-2:only-of-type { border-color: $primary-2 !important; }
- .only-child-primary-2:only-child { color: $primary-2 !important; }
- .bg-only-child-primary-2:only-child { background-color: $primary-2 !important; }
- .border-only-child-primary-2:only-child { border-color: $primary-2 !important; }
- .optional-primary-2:optional { color: $primary-2 !important; }
- .bg-optional-primary-2:optional { background-color: $primary-2 !important; }
- .border-optional-primary-2:optional { border-color: $primary-2 !important; }
- .out-of-range-primary-2:out-of-range { color: $primary-2 !important; }
- .bg-out-of-range-primary-2:out-of-range { background-color: $primary-2 !important; }
- .border-out-of-range-primary-2:out-of-range { border-color: $primary-2 !important; }
- .read-only-primary-2:read-only { color: $primary-2 !important; }
- .bg-read-only-primary-2:read-only { background-color: $primary-2 !important; }
- .border-read-only-primary-2:read-only { border-color: $primary-2 !important; }
- .read-write-primary-2:read-write { color: $primary-2 !important; }
- .bg-read-write-primary-2:read-write { background-color: $primary-2 !important; }
- .border-read-write-primary-2:read-write { border-color: $primary-2 !important; }
- .required-primary-2:required { color: $primary-2 !important; }
- .bg-required-primary-2:required { background-color: $primary-2 !important; }
- .border-required-primary-2:required { border-color: $primary-2 !important; }
- .root-primary-2:root { color: $primary-2 !important; }
- .bg-root-primary-2:root { background-color: $primary-2 !important; }
- .border-root-primary-2:root { border-color: $primary-2 !important; }
- .target-primary-2:target { color: $primary-2 !important; }
- .bg-target-primary-2:target { background-color: $primary-2 !important; }
- .border-target-primary-2:target { border-color: $primary-2 !important; }
- .valid-primary-2:valid { color: $primary-2 !important; }
- .bg-valid-primary-2:valid { background-color: $primary-2 !important; }
- .border-valid-primary-2:valid { border-color: $primary-2 !important; }
- .visited-primary-2:visited { color: $primary-2 !important; }
- .bg-visited-primary-2:visited { background-color: $primary-2 !important; }
- .border-visited-primary-2:visited { border-color: $primary-2 !important; }
- .active-primary-3:active { color: $primary-3 !important; }
- .bg-active-primary-3:active { background-color: $primary-3 !important; }
- .border-active-primary-3:active { border-color: $primary-3 !important; }
- .checked-primary-3:checked { color: $primary-3 !important; }
- .bg-checked-primary-3:checked { background-color: $primary-3 !important; }
- .border-checked-primary-3:checked { border-color: $primary-3 !important; }
- .disabled-primary-3:disabled { color: $primary-3 !important; }
- .bg-disabled-primary-3:disabled { background-color: $primary-3 !important; }
- .border-disabled-primary-3:disabled { border-color: $primary-3 !important; }
- .empty-primary-3:empty { color: $primary-3 !important; }
- .bg-empty-primary-3:empty { background-color: $primary-3 !important; }
- .border-empty-primary-3:empty { border-color: $primary-3 !important; }
- .enabled-primary-3:enabled { color: $primary-3 !important; }
- .bg-enabled-primary-3:enabled { background-color: $primary-3 !important; }
- .border-enabled-primary-3:enabled { border-color: $primary-3 !important; }
- .first-child-primary-3:first-child { color: $primary-3 !important; }
- .bg-first-child-primary-3:first-child { background-color: $primary-3 !important; }
- .border-first-child-primary-3:first-child { border-color: $primary-3 !important; }
- .first-of-type-primary-3:first-of-type { color: $primary-3 !important; }
- .bg-first-of-type-primary-3:first-of-type { background-color: $primary-3 !important; }
- .border-first-of-type-primary-3:first-of-type { border-color: $primary-3 !important; }
- .focus-primary-3:focus { color: $primary-3 !important; }
- .bg-focus-primary-3:focus { background-color: $primary-3 !important; }
- .border-focus-primary-3:focus { border-color: $primary-3 !important; }
- .hover-primary-3:hover { color: $primary-3 !important; }
- .bg-hover-primary-3:hover { background-color: $primary-3 !important; }
- .border-hover-primary-3:hover { border-color: $primary-3 !important; }
- .in-range-primary-3:in-range { color: $primary-3 !important; }
- .bg-in-range-primary-3:in-range { background-color: $primary-3 !important; }
- .border-in-range-primary-3:in-range { border-color: $primary-3 !important; }
- .invalid-primary-3:invalid { color: $primary-3 !important; }
- .bg-invalid-primary-3:invalid { background-color: $primary-3 !important; }
- .border-invalid-primary-3:invalid { border-color: $primary-3 !important; }
- .last-child-primary-3:last-child { color: $primary-3 !important; }
- .bg-last-child-primary-3:last-child { background-color: $primary-3 !important; }
- .border-last-child-primary-3:last-child { border-color: $primary-3 !important; }
- .last-of-type-primary-3:last-of-type { color: $primary-3 !important; }
- .bg-last-of-type-primary-3:last-of-type { background-color: $primary-3 !important; }
- .border-last-of-type-primary-3:last-of-type { border-color: $primary-3 !important; }
- .link-primary-3:link { color: $primary-3 !important; }
- .bg-link-primary-3:link { background-color: $primary-3 !important; }
- .border-link-primary-3:link { border-color: $primary-3 !important; }
- .only-of-type-primary-3:only-of-type { color: $primary-3 !important; }
- .bg-only-of-type-primary-3:only-of-type { background-color: $primary-3 !important; }
- .border-only-of-type-primary-3:only-of-type { border-color: $primary-3 !important; }
- .only-child-primary-3:only-child { color: $primary-3 !important; }
- .bg-only-child-primary-3:only-child { background-color: $primary-3 !important; }
- .border-only-child-primary-3:only-child { border-color: $primary-3 !important; }
- .optional-primary-3:optional { color: $primary-3 !important; }
- .bg-optional-primary-3:optional { background-color: $primary-3 !important; }
- .border-optional-primary-3:optional { border-color: $primary-3 !important; }
- .out-of-range-primary-3:out-of-range { color: $primary-3 !important; }
- .bg-out-of-range-primary-3:out-of-range { background-color: $primary-3 !important; }
- .border-out-of-range-primary-3:out-of-range { border-color: $primary-3 !important; }
- .read-only-primary-3:read-only { color: $primary-3 !important; }
- .bg-read-only-primary-3:read-only { background-color: $primary-3 !important; }
- .border-read-only-primary-3:read-only { border-color: $primary-3 !important; }
- .read-write-primary-3:read-write { color: $primary-3 !important; }
- .bg-read-write-primary-3:read-write { background-color: $primary-3 !important; }
- .border-read-write-primary-3:read-write { border-color: $primary-3 !important; }
- .required-primary-3:required { color: $primary-3 !important; }
- .bg-required-primary-3:required { background-color: $primary-3 !important; }
- .border-required-primary-3:required { border-color: $primary-3 !important; }
- .root-primary-3:root { color: $primary-3 !important; }
- .bg-root-primary-3:root { background-color: $primary-3 !important; }
- .border-root-primary-3:root { border-color: $primary-3 !important; }
- .target-primary-3:target { color: $primary-3 !important; }
- .bg-target-primary-3:target { background-color: $primary-3 !important; }
- .border-target-primary-3:target { border-color: $primary-3 !important; }
- .valid-primary-3:valid { color: $primary-3 !important; }
- .bg-valid-primary-3:valid { background-color: $primary-3 !important; }
- .border-valid-primary-3:valid { border-color: $primary-3 !important; }
- .visited-primary-3:visited { color: $primary-3 !important; }
- .bg-visited-primary-3:visited { background-color: $primary-3 !important; }
- .border-visited-primary-3:visited { border-color: $primary-3 !important; }
- .active-primary-4:active { color: $primary-4 !important; }
- .bg-active-primary-4:active { background-color: $primary-4 !important; }
- .border-active-primary-4:active { border-color: $primary-4 !important; }
- .checked-primary-4:checked { color: $primary-4 !important; }
- .bg-checked-primary-4:checked { background-color: $primary-4 !important; }
- .border-checked-primary-4:checked { border-color: $primary-4 !important; }
- .disabled-primary-4:disabled { color: $primary-4 !important; }
- .bg-disabled-primary-4:disabled { background-color: $primary-4 !important; }
- .border-disabled-primary-4:disabled { border-color: $primary-4 !important; }
- .empty-primary-4:empty { color: $primary-4 !important; }
- .bg-empty-primary-4:empty { background-color: $primary-4 !important; }
- .border-empty-primary-4:empty { border-color: $primary-4 !important; }
- .enabled-primary-4:enabled { color: $primary-4 !important; }
- .bg-enabled-primary-4:enabled { background-color: $primary-4 !important; }
- .border-enabled-primary-4:enabled { border-color: $primary-4 !important; }
- .first-child-primary-4:first-child { color: $primary-4 !important; }
- .bg-first-child-primary-4:first-child { background-color: $primary-4 !important; }
- .border-first-child-primary-4:first-child { border-color: $primary-4 !important; }
- .first-of-type-primary-4:first-of-type { color: $primary-4 !important; }
- .bg-first-of-type-primary-4:first-of-type { background-color: $primary-4 !important; }
- .border-first-of-type-primary-4:first-of-type { border-color: $primary-4 !important; }
- .focus-primary-4:focus { color: $primary-4 !important; }
- .bg-focus-primary-4:focus { background-color: $primary-4 !important; }
- .border-focus-primary-4:focus { border-color: $primary-4 !important; }
- .hover-primary-4:hover { color: $primary-4 !important; }
- .bg-hover-primary-4:hover { background-color: $primary-4 !important; }
- .border-hover-primary-4:hover { border-color: $primary-4 !important; }
- .in-range-primary-4:in-range { color: $primary-4 !important; }
- .bg-in-range-primary-4:in-range { background-color: $primary-4 !important; }
- .border-in-range-primary-4:in-range { border-color: $primary-4 !important; }
- .invalid-primary-4:invalid { color: $primary-4 !important; }
- .bg-invalid-primary-4:invalid { background-color: $primary-4 !important; }
- .border-invalid-primary-4:invalid { border-color: $primary-4 !important; }
- .last-child-primary-4:last-child { color: $primary-4 !important; }
- .bg-last-child-primary-4:last-child { background-color: $primary-4 !important; }
- .border-last-child-primary-4:last-child { border-color: $primary-4 !important; }
- .last-of-type-primary-4:last-of-type { color: $primary-4 !important; }
- .bg-last-of-type-primary-4:last-of-type { background-color: $primary-4 !important; }
- .border-last-of-type-primary-4:last-of-type { border-color: $primary-4 !important; }
- .link-primary-4:link { color: $primary-4 !important; }
- .bg-link-primary-4:link { background-color: $primary-4 !important; }
- .border-link-primary-4:link { border-color: $primary-4 !important; }
- .only-of-type-primary-4:only-of-type { color: $primary-4 !important; }
- .bg-only-of-type-primary-4:only-of-type { background-color: $primary-4 !important; }
- .border-only-of-type-primary-4:only-of-type { border-color: $primary-4 !important; }
- .only-child-primary-4:only-child { color: $primary-4 !important; }
- .bg-only-child-primary-4:only-child { background-color: $primary-4 !important; }
- .border-only-child-primary-4:only-child { border-color: $primary-4 !important; }
- .optional-primary-4:optional { color: $primary-4 !important; }
- .bg-optional-primary-4:optional { background-color: $primary-4 !important; }
- .border-optional-primary-4:optional { border-color: $primary-4 !important; }
- .out-of-range-primary-4:out-of-range { color: $primary-4 !important; }
- .bg-out-of-range-primary-4:out-of-range { background-color: $primary-4 !important; }
- .border-out-of-range-primary-4:out-of-range { border-color: $primary-4 !important; }
- .read-only-primary-4:read-only { color: $primary-4 !important; }
- .bg-read-only-primary-4:read-only { background-color: $primary-4 !important; }
- .border-read-only-primary-4:read-only { border-color: $primary-4 !important; }
- .read-write-primary-4:read-write { color: $primary-4 !important; }
- .bg-read-write-primary-4:read-write { background-color: $primary-4 !important; }
- .border-read-write-primary-4:read-write { border-color: $primary-4 !important; }
- .required-primary-4:required { color: $primary-4 !important; }
- .bg-required-primary-4:required { background-color: $primary-4 !important; }
- .border-required-primary-4:required { border-color: $primary-4 !important; }
- .root-primary-4:root { color: $primary-4 !important; }
- .bg-root-primary-4:root { background-color: $primary-4 !important; }
- .border-root-primary-4:root { border-color: $primary-4 !important; }
- .target-primary-4:target { color: $primary-4 !important; }
- .bg-target-primary-4:target { background-color: $primary-4 !important; }
- .border-target-primary-4:target { border-color: $primary-4 !important; }
- .valid-primary-4:valid { color: $primary-4 !important; }
- .bg-valid-primary-4:valid { background-color: $primary-4 !important; }
- .border-valid-primary-4:valid { border-color: $primary-4 !important; }
- .visited-primary-4:visited { color: $primary-4 !important; }
- .bg-visited-primary-4:visited { background-color: $primary-4 !important; }
- .border-visited-primary-4:visited { border-color: $primary-4 !important; }

##### Secondary color 1

- .active-secondary-1-0:active { color: $secondary-1-0 !important; }
- .bg-active-secondary-1-0:active { background-color: $secondary-1-0 !important; }
- .border-active-secondary-1-0:active { border-color: $secondary-1-0 !important; }
- .checked-secondary-1-0:checked { color: $secondary-1-0 !important; }
- .bg-checked-secondary-1-0:checked { background-color: $secondary-1-0 !important; }
- .border-checked-secondary-1-0:checked { border-color: $secondary-1-0 !important; }
- .disabled-secondary-1-0:disabled { color: $secondary-1-0 !important; }
- .bg-disabled-secondary-1-0:disabled { background-color: $secondary-1-0 !important; }
- .border-disabled-secondary-1-0:disabled { border-color: $secondary-1-0 !important; }
- .empty-secondary-1-0:empty { color: $secondary-1-0 !important; }
- .bg-empty-secondary-1-0:empty { background-color: $secondary-1-0 !important; }
- .border-empty-secondary-1-0:empty { border-color: $secondary-1-0 !important; }
- .enabled-secondary-1-0:enabled { color: $secondary-1-0 !important; }
- .bg-enabled-secondary-1-0:enabled { background-color: $secondary-1-0 !important; }
- .border-enabled-secondary-1-0:enabled { border-color: $secondary-1-0 !important; }
- .first-child-secondary-1-0:first-child { color: $secondary-1-0 !important; }
- .bg-first-child-secondary-1-0:first-child { background-color: $secondary-1-0 !important; }
- .border-first-child-secondary-1-0:first-child { border-color: $secondary-1-0 !important; }
- .first-of-type-secondary-1-0:first-of-type { color: $secondary-1-0 !important; }
- .bg-first-of-type-secondary-1-0:first-of-type { background-color: $secondary-1-0 !important; }
- .border-first-of-type-secondary-1-0:first-of-type { border-color: $secondary-1-0 !important; }
- .focus-secondary-1-0:focus { color: $secondary-1-0 !important; }
- .bg-focus-secondary-1-0:focus { background-color: $secondary-1-0 !important; }
- .border-focus-secondary-1-0:focus { border-color: $secondary-1-0 !important; }
- .hover-secondary-1-0:hover { color: $secondary-1-0 !important; }
- .bg-hover-secondary-1-0:hover { background-color: $secondary-1-0 !important; }
- .border-hover-secondary-1-0:hover { border-color: $secondary-1-0 !important; }
- .in-range-secondary-1-0:in-range { color: $secondary-1-0 !important; }
- .bg-in-range-secondary-1-0:in-range { background-color: $secondary-1-0 !important; }
- .border-in-range-secondary-1-0:in-range { border-color: $secondary-1-0 !important; }
- .invalid-secondary-1-0:invalid { color: $secondary-1-0 !important; }
- .bg-invalid-secondary-1-0:invalid { background-color: $secondary-1-0 !important; }
- .border-invalid-secondary-1-0:invalid { border-color: $secondary-1-0 !important; }
- .last-child-secondary-1-0:last-child { color: $secondary-1-0 !important; }
- .bg-last-child-secondary-1-0:last-child { background-color: $secondary-1-0 !important; }
- .border-last-child-secondary-1-0:last-child { border-color: $secondary-1-0 !important; }
- .last-of-type-secondary-1-0:last-of-type { color: $secondary-1-0 !important; }
- .bg-last-of-type-secondary-1-0:last-of-type { background-color: $secondary-1-0 !important; }
- .border-last-of-type-secondary-1-0:last-of-type { border-color: $secondary-1-0 !important; }
- .link-secondary-1-0:link { color: $secondary-1-0 !important; }
- .bg-link-secondary-1-0:link { background-color: $secondary-1-0 !important; }
- .border-link-secondary-1-0:link { border-color: $secondary-1-0 !important; }
- .only-of-type-secondary-1-0:only-of-type { color: $secondary-1-0 !important; }
- .bg-only-of-type-secondary-1-0:only-of-type { background-color: $secondary-1-0 !important; }
- .border-only-of-type-secondary-1-0:only-of-type { border-color: $secondary-1-0 !important; }
- .only-child-secondary-1-0:only-child { color: $secondary-1-0 !important; }
- .bg-only-child-secondary-1-0:only-child { background-color: $secondary-1-0 !important; }
- .border-only-child-secondary-1-0:only-child { border-color: $secondary-1-0 !important; }
- .optional-secondary-1-0:optional { color: $secondary-1-0 !important; }
- .bg-optional-secondary-1-0:optional { background-color: $secondary-1-0 !important; }
- .border-optional-secondary-1-0:optional { border-color: $secondary-1-0 !important; }
- .out-of-range-secondary-1-0:out-of-range { color: $secondary-1-0 !important; }
- .bg-out-of-range-secondary-1-0:out-of-range { background-color: $secondary-1-0 !important; }
- .border-out-of-range-secondary-1-0:out-of-range { border-color: $secondary-1-0 !important; }
- .read-only-secondary-1-0:read-only { color: $secondary-1-0 !important; }
- .bg-read-only-secondary-1-0:read-only { background-color: $secondary-1-0 !important; }
- .border-read-only-secondary-1-0:read-only { border-color: $secondary-1-0 !important; }
- .read-write-secondary-1-0:read-write { color: $secondary-1-0 !important; }
- .bg-read-write-secondary-1-0:read-write { background-color: $secondary-1-0 !important; }
- .border-read-write-secondary-1-0:read-write { border-color: $secondary-1-0 !important; }
- .required-secondary-1-0:required { color: $secondary-1-0 !important; }
- .bg-required-secondary-1-0:required { background-color: $secondary-1-0 !important; }
- .border-required-secondary-1-0:required { border-color: $secondary-1-0 !important; }
- .root-secondary-1-0:root { color: $secondary-1-0 !important; }
- .bg-root-secondary-1-0:root { background-color: $secondary-1-0 !important; }
- .border-root-secondary-1-0:root { border-color: $secondary-1-0 !important; }
- .target-secondary-1-0:target { color: $secondary-1-0 !important; }
- .bg-target-secondary-1-0:target { background-color: $secondary-1-0 !important; }
- .border-target-secondary-1-0:target { border-color: $secondary-1-0 !important; }
- .valid-secondary-1-0:valid { color: $secondary-1-0 !important; }
- .bg-valid-secondary-1-0:valid { background-color: $secondary-1-0 !important; }
- .border-valid-secondary-1-0:valid { border-color: $secondary-1-0 !important; }
- .visited-secondary-1-0:visited { color: $secondary-1-0 !important; }
- .bg-visited-secondary-1-0:visited { background-color: $secondary-1-0 !important; }
- .border-visited-secondary-1-0:visited { border-color: $secondary-1-0 !important; }
- .active-secondary-1-1:active { color: $secondary-1-1 !important; }
- .bg-active-secondary-1-1:active { background-color: $secondary-1-1 !important; }
- .border-active-secondary-1-1:active { border-color: $secondary-1-1 !important; }
- .checked-secondary-1-1:checked { color: $secondary-1-1 !important; }
- .bg-checked-secondary-1-1:checked { background-color: $secondary-1-1 !important; }
- .border-checked-secondary-1-1:checked { border-color: $secondary-1-1 !important; }
- .disabled-secondary-1-1:disabled { color: $secondary-1-1 !important; }
- .bg-disabled-secondary-1-1:disabled { background-color: $secondary-1-1 !important; }
- .border-disabled-secondary-1-1:disabled { border-color: $secondary-1-1 !important; }
- .empty-secondary-1-1:empty { color: $secondary-1-1 !important; }
- .bg-empty-secondary-1-1:empty { background-color: $secondary-1-1 !important; }
- .border-empty-secondary-1-1:empty { border-color: $secondary-1-1 !important; }
- .enabled-secondary-1-1:enabled { color: $secondary-1-1 !important; }
- .bg-enabled-secondary-1-1:enabled { background-color: $secondary-1-1 !important; }
- .border-enabled-secondary-1-1:enabled { border-color: $secondary-1-1 !important; }
- .first-child-secondary-1-1:first-child { color: $secondary-1-1 !important; }
- .bg-first-child-secondary-1-1:first-child { background-color: $secondary-1-1 !important; }
- .border-first-child-secondary-1-1:first-child { border-color: $secondary-1-1 !important; }
- .first-of-type-secondary-1-1:first-of-type { color: $secondary-1-1 !important; }
- .bg-first-of-type-secondary-1-1:first-of-type { background-color: $secondary-1-1 !important; }
- .border-first-of-type-secondary-1-1:first-of-type { border-color: $secondary-1-1 !important; }
- .focus-secondary-1-1:focus { color: $secondary-1-1 !important; }
- .bg-focus-secondary-1-1:focus { background-color: $secondary-1-1 !important; }
- .border-focus-secondary-1-1:focus { border-color: $secondary-1-1 !important; }
- .hover-secondary-1-1:hover { color: $secondary-1-1 !important; }
- .bg-hover-secondary-1-1:hover { background-color: $secondary-1-1 !important; }
- .border-hover-secondary-1-1:hover { border-color: $secondary-1-1 !important; }
- .in-range-secondary-1-1:in-range { color: $secondary-1-1 !important; }
- .bg-in-range-secondary-1-1:in-range { background-color: $secondary-1-1 !important; }
- .border-in-range-secondary-1-1:in-range { border-color: $secondary-1-1 !important; }
- .invalid-secondary-1-1:invalid { color: $secondary-1-1 !important; }
- .bg-invalid-secondary-1-1:invalid { background-color: $secondary-1-1 !important; }
- .border-invalid-secondary-1-1:invalid { border-color: $secondary-1-1 !important; }
- .last-child-secondary-1-1:last-child { color: $secondary-1-1 !important; }
- .bg-last-child-secondary-1-1:last-child { background-color: $secondary-1-1 !important; }
- .border-last-child-secondary-1-1:last-child { border-color: $secondary-1-1 !important; }
- .last-of-type-secondary-1-1:last-of-type { color: $secondary-1-1 !important; }
- .bg-last-of-type-secondary-1-1:last-of-type { background-color: $secondary-1-1 !important; }
- .border-last-of-type-secondary-1-1:last-of-type { border-color: $secondary-1-1 !important; }
- .link-secondary-1-1:link { color: $secondary-1-1 !important; }
- .bg-link-secondary-1-1:link { background-color: $secondary-1-1 !important; }
- .border-link-secondary-1-1:link { border-color: $secondary-1-1 !important; }
- .only-of-type-secondary-1-1:only-of-type { color: $secondary-1-1 !important; }
- .bg-only-of-type-secondary-1-1:only-of-type { background-color: $secondary-1-1 !important; }
- .border-only-of-type-secondary-1-1:only-of-type { border-color: $secondary-1-1 !important; }
- .only-child-secondary-1-1:only-child { color: $secondary-1-1 !important; }
- .bg-only-child-secondary-1-1:only-child { background-color: $secondary-1-1 !important; }
- .border-only-child-secondary-1-1:only-child { border-color: $secondary-1-1 !important; }
- .optional-secondary-1-1:optional { color: $secondary-1-1 !important; }
- .bg-optional-secondary-1-1:optional { background-color: $secondary-1-1 !important; }
- .border-optional-secondary-1-1:optional { border-color: $secondary-1-1 !important; }
- .out-of-range-secondary-1-1:out-of-range { color: $secondary-1-1 !important; }
- .bg-out-of-range-secondary-1-1:out-of-range { background-color: $secondary-1-1 !important; }
- .border-out-of-range-secondary-1-1:out-of-range { border-color: $secondary-1-1 !important; }
- .read-only-secondary-1-1:read-only { color: $secondary-1-1 !important; }
- .bg-read-only-secondary-1-1:read-only { background-color: $secondary-1-1 !important; }
- .border-read-only-secondary-1-1:read-only { border-color: $secondary-1-1 !important; }
- .read-write-secondary-1-1:read-write { color: $secondary-1-1 !important; }
- .bg-read-write-secondary-1-1:read-write { background-color: $secondary-1-1 !important; }
- .border-read-write-secondary-1-1:read-write { border-color: $secondary-1-1 !important; }
- .required-secondary-1-1:required { color: $secondary-1-1 !important; }
- .bg-required-secondary-1-1:required { background-color: $secondary-1-1 !important; }
- .border-required-secondary-1-1:required { border-color: $secondary-1-1 !important; }
- .root-secondary-1-1:root { color: $secondary-1-1 !important; }
- .bg-root-secondary-1-1:root { background-color: $secondary-1-1 !important; }
- .border-root-secondary-1-1:root { border-color: $secondary-1-1 !important; }
- .target-secondary-1-1:target { color: $secondary-1-1 !important; }
- .bg-target-secondary-1-1:target { background-color: $secondary-1-1 !important; }
- .border-target-secondary-1-1:target { border-color: $secondary-1-1 !important; }
- .valid-secondary-1-1:valid { color: $secondary-1-1 !important; }
- .bg-valid-secondary-1-1:valid { background-color: $secondary-1-1 !important; }
- .border-valid-secondary-1-1:valid { border-color: $secondary-1-1 !important; }
- .visited-secondary-1-1:visited { color: $secondary-1-1 !important; }
- .bg-visited-secondary-1-1:visited { background-color: $secondary-1-1 !important; }
- .border-visited-secondary-1-1:visited { border-color: $secondary-1-1 !important; }
- .active-secondary-1-2:active { color: $secondary-1-2 !important; }
- .bg-active-secondary-1-2:active { background-color: $secondary-1-2 !important; }
- .border-active-secondary-1-2:active { border-color: $secondary-1-2 !important; }
- .checked-secondary-1-2:checked { color: $secondary-1-2 !important; }
- .bg-checked-secondary-1-2:checked { background-color: $secondary-1-2 !important; }
- .border-checked-secondary-1-2:checked { border-color: $secondary-1-2 !important; }
- .disabled-secondary-1-2:disabled { color: $secondary-1-2 !important; }
- .bg-disabled-secondary-1-2:disabled { background-color: $secondary-1-2 !important; }
- .border-disabled-secondary-1-2:disabled { border-color: $secondary-1-2 !important; }
- .empty-secondary-1-2:empty { color: $secondary-1-2 !important; }
- .bg-empty-secondary-1-2:empty { background-color: $secondary-1-2 !important; }
- .border-empty-secondary-1-2:empty { border-color: $secondary-1-2 !important; }
- .enabled-secondary-1-2:enabled { color: $secondary-1-2 !important; }
- .bg-enabled-secondary-1-2:enabled { background-color: $secondary-1-2 !important; }
- .border-enabled-secondary-1-2:enabled { border-color: $secondary-1-2 !important; }
- .first-child-secondary-1-2:first-child { color: $secondary-1-2 !important; }
- .bg-first-child-secondary-1-2:first-child { background-color: $secondary-1-2 !important; }
- .border-first-child-secondary-1-2:first-child { border-color: $secondary-1-2 !important; }
- .first-of-type-secondary-1-2:first-of-type { color: $secondary-1-2 !important; }
- .bg-first-of-type-secondary-1-2:first-of-type { background-color: $secondary-1-2 !important; }
- .border-first-of-type-secondary-1-2:first-of-type { border-color: $secondary-1-2 !important; }
- .focus-secondary-1-2:focus { color: $secondary-1-2 !important; }
- .bg-focus-secondary-1-2:focus { background-color: $secondary-1-2 !important; }
- .border-focus-secondary-1-2:focus { border-color: $secondary-1-2 !important; }
- .hover-secondary-1-2:hover { color: $secondary-1-2 !important; }
- .bg-hover-secondary-1-2:hover { background-color: $secondary-1-2 !important; }
- .border-hover-secondary-1-2:hover { border-color: $secondary-1-2 !important; }
- .in-range-secondary-1-2:in-range { color: $secondary-1-2 !important; }
- .bg-in-range-secondary-1-2:in-range { background-color: $secondary-1-2 !important; }
- .border-in-range-secondary-1-2:in-range { border-color: $secondary-1-2 !important; }
- .invalid-secondary-1-2:invalid { color: $secondary-1-2 !important; }
- .bg-invalid-secondary-1-2:invalid { background-color: $secondary-1-2 !important; }
- .border-invalid-secondary-1-2:invalid { border-color: $secondary-1-2 !important; }
- .last-child-secondary-1-2:last-child { color: $secondary-1-2 !important; }
- .bg-last-child-secondary-1-2:last-child { background-color: $secondary-1-2 !important; }
- .border-last-child-secondary-1-2:last-child { border-color: $secondary-1-2 !important; }
- .last-of-type-secondary-1-2:last-of-type { color: $secondary-1-2 !important; }
- .bg-last-of-type-secondary-1-2:last-of-type { background-color: $secondary-1-2 !important; }
- .border-last-of-type-secondary-1-2:last-of-type { border-color: $secondary-1-2 !important; }
- .link-secondary-1-2:link { color: $secondary-1-2 !important; }
- .bg-link-secondary-1-2:link { background-color: $secondary-1-2 !important; }
- .border-link-secondary-1-2:link { border-color: $secondary-1-2 !important; }
- .only-of-type-secondary-1-2:only-of-type { color: $secondary-1-2 !important; }
- .bg-only-of-type-secondary-1-2:only-of-type { background-color: $secondary-1-2 !important; }
- .border-only-of-type-secondary-1-2:only-of-type { border-color: $secondary-1-2 !important; }
- .only-child-secondary-1-2:only-child { color: $secondary-1-2 !important; }
- .bg-only-child-secondary-1-2:only-child { background-color: $secondary-1-2 !important; }
- .border-only-child-secondary-1-2:only-child { border-color: $secondary-1-2 !important; }
- .optional-secondary-1-2:optional { color: $secondary-1-2 !important; }
- .bg-optional-secondary-1-2:optional { background-color: $secondary-1-2 !important; }
- .border-optional-secondary-1-2:optional { border-color: $secondary-1-2 !important; }
- .out-of-range-secondary-1-2:out-of-range { color: $secondary-1-2 !important; }
- .bg-out-of-range-secondary-1-2:out-of-range { background-color: $secondary-1-2 !important; }
- .border-out-of-range-secondary-1-2:out-of-range { border-color: $secondary-1-2 !important; }
- .read-only-secondary-1-2:read-only { color: $secondary-1-2 !important; }
- .bg-read-only-secondary-1-2:read-only { background-color: $secondary-1-2 !important; }
- .border-read-only-secondary-1-2:read-only { border-color: $secondary-1-2 !important; }
- .read-write-secondary-1-2:read-write { color: $secondary-1-2 !important; }
- .bg-read-write-secondary-1-2:read-write { background-color: $secondary-1-2 !important; }
- .border-read-write-secondary-1-2:read-write { border-color: $secondary-1-2 !important; }
- .required-secondary-1-2:required { color: $secondary-1-2 !important; }
- .bg-required-secondary-1-2:required { background-color: $secondary-1-2 !important; }
- .border-required-secondary-1-2:required { border-color: $secondary-1-2 !important; }
- .root-secondary-1-2:root { color: $secondary-1-2 !important; }
- .bg-root-secondary-1-2:root { background-color: $secondary-1-2 !important; }
- .border-root-secondary-1-2:root { border-color: $secondary-1-2 !important; }
- .target-secondary-1-2:target { color: $secondary-1-2 !important; }
- .bg-target-secondary-1-2:target { background-color: $secondary-1-2 !important; }
- .border-target-secondary-1-2:target { border-color: $secondary-1-2 !important; }
- .valid-secondary-1-2:valid { color: $secondary-1-2 !important; }
- .bg-valid-secondary-1-2:valid { background-color: $secondary-1-2 !important; }
- .border-valid-secondary-1-2:valid { border-color: $secondary-1-2 !important; }
- .visited-secondary-1-2:visited { color: $secondary-1-2 !important; }
- .bg-visited-secondary-1-2:visited { background-color: $secondary-1-2 !important; }
- .border-visited-secondary-1-2:visited { border-color: $secondary-1-2 !important; }
- .active-secondary-1-3:active { color: $secondary-1-3 !important; }
- .bg-active-secondary-1-3:active { background-color: $secondary-1-3 !important; }
- .border-active-secondary-1-3:active { border-color: $secondary-1-3 !important; }
- .checked-secondary-1-3:checked { color: $secondary-1-3 !important; }
- .bg-checked-secondary-1-3:checked { background-color: $secondary-1-3 !important; }
- .border-checked-secondary-1-3:checked { border-color: $secondary-1-3 !important; }
- .disabled-secondary-1-3:disabled { color: $secondary-1-3 !important; }
- .bg-disabled-secondary-1-3:disabled { background-color: $secondary-1-3 !important; }
- .border-disabled-secondary-1-3:disabled { border-color: $secondary-1-3 !important; }
- .empty-secondary-1-3:empty { color: $secondary-1-3 !important; }
- .bg-empty-secondary-1-3:empty { background-color: $secondary-1-3 !important; }
- .border-empty-secondary-1-3:empty { border-color: $secondary-1-3 !important; }
- .enabled-secondary-1-3:enabled { color: $secondary-1-3 !important; }
- .bg-enabled-secondary-1-3:enabled { background-color: $secondary-1-3 !important; }
- .border-enabled-secondary-1-3:enabled { border-color: $secondary-1-3 !important; }
- .first-child-secondary-1-3:first-child { color: $secondary-1-3 !important; }
- .bg-first-child-secondary-1-3:first-child { background-color: $secondary-1-3 !important; }
- .border-first-child-secondary-1-3:first-child { border-color: $secondary-1-3 !important; }
- .first-of-type-secondary-1-3:first-of-type { color: $secondary-1-3 !important; }
- .bg-first-of-type-secondary-1-3:first-of-type { background-color: $secondary-1-3 !important; }
- .border-first-of-type-secondary-1-3:first-of-type { border-color: $secondary-1-3 !important; }
- .focus-secondary-1-3:focus { color: $secondary-1-3 !important; }
- .bg-focus-secondary-1-3:focus { background-color: $secondary-1-3 !important; }
- .border-focus-secondary-1-3:focus { border-color: $secondary-1-3 !important; }
- .hover-secondary-1-3:hover { color: $secondary-1-3 !important; }
- .bg-hover-secondary-1-3:hover { background-color: $secondary-1-3 !important; }
- .border-hover-secondary-1-3:hover { border-color: $secondary-1-3 !important; }
- .in-range-secondary-1-3:in-range { color: $secondary-1-3 !important; }
- .bg-in-range-secondary-1-3:in-range { background-color: $secondary-1-3 !important; }
- .border-in-range-secondary-1-3:in-range { border-color: $secondary-1-3 !important; }
- .invalid-secondary-1-3:invalid { color: $secondary-1-3 !important; }
- .bg-invalid-secondary-1-3:invalid { background-color: $secondary-1-3 !important; }
- .border-invalid-secondary-1-3:invalid { border-color: $secondary-1-3 !important; }
- .last-child-secondary-1-3:last-child { color: $secondary-1-3 !important; }
- .bg-last-child-secondary-1-3:last-child { background-color: $secondary-1-3 !important; }
- .border-last-child-secondary-1-3:last-child { border-color: $secondary-1-3 !important; }
- .last-of-type-secondary-1-3:last-of-type { color: $secondary-1-3 !important; }
- .bg-last-of-type-secondary-1-3:last-of-type { background-color: $secondary-1-3 !important; }
- .border-last-of-type-secondary-1-3:last-of-type { border-color: $secondary-1-3 !important; }
- .link-secondary-1-3:link { color: $secondary-1-3 !important; }
- .bg-link-secondary-1-3:link { background-color: $secondary-1-3 !important; }
- .border-link-secondary-1-3:link { border-color: $secondary-1-3 !important; }
- .only-of-type-secondary-1-3:only-of-type { color: $secondary-1-3 !important; }
- .bg-only-of-type-secondary-1-3:only-of-type { background-color: $secondary-1-3 !important; }
- .border-only-of-type-secondary-1-3:only-of-type { border-color: $secondary-1-3 !important; }
- .only-child-secondary-1-3:only-child { color: $secondary-1-3 !important; }
- .bg-only-child-secondary-1-3:only-child { background-color: $secondary-1-3 !important; }
- .border-only-child-secondary-1-3:only-child { border-color: $secondary-1-3 !important; }
- .optional-secondary-1-3:optional { color: $secondary-1-3 !important; }
- .bg-optional-secondary-1-3:optional { background-color: $secondary-1-3 !important; }
- .border-optional-secondary-1-3:optional { border-color: $secondary-1-3 !important; }
- .out-of-range-secondary-1-3:out-of-range { color: $secondary-1-3 !important; }
- .bg-out-of-range-secondary-1-3:out-of-range { background-color: $secondary-1-3 !important; }
- .border-out-of-range-secondary-1-3:out-of-range { border-color: $secondary-1-3 !important; }
- .read-only-secondary-1-3:read-only { color: $secondary-1-3 !important; }
- .bg-read-only-secondary-1-3:read-only { background-color: $secondary-1-3 !important; }
- .border-read-only-secondary-1-3:read-only { border-color: $secondary-1-3 !important; }
- .read-write-secondary-1-3:read-write { color: $secondary-1-3 !important; }
- .bg-read-write-secondary-1-3:read-write { background-color: $secondary-1-3 !important; }
- .border-read-write-secondary-1-3:read-write { border-color: $secondary-1-3 !important; }
- .required-secondary-1-3:required { color: $secondary-1-3 !important; }
- .bg-required-secondary-1-3:required { background-color: $secondary-1-3 !important; }
- .border-required-secondary-1-3:required { border-color: $secondary-1-3 !important; }
- .root-secondary-1-3:root { color: $secondary-1-3 !important; }
- .bg-root-secondary-1-3:root { background-color: $secondary-1-3 !important; }
- .border-root-secondary-1-3:root { border-color: $secondary-1-3 !important; }
- .target-secondary-1-3:target { color: $secondary-1-3 !important; }
- .bg-target-secondary-1-3:target { background-color: $secondary-1-3 !important; }
- .border-target-secondary-1-3:target { border-color: $secondary-1-3 !important; }
- .valid-secondary-1-3:valid { color: $secondary-1-3 !important; }
- .bg-valid-secondary-1-3:valid { background-color: $secondary-1-3 !important; }
- .border-valid-secondary-1-3:valid { border-color: $secondary-1-3 !important; }
- .visited-secondary-1-3:visited { color: $secondary-1-3 !important; }
- .bg-visited-secondary-1-3:visited { background-color: $secondary-1-3 !important; }
- .border-visited-secondary-1-3:visited { border-color: $secondary-1-3 !important; }
- .active-secondary-1-4:active { color: $secondary-1-4!important; }
- .bg-active-secondary-1-4:active { background-color: $secondary-1-4!important; }
- .border-active-secondary-1-4:active { border-color: $secondary-1-4!important; }
- .checked-secondary-1-4:checked { color: $secondary-1-4!important; }
- .bg-checked-secondary-1-4:checked { background-color: $secondary-1-4!important; }
- .border-checked-secondary-1-4:checked { border-color: $secondary-1-4!important; }
- .disabled-secondary-1-4:disabled { color: $secondary-1-4!important; }
- .bg-disabled-secondary-1-4:disabled { background-color: $secondary-1-4!important; }
- .border-disabled-secondary-1-4:disabled { border-color: $secondary-1-4!important; }
- .empty-secondary-1-4:empty { color: $secondary-1-4!important; }
- .bg-empty-secondary-1-4:empty { background-color: $secondary-1-4!important; }
- .border-empty-secondary-1-4:empty { border-color: $secondary-1-4!important; }
- .enabled-secondary-1-4:enabled { color: $secondary-1-4!important; }
- .bg-enabled-secondary-1-4:enabled { background-color: $secondary-1-4!important; }
- .border-enabled-secondary-1-4:enabled { border-color: $secondary-1-4!important; }
- .first-child-secondary-1-4:first-child { color: $secondary-1-4!important; }
- .bg-first-child-secondary-1-4:first-child { background-color: $secondary-1-4!important; }
- .border-first-child-secondary-1-4:first-child { border-color: $secondary-1-4!important; }
- .first-of-type-secondary-1-4:first-of-type { color: $secondary-1-4!important; }
- .bg-first-of-type-secondary-1-4:first-of-type { background-color: $secondary-1-4!important; }
- .border-first-of-type-secondary-1-4:first-of-type { border-color: $secondary-1-4!important; }
- .focus-secondary-1-4:focus { color: $secondary-1-4!important; }
- .bg-focus-secondary-1-4:focus { background-color: $secondary-1-4!important; }
- .border-focus-secondary-1-4:focus { border-color: $secondary-1-4!important; }
- .hover-secondary-1-4:hover { color: $secondary-1-4!important; }
- .bg-hover-secondary-1-4:hover { background-color: $secondary-1-4!important; }
- .border-hover-secondary-1-4:hover { border-color: $secondary-1-4!important; }
- .in-range-secondary-1-4:in-range { color: $secondary-1-4!important; }
- .bg-in-range-secondary-1-4:in-range { background-color: $secondary-1-4!important; }
- .border-in-range-secondary-1-4:in-range { border-color: $secondary-1-4!important; }
- .invalid-secondary-1-4:invalid { color: $secondary-1-4!important; }
- .bg-invalid-secondary-1-4:invalid { background-color: $secondary-1-4!important; }
- .border-invalid-secondary-1-4:invalid { border-color: $secondary-1-4!important; }
- .last-child-secondary-1-4:last-child { color: $secondary-1-4!important; }
- .bg-last-child-secondary-1-4:last-child { background-color: $secondary-1-4!important; }
- .border-last-child-secondary-1-4:last-child { border-color: $secondary-1-4!important; }
- .last-of-type-secondary-1-4:last-of-type { color: $secondary-1-4!important; }
- .bg-last-of-type-secondary-1-4:last-of-type { background-color: $secondary-1-4!important; }
- .border-last-of-type-secondary-1-4:last-of-type { border-color: $secondary-1-4!important; }
- .link-secondary-1-4:link { color: $secondary-1-4!important; }
- .bg-link-secondary-1-4:link { background-color: $secondary-1-4!important; }
- .border-link-secondary-1-4:link { border-color: $secondary-1-4!important; }
- .only-of-type-secondary-1-4:only-of-type { color: $secondary-1-4!important; }
- .bg-only-of-type-secondary-1-4:only-of-type { background-color: $secondary-1-4!important; }
- .border-only-of-type-secondary-1-4:only-of-type { border-color: $secondary-1-4!important; }
- .only-child-secondary-1-4:only-child { color: $secondary-1-4!important; }
- .bg-only-child-secondary-1-4:only-child { background-color: $secondary-1-4!important; }
- .border-only-child-secondary-1-4:only-child { border-color: $secondary-1-4!important; }
- .optional-secondary-1-4:optional { color: $secondary-1-4!important; }
- .bg-optional-secondary-1-4:optional { background-color: $secondary-1-4!important; }
- .border-optional-secondary-1-4:optional { border-color: $secondary-1-4!important; }
- .out-of-range-secondary-1-4:out-of-range { color: $secondary-1-4!important; }
- .bg-out-of-range-secondary-1-4:out-of-range { background-color: $secondary-1-4!important; }
- .border-out-of-range-secondary-1-4:out-of-range { border-color: $secondary-1-4!important; }
- .read-only-secondary-1-4:read-only { color: $secondary-1-4!important; }
- .bg-read-only-secondary-1-4:read-only { background-color: $secondary-1-4!important; }
- .border-read-only-secondary-1-4:read-only { border-color: $secondary-1-4!important; }
- .read-write-secondary-1-4:read-write { color: $secondary-1-4!important; }
- .bg-read-write-secondary-1-4:read-write { background-color: $secondary-1-4!important; }
- .border-read-write-secondary-1-4:read-write { border-color: $secondary-1-4!important; }
- .required-secondary-1-4:required { color: $secondary-1-4!important; }
- .bg-required-secondary-1-4:required { background-color: $secondary-1-4!important; }
- .border-required-secondary-1-4:required { border-color: $secondary-1-4!important; }
- .root-secondary-1-4:root { color: $secondary-1-4!important; }
- .bg-root-secondary-1-4:root { background-color: $secondary-1-4!important; }
- .border-root-secondary-1-4:root { border-color: $secondary-1-4!important; }
- .target-secondary-1-4:target { color: $secondary-1-4!important; }
- .bg-target-secondary-1-4:target { background-color: $secondary-1-4!important; }
- .border-target-secondary-1-4:target { border-color: $secondary-1-4!important; }
- .valid-secondary-1-4:valid { color: $secondary-1-4!important; }
- .bg-valid-secondary-1-4:valid { background-color: $secondary-1-4!important; }
- .border-valid-secondary-1-4:valid { border-color: $secondary-1-4!important; }
- .visited-secondary-1-4:visited { color: $secondary-1-4!important; }
- .bg-visited-secondary-1-4:visited { background-color: $secondary-1-4!important; }
- .border-visited-secondary-1-4:visited { border-color: $secondary-1-4!important; }

##### Secondary color 2

- .active-secondary-2-0:active { color: $secondary-2-0 !important; }
- .bg-active-secondary-2-0:active { background-color: $secondary-2-0 !important; }
- .border-active-secondary-2-0:active { border-color: $secondary-2-0 !important; }
- .checked-secondary-2-0:checked { color: $secondary-2-0 !important; }
- .bg-checked-secondary-2-0:checked { background-color: $secondary-2-0 !important; }
- .border-checked-secondary-2-0:checked { border-color: $secondary-2-0 !important; }
- .disabled-secondary-2-0:disabled { color: $secondary-2-0 !important; }
- .bg-disabled-secondary-2-0:disabled { background-color: $secondary-2-0 !important; }
- .border-disabled-secondary-2-0:disabled { border-color: $secondary-2-0 !important; }
- .empty-secondary-2-0:empty { color: $secondary-2-0 !important; }
- .bg-empty-secondary-2-0:empty { background-color: $secondary-2-0 !important; }
- .border-empty-secondary-2-0:empty { border-color: $secondary-2-0 !important; }
- .enabled-secondary-2-0:enabled { color: $secondary-2-0 !important; }
- .bg-enabled-secondary-2-0:enabled { background-color: $secondary-2-0 !important; }
- .border-enabled-secondary-2-0:enabled { border-color: $secondary-2-0 !important; }
- .first-child-secondary-2-0:first-child { color: $secondary-2-0 !important; }
- .bg-first-child-secondary-2-0:first-child { background-color: $secondary-2-0 !important; }
- .border-first-child-secondary-2-0:first-child { border-color: $secondary-2-0 !important; }
- .first-of-type-secondary-2-0:first-of-type { color: $secondary-2-0 !important; }
- .bg-first-of-type-secondary-2-0:first-of-type { background-color: $secondary-2-0 !important; }
- .border-first-of-type-secondary-2-0:first-of-type { border-color: $secondary-2-0 !important; }
- .focus-secondary-2-0:focus { color: $secondary-2-0 !important; }
- .bg-focus-secondary-2-0:focus { background-color: $secondary-2-0 !important; }
- .border-focus-secondary-2-0:focus { border-color: $secondary-2-0 !important; }
- .hover-secondary-2-0:hover { color: $secondary-2-0 !important; }
- .bg-hover-secondary-2-0:hover { background-color: $secondary-2-0 !important; }
- .border-hover-secondary-2-0:hover { border-color: $secondary-2-0 !important; }
- .in-range-secondary-2-0:in-range { color: $secondary-2-0 !important; }
- .bg-in-range-secondary-2-0:in-range { background-color: $secondary-2-0 !important; }
- .border-in-range-secondary-2-0:in-range { border-color: $secondary-2-0 !important; }
- .invalid-secondary-2-0:invalid { color: $secondary-2-0 !important; }
- .bg-invalid-secondary-2-0:invalid { background-color: $secondary-2-0 !important; }
- .border-invalid-secondary-2-0:invalid { border-color: $secondary-2-0 !important; }
- .last-child-secondary-2-0:last-child { color: $secondary-2-0 !important; }
- .bg-last-child-secondary-2-0:last-child { background-color: $secondary-2-0 !important; }
- .border-last-child-secondary-2-0:last-child { border-color: $secondary-2-0 !important; }
- .last-of-type-secondary-2-0:last-of-type { color: $secondary-2-0 !important; }
- .bg-last-of-type-secondary-2-0:last-of-type { background-color: $secondary-2-0 !important; }
- .border-last-of-type-secondary-2-0:last-of-type { border-color: $secondary-2-0 !important; }
- .link-secondary-2-0:link { color: $secondary-2-0 !important; }
- .bg-link-secondary-2-0:link { background-color: $secondary-2-0 !important; }
- .border-link-secondary-2-0:link { border-color: $secondary-2-0 !important; }
- .only-of-type-secondary-2-0:only-of-type { color: $secondary-2-0 !important; }
- .bg-only-of-type-secondary-2-0:only-of-type { background-color: $secondary-2-0 !important; }
- .border-only-of-type-secondary-2-0:only-of-type { border-color: $secondary-2-0 !important; }
- .only-child-secondary-2-0:only-child { color: $secondary-2-0 !important; }
- .bg-only-child-secondary-2-0:only-child { background-color: $secondary-2-0 !important; }
- .border-only-child-secondary-2-0:only-child { border-color: $secondary-2-0 !important; }
- .optional-secondary-2-0:optional { color: $secondary-2-0 !important; }
- .bg-optional-secondary-2-0:optional { background-color: $secondary-2-0 !important; }
- .border-optional-secondary-2-0:optional { border-color: $secondary-2-0 !important; }
- .out-of-range-secondary-2-0:out-of-range { color: $secondary-2-0 !important; }
- .bg-out-of-range-secondary-2-0:out-of-range { background-color: $secondary-2-0 !important; }
- .border-out-of-range-secondary-2-0:out-of-range { border-color: $secondary-2-0 !important; }
- .read-only-secondary-2-0:read-only { color: $secondary-2-0 !important; }
- .bg-read-only-secondary-2-0:read-only { background-color: $secondary-2-0 !important; }
- .border-read-only-secondary-2-0:read-only { border-color: $secondary-2-0 !important; }
- .read-write-secondary-2-0:read-write { color: $secondary-2-0 !important; }
- .bg-read-write-secondary-2-0:read-write { background-color: $secondary-2-0 !important; }
- .border-read-write-secondary-2-0:read-write { border-color: $secondary-2-0 !important; }
- .required-secondary-2-0:required { color: $secondary-2-0 !important; }
- .bg-required-secondary-2-0:required { background-color: $secondary-2-0 !important; }
- .border-required-secondary-2-0:required { border-color: $secondary-2-0 !important; }
- .root-secondary-2-0:root { color: $secondary-2-0 !important; }
- .bg-root-secondary-2-0:root { background-color: $secondary-2-0 !important; }
- .border-root-secondary-2-0:root { border-color: $secondary-2-0 !important; }
- .target-secondary-2-0:target { color: $secondary-2-0 !important; }
- .bg-target-secondary-2-0:target { background-color: $secondary-2-0 !important; }
- .border-target-secondary-2-0:target { border-color: $secondary-2-0 !important; }
- .valid-secondary-2-0:valid { color: $secondary-2-0 !important; }
- .bg-valid-secondary-2-0:valid { background-color: $secondary-2-0 !important; }
- .border-valid-secondary-2-0:valid { border-color: $secondary-2-0 !important; }
- .visited-secondary-2-0:visited { color: $secondary-2-0 !important; }
- .bg-visited-secondary-2-0:visited { background-color: $secondary-2-0 !important; }
- .border-visited-secondary-2-0:visited { border-color: $secondary-2-0 !important; }
- .active-secondary-2-1:active { color: $secondary-2-1 !important; }
- .bg-active-secondary-2-1:active { background-color: $secondary-2-1 !important; }
- .border-active-secondary-2-1:active { border-color: $secondary-2-1 !important; }
- .checked-secondary-2-1:checked { color: $secondary-2-1 !important; }
- .bg-checked-secondary-2-1:checked { background-color: $secondary-2-1 !important; }
- .border-checked-secondary-2-1:checked { border-color: $secondary-2-1 !important; }
- .disabled-secondary-2-1:disabled { color: $secondary-2-1 !important; }
- .bg-disabled-secondary-2-1:disabled { background-color: $secondary-2-1 !important; }
- .border-disabled-secondary-2-1:disabled { border-color: $secondary-2-1 !important; }
- .empty-secondary-2-1:empty { color: $secondary-2-1 !important; }
- .bg-empty-secondary-2-1:empty { background-color: $secondary-2-1 !important; }
- .border-empty-secondary-2-1:empty { border-color: $secondary-2-1 !important; }
- .enabled-secondary-2-1:enabled { color: $secondary-2-1 !important; }
- .bg-enabled-secondary-2-1:enabled { background-color: $secondary-2-1 !important; }
- .border-enabled-secondary-2-1:enabled { border-color: $secondary-2-1 !important; }
- .first-child-secondary-2-1:first-child { color: $secondary-2-1 !important; }
- .bg-first-child-secondary-2-1:first-child { background-color: $secondary-2-1 !important; }
- .border-first-child-secondary-2-1:first-child { border-color: $secondary-2-1 !important; }
- .first-of-type-secondary-2-1:first-of-type { color: $secondary-2-1 !important; }
- .bg-first-of-type-secondary-2-1:first-of-type { background-color: $secondary-2-1 !important; }
- .border-first-of-type-secondary-2-1:first-of-type { border-color: $secondary-2-1 !important; }
- .focus-secondary-2-1:focus { color: $secondary-2-1 !important; }
- .bg-focus-secondary-2-1:focus { background-color: $secondary-2-1 !important; }
- .border-focus-secondary-2-1:focus { border-color: $secondary-2-1 !important; }
- .hover-secondary-2-1:hover { color: $secondary-2-1 !important; }
- .bg-hover-secondary-2-1:hover { background-color: $secondary-2-1 !important; }
- .border-hover-secondary-2-1:hover { border-color: $secondary-2-1 !important; }
- .in-range-secondary-2-1:in-range { color: $secondary-2-1 !important; }
- .bg-in-range-secondary-2-1:in-range { background-color: $secondary-2-1 !important; }
- .border-in-range-secondary-2-1:in-range { border-color: $secondary-2-1 !important; }
- .invalid-secondary-2-1:invalid { color: $secondary-2-1 !important; }
- .bg-invalid-secondary-2-1:invalid { background-color: $secondary-2-1 !important; }
- .border-invalid-secondary-2-1:invalid { border-color: $secondary-2-1 !important; }
- .last-child-secondary-2-1:last-child { color: $secondary-2-1 !important; }
- .bg-last-child-secondary-2-1:last-child { background-color: $secondary-2-1 !important; }
- .border-last-child-secondary-2-1:last-child { border-color: $secondary-2-1 !important; }
- .last-of-type-secondary-2-1:last-of-type { color: $secondary-2-1 !important; }
- .bg-last-of-type-secondary-2-1:last-of-type { background-color: $secondary-2-1 !important; }
- .border-last-of-type-secondary-2-1:last-of-type { border-color: $secondary-2-1 !important; }
- .link-secondary-2-1:link { color: $secondary-2-1 !important; }
- .bg-link-secondary-2-1:link { background-color: $secondary-2-1 !important; }
- .border-link-secondary-2-1:link { border-color: $secondary-2-1 !important; }
- .only-of-type-secondary-2-1:only-of-type { color: $secondary-2-1 !important; }
- .bg-only-of-type-secondary-2-1:only-of-type { background-color: $secondary-2-1 !important; }
- .border-only-of-type-secondary-2-1:only-of-type { border-color: $secondary-2-1 !important; }
- .only-child-secondary-2-1:only-child { color: $secondary-2-1 !important; }
- .bg-only-child-secondary-2-1:only-child { background-color: $secondary-2-1 !important; }
- .border-only-child-secondary-2-1:only-child { border-color: $secondary-2-1 !important; }
- .optional-secondary-2-1:optional { color: $secondary-2-1 !important; }
- .bg-optional-secondary-2-1:optional { background-color: $secondary-2-1 !important; }
- .border-optional-secondary-2-1:optional { border-color: $secondary-2-1 !important; }
- .out-of-range-secondary-2-1:out-of-range { color: $secondary-2-1 !important; }
- .bg-out-of-range-secondary-2-1:out-of-range { background-color: $secondary-2-1 !important; }
- .border-out-of-range-secondary-2-1:out-of-range { border-color: $secondary-2-1 !important; }
- .read-only-secondary-2-1:read-only { color: $secondary-2-1 !important; }
- .bg-read-only-secondary-2-1:read-only { background-color: $secondary-2-1 !important; }
- .border-read-only-secondary-2-1:read-only { border-color: $secondary-2-1 !important; }
- .read-write-secondary-2-1:read-write { color: $secondary-2-1 !important; }
- .bg-read-write-secondary-2-1:read-write { background-color: $secondary-2-1 !important; }
- .border-read-write-secondary-2-1:read-write { border-color: $secondary-2-1 !important; }
- .required-secondary-2-1:required { color: $secondary-2-1 !important; }
- .bg-required-secondary-2-1:required { background-color: $secondary-2-1 !important; }
- .border-required-secondary-2-1:required { border-color: $secondary-2-1 !important; }
- .root-secondary-2-1:root { color: $secondary-2-1 !important; }
- .bg-root-secondary-2-1:root { background-color: $secondary-2-1 !important; }
- .border-root-secondary-2-1:root { border-color: $secondary-2-1 !important; }
- .target-secondary-2-1:target { color: $secondary-2-1 !important; }
- .bg-target-secondary-2-1:target { background-color: $secondary-2-1 !important; }
- .border-target-secondary-2-1:target { border-color: $secondary-2-1 !important; }
- .valid-secondary-2-1:valid { color: $secondary-2-1 !important; }
- .bg-valid-secondary-2-1:valid { background-color: $secondary-2-1 !important; }
- .border-valid-secondary-2-1:valid { border-color: $secondary-2-1 !important; }
- .visited-secondary-2-1:visited { color: $secondary-2-1 !important; }
- .bg-visited-secondary-2-1:visited { background-color: $secondary-2-1 !important; }
- .border-visited-secondary-2-1:visited { border-color: $secondary-2-1 !important; }
- .active-secondary-2-2:active { color: $secondary-2-2 !important; }
- .bg-active-secondary-2-2:active { background-color: $secondary-2-2 !important; }
- .border-active-secondary-2-2:active { border-color: $secondary-2-2 !important; }
- .checked-secondary-2-2:checked { color: $secondary-2-2 !important; }
- .bg-checked-secondary-2-2:checked { background-color: $secondary-2-2 !important; }
- .border-checked-secondary-2-2:checked { border-color: $secondary-2-2 !important; }
- .disabled-secondary-2-2:disabled { color: $secondary-2-2 !important; }
- .bg-disabled-secondary-2-2:disabled { background-color: $secondary-2-2 !important; }
- .border-disabled-secondary-2-2:disabled { border-color: $secondary-2-2 !important; }
- .empty-secondary-2-2:empty { color: $secondary-2-2 !important; }
- .bg-empty-secondary-2-2:empty { background-color: $secondary-2-2 !important; }
- .border-empty-secondary-2-2:empty { border-color: $secondary-2-2 !important; }
- .enabled-secondary-2-2:enabled { color: $secondary-2-2 !important; }
- .bg-enabled-secondary-2-2:enabled { background-color: $secondary-2-2 !important; }
- .border-enabled-secondary-2-2:enabled { border-color: $secondary-2-2 !important; }
- .first-child-secondary-2-2:first-child { color: $secondary-2-2 !important; }
- .bg-first-child-secondary-2-2:first-child { background-color: $secondary-2-2 !important; }
- .border-first-child-secondary-2-2:first-child { border-color: $secondary-2-2 !important; }
- .first-of-type-secondary-2-2:first-of-type { color: $secondary-2-2 !important; }
- .bg-first-of-type-secondary-2-2:first-of-type { background-color: $secondary-2-2 !important; }
- .border-first-of-type-secondary-2-2:first-of-type { border-color: $secondary-2-2 !important; }
- .focus-secondary-2-2:focus { color: $secondary-2-2 !important; }
- .bg-focus-secondary-2-2:focus { background-color: $secondary-2-2 !important; }
- .border-focus-secondary-2-2:focus { border-color: $secondary-2-2 !important; }
- .hover-secondary-2-2:hover { color: $secondary-2-2 !important; }
- .bg-hover-secondary-2-2:hover { background-color: $secondary-2-2 !important; }
- .border-hover-secondary-2-2:hover { border-color: $secondary-2-2 !important; }
- .in-range-secondary-2-2:in-range { color: $secondary-2-2 !important; }
- .bg-in-range-secondary-2-2:in-range { background-color: $secondary-2-2 !important; }
- .border-in-range-secondary-2-2:in-range { border-color: $secondary-2-2 !important; }
- .invalid-secondary-2-2:invalid { color: $secondary-2-2 !important; }
- .bg-invalid-secondary-2-2:invalid { background-color: $secondary-2-2 !important; }
- .border-invalid-secondary-2-2:invalid { border-color: $secondary-2-2 !important; }
- .last-child-secondary-2-2:last-child { color: $secondary-2-2 !important; }
- .bg-last-child-secondary-2-2:last-child { background-color: $secondary-2-2 !important; }
- .border-last-child-secondary-2-2:last-child { border-color: $secondary-2-2 !important; }
- .last-of-type-secondary-2-2:last-of-type { color: $secondary-2-2 !important; }
- .bg-last-of-type-secondary-2-2:last-of-type { background-color: $secondary-2-2 !important; }
- .border-last-of-type-secondary-2-2:last-of-type { border-color: $secondary-2-2 !important; }
- .link-secondary-2-2:link { color: $secondary-2-2 !important; }
- .bg-link-secondary-2-2:link { background-color: $secondary-2-2 !important; }
- .border-link-secondary-2-2:link { border-color: $secondary-2-2 !important; }
- .only-of-type-secondary-2-2:only-of-type { color: $secondary-2-2 !important; }
- .bg-only-of-type-secondary-2-2:only-of-type { background-color: $secondary-2-2 !important; }
- .border-only-of-type-secondary-2-2:only-of-type { border-color: $secondary-2-2 !important; }
- .only-child-secondary-2-2:only-child { color: $secondary-2-2 !important; }
- .bg-only-child-secondary-2-2:only-child { background-color: $secondary-2-2 !important; }
- .border-only-child-secondary-2-2:only-child { border-color: $secondary-2-2 !important; }
- .optional-secondary-2-2:optional { color: $secondary-2-2 !important; }
- .bg-optional-secondary-2-2:optional { background-color: $secondary-2-2 !important; }
- .border-optional-secondary-2-2:optional { border-color: $secondary-2-2 !important; }
- .out-of-range-secondary-2-2:out-of-range { color: $secondary-2-2 !important; }
- .bg-out-of-range-secondary-2-2:out-of-range { background-color: $secondary-2-2 !important; }
- .border-out-of-range-secondary-2-2:out-of-range { border-color: $secondary-2-2 !important; }
- .read-only-secondary-2-2:read-only { color: $secondary-2-2 !important; }
- .bg-read-only-secondary-2-2:read-only { background-color: $secondary-2-2 !important; }
- .border-read-only-secondary-2-2:read-only { border-color: $secondary-2-2 !important; }
- .read-write-secondary-2-2:read-write { color: $secondary-2-2 !important; }
- .bg-read-write-secondary-2-2:read-write { background-color: $secondary-2-2 !important; }
- .border-read-write-secondary-2-2:read-write { border-color: $secondary-2-2 !important; }
- .required-secondary-2-2:required { color: $secondary-2-2 !important; }
- .bg-required-secondary-2-2:required { background-color: $secondary-2-2 !important; }
- .border-required-secondary-2-2:required { border-color: $secondary-2-2 !important; }
- .root-secondary-2-2:root { color: $secondary-2-2 !important; }
- .bg-root-secondary-2-2:root { background-color: $secondary-2-2 !important; }
- .border-root-secondary-2-2:root { border-color: $secondary-2-2 !important; }
- .target-secondary-2-2:target { color: $secondary-2-2 !important; }
- .bg-target-secondary-2-2:target { background-color: $secondary-2-2 !important; }
- .border-target-secondary-2-2:target { border-color: $secondary-2-2 !important; }
- .valid-secondary-2-2:valid { color: $secondary-2-2 !important; }
- .bg-valid-secondary-2-2:valid { background-color: $secondary-2-2 !important; }
- .border-valid-secondary-2-2:valid { border-color: $secondary-2-2 !important; }
- .visited-secondary-2-2:visited { color: $secondary-2-2 !important; }
- .bg-visited-secondary-2-2:visited { background-color: $secondary-2-2 !important; }
- .border-visited-secondary-2-2:visited { border-color: $secondary-2-2 !important; }
- .active-secondary-2-3:active { color: $secondary-2-3 !important; }
- .bg-active-secondary-2-3:active { background-color: $secondary-2-3 !important; }
- .border-active-secondary-2-3:active { border-color: $secondary-2-3 !important; }
- .checked-secondary-2-3:checked { color: $secondary-2-3 !important; }
- .bg-checked-secondary-2-3:checked { background-color: $secondary-2-3 !important; }
- .border-checked-secondary-2-3:checked { border-color: $secondary-2-3 !important; }
- .disabled-secondary-2-3:disabled { color: $secondary-2-3 !important; }
- .bg-disabled-secondary-2-3:disabled { background-color: $secondary-2-3 !important; }
- .border-disabled-secondary-2-3:disabled { border-color: $secondary-2-3 !important; }
- .empty-secondary-2-3:empty { color: $secondary-2-3 !important; }
- .bg-empty-secondary-2-3:empty { background-color: $secondary-2-3 !important; }
- .border-empty-secondary-2-3:empty { border-color: $secondary-2-3 !important; }
- .enabled-secondary-2-3:enabled { color: $secondary-2-3 !important; }
- .bg-enabled-secondary-2-3:enabled { background-color: $secondary-2-3 !important; }
- .border-enabled-secondary-2-3:enabled { border-color: $secondary-2-3 !important; }
- .first-child-secondary-2-3:first-child { color: $secondary-2-3 !important; }
- .bg-first-child-secondary-2-3:first-child { background-color: $secondary-2-3 !important; }
- .border-first-child-secondary-2-3:first-child { border-color: $secondary-2-3 !important; }
- .first-of-type-secondary-2-3:first-of-type { color: $secondary-2-3 !important; }
- .bg-first-of-type-secondary-2-3:first-of-type { background-color: $secondary-2-3 !important; }
- .border-first-of-type-secondary-2-3:first-of-type { border-color: $secondary-2-3 !important; }
- .focus-secondary-2-3:focus { color: $secondary-2-3 !important; }
- .bg-focus-secondary-2-3:focus { background-color: $secondary-2-3 !important; }
- .border-focus-secondary-2-3:focus { border-color: $secondary-2-3 !important; }
- .hover-secondary-2-3:hover { color: $secondary-2-3 !important; }
- .bg-hover-secondary-2-3:hover { background-color: $secondary-2-3 !important; }
- .border-hover-secondary-2-3:hover { border-color: $secondary-2-3 !important; }
- .in-range-secondary-2-3:in-range { color: $secondary-2-3 !important; }
- .bg-in-range-secondary-2-3:in-range { background-color: $secondary-2-3 !important; }
- .border-in-range-secondary-2-3:in-range { border-color: $secondary-2-3 !important; }
- .invalid-secondary-2-3:invalid { color: $secondary-2-3 !important; }
- .bg-invalid-secondary-2-3:invalid { background-color: $secondary-2-3 !important; }
- .border-invalid-secondary-2-3:invalid { border-color: $secondary-2-3 !important; }
- .last-child-secondary-2-3:last-child { color: $secondary-2-3 !important; }
- .bg-last-child-secondary-2-3:last-child { background-color: $secondary-2-3 !important; }
- .border-last-child-secondary-2-3:last-child { border-color: $secondary-2-3 !important; }
- .last-of-type-secondary-2-3:last-of-type { color: $secondary-2-3 !important; }
- .bg-last-of-type-secondary-2-3:last-of-type { background-color: $secondary-2-3 !important; }
- .border-last-of-type-secondary-2-3:last-of-type { border-color: $secondary-2-3 !important; }
- .link-secondary-2-3:link { color: $secondary-2-3 !important; }
- .bg-link-secondary-2-3:link { background-color: $secondary-2-3 !important; }
- .border-link-secondary-2-3:link { border-color: $secondary-2-3 !important; }
- .only-of-type-secondary-2-3:only-of-type { color: $secondary-2-3 !important; }
- .bg-only-of-type-secondary-2-3:only-of-type { background-color: $secondary-2-3 !important; }
- .border-only-of-type-secondary-2-3:only-of-type { border-color: $secondary-2-3 !important; }
- .only-child-secondary-2-3:only-child { color: $secondary-2-3 !important; }
- .bg-only-child-secondary-2-3:only-child { background-color: $secondary-2-3 !important; }
- .border-only-child-secondary-2-3:only-child { border-color: $secondary-2-3 !important; }
- .optional-secondary-2-3:optional { color: $secondary-2-3 !important; }
- .bg-optional-secondary-2-3:optional { background-color: $secondary-2-3 !important; }
- .border-optional-secondary-2-3:optional { border-color: $secondary-2-3 !important; }
- .out-of-range-secondary-2-3:out-of-range { color: $secondary-2-3 !important; }
- .bg-out-of-range-secondary-2-3:out-of-range { background-color: $secondary-2-3 !important; }
- .border-out-of-range-secondary-2-3:out-of-range { border-color: $secondary-2-3 !important; }
- .read-only-secondary-2-3:read-only { color: $secondary-2-3 !important; }
- .bg-read-only-secondary-2-3:read-only { background-color: $secondary-2-3 !important; }
- .border-read-only-secondary-2-3:read-only { border-color: $secondary-2-3 !important; }
- .read-write-secondary-2-3:read-write { color: $secondary-2-3 !important; }
- .bg-read-write-secondary-2-3:read-write { background-color: $secondary-2-3 !important; }
- .border-read-write-secondary-2-3:read-write { border-color: $secondary-2-3 !important; }
- .required-secondary-2-3:required { color: $secondary-2-3 !important; }
- .bg-required-secondary-2-3:required { background-color: $secondary-2-3 !important; }
- .border-required-secondary-2-3:required { border-color: $secondary-2-3 !important; }
- .root-secondary-2-3:root { color: $secondary-2-3 !important; }
- .bg-root-secondary-2-3:root { background-color: $secondary-2-3 !important; }
- .border-root-secondary-2-3:root { border-color: $secondary-2-3 !important; }
- .target-secondary-2-3:target { color: $secondary-2-3 !important; }
- .bg-target-secondary-2-3:target { background-color: $secondary-2-3 !important; }
- .border-target-secondary-2-3:target { border-color: $secondary-2-3 !important; }
- .valid-secondary-2-3:valid { color: $secondary-2-3 !important; }
- .bg-valid-secondary-2-3:valid { background-color: $secondary-2-3 !important; }
- .border-valid-secondary-2-3:valid { border-color: $secondary-2-3 !important; }
- .visited-secondary-2-3:visited { color: $secondary-2-3 !important; }
- .bg-visited-secondary-2-3:visited { background-color: $secondary-2-3 !important; }
- .border-visited-secondary-2-3:visited { border-color: $secondary-2-3 !important; }
- .active-secondary-2-4:active { color: $secondary-2-4 !important; }
- .bg-active-secondary-2-4:active { background-color: $secondary-2-4 !important; }
- .border-active-secondary-2-4:active { border-color: $secondary-2-4 !important; }
- .checked-secondary-2-4:checked { color: $secondary-2-4 !important; }
- .bg-checked-secondary-2-4:checked { background-color: $secondary-2-4 !important; }
- .border-checked-secondary-2-4:checked { border-color: $secondary-2-4 !important; }
- .disabled-secondary-2-4:disabled { color: $secondary-2-4 !important; }
- .bg-disabled-secondary-2-4:disabled { background-color: $secondary-2-4 !important; }
- .border-disabled-secondary-2-4:disabled { border-color: $secondary-2-4 !important; }
- .empty-secondary-2-4:empty { color: $secondary-2-4 !important; }
- .bg-empty-secondary-2-4:empty { background-color: $secondary-2-4 !important; }
- .border-empty-secondary-2-4:empty { border-color: $secondary-2-4 !important; }
- .enabled-secondary-2-4:enabled { color: $secondary-2-4 !important; }
- .bg-enabled-secondary-2-4:enabled { background-color: $secondary-2-4 !important; }
- .border-enabled-secondary-2-4:enabled { border-color: $secondary-2-4 !important; }
- .first-child-secondary-2-4:first-child { color: $secondary-2-4 !important; }
- .bg-first-child-secondary-2-4:first-child { background-color: $secondary-2-4 !important; }
- .border-first-child-secondary-2-4:first-child { border-color: $secondary-2-4 !important; }
- .first-of-type-secondary-2-4:first-of-type { color: $secondary-2-4 !important; }
- .bg-first-of-type-secondary-2-4:first-of-type { background-color: $secondary-2-4 !important; }
- .border-first-of-type-secondary-2-4:first-of-type { border-color: $secondary-2-4 !important; }
- .focus-secondary-2-4:focus { color: $secondary-2-4 !important; }
- .bg-focus-secondary-2-4:focus { background-color: $secondary-2-4 !important; }
- .border-focus-secondary-2-4:focus { border-color: $secondary-2-4 !important; }
- .hover-secondary-2-4:hover { color: $secondary-2-4 !important; }
- .bg-hover-secondary-2-4:hover { background-color: $secondary-2-4 !important; }
- .border-hover-secondary-2-4:hover { border-color: $secondary-2-4 !important; }
- .in-range-secondary-2-4:in-range { color: $secondary-2-4 !important; }
- .bg-in-range-secondary-2-4:in-range { background-color: $secondary-2-4 !important; }
- .border-in-range-secondary-2-4:in-range { border-color: $secondary-2-4 !important; }
- .invalid-secondary-2-4:invalid { color: $secondary-2-4 !important; }
- .bg-invalid-secondary-2-4:invalid { background-color: $secondary-2-4 !important; }
- .border-invalid-secondary-2-4:invalid { border-color: $secondary-2-4 !important; }
- .last-child-secondary-2-4:last-child { color: $secondary-2-4 !important; }
- .bg-last-child-secondary-2-4:last-child { background-color: $secondary-2-4 !important; }
- .border-last-child-secondary-2-4:last-child { border-color: $secondary-2-4 !important; }
- .last-of-type-secondary-2-4:last-of-type { color: $secondary-2-4 !important; }
- .bg-last-of-type-secondary-2-4:last-of-type { background-color: $secondary-2-4 !important; }
- .border-last-of-type-secondary-2-4:last-of-type { border-color: $secondary-2-4 !important; }
- .link-secondary-2-4:link { color: $secondary-2-4 !important; }
- .bg-link-secondary-2-4:link { background-color: $secondary-2-4 !important; }
- .border-link-secondary-2-4:link { border-color: $secondary-2-4 !important; }
- .only-of-type-secondary-2-4:only-of-type { color: $secondary-2-4 !important; }
- .bg-only-of-type-secondary-2-4:only-of-type { background-color: $secondary-2-4 !important; }
- .border-only-of-type-secondary-2-4:only-of-type { border-color: $secondary-2-4 !important; }
- .only-child-secondary-2-4:only-child { color: $secondary-2-4 !important; }
- .bg-only-child-secondary-2-4:only-child { background-color: $secondary-2-4 !important; }
- .border-only-child-secondary-2-4:only-child { border-color: $secondary-2-4 !important; }
- .optional-secondary-2-4:optional { color: $secondary-2-4 !important; }
- .bg-optional-secondary-2-4:optional { background-color: $secondary-2-4 !important; }
- .border-optional-secondary-2-4:optional { border-color: $secondary-2-4 !important; }
- .out-of-range-secondary-2-4:out-of-range { color: $secondary-2-4 !important; }
- .bg-out-of-range-secondary-2-4:out-of-range { background-color: $secondary-2-4 !important; }
- .border-out-of-range-secondary-2-4:out-of-range { border-color: $secondary-2-4 !important; }
- .read-only-secondary-2-4:read-only { color: $secondary-2-4 !important; }
- .bg-read-only-secondary-2-4:read-only { background-color: $secondary-2-4 !important; }
- .border-read-only-secondary-2-4:read-only { border-color: $secondary-2-4 !important; }
- .read-write-secondary-2-4:read-write { color: $secondary-2-4 !important; }
- .bg-read-write-secondary-2-4:read-write { background-color: $secondary-2-4 !important; }
- .border-read-write-secondary-2-4:read-write { border-color: $secondary-2-4 !important; }
- .required-secondary-2-4:required { color: $secondary-2-4 !important; }
- .bg-required-secondary-2-4:required { background-color: $secondary-2-4 !important; }
- .border-required-secondary-2-4:required { border-color: $secondary-2-4 !important; }
- .root-secondary-2-4:root { color: $secondary-2-4 !important; }
- .bg-root-secondary-2-4:root { background-color: $secondary-2-4 !important; }
- .border-root-secondary-2-4:root { border-color: $secondary-2-4 !important; }
- .target-secondary-2-4:target { color: $secondary-2-4 !important; }
- .bg-target-secondary-2-4:target { background-color: $secondary-2-4 !important; }
- .border-target-secondary-2-4:target { border-color: $secondary-2-4 !important; }
- .valid-secondary-2-4:valid { color: $secondary-2-4 !important; }
- .bg-valid-secondary-2-4:valid { background-color: $secondary-2-4 !important; }
- .border-valid-secondary-2-4:valid { border-color: $secondary-2-4 !important; }
- .visited-secondary-2-4:visited { color: $secondary-2-4 !important; }
- .bg-visited-secondary-2-4:visited { background-color: $secondary-2-4 !important; }
- .border-visited-secondary-2-4:visited { border-color: $secondary-2-4 !important; }

##### Complement color

- .active-complement-0:active { color: $complement-0 !important; }
- .bg-active-complement-0:active { background-color: $complement-0 !important; }
- .border-active-complement-0:active { border-color: $complement-0 !important; }
- .checked-complement-0:checked { color: $complement-0 !important; }
- .bg-checked-complement-0:checked { background-color: $complement-0 !important; }
- .border-checked-complement-0:checked { border-color: $complement-0 !important; }
- .disabled-complement-0:disabled { color: $complement-0 !important; }
- .bg-disabled-complement-0:disabled { background-color: $complement-0 !important; }
- .border-disabled-complement-0:disabled { border-color: $complement-0 !important; }
- .empty-complement-0:empty { color: $complement-0 !important; }
- .bg-empty-complement-0:empty { background-color: $complement-0 !important; }
- .border-empty-complement-0:empty { border-color: $complement-0 !important; }
- .enabled-complement-0:enabled { color: $complement-0 !important; }
- .bg-enabled-complement-0:enabled { background-color: $complement-0 !important; }
- .border-enabled-complement-0:enabled { border-color: $complement-0 !important; }
- .first-child-complement-0:first-child { color: $complement-0 !important; }
- .bg-first-child-complement-0:first-child { background-color: $complement-0 !important; }
- .border-first-child-complement-0:first-child { border-color: $complement-0 !important; }
- .first-of-type-complement-0:first-of-type { color: $complement-0 !important; }
- .bg-first-of-type-complement-0:first-of-type { background-color: $complement-0 !important; }
- .border-first-of-type-complement-0:first-of-type { border-color: $complement-0 !important; }
- .focus-complement-0:focus { color: $complement-0 !important; }
- .bg-focus-complement-0:focus { background-color: $complement-0 !important; }
- .border-focus-complement-0:focus { border-color: $complement-0 !important; }
- .hover-complement-0:hover { color: $complement-0 !important; }
- .bg-hover-complement-0:hover { background-color: $complement-0 !important; }
- .border-hover-complement-0:hover { border-color: $complement-0 !important; }
- .in-range-complement-0:in-range { color: $complement-0 !important; }
- .bg-in-range-complement-0:in-range { background-color: $complement-0 !important; }
- .border-in-range-complement-0:in-range { border-color: $complement-0 !important; }
- .invalid-complement-0:invalid { color: $complement-0 !important; }
- .bg-invalid-complement-0:invalid { background-color: $complement-0 !important; }
- .border-invalid-complement-0:invalid { border-color: $complement-0 !important; }
- .last-child-complement-0:last-child { color: $complement-0 !important; }
- .bg-last-child-complement-0:last-child { background-color: $complement-0 !important; }
- .border-last-child-complement-0:last-child { border-color: $complement-0 !important; }
- .last-of-type-complement-0:last-of-type { color: $complement-0 !important; }
- .bg-last-of-type-complement-0:last-of-type { background-color: $complement-0 !important; }
- .border-last-of-type-complement-0:last-of-type { border-color: $complement-0 !important; }
- .link-complement-0:link { color: $complement-0 !important; }
- .bg-link-complement-0:link { background-color: $complement-0 !important; }
- .border-link-complement-0:link { border-color: $complement-0 !important; }
- .only-of-type-complement-0:only-of-type { color: $complement-0 !important; }
- .bg-only-of-type-complement-0:only-of-type { background-color: $complement-0 !important; }
- .border-only-of-type-complement-0:only-of-type { border-color: $complement-0 !important; }
- .only-child-complement-0:only-child { color: $complement-0 !important; }
- .bg-only-child-complement-0:only-child { background-color: $complement-0 !important; }
- .border-only-child-complement-0:only-child { border-color: $complement-0 !important; }
- .optional-complement-0:optional { color: $complement-0 !important; }
- .bg-optional-complement-0:optional { background-color: $complement-0 !important; }
- .border-optional-complement-0:optional { border-color: $complement-0 !important; }
- .out-of-range-complement-0:out-of-range { color: $complement-0 !important; }
- .bg-out-of-range-complement-0:out-of-range { background-color: $complement-0 !important; }
- .border-out-of-range-complement-0:out-of-range { border-color: $complement-0 !important; }
- .read-only-complement-0:read-only { color: $complement-0 !important; }
- .bg-read-only-complement-0:read-only { background-color: $complement-0 !important; }
- .border-read-only-complement-0:read-only { border-color: $complement-0 !important; }
- .read-write-complement-0:read-write { color: $complement-0 !important; }
- .bg-read-write-complement-0:read-write { background-color: $complement-0 !important; }
- .border-read-write-complement-0:read-write { border-color: $complement-0 !important; }
- .required-complement-0:required { color: $complement-0 !important; }
- .bg-required-complement-0:required { background-color: $complement-0 !important; }
- .border-required-complement-0:required { border-color: $complement-0 !important; }
- .root-complement-0:root { color: $complement-0 !important; }
- .bg-root-complement-0:root { background-color: $complement-0 !important; }
- .border-root-complement-0:root { border-color: $complement-0 !important; }
- .target-complement-0:target { color: $complement-0 !important; }
- .bg-target-complement-0:target { background-color: $complement-0 !important; }
- .border-target-complement-0:target { border-color: $complement-0 !important; }
- .valid-complement-0:valid { color: $complement-0 !important; }
- .bg-valid-complement-0:valid { background-color: $complement-0 !important; }
- .border-valid-complement-0:valid { border-color: $complement-0 !important; }
- .visited-complement-0:visited { color: $complement-0 !important; }
- .bg-visited-complement-0:visited { background-color: $complement-0 !important; }
- .border-visited-complement-0:visited { border-color: $complement-0 !important; }
- .active-complement-1:active { color: $complement-1 !important; }
- .bg-active-complement-1:active { background-color: $complement-1 !important; }
- .border-active-complement-1:active { border-color: $complement-1 !important; }
- .checked-complement-1:checked { color: $complement-1 !important; }
- .bg-checked-complement-1:checked { background-color: $complement-1 !important; }
- .border-checked-complement-1:checked { border-color: $complement-1 !important; }
- .disabled-complement-1:disabled { color: $complement-1 !important; }
- .bg-disabled-complement-1:disabled { background-color: $complement-1 !important; }
- .border-disabled-complement-1:disabled { border-color: $complement-1 !important; }
- .empty-complement-1:empty { color: $complement-1 !important; }
- .bg-empty-complement-1:empty { background-color: $complement-1 !important; }
- .border-empty-complement-1:empty { border-color: $complement-1 !important; }
- .enabled-complement-1:enabled { color: $complement-1 !important; }
- .bg-enabled-complement-1:enabled { background-color: $complement-1 !important; }
- .border-enabled-complement-1:enabled { border-color: $complement-1 !important; }
- .first-child-complement-1:first-child { color: $complement-1 !important; }
- .bg-first-child-complement-1:first-child { background-color: $complement-1 !important; }
- .border-first-child-complement-1:first-child { border-color: $complement-1 !important; }
- .first-of-type-complement-1:first-of-type { color: $complement-1 !important; }
- .bg-first-of-type-complement-1:first-of-type { background-color: $complement-1 !important; }
- .border-first-of-type-complement-1:first-of-type { border-color: $complement-1 !important; }
- .focus-complement-1:focus { color: $complement-1 !important; }
- .bg-focus-complement-1:focus { background-color: $complement-1 !important; }
- .border-focus-complement-1:focus { border-color: $complement-1 !important; }
- .hover-complement-1:hover { color: $complement-1 !important; }
- .bg-hover-complement-1:hover { background-color: $complement-1 !important; }
- .border-hover-complement-1:hover { border-color: $complement-1 !important; }
- .in-range-complement-1:in-range { color: $complement-1 !important; }
- .bg-in-range-complement-1:in-range { background-color: $complement-1 !important; }
- .border-in-range-complement-1:in-range { border-color: $complement-1 !important; }
- .invalid-complement-1:invalid { color: $complement-1 !important; }
- .bg-invalid-complement-1:invalid { background-color: $complement-1 !important; }
- .border-invalid-complement-1:invalid { border-color: $complement-1 !important; }
- .last-child-complement-1:last-child { color: $complement-1 !important; }
- .bg-last-child-complement-1:last-child { background-color: $complement-1 !important; }
- .border-last-child-complement-1:last-child { border-color: $complement-1 !important; }
- .last-of-type-complement-1:last-of-type { color: $complement-1 !important; }
- .bg-last-of-type-complement-1:last-of-type { background-color: $complement-1 !important; }
- .border-last-of-type-complement-1:last-of-type { border-color: $complement-1 !important; }
- .link-complement-1:link { color: $complement-1 !important; }
- .bg-link-complement-1:link { background-color: $complement-1 !important; }
- .border-link-complement-1:link { border-color: $complement-1 !important; }
- .only-of-type-complement-1:only-of-type { color: $complement-1 !important; }
- .bg-only-of-type-complement-1:only-of-type { background-color: $complement-1 !important; }
- .border-only-of-type-complement-1:only-of-type { border-color: $complement-1 !important; }
- .only-child-complement-1:only-child { color: $complement-1 !important; }
- .bg-only-child-complement-1:only-child { background-color: $complement-1 !important; }
- .border-only-child-complement-1:only-child { border-color: $complement-1 !important; }
- .optional-complement-1:optional { color: $complement-1 !important; }
- .bg-optional-complement-1:optional { background-color: $complement-1 !important; }
- .border-optional-complement-1:optional { border-color: $complement-1 !important; }
- .out-of-range-complement-1:out-of-range { color: $complement-1 !important; }
- .bg-out-of-range-complement-1:out-of-range { background-color: $complement-1 !important; }
- .border-out-of-range-complement-1:out-of-range { border-color: $complement-1 !important; }
- .read-only-complement-1:read-only { color: $complement-1 !important; }
- .bg-read-only-complement-1:read-only { background-color: $complement-1 !important; }
- .border-read-only-complement-1:read-only { border-color: $complement-1 !important; }
- .read-write-complement-1:read-write { color: $complement-1 !important; }
- .bg-read-write-complement-1:read-write { background-color: $complement-1 !important; }
- .border-read-write-complement-1:read-write { border-color: $complement-1 !important; }
- .required-complement-1:required { color: $complement-1 !important; }
- .bg-required-complement-1:required { background-color: $complement-1 !important; }
- .border-required-complement-1:required { border-color: $complement-1 !important; }
- .root-complement-1:root { color: $complement-1 !important; }
- .bg-root-complement-1:root { background-color: $complement-1 !important; }
- .border-root-complement-1:root { border-color: $complement-1 !important; }
- .target-complement-1:target { color: $complement-1 !important; }
- .bg-target-complement-1:target { background-color: $complement-1 !important; }
- .border-target-complement-1:target { border-color: $complement-1 !important; }
- .valid-complement-1:valid { color: $complement-1 !important; }
- .bg-valid-complement-1:valid { background-color: $complement-1 !important; }
- .border-valid-complement-1:valid { border-color: $complement-1 !important; }
- .visited-complement-1:visited { color: $complement-1 !important; }
- .bg-visited-complement-1:visited { background-color: $complement-1 !important; }
- .border-visited-complement-1:visited { border-color: $complement-1 !important; }
- .active-complement-2:active { color: $complement-2 !important; }
- .bg-active-complement-2:active { background-color: $complement-2 !important; }
- .border-active-complement-2:active { border-color: $complement-2 !important; }
- .checked-complement-2:checked { color: $complement-2 !important; }
- .bg-checked-complement-2:checked { background-color: $complement-2 !important; }
- .border-checked-complement-2:checked { border-color: $complement-2 !important; }
- .disabled-complement-2:disabled { color: $complement-2 !important; }
- .bg-disabled-complement-2:disabled { background-color: $complement-2 !important; }
- .border-disabled-complement-2:disabled { border-color: $complement-2 !important; }
- .empty-complement-2:empty { color: $complement-2 !important; }
- .bg-empty-complement-2:empty { background-color: $complement-2 !important; }
- .border-empty-complement-2:empty { border-color: $complement-2 !important; }
- .enabled-complement-2:enabled { color: $complement-2 !important; }
- .bg-enabled-complement-2:enabled { background-color: $complement-2 !important; }
- .border-enabled-complement-2:enabled { border-color: $complement-2 !important; }
- .first-child-complement-2:first-child { color: $complement-2 !important; }
- .bg-first-child-complement-2:first-child { background-color: $complement-2 !important; }
- .border-first-child-complement-2:first-child { border-color: $complement-2 !important; }
- .first-of-type-complement-2:first-of-type { color: $complement-2 !important; }
- .bg-first-of-type-complement-2:first-of-type { background-color: $complement-2 !important; }
- .border-first-of-type-complement-2:first-of-type { border-color: $complement-2 !important; }
- .focus-complement-2:focus { color: $complement-2 !important; }
- .bg-focus-complement-2:focus { background-color: $complement-2 !important; }
- .border-focus-complement-2:focus { border-color: $complement-2 !important; }
- .hover-complement-2:hover { color: $complement-2 !important; }
- .bg-hover-complement-2:hover { background-color: $complement-2 !important; }
- .border-hover-complement-2:hover { border-color: $complement-2 !important; }
- .in-range-complement-2:in-range { color: $complement-2 !important; }
- .bg-in-range-complement-2:in-range { background-color: $complement-2 !important; }
- .border-in-range-complement-2:in-range { border-color: $complement-2 !important; }
- .invalid-complement-2:invalid { color: $complement-2 !important; }
- .bg-invalid-complement-2:invalid { background-color: $complement-2 !important; }
- .border-invalid-complement-2:invalid { border-color: $complement-2 !important; }
- .last-child-complement-2:last-child { color: $complement-2 !important; }
- .bg-last-child-complement-2:last-child { background-color: $complement-2 !important; }
- .border-last-child-complement-2:last-child { border-color: $complement-2 !important; }
- .last-of-type-complement-2:last-of-type { color: $complement-2 !important; }
- .bg-last-of-type-complement-2:last-of-type { background-color: $complement-2 !important; }
- .border-last-of-type-complement-2:last-of-type { border-color: $complement-2 !important; }
- .link-complement-2:link { color: $complement-2 !important; }
- .bg-link-complement-2:link { background-color: $complement-2 !important; }
- .border-link-complement-2:link { border-color: $complement-2 !important; }
- .only-of-type-complement-2:only-of-type { color: $complement-2 !important; }
- .bg-only-of-type-complement-2:only-of-type { background-color: $complement-2 !important; }
- .border-only-of-type-complement-2:only-of-type { border-color: $complement-2 !important; }
- .only-child-complement-2:only-child { color: $complement-2 !important; }
- .bg-only-child-complement-2:only-child { background-color: $complement-2 !important; }
- .border-only-child-complement-2:only-child { border-color: $complement-2 !important; }
- .optional-complement-2:optional { color: $complement-2 !important; }
- .bg-optional-complement-2:optional { background-color: $complement-2 !important; }
- .border-optional-complement-2:optional { border-color: $complement-2 !important; }
- .out-of-range-complement-2:out-of-range { color: $complement-2 !important; }
- .bg-out-of-range-complement-2:out-of-range { background-color: $complement-2 !important; }
- .border-out-of-range-complement-2:out-of-range { border-color: $complement-2 !important; }
- .read-only-complement-2:read-only { color: $complement-2 !important; }
- .bg-read-only-complement-2:read-only { background-color: $complement-2 !important; }
- .border-read-only-complement-2:read-only { border-color: $complement-2 !important; }
- .read-write-complement-2:read-write { color: $complement-2 !important; }
- .bg-read-write-complement-2:read-write { background-color: $complement-2 !important; }
- .border-read-write-complement-2:read-write { border-color: $complement-2 !important; }
- .required-complement-2:required { color: $complement-2 !important; }
- .bg-required-complement-2:required { background-color: $complement-2 !important; }
- .border-required-complement-2:required { border-color: $complement-2 !important; }
- .root-complement-2:root { color: $complement-2 !important; }
- .bg-root-complement-2:root { background-color: $complement-2 !important; }
- .border-root-complement-2:root { border-color: $complement-2 !important; }
- .target-complement-2:target { color: $complement-2 !important; }
- .bg-target-complement-2:target { background-color: $complement-2 !important; }
- .border-target-complement-2:target { border-color: $complement-2 !important; }
- .valid-complement-2:valid { color: $complement-2 !important; }
- .bg-valid-complement-2:valid { background-color: $complement-2 !important; }
- .border-valid-complement-2:valid { border-color: $complement-2 !important; }
- .visited-complement-2:visited { color: $complement-2 !important; }
- .bg-visited-complement-2:visited { background-color: $complement-2 !important; }
- .border-visited-complement-2:visited { border-color: $complement-2 !important; }
- .active-complement-3:active { color: $complement-3 !important; }
- .bg-active-complement-3:active { background-color: $complement-3 !important; }
- .border-active-complement-3:active { border-color: $complement-3 !important; }
- .checked-complement-3:checked { color: $complement-3 !important; }
- .bg-checked-complement-3:checked { background-color: $complement-3 !important; }
- .border-checked-complement-3:checked { border-color: $complement-3 !important; }
- .disabled-complement-3:disabled { color: $complement-3 !important; }
- .bg-disabled-complement-3:disabled { background-color: $complement-3 !important; }
- .border-disabled-complement-3:disabled { border-color: $complement-3 !important; }
- .empty-complement-3:empty { color: $complement-3 !important; }
- .bg-empty-complement-3:empty { background-color: $complement-3 !important; }
- .border-empty-complement-3:empty { border-color: $complement-3 !important; }
- .enabled-complement-3:enabled { color: $complement-3 !important; }
- .bg-enabled-complement-3:enabled { background-color: $complement-3 !important; }
- .border-enabled-complement-3:enabled { border-color: $complement-3 !important; }
- .first-child-complement-3:first-child { color: $complement-3 !important; }
- .bg-first-child-complement-3:first-child { background-color: $complement-3 !important; }
- .border-first-child-complement-3:first-child { border-color: $complement-3 !important; }
- .first-of-type-complement-3:first-of-type { color: $complement-3 !important; }
- .bg-first-of-type-complement-3:first-of-type { background-color: $complement-3 !important; }
- .border-first-of-type-complement-3:first-of-type { border-color: $complement-3 !important; }
- .focus-complement-3:focus { color: $complement-3 !important; }
- .bg-focus-complement-3:focus { background-color: $complement-3 !important; }
- .border-focus-complement-3:focus { border-color: $complement-3 !important; }
- .hover-complement-3:hover { color: $complement-3 !important; }
- .bg-hover-complement-3:hover { background-color: $complement-3 !important; }
- .border-hover-complement-3:hover { border-color: $complement-3 !important; }
- .in-range-complement-3:in-range { color: $complement-3 !important; }
- .bg-in-range-complement-3:in-range { background-color: $complement-3 !important; }
- .border-in-range-complement-3:in-range { border-color: $complement-3 !important; }
- .invalid-complement-3:invalid { color: $complement-3 !important; }
- .bg-invalid-complement-3:invalid { background-color: $complement-3 !important; }
- .border-invalid-complement-3:invalid { border-color: $complement-3 !important; }
- .last-child-complement-3:last-child { color: $complement-3 !important; }
- .bg-last-child-complement-3:last-child { background-color: $complement-3 !important; }
- .border-last-child-complement-3:last-child { border-color: $complement-3 !important; }
- .last-of-type-complement-3:last-of-type { color: $complement-3 !important; }
- .bg-last-of-type-complement-3:last-of-type { background-color: $complement-3 !important; }
- .border-last-of-type-complement-3:last-of-type { border-color: $complement-3 !important; }
- .link-complement-3:link { color: $complement-3 !important; }
- .bg-link-complement-3:link { background-color: $complement-3 !important; }
- .border-link-complement-3:link { border-color: $complement-3 !important; }
- .only-of-type-complement-3:only-of-type { color: $complement-3 !important; }
- .bg-only-of-type-complement-3:only-of-type { background-color: $complement-3 !important; }
- .border-only-of-type-complement-3:only-of-type { border-color: $complement-3 !important; }
- .only-child-complement-3:only-child { color: $complement-3 !important; }
- .bg-only-child-complement-3:only-child { background-color: $complement-3 !important; }
- .border-only-child-complement-3:only-child { border-color: $complement-3 !important; }
- .optional-complement-3:optional { color: $complement-3 !important; }
- .bg-optional-complement-3:optional { background-color: $complement-3 !important; }
- .border-optional-complement-3:optional { border-color: $complement-3 !important; }
- .out-of-range-complement-3:out-of-range { color: $complement-3 !important; }
- .bg-out-of-range-complement-3:out-of-range { background-color: $complement-3 !important; }
- .border-out-of-range-complement-3:out-of-range { border-color: $complement-3 !important; }
- .read-only-complement-3:read-only { color: $complement-3 !important; }
- .bg-read-only-complement-3:read-only { background-color: $complement-3 !important; }
- .border-read-only-complement-3:read-only { border-color: $complement-3 !important; }
- .read-write-complement-3:read-write { color: $complement-3 !important; }
- .bg-read-write-complement-3:read-write { background-color: $complement-3 !important; }
- .border-read-write-complement-3:read-write { border-color: $complement-3 !important; }
- .required-complement-3:required { color: $complement-3 !important; }
- .bg-required-complement-3:required { background-color: $complement-3 !important; }
- .border-required-complement-3:required { border-color: $complement-3 !important; }
- .root-complement-3:root { color: $complement-3 !important; }
- .bg-root-complement-3:root { background-color: $complement-3 !important; }
- .border-root-complement-3:root { border-color: $complement-3 !important; }
- .target-complement-3:target { color: $complement-3 !important; }
- .bg-target-complement-3:target { background-color: $complement-3 !important; }
- .border-target-complement-3:target { border-color: $complement-3 !important; }
- .valid-complement-3:valid { color: $complement-3 !important; }
- .bg-valid-complement-3:valid { background-color: $complement-3 !important; }
- .border-valid-complement-3:valid { border-color: $complement-3 !important; }
- .visited-complement-3:visited { color: $complement-3 !important; }
- .bg-visited-complement-3:visited { background-color: $complement-3 !important; }
- .border-visited-complement-3:visited { border-color: $complement-3 !important; }
- .active-complement-4:active { color: $complement-4 !important; }
- .bg-active-complement-4:active { background-color: $complement-4 !important; }
- .border-active-complement-4:active { border-color: $complement-4 !important; }
- .checked-complement-4:checked { color: $complement-4 !important; }
- .bg-checked-complement-4:checked { background-color: $complement-4 !important; }
- .border-checked-complement-4:checked { border-color: $complement-4 !important; }
- .disabled-complement-4:disabled { color: $complement-4 !important; }
- .bg-disabled-complement-4:disabled { background-color: $complement-4 !important; }
- .border-disabled-complement-4:disabled { border-color: $complement-4 !important; }
- .empty-complement-4:empty { color: $complement-4 !important; }
- .bg-empty-complement-4:empty { background-color: $complement-4 !important; }
- .border-empty-complement-4:empty { border-color: $complement-4 !important; }
- .enabled-complement-4:enabled { color: $complement-4 !important; }
- .bg-enabled-complement-4:enabled { background-color: $complement-4 !important; }
- .border-enabled-complement-4:enabled { border-color: $complement-4 !important; }
- .first-child-complement-4:first-child { color: $complement-4 !important; }
- .bg-first-child-complement-4:first-child { background-color: $complement-4 !important; }
- .border-first-child-complement-4:first-child { border-color: $complement-4 !important; }
- .first-of-type-complement-4:first-of-type { color: $complement-4 !important; }
- .bg-first-of-type-complement-4:first-of-type { background-color: $complement-4 !important; }
- .border-first-of-type-complement-4:first-of-type { border-color: $complement-4 !important; }
- .focus-complement-4:focus { color: $complement-4 !important; }
- .bg-focus-complement-4:focus { background-color: $complement-4 !important; }
- .border-focus-complement-4:focus { border-color: $complement-4 !important; }
- .hover-complement-4:hover { color: $complement-4 !important; }
- .bg-hover-complement-4:hover { background-color: $complement-4 !important; }
- .border-hover-complement-4:hover { border-color: $complement-4 !important; }
- .in-range-complement-4:in-range { color: $complement-4 !important; }
- .bg-in-range-complement-4:in-range { background-color: $complement-4 !important; }
- .border-in-range-complement-4:in-range { border-color: $complement-4 !important; }
- .invalid-complement-4:invalid { color: $complement-4 !important; }
- .bg-invalid-complement-4:invalid { background-color: $complement-4 !important; }
- .border-invalid-complement-4:invalid { border-color: $complement-4 !important; }
- .last-child-complement-4:last-child { color: $complement-4 !important; }
- .bg-last-child-complement-4:last-child { background-color: $complement-4 !important; }
- .border-last-child-complement-4:last-child { border-color: $complement-4 !important; }
- .last-of-type-complement-4:last-of-type { color: $complement-4 !important; }
- .bg-last-of-type-complement-4:last-of-type { background-color: $complement-4 !important; }
- .border-last-of-type-complement-4:last-of-type { border-color: $complement-4 !important; }
- .link-complement-4:link { color: $complement-4 !important; }
- .bg-link-complement-4:link { background-color: $complement-4 !important; }
- .border-link-complement-4:link { border-color: $complement-4 !important; }
- .only-of-type-complement-4:only-of-type { color: $complement-4 !important; }
- .bg-only-of-type-complement-4:only-of-type { background-color: $complement-4 !important; }
- .border-only-of-type-complement-4:only-of-type { border-color: $complement-4 !important; }
- .only-child-complement-4:only-child { color: $complement-4 !important; }
- .bg-only-child-complement-4:only-child { background-color: $complement-4 !important; }
- .border-only-child-complement-4:only-child { border-color: $complement-4 !important; }
- .optional-complement-4:optional { color: $complement-4 !important; }
- .bg-optional-complement-4:optional { background-color: $complement-4 !important; }
- .border-optional-complement-4:optional { border-color: $complement-4 !important; }
- .out-of-range-complement-4:out-of-range { color: $complement-4 !important; }
- .bg-out-of-range-complement-4:out-of-range { background-color: $complement-4 !important; }
- .border-out-of-range-complement-4:out-of-range { border-color: $complement-4 !important; }
- .read-only-complement-4:read-only { color: $complement-4 !important; }
- .bg-read-only-complement-4:read-only { background-color: $complement-4 !important; }
- .border-read-only-complement-4:read-only { border-color: $complement-4 !important; }
- .read-write-complement-4:read-write { color: $complement-4 !important; }
- .bg-read-write-complement-4:read-write { background-color: $complement-4 !important; }
- .border-read-write-complement-4:read-write { border-color: $complement-4 !important; }
- .required-complement-4:required { color: $complement-4 !important; }
- .bg-required-complement-4:required { background-color: $complement-4 !important; }
- .border-required-complement-4:required { border-color: $complement-4 !important; }
- .root-complement-4:root { color: $complement-4 !important; }
- .bg-root-complement-4:root { background-color: $complement-4 !important; }
- .border-root-complement-4:root { border-color: $complement-4 !important; }
- .target-complement-4:target { color: $complement-4 !important; }
- .bg-target-complement-4:target { background-color: $complement-4 !important; }
- .border-target-complement-4:target { border-color: $complement-4 !important; }
- .valid-complement-4:valid { color: $complement-4 !important; }
- .bg-valid-complement-4:valid { background-color: $complement-4 !important; }
- .border-valid-complement-4:valid { border-color: $complement-4 !important; }
- .visited-complement-4:visited { color: $complement-4 !important; }
- .bg-visited-complement-4:visited { background-color: $complement-4 !important; }
- .border-visited-complement-4:visited { border-color: $complement-4 !important; }
