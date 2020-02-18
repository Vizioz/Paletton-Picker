---
layout: documentation_layout
title: API reference
---

## API {#api}

### Methods {#api-methods}

- #### Get CSS styles (with Models Builder)

  _**GetCssStyles(this JToken value, bool addStyleTag = true, bool includePseudoElements = false, bool includePseudoClasses = false)** : IHtmlString_

  This method will return a CSS stylesheet as an Html string and is used on Palette Picker properties of PublishedContentModel objects. It is an extension method for the JToken class, which is the actual type of Palette Picker property returned by Models Builder. It accepts several optional parameters.

  **How to use**

  ````csharp
  @{ var styles = Model.PalettePickerProperty.GetCssStyles(); }
  @Html.Raw(styles)
  ````

  **Parameters**

  parameter | type | mandatory | description
  :--- | :--- | :--- | :---
  **value** | JToken | mandatory | The actual Palette Picker value.
  **addStyleTag** | boolean | optional (default = true) | Whether to add the \<style\> tag to the returned Html string. If true, it will return the whole CSS stylesheet within the \<style\> tag. If false, it will return only the CSS rules.
  **includePseudoClasses** | boolean | optional (default = false) | Whether to include CSS rules for pseudo elements, such as ::after, ::before, etc.
  **includePseudoElements** | boolean | optional (default = false) | Whether to include CSS rules for pseudo classes, such as :focus, :hover, :last-child, etc.

- #### Get CSS styles (without Models Builder)

  _**IHtmlString GetCssStyles(this IPublishedContent content, string propertyAlias, bool addStyleTag = true, bool includePseudoElements = false, bool includePseudoClasses = false)** : IHtmlString_

  This method will return a CSS stylesheet as an Html string and is used on IPublishedContent objects. It is an extension method for the IPublishedContent class. It accepts the same optional parameters as the previous method.

  **How to use**

  ````csharp
  @{ var styles = Model.GetCssStyles("palettePickerPropertyAlias"); }
  @Html.Raw(styles)
  ````

  **Parameters**

  parameter | type | mandatory | description
  :--- | :--- | :--- | :---
  **content** | IPublishedContent | mandatory | The IPublishedContent from which we want to get the Palette Picker value.
  **propertyAlias** | string | mandatory | The alias of the Palette Picker property.
  **addStyleTag** | boolean | optional (default = true) | Wheter to add the \<style\> tag to the returned Html string. If true, it will return the whole CSS stylesheet within the \<style\> tag. If false, it will return only the CSS rules.
  **includePseudoClasses** | boolean | optional (default = false) | Whether to include CSS rules for pseudo elements, such as ::after, ::before, etc.
  **includePseudoElements** | boolean | optional (default = false) | Whether to include CSS rules for pseudo classes, such as :focus, :hover, :last-child, etc.

- #### Get palette (with Models Builder)

  _**GetPalette(JToken value)** : Palette_

  This method will return all colours and colour sets information as a Palette object and is used on Palette Picker properties of PublishedContentModel objects. It is an extension method for the JToken class, which is the actual type of Palette Picker property returned by Models Builder.

  **How to use**

  ````csharp
  @{ var palette = Model.PalettePickerProperty.GetPalette(); }
  ````

  **Parameters**

  parameter | type | mandatory | description
  :--- | :--- | :--- | :---
  **value** | JToken | mandatory | The actual Palette Picker value.

- #### Get palette (without Models Builder)

  _**GetPalette(this IPublishedContent content, string propertyAlias)** : Palette_

  This method will return all colours and colour sets information as a Palette Picker object and is used on IPublishedContent objects. It is an extension method for the IPublishedContent class.

  **How to use**

  ````csharp
  @{ var palette = Model.GetPalette("palettePickerPropertyAlias"); }
  ````

  **Parameters**

  parameter | type | mandatory | description
  :--- | :--- | :--- | :---
  **content** | IPublishedContent | mandatory | The IPublishedContent from which we want to get the Palette Picker value.
  **propertyAlias** | string | mandatory | The alias of the Palette Picker property.

### Models {#api-models}

- #### Palette

  It defines the palette object, containing the list of colour sets (primary, secondary, complement).

  **Properties**

  - _**Url** : string_

    Optional URL indicating the source of the colour palette.

  - _**ColorSets** : IEnumerable&lt;PaletteColorSet&gt;_

    The list of colour sets included in the palette.

  **Methods**

  - _**ColorSet(string id)** : PaletteColorSet_

    Returns a colour set by id (i.e. "primary", "secondary-1", "secondary-2", "complement")

  - _**Color(string colorId)** : PaletteColorSet_

    Returns a colour from among all colour sets by colour id (i.e. "primary-0", "secondary-1-0", "secondary-2-0", "complement-0", etc)

  - _**Alpha(string colorId, decimal alphaValue)** : string_

    Returns an alpha colour from among all colour sets by colour id (i.e. "primary-0", "secondary-1-0", "secondary-2-0", "complement-0", etc) and an alpha value between 0 and 1, as an rgba value.

- #### PaletteColorSet

  Individual set of colours (primary, secondary or complement) that compose a Palette object.

  **Properties**

  - _**Id** : string_

    The id of the colour set (primary, secondary-1, secondary-2, complement).

  - _**Title** : string_

    Optional title of the colour set.

  - _**Colors** : IEnumerable&lt;PaletteColor&gt;_

    The list of colours included in the colour set.

- #### PaletteColor

  A single colour within a colour set.

  **Properties**

  - _**Id** : string._

    The id of the colour (i.e. "primary-0", "secondary-1-0", "secondary-2-0", "complement-0", etc)

  - _**Hex** : string_

  The colour expressed as a hexadecimal value (i.e. AA3939).

  - _**Red** : int_

    The red component of the colour as an integer between 0 and 255.

  - _**Green** : int_

    The green component of the colour as an integer between 0 and 255.

  - _**Blue** : int_

    The blue component of the colour as an integer between 0 and 255.

  - _**HexColor** : string_

    The Hex Code (#RRGGBB) of the colour (i.e. #AA3939).

  - _**RgbColor** : string_

    The Decimal Code (R, G, B) of the colour (i.e. rgb(170,57,57)).

  **Methods**

  - _**Alpha(decimal alphaValue)** : string_

    Returns the colour with an alpha transparency between 0 and 1, in the form of rgba colour (i.e. rgb(170,57,57,0.5)).
