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

We will be prompted then by a side panel to paste a valid XML snippet to define a new palette of colors. Paletton picker is based on [Paletton.com](https://paletton.com/). We can get our color palette from there. The paletton interface is very intuitive. We can have a play with it until we find the right colors. Once happy, if we click on "Tables/Export" on the bottom right corner, and then click on "as XML", it will generate the XML snippet with all selected colors. Paletton picker will accept any color configuration with sets of primary, secondary and complement colors. But the current version will only accept snippets in XML format. Future versions of this package might accept other formats. We can use a snippet from any other source as long as it is in XML format.

We then copy the snippet into the textbox. If it is well formatted, we will see the template preview below it, otherwise it means the snippet is not well formatted or contains errors.

We can add as many templates as we like, which are visible in the data type configuration.

Finally, we give a name to our newly created data type and save it.

For editors to be able to use the Paletton Picker in the content nodes, we will have to add it previously as a property in our document types.

### Editors {#guide-editors}

Editors can very easily change the value of the Paletton Picker value in content nodes. The property is displayed in a similar way to a content picker. Editors can add a single color pattern or remove it.

### Add to view {#guide-view}

This is the part that involves a bit of code.

The first thing to do is to import the color template styles into our view. We use the Paletton Picker extension methods to do this. Depending on whether we are using Models Builder or not, we can use the following methods:

```c
// With models builder
@Html.Raw(Model.ColorPatternProperty.GetCssStyles())
```

```c
// Without models builder
@Html.Raw(Model.GetCssStyles("colorPatterPropertyAlias"))
```

This will render an internal CSS stylesheet with a series of rules from to the colors contained in the Paletton Picker value. These rules will have class selectors for font color, background color and border color, for every color defined in the Paletton Picker value, as in the example below.

```html
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
```

For secondary and complementary colors, the rules will have similar class selectors, for instance, bg-secondary-1-1, bg-complement-1. For full reference, please go to [CSS rules](#reference-css).

Besides class selector, we can generate selectors for pseudo classes and pseudo elements. For full specification, please go to the [API section](#reference-api).

We now can apply the necessary classes to our HTML elements. For instance:

```html
<div class="primary-0 bg-primary-1 border-primary-4">I love Paletton Picker</div>
```

Will result in something similar to:

![View Example]({{ site.baseurl }}/images/view-example.png)

By changing the value of the Paletton Picker property in the content nodes, the colors displayed in the view will change accordingly.

## Reference {#reference}

### API {#reference-api}

#### Methods {#reference-api-methods}

##### Get CSS styles (with Models Builder)

This method will return a CSS stylesheet as an Html string and is used on Paletton Picker properties of PublishedContentModel objects. It is an extension method for the JToken class, which is the actual type of Paletton Picker property returned by Models Builder. It accepts several optional parameters.

```
GetCssStyles(this JToken value, bool addStyleTag = true, bool includePseudoElements = false, bool includePseudoClasses = false) : IHtmlString
```

**How to use**

```c
@{ var styles = Model.ColorPatternProperty.GetCssStyles(); }
@Html.Raw(styles)
```

**Parameters**

parameter | type | mandatory | description
--- | --- | --- | ---
**value** | JToken | mandatory | The actual Paletton Picker value.
**addStyleTag** | boolean | optional (default = true) | Wheter to add the \<style\> tag to the returned Html string. If true, it will return the whole CSS stylesheet within the \<style\> tag. If false, it will return only the CSS rules.
**includePseudoClasses** | boolean | optional (default = false) | Whether to include CSS rules for pseudo elements, such as ::after, ::before, etc.
**includePseudoElements** | boolean | optional (default = false) | Whether to include CSS rules for pseudo classes, such as :focus, :hover, :last-child, etc.

##### Get CSS styles (without Models Builder)

##### Get palette (with Models Builder)

##### Get palette (without Models Builder)

#### Models {#reference-api-models}

### CSS rules {#reference-css}

<h2 id="reference">Reference</h2>
          <h3 id="reference-api">API</h3>
          <h4>Methods</h4>
          <div class="text-block">
            <ul>
              <li>
                <div>
                  <h5>Get CSS styles (using Models Builder)</h5>
                  <p>This method will return a CSS stylesheet as an Html string and is used on Paletton Picker properties of PublishedContentModel objects. It is an extension method for the JToken class, which is the actual type of Paletton Picker property returned by Models Builder. It accepts several optional parameters.</p>
                  <pre class="code-snippet">
                    <code>
                      GetCssStyles(this JToken value, bool addStyleTag = true, bool includePseudoElements = false, bool includePseudoClasses = false) : IHtmlString
                    </code>
                  </pre>
                  <p>How to use</p>
                  <pre class="code-snippet">
                    <code>
                      @{ var styles = Model.ColorPatternProperty.GetCssStyles(); }
                      @Html.Raw(styles)
                    </code>
                  </pre>
                  <p>Parameters</p>
                  <table>
                    <tbody>
                      <tr>
                        <td>value</td>
                        <td>JToken</td>
                        <td>mandatory</td>
                        <td>The actual Paletton Picker value.</td>
                      </tr> 
                      <tr>
                        <td>addStyleTag</td>
                        <td>boolean</td>
                        <td>optional (default = true)</td>
                        <td>Wheter to add the &lt;style&gt; tag to the returned Html string. If true, it will return the whole CSS stylesheet within the &lt;style&gt; tag. If false, it will return only the CSS rules.</td>
                      </tr>
                      <tr>
                        <td>includePseudoClasses</td>
                        <td>boolean</td>
                        <td>optional (default = false)</td>
                        <td>Whether to include CSS rules for pseudo elements, such as ::after, ::before, etc.</td>
                      </tr>
                      <tr>
                        <td>includePseudoElements</td>
                        <td>boolean</td>
                        <td>optional (default = false)</td>
                        <td>Whether to include CSS rules for pseudo classes, such as :focus, :hover, :last-child, etc.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li>
                <div>
                  <h5>Get CSS styles (without Models Builder)</h5>
                  <p>This method will return a CSS stylesheet as an Html string and is used on IPublishedContent objects. It is an extension method for the IPublishedContent class. It accepts the same optional parameters as the previous method.</p>
                  <pre class="code-snippet">
                    <code>IHtmlString GetCssStyles(this IPublishedContent content, string propertyAlias, bool addStyleTag = true, bool includePseudoElements = false, bool includePseudoClasses = false) : IHtmlString</code>
                  </pre>
                  <p>How to use</p>
                  <pre class="code-snippet">
                    <code>
                      @{ var styles = Model.GetCssStyles("colorPatterPropertyAlias"); }
                      @Html.Raw(styles)
                    </code>
                  </pre>
                  <p>Parameters</p>
                  <table>
                    <tbody>
                      <tr>
                        <td>content</td>
                        <td>IPublishedContent</td>
                        <td>mandatory</td>
                        <td>The IPublishedContent from which we want to get the Paletton Picker value.</td>
                      </tr> 
                      <tr>
                        <td>propertyAlias</td>
                        <td>string</td>
                        <td>mandatory</td>
                        <td>The alias of the Paletton Picker property.</td>
                      </tr>
                      <tr>
                        <td>addStyleTag</td>
                        <td>boolean</td>
                        <td>optional (default = true)</td>
                        <td>Wheter to add the &lt;style&gt; tag to the returned Html string. If true, it will return the whole CSS stylesheet within the &lt;style&gt; tag. If false, it will return only the CSS rules.</td>
                      </tr>
                      <tr>
                        <td>includePseudoClasses</td>
                        <td>boolean</td>
                        <td>optional (default = false)</td>
                        <td>Whether to include CSS rules for pseudo elements, such as ::after, ::before, etc.</td>
                      </tr>
                      <tr>
                        <td>includePseudoElements</td>
                        <td>boolean</td>
                        <td>optional (default = false)</td>
                        <td>Whether to include CSS rules for pseudo classes, such as :focus, :hover, :last-child, etc.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li>
                <div>
                  <h5>Get palette (using Models Builder)</h5>
                  <p>This method will return all colors and color sets information as a PalettonPalette object and is used on Paletton Picker properties of PublishedContentModel objects. It is an extension method for the JToken class, which is the actual type of Paletton Picker property returned by Models Builder.</p>
                  <pre class="code-snippet">
                    <code>
                      GetPalette(JToken value) : PalettonPalette
                    </code>
                  </pre>
                  <p>How to use</p>
                  <pre class="code-snippet">
                    <code>
                      @{ var palette = Model.ColorPatternProperty.GetPalette(); }
                    </code>
                  </pre>
                  <p>Parameters</p>
                  <table>
                    <tbody>
                      <tr>
                        <td>value</td>
                        <td>JToken</td>
                        <td>mandatory</td>
                        <td>The actual Paletton Picker value.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li>
                <div>
                  <h5>Get palette (without Models Builder)</h5>
                  <p>This method will return all colors and color sets information as a Paletton Picker object and is used on IPublishedContent objects. It is an extension method for the IPublishedContent class.</p>
                  <pre class="code-snippet">
                    <code>GetPalette(this IPublishedContent content, string propertyAlias) : PalettonPalette</code>
                  </pre>
                  <p>How to use</p>
                  <pre class="code-snippet">
                    <code>
                      @{ var palette = Model.GetPalette("colorPatterPropertyAlias"); }
                    </code>
                  </pre>
                  <p>Parameters</p>
                  <table>
                    <tbody>
                      <tr>
                        <td>content</td>
                        <td>IPublishedContent</td>
                        <td>mandatory</td>
                        <td>The IPublishedContent from which we want to get the Paletton Picker value.</td>
                      </tr> 
                      <tr>
                        <td>propertyAlias</td>
                        <td>string</td>
                        <td>mandatory</td>
                        <td>The alias of the Paletton Picker property.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
            </ul>
          </div>          
          <h4>Models</h4>
          <div class="text-block">
            <ul>
            <li>
              <div>
                <h5>PalettonPalette</h5>
                <p>It defines the palette object, containing the list of color sets (primary, secondary, complement)</p>
                <h6>Properties</h6>
                <table>
                  <tbody>
                    <tr>
                      <td>Url</td>
                      <td>string</td>
                      <td>Optional Url for the source of the color palette.</td>
                    </tr>
                    <tr>
                      <td>ColorSets</td>
                      <td>IEnumerable{PalettonColorSet}</td>
                      <td>The list of color sets included in the palette.</td>
                    </tr>
                  </tbody>
                </table>
                <h6>Methods</h6>
                <ul>
                    <li>
                      <p>ColorSet</p>
                      <p>Returns a color set by id (i.e. "primary", "secondary-1", "secondary-2", "complement")</p>
                      <pre class="code-snippet">
                        <code>ColorSet(string id) : PalettonColorSet</code>
                      </pre>
                    </li>
                    <li>
                      <p>Color</p>
                      <p>Returns a color from among all color sets by color id (i.e. "primary-0", "secondary-1-0", "secondary-2-0", "complement-0", etc)</p>
                      <pre class="code-snippet">
                        <code>Color(string colorId) : PalettonColorSet</code>
                      </pre>
                    </li>
                    <li>
                      <p>Alpha</p>
                      <p>Returns an alpha color from among all color sets by color id (i.e. "primary-0", "secondary-1-0", "secondary-2-0", "complement-0", etc) and an alpha value between 0 and 1, in the form of rgba color.</p>
                      <pre class="code-snippet">
                        <code>Alpha(string colorId, decimal alphaValue) : string</code>
                      </pre>
                    </li>
                </ul>
              </div>
            </li>
            <li>
              <div>
                <h5>PalettonColorSet</h5>
                <p>Individual set of colors (primary, secondary or complement)</p>
                <h6>Properties</h6>
                <table>
                  <tbody>
                    <tr>
                      <td>Id</td>
                      <td>string</td>
                      <td>The id of the color set (primary, secondary-1, secondary-2, complement).</td>
                    </tr>
                    <tr>
                      <td>Title</td>
                      <td>string</td>
                      <td>Optional title of the color set.</td>
                    </tr>
                    <tr>
                      <td>Colors</td>
                      <td>IEnumerable{PalettonColor}</td>
                      <td>The list of colors included in the color set.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li>
              <div>
                <h5>PalettonColor</h5>
                <p>A single color within a color set.</p>
                <h6>Properties</h6>
                <table>
                  <tbody>
                    <tr>
                      <td>Id</td>
                      <td>string</td>
                      <td>The id of the color (i.e. "primary-0", "secondary-1-0", "secondary-2-0", "complement-0", etc).</td>
                    </tr>
                    <tr>
                      <td>Hex</td>
                      <td>string</td>
                      <td>The color expressed as a hexadecimal value (i.e. AA3939).</td>
                    </tr>
                    <tr>
                      <td>Red</td>
                      <td>int</td>
                      <td>The red component of the color as an integer between 0 and 255.</td>
                    </tr>
                    <tr>
                      <td>Green</td>
                      <td>int</td>
                      <td>The green component of the color as an integer between 0 and 255.</td>
                    </tr>
                    <tr>
                      <td>Blue</td>
                      <td>int</td>
                      <td>The blue component of the color as an integer between 0 and 255.</td>
                    </tr>
                    <tr>
                      <td>HexColor</td>
                      <td>string</td>
                      <td>The Hex Code (#RRGGBB) of the color (i.e. #AA3939).</td>
                    </tr>
                    <tr>
                      <td>RgbColor</td>
                      <td>string</td>
                      <td>The Decimal Code (R, G, B) of the color (i.e. rgb(170,57,57)).</td>
                    </tr>
                  </tbody>
                </table>
                <h6>Methods</h6>
                <ul>
                    <li>
                      <p>Alpha</p>
                      <p>Returns the color with an alpha transparency between 0 and 1, in the form of rgba color.</p>
                      <pre class="code-snippet">
                        <code>Alpha(decimal alphaValue) : string</code>
                      </pre>
                    </li>
                </ul>
              </div>
            </li>
          </ul>
          </div>
          <h3 id="reference-css">CSS rules</h3>
          <div class="text-block">
            <p>This is the full list of possible CSS rules that can be rendered using the Paletton Picker methods. The rules available will depend on the color sets used on our template (primary, secondary-1, secondary-2, complement), and the optional parameters passed to the methods (include pseudo elements, include pseudo classes)</p>
            <p>As a general rule, the naming of the classes used for the CSS selectors consists of 3 parts separated by "-":</p>
            <ol>
              <li>attribute to apply the color to (empty for color, "bg" for background-color, "border" for border-color)</li>
              <li>pseudo class or pseudo element name, if any (i.e. "after", "first-of-type", etc)</li>
              <li>the color id (i.e. "primary-1", "secondary-1-1", "complement-1")</li>
            </ol>
            <h4>Class selectors</h4>
            <p>Primary Color</p>
            <ul>
              <li>.primary-0 { color: $primary-0 !important; }</li> 
              <li>.bg-primary-0 { background-color: $primary-0 !important; }</li> 
              <li>.border-primary-0 { border-color: $primary-0 !important; }</li>
              <li>.primary-1 { color: $primary-1 !important; }</li> 
              <li>.bg-primary-1 { background-color: $primary-1 !important; }</li> 
              <li>.border-primary-1 { border-color: $primary-1 !important; }</li>
              <li>.primary-2 { color: $primary-2 !important; }</li> 
              <li>.bg-primary-2 { background-color: $primary-2 !important; }</li> 
              <li>.border-primary-2 { border-color: $primary-2 !important; }</li>
              <li>.primary-3 { color: $primary-3 !important; }</li> 
              <li>.bg-primary-3 { background-color: $primary-3 !important; }</li> 
              <li>.border-primary-3 { border-color: $primary-3 !important; }</li> 
              <li>.primary-4 { color: $primary-4 !important; }</li> 
              <li>.bg-primary-4 { background-color: $primary-4 !important; }</li> 
              <li>.border-primary-4 { border-color: $primary-4 !important; }</li> 
            </ul>
            <p>Secondary Color 1</p>
            <ul>
              <li>.secondary-1-0 { color: $secondary-1-0 !important; }</li> 
              <li>.bg-secondary-1-0 { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-secondary-1-0 { border-color: $secondary-1-0 !important; }</li> 
              <li>.secondary-1-1 { color: $secondary-1-1 !important; }</li> 
              <li>.bg-secondary-1-1 { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-secondary-1-1 { border-color: $secondary-1-1 !important; }</li> 
              <li>.secondary-1-2 { color: $secondary-1-2 !important; }</li> 
              <li>.bg-secondary-1-2 { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-secondary-1-2 { border-color: $secondary-1-2 !important; }</li> 
              <li>.secondary-1-3 { color: $secondary-1-3 !important; }</li> 
              <li>.bg-secondary-1-3 { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-secondary-1-3 { border-color: $secondary-1-3 !important; }</li> 
              <li>.secondary-1-4 { color: $secondary-1-4!important; }</li> 
              <li>.bg-secondary-1-4 { background-color: $secondary-1-4!important; }</li> 
              <li>.border-secondary-1-4 { border-color: $secondary-1-4!important; }</li> 
            </ul>
            <p>Secondary Color 2</p>
            <ul>
              <li>.secondary-2-0 { color: $secondary-2-0 !important; }</li> 
              <li>.bg-secondary-2-0 { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-secondary-2-0 { border-color: $secondary-2-0 !important; }</li> 
              <li>.secondary-2-1 { color: $secondary-2-1 !important; }</li> 
              <li>.bg-secondary-2-1 { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-secondary-2-1 { border-color: $secondary-2-1 !important; }</li> 
              <li>.secondary-2-2 { color: $secondary-2-2 !important; }</li> 
              <li>.bg-secondary-2-2 { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-secondary-2-2 { border-color: $secondary-2-2 !important; }</li> 
              <li>.secondary-2-3 { color: $secondary-2-3 !important; }</li> 
              <li>.bg-secondary-2-3 { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-secondary-2-3 { border-color: $secondary-2-3 !important; }</li> 
              <li>.secondary-2-4 { color: $secondary-2-4 !important; }</li> 
              <li>.bg-secondary-2-4 { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-secondary-2-4 { border-color: $secondary-2-4 !important; }</li> 
            </ul>
            <p>Complement Color</p>
            <ul>
              <li>.complement-0 { color: $complement-0 !important; }</li> 
              <li>.bg-complement-0 { background-color: $complement-0 !important; }</li> 
              <li>.border-complement-0 { border-color: $complement-0 !important; }</li>
              <li>.complement-1 { color: $complement-1 !important; }</li> 
              <li>.bg-complement-1 { background-color: $complement-1 !important; }</li> 
              <li>.border-complement-1 { border-color: $complement-1 !important; }</li> 
              <li>.complement-2 { color: $complement-2 !important; }</li> 
              <li>.bg-complement-2 { background-color: $complement-2 !important; }</li> 
              <li>.border-complement-2 { border-color: $complement-2 !important; }</li> 
              <li>.complement-3 { color: $complement-3 !important; }</li> 
              <li>.bg-complement-3 { background-color: $complement-3 !important; }</li> 
              <li>.border-complement-3 { border-color: $complement-3 !important; }</li> 
              <li>.complement-4 { color: $complement-4 !important; }</li> 
              <li>.bg-complement-4 { background-color: $complement-4 !important; }</li> 
              <li>.border-complement-4 { border-color: $complement-4 !important; }</li> 
            </ul>
            <h4>Pseudo element selectors</h4>
            <p>Primary Color</p>
            <ul>
              <li>.after-primary-0::after { color: $primary-0 !important; }</li> 
              <li>.bg-after-primary-0::after { background-color: $primary-0 !important; }</li> 
              <li>.border-after-primary-0::after { border-color: $primary-0 !important; }</li> 
              <li>.before-primary-0::before { color: $primary-0 !important; }</li> 
              <li>.bg-before-primary-0::before { background-color: $primary-0 !important; }</li> 
              <li>.border-before-primary-0::before { border-color: $primary-0 !important; }</li> 
              <li>.first-letter-primary-0::first-letter { color: $primary-0 !important; }</li> 
              <li>.bg-first-letter-primary-0::first-letter { background-color: $primary-0 !important; }</li> 
              <li>.border-first-letter-primary-0::first-letter { border-color: $primary-0 !important; }</li> 
              <li>.first-line-primary-0::first-line { color: $primary-0 !important; }</li> 
              <li>.bg-first-line-primary-0::first-line { background-color: $primary-0 !important; }</li> 
              <li>.border-first-line-primary-0::first-line { border-color: $primary-0 !important; }</li> 
              <li>.selection-primary-0::selection { color: $primary-0 !important; }</li> 
              <li>.bg-selection-primary-0::selection { background-color: $primary-0 !important; }</li> 
              <li>.border-selection-primary-0::selection { border-color: $primary-0 !important; }</li> 
              <li>.after-primary-1::after { color: $primary-1 !important; }</li> 
              <li>.bg-after-primary-1::after { background-color: $primary-1 !important; }</li> 
              <li>.border-after-primary-1::after { border-color: $primary-1 !important; }</li> 
              <li>.before-primary-1::before { color: $primary-1 !important; }</li> 
              <li>.bg-before-primary-1::before { background-color: $primary-1 !important; }</li> 
              <li>.border-before-primary-1::before { border-color: $primary-1 !important; }</li> 
              <li>.first-letter-primary-1::first-letter { color: $primary-1 !important; }</li> 
              <li>.bg-first-letter-primary-1::first-letter { background-color: $primary-1 !important; }</li> 
              <li>.border-first-letter-primary-1::first-letter { border-color: $primary-1 !important; }</li> 
              <li>.first-line-primary-1::first-line { color: $primary-1 !important; }</li> 
              <li>.bg-first-line-primary-1::first-line { background-color: $primary-1 !important; }</li> 
              <li>.border-first-line-primary-1::first-line { border-color: $primary-1 !important; }</li> 
              <li>.selection-primary-1::selection { color: $primary-1 !important; }</li> 
              <li>.bg-selection-primary-1::selection { background-color: $primary-1 !important; }</li> 
              <li>.border-selection-primary-1::selection { border-color: $primary-1 !important; }</li> 
              <li>.after-primary-2::after { color: $primary-2 !important; }</li> 
              <li>.bg-after-primary-2::after { background-color: $primary-2 !important; }</li> 
              <li>.border-after-primary-2::after { border-color: $primary-2 !important; }</li> 
              <li>.before-primary-2::before { color: $primary-2 !important; }</li> 
              <li>.bg-before-primary-2::before { background-color: $primary-2 !important; }</li> 
              <li>.border-before-primary-2::before { border-color: $primary-2 !important; }</li> 
              <li>.first-letter-primary-2::first-letter { color: $primary-2 !important; }</li> 
              <li>.bg-first-letter-primary-2::first-letter { background-color: $primary-2 !important; }</li> 
              <li>.border-first-letter-primary-2::first-letter { border-color: $primary-2 !important; }</li> 
              <li>.first-line-primary-2::first-line { color: $primary-2 !important; }</li> 
              <li>.bg-first-line-primary-2::first-line { background-color: $primary-2 !important; }</li> 
              <li>.border-first-line-primary-2::first-line { border-color: $primary-2 !important; }</li> 
              <li>.selection-primary-2::selection { color: $primary-2 !important; }</li> 
              <li>.bg-selection-primary-2::selection { background-color: $primary-2 !important; }</li> 
              <li>.border-selection-primary-2::selection { border-color: $primary-2 !important; }</li> 
              <li>.after-primary-3::after { color: $primary-3 !important; }</li> 
              <li>.bg-after-primary-3::after { background-color: $primary-3 !important; }</li> 
              <li>.border-after-primary-3::after { border-color: $primary-3 !important; }</li> 
              <li>.before-primary-3::before { color: $primary-3 !important; }</li> 
              <li>.bg-before-primary-3::before { background-color: $primary-3 !important; }</li> 
              <li>.border-before-primary-3::before { border-color: $primary-3 !important; }</li> 
              <li>.first-letter-primary-3::first-letter { color: $primary-3 !important; }</li> 
              <li>.bg-first-letter-primary-3::first-letter { background-color: $primary-3 !important; }</li> 
              <li>.border-first-letter-primary-3::first-letter { border-color: $primary-3 !important; }</li> 
              <li>.first-line-primary-3::first-line { color: $primary-3 !important; }</li> 
              <li>.bg-first-line-primary-3::first-line { background-color: $primary-3 !important; }</li> 
              <li>.border-first-line-primary-3::first-line { border-color: $primary-3 !important; }</li> 
              <li>.selection-primary-3::selection { color: $primary-3 !important; }</li> 
              <li>.bg-selection-primary-3::selection { background-color: $primary-3 !important; }</li> 
              <li>.border-selection-primary-3::selection { border-color: $primary-3 !important; }</li> 
              <li>.after-primary-4::after { color: $primary-4 !important; }</li> 
              <li>.bg-after-primary-4::after { background-color: $primary-4 !important; }</li> 
              <li>.border-after-primary-4::after { border-color: $primary-4 !important; }</li> 
              <li>.before-primary-4::before { color: $primary-4 !important; }</li> 
              <li>.bg-before-primary-4::before { background-color: $primary-4 !important; }</li> 
              <li>.border-before-primary-4::before { border-color: $primary-4 !important; }</li> 
              <li>.first-letter-primary-4::first-letter { color: $primary-4 !important; }</li> 
              <li>.bg-first-letter-primary-4::first-letter { background-color: $primary-4 !important; }</li> 
              <li>.border-first-letter-primary-4::first-letter { border-color: $primary-4 !important; }</li> 
              <li>.first-line-primary-4::first-line { color: $primary-4 !important; }</li> 
              <li>.bg-first-line-primary-4::first-line { background-color: $primary-4 !important; }</li> 
              <li>.border-first-line-primary-4::first-line { border-color: $primary-4 !important; }</li> 
              <li>.selection-primary-4::selection { color: $primary-4 !important; }</li> 
              <li>.bg-selection-primary-4::selection { background-color: $primary-4 !important; }</li> 
              <li>.border-selection-primary-4::selection { border-color: $primary-4 !important; }</li> 
            </ul>
            <p>Secondary Color 1</p>
            <ul>
              <li>.after-secondary-1-0::after { color: $secondary-1-0 !important; }</li> 
              <li>.bg-after-secondary-1-0::after { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-after-secondary-1-0::after { border-color: $secondary-1-0 !important; }</li> 
              <li>.before-secondary-1-0::before { color: $secondary-1-0 !important; }</li> 
              <li>.bg-before-secondary-1-0::before { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-before-secondary-1-0::before { border-color: $secondary-1-0 !important; }</li> 
              <li>.first-letter-secondary-1-0::first-letter { color: $secondary-1-0 !important; }</li> 
              <li>.bg-first-letter-secondary-1-0::first-letter { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-first-letter-secondary-1-0::first-letter { border-color: $secondary-1-0 !important; }</li> 
              <li>.first-line-secondary-1-0::first-line { color: $secondary-1-0 !important; }</li> 
              <li>.bg-first-line-secondary-1-0::first-line { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-first-line-secondary-1-0::first-line { border-color: $secondary-1-0 !important; }</li> 
              <li>.selection-secondary-1-0::selection { color: $secondary-1-0 !important; }</li> 
              <li>.bg-selection-secondary-1-0::selection { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-selection-secondary-1-0::selection { border-color: $secondary-1-0 !important; }</li> 
              <li>.after-secondary-1-1::after { color: $secondary-1-1 !important; }</li> 
              <li>.bg-after-secondary-1-1::after { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-after-secondary-1-1::after { border-color: $secondary-1-1 !important; }</li> 
              <li>.before-secondary-1-1::before { color: $secondary-1-1 !important; }</li> 
              <li>.bg-before-secondary-1-1::before { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-before-secondary-1-1::before { border-color: $secondary-1-1 !important; }</li> 
              <li>.first-letter-secondary-1-1::first-letter { color: $secondary-1-1 !important; }</li> 
              <li>.bg-first-letter-secondary-1-1::first-letter { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-first-letter-secondary-1-1::first-letter { border-color: $secondary-1-1 !important; }</li> 
              <li>.first-line-secondary-1-1::first-line { color: $secondary-1-1 !important; }</li> 
              <li>.bg-first-line-secondary-1-1::first-line { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-first-line-secondary-1-1::first-line { border-color: $secondary-1-1 !important; }</li> 
              <li>.selection-secondary-1-1::selection { color: $secondary-1-1 !important; }</li> 
              <li>.bg-selection-secondary-1-1::selection { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-selection-secondary-1-1::selection { border-color: $secondary-1-1 !important; }</li> 
              <li>.after-secondary-1-2::after { color: $secondary-1-2 !important; }</li> 
              <li>.bg-after-secondary-1-2::after { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-after-secondary-1-2::after { border-color: $secondary-1-2 !important; }</li> 
              <li>.before-secondary-1-2::before { color: $secondary-1-2 !important; }</li> 
              <li>.bg-before-secondary-1-2::before { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-before-secondary-1-2::before { border-color: $secondary-1-2 !important; }</li> 
              <li>.first-letter-secondary-1-2::first-letter { color: $secondary-1-2 !important; }</li> 
              <li>.bg-first-letter-secondary-1-2::first-letter { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-first-letter-secondary-1-2::first-letter { border-color: $secondary-1-2 !important; }</li> 
              <li>.first-line-secondary-1-2::first-line { color: $secondary-1-2 !important; }</li> 
              <li>.bg-first-line-secondary-1-2::first-line { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-first-line-secondary-1-2::first-line { border-color: $secondary-1-2 !important; }</li> 
              <li>.selection-secondary-1-2::selection { color: $secondary-1-2 !important; }</li> 
              <li>.bg-selection-secondary-1-2::selection { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-selection-secondary-1-2::selection { border-color: $secondary-1-2 !important; }</li> 
              <li>.after-secondary-1-3::after { color: $secondary-1-3 !important; }</li> 
              <li>.bg-after-secondary-1-3::after { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-after-secondary-1-3::after { border-color: $secondary-1-3 !important; }</li> 
              <li>.before-secondary-1-3::before { color: $secondary-1-3 !important; }</li> 
              <li>.bg-before-secondary-1-3::before { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-before-secondary-1-3::before { border-color: $secondary-1-3 !important; }</li> 
              <li>.first-letter-secondary-1-3::first-letter { color: $secondary-1-3 !important; }</li> 
              <li>.bg-first-letter-secondary-1-3::first-letter { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-first-letter-secondary-1-3::first-letter { border-color: $secondary-1-3 !important; }</li> 
              <li>.first-line-secondary-1-3::first-line { color: $secondary-1-3 !important; }</li> 
              <li>.bg-first-line-secondary-1-3::first-line { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-first-line-secondary-1-3::first-line { border-color: $secondary-1-3 !important; }</li> 
              <li>.selection-secondary-1-3::selection { color: $secondary-1-3 !important; }</li> 
              <li>.bg-selection-secondary-1-3::selection { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-selection-secondary-1-3::selection { border-color: $secondary-1-3 !important; }</li> 
              <li>.after-secondary-1-4::after { color: $secondary-1-4!important; }</li> 
              <li>.bg-after-secondary-1-4::after { background-color: $secondary-1-4!important; }</li> 
              <li>.border-after-secondary-1-4::after { border-color: $secondary-1-4!important; }</li> 
              <li>.before-secondary-1-4::before { color: $secondary-1-4!important; }</li> 
              <li>.bg-before-secondary-1-4::before { background-color: $secondary-1-4!important; }</li> 
              <li>.border-before-secondary-1-4::before { border-color: $secondary-1-4!important; }</li> 
              <li>.first-letter-secondary-1-4::first-letter { color: $secondary-1-4!important; }</li> 
              <li>.bg-first-letter-secondary-1-4::first-letter { background-color: $secondary-1-4!important; }</li> 
              <li>.border-first-letter-secondary-1-4::first-letter { border-color: $secondary-1-4!important; }</li> 
              <li>.first-line-secondary-1-4::first-line { color: $secondary-1-4!important; }</li> 
              <li>.bg-first-line-secondary-1-4::first-line { background-color: $secondary-1-4!important; }</li> 
              <li>.border-first-line-secondary-1-4::first-line { border-color: $secondary-1-4!important; }</li> 
              <li>.selection-secondary-1-4::selection { color: $secondary-1-4!important; }</li> 
              <li>.bg-selection-secondary-1-4::selection { background-color: $secondary-1-4!important; }</li> 
              <li>.border-selection-secondary-1-4::selection { border-color: $secondary-1-4!important; }</li> 
            </ul>
            <p>Secondary Color 2</p>
            <ul>
              <li>.after-secondary-2-0::after { color: $secondary-2-0 !important; }</li> 
              <li>.bg-after-secondary-2-0::after { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-after-secondary-2-0::after { border-color: $secondary-2-0 !important; }</li> 
              <li>.before-secondary-2-0::before { color: $secondary-2-0 !important; }</li> 
              <li>.bg-before-secondary-2-0::before { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-before-secondary-2-0::before { border-color: $secondary-2-0 !important; }</li> 
              <li>.first-letter-secondary-2-0::first-letter { color: $secondary-2-0 !important; }</li> 
              <li>.bg-first-letter-secondary-2-0::first-letter { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-first-letter-secondary-2-0::first-letter { border-color: $secondary-2-0 !important; }</li> 
              <li>.first-line-secondary-2-0::first-line { color: $secondary-2-0 !important; }</li> 
              <li>.bg-first-line-secondary-2-0::first-line { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-first-line-secondary-2-0::first-line { border-color: $secondary-2-0 !important; }</li> 
              <li>.selection-secondary-2-0::selection { color: $secondary-2-0 !important; }</li> 
              <li>.bg-selection-secondary-2-0::selection { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-selection-secondary-2-0::selection { border-color: $secondary-2-0 !important; }</li> 
              <li>.after-secondary-2-1::after { color: $secondary-2-1 !important; }</li> 
              <li>.bg-after-secondary-2-1::after { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-after-secondary-2-1::after { border-color: $secondary-2-1 !important; }</li> 
              <li>.before-secondary-2-1::before { color: $secondary-2-1 !important; }</li> 
              <li>.bg-before-secondary-2-1::before { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-before-secondary-2-1::before { border-color: $secondary-2-1 !important; }</li> 
              <li>.first-letter-secondary-2-1::first-letter { color: $secondary-2-1 !important; }</li> 
              <li>.bg-first-letter-secondary-2-1::first-letter { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-first-letter-secondary-2-1::first-letter { border-color: $secondary-2-1 !important; }</li> 
              <li>.first-line-secondary-2-1::first-line { color: $secondary-2-1 !important; }</li> 
              <li>.bg-first-line-secondary-2-1::first-line { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-first-line-secondary-2-1::first-line { border-color: $secondary-2-1 !important; }</li> 
              <li>.selection-secondary-2-1::selection { color: $secondary-2-1 !important; }</li> 
              <li>.bg-selection-secondary-2-1::selection { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-selection-secondary-2-1::selection { border-color: $secondary-2-1 !important; }</li> 
              <li>.after-secondary-2-2::after { color: $secondary-2-2 !important; }</li> 
              <li>.bg-after-secondary-2-2::after { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-after-secondary-2-2::after { border-color: $secondary-2-2 !important; }</li> 
              <li>.before-secondary-2-2::before { color: $secondary-2-2 !important; }</li> 
              <li>.bg-before-secondary-2-2::before { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-before-secondary-2-2::before { border-color: $secondary-2-2 !important; }</li> 
              <li>.first-letter-secondary-2-2::first-letter { color: $secondary-2-2 !important; }</li> 
              <li>.bg-first-letter-secondary-2-2::first-letter { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-first-letter-secondary-2-2::first-letter { border-color: $secondary-2-2 !important; }</li> 
              <li>.first-line-secondary-2-2::first-line { color: $secondary-2-2 !important; }</li> 
              <li>.bg-first-line-secondary-2-2::first-line { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-first-line-secondary-2-2::first-line { border-color: $secondary-2-2 !important; }</li> 
              <li>.selection-secondary-2-2::selection { color: $secondary-2-2 !important; }</li> 
              <li>.bg-selection-secondary-2-2::selection { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-selection-secondary-2-2::selection { border-color: $secondary-2-2 !important; }</li> 
              <li>.after-secondary-2-3::after { color: $secondary-2-3 !important; }</li> 
              <li>.bg-after-secondary-2-3::after { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-after-secondary-2-3::after { border-color: $secondary-2-3 !important; }</li> 
              <li>.before-secondary-2-3::before { color: $secondary-2-3 !important; }</li> 
              <li>.bg-before-secondary-2-3::before { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-before-secondary-2-3::before { border-color: $secondary-2-3 !important; }</li> 
              <li>.first-letter-secondary-2-3::first-letter { color: $secondary-2-3 !important; }</li> 
              <li>.bg-first-letter-secondary-2-3::first-letter { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-first-letter-secondary-2-3::first-letter { border-color: $secondary-2-3 !important; }</li> 
              <li>.first-line-secondary-2-3::first-line { color: $secondary-2-3 !important; }</li> 
              <li>.bg-first-line-secondary-2-3::first-line { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-first-line-secondary-2-3::first-line { border-color: $secondary-2-3 !important; }</li> 
              <li>.selection-secondary-2-3::selection { color: $secondary-2-3 !important; }</li> 
              <li>.bg-selection-secondary-2-3::selection { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-selection-secondary-2-3::selection { border-color: $secondary-2-3 !important; }</li>
              <li>.after-secondary-2-4::after { color: $secondary-2-4 !important; }</li> 
              <li>.bg-after-secondary-2-4::after { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-after-secondary-2-4::after { border-color: $secondary-2-4 !important; }</li> 
              <li>.before-secondary-2-4::before { color: $secondary-2-4 !important; }</li> 
              <li>.bg-before-secondary-2-4::before { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-before-secondary-2-4::before { border-color: $secondary-2-4 !important; }</li> 
              <li>.first-letter-secondary-2-4::first-letter { color: $secondary-2-4 !important; }</li> 
              <li>.bg-first-letter-secondary-2-4::first-letter { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-first-letter-secondary-2-4::first-letter { border-color: $secondary-2-4 !important; }</li> 
              <li>.first-line-secondary-2-4::first-line { color: $secondary-2-4 !important; }</li> 
              <li>.bg-first-line-secondary-2-4::first-line { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-first-line-secondary-2-4::first-line { border-color: $secondary-2-4 !important; }</li> 
              <li>.selection-secondary-2-4::selection { color: $secondary-2-4 !important; }</li> 
              <li>.bg-selection-secondary-2-4::selection { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-selection-secondary-2-4::selection { border-color: $secondary-2-4 !important; }</li> 
            </ul>
            <p>Complement Color</p>
            <ul>
              <li>.after-complement-0::after { color: $complement-0 !important; }</li> 
              <li>.bg-after-complement-0::after { background-color: $complement-0 !important; }</li> 
              <li>.border-after-complement-0::after { border-color: $complement-0 !important; }</li> 
              <li>.before-complement-0::before { color: $complement-0 !important; }</li> 
              <li>.bg-before-complement-0::before { background-color: $complement-0 !important; }</li> 
              <li>.border-before-complement-0::before { border-color: $complement-0 !important; }</li> 
              <li>.first-letter-complement-0::first-letter { color: $complement-0 !important; }</li> 
              <li>.bg-first-letter-complement-0::first-letter { background-color: $complement-0 !important; }</li> 
              <li>.border-first-letter-complement-0::first-letter { border-color: $complement-0 !important; }</li> 
              <li>.first-line-complement-0::first-line { color: $complement-0 !important; }</li> 
              <li>.bg-first-line-complement-0::first-line { background-color: $complement-0 !important; }</li> 
              <li>.border-first-line-complement-0::first-line { border-color: $complement-0 !important; }</li> 
              <li>.selection-complement-0::selection { color: $complement-0 !important; }</li> 
              <li>.bg-selection-complement-0::selection { background-color: $complement-0 !important; }</li> 
              <li>.border-selection-complement-0::selection { border-color: $complement-0 !important; }</li> 
              <li>.after-complement-1::after { color: $complement-1 !important; }</li> 
              <li>.bg-after-complement-1::after { background-color: $complement-1 !important; }</li> 
              <li>.border-after-complement-1::after { border-color: $complement-1 !important; }</li> 
              <li>.before-complement-1::before { color: $complement-1 !important; }</li> 
              <li>.bg-before-complement-1::before { background-color: $complement-1 !important; }</li> 
              <li>.border-before-complement-1::before { border-color: $complement-1 !important; }</li> 
              <li>.first-letter-complement-1::first-letter { color: $complement-1 !important; }</li> 
              <li>.bg-first-letter-complement-1::first-letter { background-color: $complement-1 !important; }</li> 
              <li>.border-first-letter-complement-1::first-letter { border-color: $complement-1 !important; }</li> 
              <li>.first-line-complement-1::first-line { color: $complement-1 !important; }</li> 
              <li>.bg-first-line-complement-1::first-line { background-color: $complement-1 !important; }</li> 
              <li>.border-first-line-complement-1::first-line { border-color: $complement-1 !important; }</li> 
              <li>.selection-complement-1::selection { color: $complement-1 !important; }</li> 
              <li>.bg-selection-complement-1::selection { background-color: $complement-1 !important; }</li> 
              <li>.border-selection-complement-1::selection { border-color: $complement-1 !important; }</li> 
              <li>.after-complement-2::after { color: $complement-2 !important; }</li> 
              <li>.bg-after-complement-2::after { background-color: $complement-2 !important; }</li> 
              <li>.border-after-complement-2::after { border-color: $complement-2 !important; }</li> 
              <li>.before-complement-2::before { color: $complement-2 !important; }</li> 
              <li>.bg-before-complement-2::before { background-color: $complement-2 !important; }</li> 
              <li>.border-before-complement-2::before { border-color: $complement-2 !important; }</li> 
              <li>.first-letter-complement-2::first-letter { color: $complement-2 !important; }</li> 
              <li>.bg-first-letter-complement-2::first-letter { background-color: $complement-2 !important; }</li> 
              <li>.border-first-letter-complement-2::first-letter { border-color: $complement-2 !important; }</li> 
              <li>.first-line-complement-2::first-line { color: $complement-2 !important; }</li> 
              <li>.bg-first-line-complement-2::first-line { background-color: $complement-2 !important; }</li> 
              <li>.border-first-line-complement-2::first-line { border-color: $complement-2 !important; }</li> 
              <li>.selection-complement-2::selection { color: $complement-2 !important; }</li> 
              <li>.bg-selection-complement-2::selection { background-color: $complement-2 !important; }</li> 
              <li>.border-selection-complement-2::selection { border-color: $complement-2 !important; }</li> 
              <li>.after-complement-3::after { color: $complement-3 !important; }</li> 
              <li>.bg-after-complement-3::after { background-color: $complement-3 !important; }</li> 
              <li>.border-after-complement-3::after { border-color: $complement-3 !important; }</li> 
              <li>.before-complement-3::before { color: $complement-3 !important; }</li> 
              <li>.bg-before-complement-3::before { background-color: $complement-3 !important; }</li> 
              <li>.border-before-complement-3::before { border-color: $complement-3 !important; }</li> 
              <li>.first-letter-complement-3::first-letter { color: $complement-3 !important; }</li> 
              <li>.bg-first-letter-complement-3::first-letter { background-color: $complement-3 !important; }</li> 
              <li>.border-first-letter-complement-3::first-letter { border-color: $complement-3 !important; }</li> 
              <li>.first-line-complement-3::first-line { color: $complement-3 !important; }</li> 
              <li>.bg-first-line-complement-3::first-line { background-color: $complement-3 !important; }</li> 
              <li>.border-first-line-complement-3::first-line { border-color: $complement-3 !important; }</li> 
              <li>.selection-complement-3::selection { color: $complement-3 !important; }</li> 
              <li>.bg-selection-complement-3::selection { background-color: $complement-3 !important; }</li> 
              <li>.border-selection-complement-3::selection { border-color: $complement-3 !important; }</li> 
              <li>.after-complement-4::after { color: $complement-4 !important; }</li> 
              <li>.bg-after-complement-4::after { background-color: $complement-4 !important; }</li> 
              <li>.border-after-complement-4::after { border-color: $complement-4 !important; }</li> 
              <li>.before-complement-4::before { color: $complement-4 !important; }</li> 
              <li>.bg-before-complement-4::before { background-color: $complement-4 !important; }</li> 
              <li>.border-before-complement-4::before { border-color: $complement-4 !important; }</li> 
              <li>.first-letter-complement-4::first-letter { color: $complement-4 !important; }</li> 
              <li>.bg-first-letter-complement-4::first-letter { background-color: $complement-4 !important; }</li> 
              <li>.border-first-letter-complement-4::first-letter { border-color: $complement-4 !important; }</li> 
              <li>.first-line-complement-4::first-line { color: $complement-4 !important; }</li> 
              <li>.bg-first-line-complement-4::first-line { background-color: $complement-4 !important; }</li> 
              <li>.border-first-line-complement-4::first-line { border-color: $complement-4 !important; }</li> 
              <li>.selection-complement-4::selection { color: $complement-4 !important; }</li> 
              <li>.bg-selection-complement-4::selection { background-color: $complement-4 !important; }</li> 
              <li>.border-selection-complement-4::selection { border-color: $complement-4 !important; }</li> 
            </ul>
            <h4>Pseudo class selectors</h4>
            <p>Primary Color</p>
            <ul>
              <li>.active-primary-0:active { color: $primary-0 !important; }</li> 
              <li>.bg-active-primary-0:active { background-color: $primary-0 !important; }</li> 
              <li>.border-active-primary-0:active { border-color: $primary-0 !important; }</li> 
              <li>.checked-primary-0:checked { color: $primary-0 !important; }</li> 
              <li>.bg-checked-primary-0:checked { background-color: $primary-0 !important; }</li> 
              <li>.border-checked-primary-0:checked { border-color: $primary-0 !important; }</li> 
              <li>.disabled-primary-0:disabled { color: $primary-0 !important; }</li> 
              <li>.bg-disabled-primary-0:disabled { background-color: $primary-0 !important; }</li> 
              <li>.border-disabled-primary-0:disabled { border-color: $primary-0 !important; }</li> 
              <li>.empty-primary-0:empty { color: $primary-0 !important; }</li> 
              <li>.bg-empty-primary-0:empty { background-color: $primary-0 !important; }</li> 
              <li>.border-empty-primary-0:empty { border-color: $primary-0 !important; }</li> 
              <li>.enabled-primary-0:enabled { color: $primary-0 !important; }</li> 
              <li>.bg-enabled-primary-0:enabled { background-color: $primary-0 !important; }</li> 
              <li>.border-enabled-primary-0:enabled { border-color: $primary-0 !important; }</li> 
              <li>.first-child-primary-0:first-child { color: $primary-0 !important; }</li> 
              <li>.bg-first-child-primary-0:first-child { background-color: $primary-0 !important; }</li> 
              <li>.border-first-child-primary-0:first-child { border-color: $primary-0 !important; }</li> 
              <li>.first-of-type-primary-0:first-of-type { color: $primary-0 !important; }</li> 
              <li>.bg-first-of-type-primary-0:first-of-type { background-color: $primary-0 !important; }</li> 
              <li>.border-first-of-type-primary-0:first-of-type { border-color: $primary-0 !important; }</li> 
              <li>.focus-primary-0:focus { color: $primary-0 !important; }</li> 
              <li>.bg-focus-primary-0:focus { background-color: $primary-0 !important; }</li> 
              <li>.border-focus-primary-0:focus { border-color: $primary-0 !important; }</li> 
              <li>.hover-primary-0:hover { color: $primary-0 !important; }</li> 
              <li>.bg-hover-primary-0:hover { background-color: $primary-0 !important; }</li> 
              <li>.border-hover-primary-0:hover { border-color: $primary-0 !important; }</li> 
              <li>.in-range-primary-0:in-range { color: $primary-0 !important; }</li> 
              <li>.bg-in-range-primary-0:in-range { background-color: $primary-0 !important; }</li> 
              <li>.border-in-range-primary-0:in-range { border-color: $primary-0 !important; }</li> 
              <li>.invalid-primary-0:invalid { color: $primary-0 !important; }</li> 
              <li>.bg-invalid-primary-0:invalid { background-color: $primary-0 !important; }</li> 
              <li>.border-invalid-primary-0:invalid { border-color: $primary-0 !important; }</li> 
              <li>.last-child-primary-0:last-child { color: $primary-0 !important; }</li> 
              <li>.bg-last-child-primary-0:last-child { background-color: $primary-0 !important; }</li> 
              <li>.border-last-child-primary-0:last-child { border-color: $primary-0 !important; }</li> 
              <li>.last-of-type-primary-0:last-of-type { color: $primary-0 !important; }</li> 
              <li>.bg-last-of-type-primary-0:last-of-type { background-color: $primary-0 !important; }</li> 
              <li>.border-last-of-type-primary-0:last-of-type { border-color: $primary-0 !important; }</li> 
              <li>.link-primary-0:link { color: $primary-0 !important; }</li> 
              <li>.bg-link-primary-0:link { background-color: $primary-0 !important; }</li> 
              <li>.border-link-primary-0:link { border-color: $primary-0 !important; }</li> 
              <li>.only-of-type-primary-0:only-of-type { color: $primary-0 !important; }</li> 
              <li>.bg-only-of-type-primary-0:only-of-type { background-color: $primary-0 !important; }</li> 
              <li>.border-only-of-type-primary-0:only-of-type { border-color: $primary-0 !important; }</li> 
              <li>.only-child-primary-0:only-child { color: $primary-0 !important; }</li> 
              <li>.bg-only-child-primary-0:only-child { background-color: $primary-0 !important; }</li> 
              <li>.border-only-child-primary-0:only-child { border-color: $primary-0 !important; }</li> 
              <li>.optional-primary-0:optional { color: $primary-0 !important; }</li> 
              <li>.bg-optional-primary-0:optional { background-color: $primary-0 !important; }</li> 
              <li>.border-optional-primary-0:optional { border-color: $primary-0 !important; }</li> 
              <li>.out-of-range-primary-0:out-of-range { color: $primary-0 !important; }</li> 
              <li>.bg-out-of-range-primary-0:out-of-range { background-color: $primary-0 !important; }</li> 
              <li>.border-out-of-range-primary-0:out-of-range { border-color: $primary-0 !important; }</li> 
              <li>.read-only-primary-0:read-only { color: $primary-0 !important; }</li> 
              <li>.bg-read-only-primary-0:read-only { background-color: $primary-0 !important; }</li> 
              <li>.border-read-only-primary-0:read-only { border-color: $primary-0 !important; }</li> 
              <li>.read-write-primary-0:read-write { color: $primary-0 !important; }</li> 
              <li>.bg-read-write-primary-0:read-write { background-color: $primary-0 !important; }</li> 
              <li>.border-read-write-primary-0:read-write { border-color: $primary-0 !important; }</li> 
              <li>.required-primary-0:required { color: $primary-0 !important; }</li> 
              <li>.bg-required-primary-0:required { background-color: $primary-0 !important; }</li> 
              <li>.border-required-primary-0:required { border-color: $primary-0 !important; }</li> 
              <li>.root-primary-0:root { color: $primary-0 !important; }</li> 
              <li>.bg-root-primary-0:root { background-color: $primary-0 !important; }</li> 
              <li>.border-root-primary-0:root { border-color: $primary-0 !important; }</li> 
              <li>.target-primary-0:target { color: $primary-0 !important; }</li> 
              <li>.bg-target-primary-0:target { background-color: $primary-0 !important; }</li> 
              <li>.border-target-primary-0:target { border-color: $primary-0 !important; }</li> 
              <li>.valid-primary-0:valid { color: $primary-0 !important; }</li> 
              <li>.bg-valid-primary-0:valid { background-color: $primary-0 !important; }</li> 
              <li>.border-valid-primary-0:valid { border-color: $primary-0 !important; }</li> 
              <li>.visited-primary-0:visited { color: $primary-0 !important; }</li> 
              <li>.bg-visited-primary-0:visited { background-color: $primary-0 !important; }</li> 
              <li>.border-visited-primary-0:visited { border-color: $primary-0 !important; }</li> 
              <li>.active-primary-1:active { color: $primary-1 !important; }</li> 
              <li>.bg-active-primary-1:active { background-color: $primary-1 !important; }</li> 
              <li>.border-active-primary-1:active { border-color: $primary-1 !important; }</li> 
              <li>.checked-primary-1:checked { color: $primary-1 !important; }</li> 
              <li>.bg-checked-primary-1:checked { background-color: $primary-1 !important; }</li> 
              <li>.border-checked-primary-1:checked { border-color: $primary-1 !important; }</li> 
              <li>.disabled-primary-1:disabled { color: $primary-1 !important; }</li> 
              <li>.bg-disabled-primary-1:disabled { background-color: $primary-1 !important; }</li> 
              <li>.border-disabled-primary-1:disabled { border-color: $primary-1 !important; }</li> 
              <li>.empty-primary-1:empty { color: $primary-1 !important; }</li> 
              <li>.bg-empty-primary-1:empty { background-color: $primary-1 !important; }</li> 
              <li>.border-empty-primary-1:empty { border-color: $primary-1 !important; }</li> 
              <li>.enabled-primary-1:enabled { color: $primary-1 !important; }</li> 
              <li>.bg-enabled-primary-1:enabled { background-color: $primary-1 !important; }</li> 
              <li>.border-enabled-primary-1:enabled { border-color: $primary-1 !important; }</li> 
              <li>.first-child-primary-1:first-child { color: $primary-1 !important; }</li> 
              <li>.bg-first-child-primary-1:first-child { background-color: $primary-1 !important; }</li> 
              <li>.border-first-child-primary-1:first-child { border-color: $primary-1 !important; }</li> 
              <li>.first-of-type-primary-1:first-of-type { color: $primary-1 !important; }</li> 
              <li>.bg-first-of-type-primary-1:first-of-type { background-color: $primary-1 !important; }</li> 
              <li>.border-first-of-type-primary-1:first-of-type { border-color: $primary-1 !important; }</li> 
              <li>.focus-primary-1:focus { color: $primary-1 !important; }</li> 
              <li>.bg-focus-primary-1:focus { background-color: $primary-1 !important; }</li> 
              <li>.border-focus-primary-1:focus { border-color: $primary-1 !important; }</li> 
              <li>.hover-primary-1:hover { color: $primary-1 !important; }</li> 
              <li>.bg-hover-primary-1:hover { background-color: $primary-1 !important; }</li> 
              <li>.border-hover-primary-1:hover { border-color: $primary-1 !important; }</li> 
              <li>.in-range-primary-1:in-range { color: $primary-1 !important; }</li> 
              <li>.bg-in-range-primary-1:in-range { background-color: $primary-1 !important; }</li> 
              <li>.border-in-range-primary-1:in-range { border-color: $primary-1 !important; }</li> 
              <li>.invalid-primary-1:invalid { color: $primary-1 !important; }</li> 
              <li>.bg-invalid-primary-1:invalid { background-color: $primary-1 !important; }</li> 
              <li>.border-invalid-primary-1:invalid { border-color: $primary-1 !important; }</li> 
              <li>.last-child-primary-1:last-child { color: $primary-1 !important; }</li> 
              <li>.bg-last-child-primary-1:last-child { background-color: $primary-1 !important; }</li> 
              <li>.border-last-child-primary-1:last-child { border-color: $primary-1 !important; }</li> 
              <li>.last-of-type-primary-1:last-of-type { color: $primary-1 !important; }</li> 
              <li>.bg-last-of-type-primary-1:last-of-type { background-color: $primary-1 !important; }</li> 
              <li>.border-last-of-type-primary-1:last-of-type { border-color: $primary-1 !important; }</li> 
              <li>.link-primary-1:link { color: $primary-1 !important; }</li> 
              <li>.bg-link-primary-1:link { background-color: $primary-1 !important; }</li> 
              <li>.border-link-primary-1:link { border-color: $primary-1 !important; }</li> 
              <li>.only-of-type-primary-1:only-of-type { color: $primary-1 !important; }</li> 
              <li>.bg-only-of-type-primary-1:only-of-type { background-color: $primary-1 !important; }</li> 
              <li>.border-only-of-type-primary-1:only-of-type { border-color: $primary-1 !important; }</li> 
              <li>.only-child-primary-1:only-child { color: $primary-1 !important; }</li> 
              <li>.bg-only-child-primary-1:only-child { background-color: $primary-1 !important; }</li> 
              <li>.border-only-child-primary-1:only-child { border-color: $primary-1 !important; }</li> 
              <li>.optional-primary-1:optional { color: $primary-1 !important; }</li> 
              <li>.bg-optional-primary-1:optional { background-color: $primary-1 !important; }</li> 
              <li>.border-optional-primary-1:optional { border-color: $primary-1 !important; }</li> 
              <li>.out-of-range-primary-1:out-of-range { color: $primary-1 !important; }</li> 
              <li>.bg-out-of-range-primary-1:out-of-range { background-color: $primary-1 !important; }</li> 
              <li>.border-out-of-range-primary-1:out-of-range { border-color: $primary-1 !important; }</li> 
              <li>.read-only-primary-1:read-only { color: $primary-1 !important; }</li> 
              <li>.bg-read-only-primary-1:read-only { background-color: $primary-1 !important; }</li> 
              <li>.border-read-only-primary-1:read-only { border-color: $primary-1 !important; }</li> 
              <li>.read-write-primary-1:read-write { color: $primary-1 !important; }</li> 
              <li>.bg-read-write-primary-1:read-write { background-color: $primary-1 !important; }</li> 
              <li>.border-read-write-primary-1:read-write { border-color: $primary-1 !important; }</li> 
              <li>.required-primary-1:required { color: $primary-1 !important; }</li> 
              <li>.bg-required-primary-1:required { background-color: $primary-1 !important; }</li> 
              <li>.border-required-primary-1:required { border-color: $primary-1 !important; }</li> 
              <li>.root-primary-1:root { color: $primary-1 !important; }</li> 
              <li>.bg-root-primary-1:root { background-color: $primary-1 !important; }</li> 
              <li>.border-root-primary-1:root { border-color: $primary-1 !important; }</li> 
              <li>.target-primary-1:target { color: $primary-1 !important; }</li> 
              <li>.bg-target-primary-1:target { background-color: $primary-1 !important; }</li> 
              <li>.border-target-primary-1:target { border-color: $primary-1 !important; }</li> 
              <li>.valid-primary-1:valid { color: $primary-1 !important; }</li> 
              <li>.bg-valid-primary-1:valid { background-color: $primary-1 !important; }</li> 
              <li>.border-valid-primary-1:valid { border-color: $primary-1 !important; }</li> 
              <li>.visited-primary-1:visited { color: $primary-1 !important; }</li> 
              <li>.bg-visited-primary-1:visited { background-color: $primary-1 !important; }</li> 
              <li>.border-visited-primary-1:visited { border-color: $primary-1 !important; }</li> 
              <li>.active-primary-2:active { color: $primary-2 !important; }</li> 
              <li>.bg-active-primary-2:active { background-color: $primary-2 !important; }</li> 
              <li>.border-active-primary-2:active { border-color: $primary-2 !important; }</li> 
              <li>.checked-primary-2:checked { color: $primary-2 !important; }</li> 
              <li>.bg-checked-primary-2:checked { background-color: $primary-2 !important; }</li> 
              <li>.border-checked-primary-2:checked { border-color: $primary-2 !important; }</li> 
              <li>.disabled-primary-2:disabled { color: $primary-2 !important; }</li> 
              <li>.bg-disabled-primary-2:disabled { background-color: $primary-2 !important; }</li> 
              <li>.border-disabled-primary-2:disabled { border-color: $primary-2 !important; }</li> 
              <li>.empty-primary-2:empty { color: $primary-2 !important; }</li> 
              <li>.bg-empty-primary-2:empty { background-color: $primary-2 !important; }</li> 
              <li>.border-empty-primary-2:empty { border-color: $primary-2 !important; }</li> 
              <li>.enabled-primary-2:enabled { color: $primary-2 !important; }</li> 
              <li>.bg-enabled-primary-2:enabled { background-color: $primary-2 !important; }</li> 
              <li>.border-enabled-primary-2:enabled { border-color: $primary-2 !important; }</li> 
              <li>.first-child-primary-2:first-child { color: $primary-2 !important; }</li> 
              <li>.bg-first-child-primary-2:first-child { background-color: $primary-2 !important; }</li> 
              <li>.border-first-child-primary-2:first-child { border-color: $primary-2 !important; }</li> 
              <li>.first-of-type-primary-2:first-of-type { color: $primary-2 !important; }</li> 
              <li>.bg-first-of-type-primary-2:first-of-type { background-color: $primary-2 !important; }</li> 
              <li>.border-first-of-type-primary-2:first-of-type { border-color: $primary-2 !important; }</li> 
              <li>.focus-primary-2:focus { color: $primary-2 !important; }</li> 
              <li>.bg-focus-primary-2:focus { background-color: $primary-2 !important; }</li> 
              <li>.border-focus-primary-2:focus { border-color: $primary-2 !important; }</li> 
              <li>.hover-primary-2:hover { color: $primary-2 !important; }</li> 
              <li>.bg-hover-primary-2:hover { background-color: $primary-2 !important; }</li> 
              <li>.border-hover-primary-2:hover { border-color: $primary-2 !important; }</li> 
              <li>.in-range-primary-2:in-range { color: $primary-2 !important; }</li> 
              <li>.bg-in-range-primary-2:in-range { background-color: $primary-2 !important; }</li> 
              <li>.border-in-range-primary-2:in-range { border-color: $primary-2 !important; }</li> 
              <li>.invalid-primary-2:invalid { color: $primary-2 !important; }</li> 
              <li>.bg-invalid-primary-2:invalid { background-color: $primary-2 !important; }</li> 
              <li>.border-invalid-primary-2:invalid { border-color: $primary-2 !important; }</li> 
              <li>.last-child-primary-2:last-child { color: $primary-2 !important; }</li> 
              <li>.bg-last-child-primary-2:last-child { background-color: $primary-2 !important; }</li> 
              <li>.border-last-child-primary-2:last-child { border-color: $primary-2 !important; }</li> 
              <li>.last-of-type-primary-2:last-of-type { color: $primary-2 !important; }</li> 
              <li>.bg-last-of-type-primary-2:last-of-type { background-color: $primary-2 !important; }</li> 
              <li>.border-last-of-type-primary-2:last-of-type { border-color: $primary-2 !important; }</li> 
              <li>.link-primary-2:link { color: $primary-2 !important; }</li> 
              <li>.bg-link-primary-2:link { background-color: $primary-2 !important; }</li> 
              <li>.border-link-primary-2:link { border-color: $primary-2 !important; }</li> 
              <li>.only-of-type-primary-2:only-of-type { color: $primary-2 !important; }</li> 
              <li>.bg-only-of-type-primary-2:only-of-type { background-color: $primary-2 !important; }</li> 
              <li>.border-only-of-type-primary-2:only-of-type { border-color: $primary-2 !important; }</li> 
              <li>.only-child-primary-2:only-child { color: $primary-2 !important; }</li> 
              <li>.bg-only-child-primary-2:only-child { background-color: $primary-2 !important; }</li> 
              <li>.border-only-child-primary-2:only-child { border-color: $primary-2 !important; }</li> 
              <li>.optional-primary-2:optional { color: $primary-2 !important; }</li> 
              <li>.bg-optional-primary-2:optional { background-color: $primary-2 !important; }</li> 
              <li>.border-optional-primary-2:optional { border-color: $primary-2 !important; }</li> 
              <li>.out-of-range-primary-2:out-of-range { color: $primary-2 !important; }</li> 
              <li>.bg-out-of-range-primary-2:out-of-range { background-color: $primary-2 !important; }</li> 
              <li>.border-out-of-range-primary-2:out-of-range { border-color: $primary-2 !important; }</li> 
              <li>.read-only-primary-2:read-only { color: $primary-2 !important; }</li> 
              <li>.bg-read-only-primary-2:read-only { background-color: $primary-2 !important; }</li> 
              <li>.border-read-only-primary-2:read-only { border-color: $primary-2 !important; }</li> 
              <li>.read-write-primary-2:read-write { color: $primary-2 !important; }</li> 
              <li>.bg-read-write-primary-2:read-write { background-color: $primary-2 !important; }</li> 
              <li>.border-read-write-primary-2:read-write { border-color: $primary-2 !important; }</li> 
              <li>.required-primary-2:required { color: $primary-2 !important; }</li> 
              <li>.bg-required-primary-2:required { background-color: $primary-2 !important; }</li> 
              <li>.border-required-primary-2:required { border-color: $primary-2 !important; }</li> 
              <li>.root-primary-2:root { color: $primary-2 !important; }</li> 
              <li>.bg-root-primary-2:root { background-color: $primary-2 !important; }</li> 
              <li>.border-root-primary-2:root { border-color: $primary-2 !important; }</li> 
              <li>.target-primary-2:target { color: $primary-2 !important; }</li> 
              <li>.bg-target-primary-2:target { background-color: $primary-2 !important; }</li> 
              <li>.border-target-primary-2:target { border-color: $primary-2 !important; }</li> 
              <li>.valid-primary-2:valid { color: $primary-2 !important; }</li> 
              <li>.bg-valid-primary-2:valid { background-color: $primary-2 !important; }</li> 
              <li>.border-valid-primary-2:valid { border-color: $primary-2 !important; }</li> 
              <li>.visited-primary-2:visited { color: $primary-2 !important; }</li> 
              <li>.bg-visited-primary-2:visited { background-color: $primary-2 !important; }</li> 
              <li>.border-visited-primary-2:visited { border-color: $primary-2 !important; }</li> 
              <li>.active-primary-3:active { color: $primary-3 !important; }</li> 
              <li>.bg-active-primary-3:active { background-color: $primary-3 !important; }</li> 
              <li>.border-active-primary-3:active { border-color: $primary-3 !important; }</li> 
              <li>.checked-primary-3:checked { color: $primary-3 !important; }</li> 
              <li>.bg-checked-primary-3:checked { background-color: $primary-3 !important; }</li> 
              <li>.border-checked-primary-3:checked { border-color: $primary-3 !important; }</li> 
              <li>.disabled-primary-3:disabled { color: $primary-3 !important; }</li> 
              <li>.bg-disabled-primary-3:disabled { background-color: $primary-3 !important; }</li> 
              <li>.border-disabled-primary-3:disabled { border-color: $primary-3 !important; }</li> 
              <li>.empty-primary-3:empty { color: $primary-3 !important; }</li> 
              <li>.bg-empty-primary-3:empty { background-color: $primary-3 !important; }</li> 
              <li>.border-empty-primary-3:empty { border-color: $primary-3 !important; }</li> 
              <li>.enabled-primary-3:enabled { color: $primary-3 !important; }</li> 
              <li>.bg-enabled-primary-3:enabled { background-color: $primary-3 !important; }</li> 
              <li>.border-enabled-primary-3:enabled { border-color: $primary-3 !important; }</li> 
              <li>.first-child-primary-3:first-child { color: $primary-3 !important; }</li> 
              <li>.bg-first-child-primary-3:first-child { background-color: $primary-3 !important; }</li> 
              <li>.border-first-child-primary-3:first-child { border-color: $primary-3 !important; }</li> 
              <li>.first-of-type-primary-3:first-of-type { color: $primary-3 !important; }</li> 
              <li>.bg-first-of-type-primary-3:first-of-type { background-color: $primary-3 !important; }</li> 
              <li>.border-first-of-type-primary-3:first-of-type { border-color: $primary-3 !important; }</li> 
              <li>.focus-primary-3:focus { color: $primary-3 !important; }</li> 
              <li>.bg-focus-primary-3:focus { background-color: $primary-3 !important; }</li> 
              <li>.border-focus-primary-3:focus { border-color: $primary-3 !important; }</li> 
              <li>.hover-primary-3:hover { color: $primary-3 !important; }</li> 
              <li>.bg-hover-primary-3:hover { background-color: $primary-3 !important; }</li> 
              <li>.border-hover-primary-3:hover { border-color: $primary-3 !important; }</li> 
              <li>.in-range-primary-3:in-range { color: $primary-3 !important; }</li> 
              <li>.bg-in-range-primary-3:in-range { background-color: $primary-3 !important; }</li> 
              <li>.border-in-range-primary-3:in-range { border-color: $primary-3 !important; }</li> 
              <li>.invalid-primary-3:invalid { color: $primary-3 !important; }</li> 
              <li>.bg-invalid-primary-3:invalid { background-color: $primary-3 !important; }</li> 
              <li>.border-invalid-primary-3:invalid { border-color: $primary-3 !important; }</li> 
              <li>.last-child-primary-3:last-child { color: $primary-3 !important; }</li> 
              <li>.bg-last-child-primary-3:last-child { background-color: $primary-3 !important; }</li> 
              <li>.border-last-child-primary-3:last-child { border-color: $primary-3 !important; }</li> 
              <li>.last-of-type-primary-3:last-of-type { color: $primary-3 !important; }</li> 
              <li>.bg-last-of-type-primary-3:last-of-type { background-color: $primary-3 !important; }</li> 
              <li>.border-last-of-type-primary-3:last-of-type { border-color: $primary-3 !important; }</li> 
              <li>.link-primary-3:link { color: $primary-3 !important; }</li> 
              <li>.bg-link-primary-3:link { background-color: $primary-3 !important; }</li> 
              <li>.border-link-primary-3:link { border-color: $primary-3 !important; }</li> 
              <li>.only-of-type-primary-3:only-of-type { color: $primary-3 !important; }</li> 
              <li>.bg-only-of-type-primary-3:only-of-type { background-color: $primary-3 !important; }</li> 
              <li>.border-only-of-type-primary-3:only-of-type { border-color: $primary-3 !important; }</li> 
              <li>.only-child-primary-3:only-child { color: $primary-3 !important; }</li> 
              <li>.bg-only-child-primary-3:only-child { background-color: $primary-3 !important; }</li> 
              <li>.border-only-child-primary-3:only-child { border-color: $primary-3 !important; }</li> 
              <li>.optional-primary-3:optional { color: $primary-3 !important; }</li> 
              <li>.bg-optional-primary-3:optional { background-color: $primary-3 !important; }</li> 
              <li>.border-optional-primary-3:optional { border-color: $primary-3 !important; }</li> 
              <li>.out-of-range-primary-3:out-of-range { color: $primary-3 !important; }</li> 
              <li>.bg-out-of-range-primary-3:out-of-range { background-color: $primary-3 !important; }</li> 
              <li>.border-out-of-range-primary-3:out-of-range { border-color: $primary-3 !important; }</li> 
              <li>.read-only-primary-3:read-only { color: $primary-3 !important; }</li> 
              <li>.bg-read-only-primary-3:read-only { background-color: $primary-3 !important; }</li> 
              <li>.border-read-only-primary-3:read-only { border-color: $primary-3 !important; }</li> 
              <li>.read-write-primary-3:read-write { color: $primary-3 !important; }</li> 
              <li>.bg-read-write-primary-3:read-write { background-color: $primary-3 !important; }</li> 
              <li>.border-read-write-primary-3:read-write { border-color: $primary-3 !important; }</li> 
              <li>.required-primary-3:required { color: $primary-3 !important; }</li> 
              <li>.bg-required-primary-3:required { background-color: $primary-3 !important; }</li> 
              <li>.border-required-primary-3:required { border-color: $primary-3 !important; }</li> 
              <li>.root-primary-3:root { color: $primary-3 !important; }</li> 
              <li>.bg-root-primary-3:root { background-color: $primary-3 !important; }</li> 
              <li>.border-root-primary-3:root { border-color: $primary-3 !important; }</li> 
              <li>.target-primary-3:target { color: $primary-3 !important; }</li> 
              <li>.bg-target-primary-3:target { background-color: $primary-3 !important; }</li> 
              <li>.border-target-primary-3:target { border-color: $primary-3 !important; }</li> 
              <li>.valid-primary-3:valid { color: $primary-3 !important; }</li> 
              <li>.bg-valid-primary-3:valid { background-color: $primary-3 !important; }</li> 
              <li>.border-valid-primary-3:valid { border-color: $primary-3 !important; }</li> 
              <li>.visited-primary-3:visited { color: $primary-3 !important; }</li> 
              <li>.bg-visited-primary-3:visited { background-color: $primary-3 !important; }</li> 
              <li>.border-visited-primary-3:visited { border-color: $primary-3 !important; }</li> 
              <li>.active-primary-4:active { color: $primary-4 !important; }</li> 
              <li>.bg-active-primary-4:active { background-color: $primary-4 !important; }</li> 
              <li>.border-active-primary-4:active { border-color: $primary-4 !important; }</li> 
              <li>.checked-primary-4:checked { color: $primary-4 !important; }</li> 
              <li>.bg-checked-primary-4:checked { background-color: $primary-4 !important; }</li> 
              <li>.border-checked-primary-4:checked { border-color: $primary-4 !important; }</li> 
              <li>.disabled-primary-4:disabled { color: $primary-4 !important; }</li> 
              <li>.bg-disabled-primary-4:disabled { background-color: $primary-4 !important; }</li> 
              <li>.border-disabled-primary-4:disabled { border-color: $primary-4 !important; }</li> 
              <li>.empty-primary-4:empty { color: $primary-4 !important; }</li> 
              <li>.bg-empty-primary-4:empty { background-color: $primary-4 !important; }</li> 
              <li>.border-empty-primary-4:empty { border-color: $primary-4 !important; }</li> 
              <li>.enabled-primary-4:enabled { color: $primary-4 !important; }</li> 
              <li>.bg-enabled-primary-4:enabled { background-color: $primary-4 !important; }</li> 
              <li>.border-enabled-primary-4:enabled { border-color: $primary-4 !important; }</li> 
              <li>.first-child-primary-4:first-child { color: $primary-4 !important; }</li> 
              <li>.bg-first-child-primary-4:first-child { background-color: $primary-4 !important; }</li> 
              <li>.border-first-child-primary-4:first-child { border-color: $primary-4 !important; }</li> 
              <li>.first-of-type-primary-4:first-of-type { color: $primary-4 !important; }</li> 
              <li>.bg-first-of-type-primary-4:first-of-type { background-color: $primary-4 !important; }</li> 
              <li>.border-first-of-type-primary-4:first-of-type { border-color: $primary-4 !important; }</li> 
              <li>.focus-primary-4:focus { color: $primary-4 !important; }</li> 
              <li>.bg-focus-primary-4:focus { background-color: $primary-4 !important; }</li> 
              <li>.border-focus-primary-4:focus { border-color: $primary-4 !important; }</li> 
              <li>.hover-primary-4:hover { color: $primary-4 !important; }</li> 
              <li>.bg-hover-primary-4:hover { background-color: $primary-4 !important; }</li> 
              <li>.border-hover-primary-4:hover { border-color: $primary-4 !important; }</li> 
              <li>.in-range-primary-4:in-range { color: $primary-4 !important; }</li> 
              <li>.bg-in-range-primary-4:in-range { background-color: $primary-4 !important; }</li> 
              <li>.border-in-range-primary-4:in-range { border-color: $primary-4 !important; }</li> 
              <li>.invalid-primary-4:invalid { color: $primary-4 !important; }</li> 
              <li>.bg-invalid-primary-4:invalid { background-color: $primary-4 !important; }</li> 
              <li>.border-invalid-primary-4:invalid { border-color: $primary-4 !important; }</li> 
              <li>.last-child-primary-4:last-child { color: $primary-4 !important; }</li> 
              <li>.bg-last-child-primary-4:last-child { background-color: $primary-4 !important; }</li> 
              <li>.border-last-child-primary-4:last-child { border-color: $primary-4 !important; }</li> 
              <li>.last-of-type-primary-4:last-of-type { color: $primary-4 !important; }</li> 
              <li>.bg-last-of-type-primary-4:last-of-type { background-color: $primary-4 !important; }</li> 
              <li>.border-last-of-type-primary-4:last-of-type { border-color: $primary-4 !important; }</li> 
              <li>.link-primary-4:link { color: $primary-4 !important; }</li> 
              <li>.bg-link-primary-4:link { background-color: $primary-4 !important; }</li> 
              <li>.border-link-primary-4:link { border-color: $primary-4 !important; }</li> 
              <li>.only-of-type-primary-4:only-of-type { color: $primary-4 !important; }</li> 
              <li>.bg-only-of-type-primary-4:only-of-type { background-color: $primary-4 !important; }</li> 
              <li>.border-only-of-type-primary-4:only-of-type { border-color: $primary-4 !important; }</li> 
              <li>.only-child-primary-4:only-child { color: $primary-4 !important; }</li> 
              <li>.bg-only-child-primary-4:only-child { background-color: $primary-4 !important; }</li> 
              <li>.border-only-child-primary-4:only-child { border-color: $primary-4 !important; }</li> 
              <li>.optional-primary-4:optional { color: $primary-4 !important; }</li> 
              <li>.bg-optional-primary-4:optional { background-color: $primary-4 !important; }</li> 
              <li>.border-optional-primary-4:optional { border-color: $primary-4 !important; }</li> 
              <li>.out-of-range-primary-4:out-of-range { color: $primary-4 !important; }</li> 
              <li>.bg-out-of-range-primary-4:out-of-range { background-color: $primary-4 !important; }</li> 
              <li>.border-out-of-range-primary-4:out-of-range { border-color: $primary-4 !important; }</li> 
              <li>.read-only-primary-4:read-only { color: $primary-4 !important; }</li> 
              <li>.bg-read-only-primary-4:read-only { background-color: $primary-4 !important; }</li> 
              <li>.border-read-only-primary-4:read-only { border-color: $primary-4 !important; }</li> 
              <li>.read-write-primary-4:read-write { color: $primary-4 !important; }</li> 
              <li>.bg-read-write-primary-4:read-write { background-color: $primary-4 !important; }</li> 
              <li>.border-read-write-primary-4:read-write { border-color: $primary-4 !important; }</li> 
              <li>.required-primary-4:required { color: $primary-4 !important; }</li> 
              <li>.bg-required-primary-4:required { background-color: $primary-4 !important; }</li> 
              <li>.border-required-primary-4:required { border-color: $primary-4 !important; }</li> 
              <li>.root-primary-4:root { color: $primary-4 !important; }</li> 
              <li>.bg-root-primary-4:root { background-color: $primary-4 !important; }</li> 
              <li>.border-root-primary-4:root { border-color: $primary-4 !important; }</li> 
              <li>.target-primary-4:target { color: $primary-4 !important; }</li> 
              <li>.bg-target-primary-4:target { background-color: $primary-4 !important; }</li> 
              <li>.border-target-primary-4:target { border-color: $primary-4 !important; }</li> 
              <li>.valid-primary-4:valid { color: $primary-4 !important; }</li> 
              <li>.bg-valid-primary-4:valid { background-color: $primary-4 !important; }</li> 
              <li>.border-valid-primary-4:valid { border-color: $primary-4 !important; }</li> 
              <li>.visited-primary-4:visited { color: $primary-4 !important; }</li> 
              <li>.bg-visited-primary-4:visited { background-color: $primary-4 !important; }</li> 
              <li>.border-visited-primary-4:visited { border-color: $primary-4 !important; }</li> 
            </ul>
            <p>Secondary Color 1</p>
            <ul>
              <li>.active-secondary-1-0:active { color: $secondary-1-0 !important; }</li> 
              <li>.bg-active-secondary-1-0:active { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-active-secondary-1-0:active { border-color: $secondary-1-0 !important; }</li> 
              <li>.checked-secondary-1-0:checked { color: $secondary-1-0 !important; }</li> 
              <li>.bg-checked-secondary-1-0:checked { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-checked-secondary-1-0:checked { border-color: $secondary-1-0 !important; }</li> 
              <li>.disabled-secondary-1-0:disabled { color: $secondary-1-0 !important; }</li> 
              <li>.bg-disabled-secondary-1-0:disabled { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-disabled-secondary-1-0:disabled { border-color: $secondary-1-0 !important; }</li> 
              <li>.empty-secondary-1-0:empty { color: $secondary-1-0 !important; }</li> 
              <li>.bg-empty-secondary-1-0:empty { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-empty-secondary-1-0:empty { border-color: $secondary-1-0 !important; }</li> 
              <li>.enabled-secondary-1-0:enabled { color: $secondary-1-0 !important; }</li> 
              <li>.bg-enabled-secondary-1-0:enabled { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-enabled-secondary-1-0:enabled { border-color: $secondary-1-0 !important; }</li> 
              <li>.first-child-secondary-1-0:first-child { color: $secondary-1-0 !important; }</li> 
              <li>.bg-first-child-secondary-1-0:first-child { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-first-child-secondary-1-0:first-child { border-color: $secondary-1-0 !important; }</li> 
              <li>.first-of-type-secondary-1-0:first-of-type { color: $secondary-1-0 !important; }</li> 
              <li>.bg-first-of-type-secondary-1-0:first-of-type { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-first-of-type-secondary-1-0:first-of-type { border-color: $secondary-1-0 !important; }</li> 
              <li>.focus-secondary-1-0:focus { color: $secondary-1-0 !important; }</li> 
              <li>.bg-focus-secondary-1-0:focus { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-focus-secondary-1-0:focus { border-color: $secondary-1-0 !important; }</li> 
              <li>.hover-secondary-1-0:hover { color: $secondary-1-0 !important; }</li> 
              <li>.bg-hover-secondary-1-0:hover { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-hover-secondary-1-0:hover { border-color: $secondary-1-0 !important; }</li> 
              <li>.in-range-secondary-1-0:in-range { color: $secondary-1-0 !important; }</li> 
              <li>.bg-in-range-secondary-1-0:in-range { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-in-range-secondary-1-0:in-range { border-color: $secondary-1-0 !important; }</li> 
              <li>.invalid-secondary-1-0:invalid { color: $secondary-1-0 !important; }</li> 
              <li>.bg-invalid-secondary-1-0:invalid { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-invalid-secondary-1-0:invalid { border-color: $secondary-1-0 !important; }</li> 
              <li>.last-child-secondary-1-0:last-child { color: $secondary-1-0 !important; }</li> 
              <li>.bg-last-child-secondary-1-0:last-child { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-last-child-secondary-1-0:last-child { border-color: $secondary-1-0 !important; }</li> 
              <li>.last-of-type-secondary-1-0:last-of-type { color: $secondary-1-0 !important; }</li> 
              <li>.bg-last-of-type-secondary-1-0:last-of-type { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-last-of-type-secondary-1-0:last-of-type { border-color: $secondary-1-0 !important; }</li> 
              <li>.link-secondary-1-0:link { color: $secondary-1-0 !important; }</li> 
              <li>.bg-link-secondary-1-0:link { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-link-secondary-1-0:link { border-color: $secondary-1-0 !important; }</li> 
              <li>.only-of-type-secondary-1-0:only-of-type { color: $secondary-1-0 !important; }</li> 
              <li>.bg-only-of-type-secondary-1-0:only-of-type { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-only-of-type-secondary-1-0:only-of-type { border-color: $secondary-1-0 !important; }</li> 
              <li>.only-child-secondary-1-0:only-child { color: $secondary-1-0 !important; }</li> 
              <li>.bg-only-child-secondary-1-0:only-child { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-only-child-secondary-1-0:only-child { border-color: $secondary-1-0 !important; }</li> 
              <li>.optional-secondary-1-0:optional { color: $secondary-1-0 !important; }</li> 
              <li>.bg-optional-secondary-1-0:optional { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-optional-secondary-1-0:optional { border-color: $secondary-1-0 !important; }</li> 
              <li>.out-of-range-secondary-1-0:out-of-range { color: $secondary-1-0 !important; }</li> 
              <li>.bg-out-of-range-secondary-1-0:out-of-range { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-out-of-range-secondary-1-0:out-of-range { border-color: $secondary-1-0 !important; }</li> 
              <li>.read-only-secondary-1-0:read-only { color: $secondary-1-0 !important; }</li> 
              <li>.bg-read-only-secondary-1-0:read-only { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-read-only-secondary-1-0:read-only { border-color: $secondary-1-0 !important; }</li> 
              <li>.read-write-secondary-1-0:read-write { color: $secondary-1-0 !important; }</li> 
              <li>.bg-read-write-secondary-1-0:read-write { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-read-write-secondary-1-0:read-write { border-color: $secondary-1-0 !important; }</li> 
              <li>.required-secondary-1-0:required { color: $secondary-1-0 !important; }</li> 
              <li>.bg-required-secondary-1-0:required { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-required-secondary-1-0:required { border-color: $secondary-1-0 !important; }</li> 
              <li>.root-secondary-1-0:root { color: $secondary-1-0 !important; }</li> 
              <li>.bg-root-secondary-1-0:root { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-root-secondary-1-0:root { border-color: $secondary-1-0 !important; }</li> 
              <li>.target-secondary-1-0:target { color: $secondary-1-0 !important; }</li> 
              <li>.bg-target-secondary-1-0:target { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-target-secondary-1-0:target { border-color: $secondary-1-0 !important; }</li> 
              <li>.valid-secondary-1-0:valid { color: $secondary-1-0 !important; }</li> 
              <li>.bg-valid-secondary-1-0:valid { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-valid-secondary-1-0:valid { border-color: $secondary-1-0 !important; }</li> 
              <li>.visited-secondary-1-0:visited { color: $secondary-1-0 !important; }</li> 
              <li>.bg-visited-secondary-1-0:visited { background-color: $secondary-1-0 !important; }</li> 
              <li>.border-visited-secondary-1-0:visited { border-color: $secondary-1-0 !important; }</li> 
              <li>.active-secondary-1-1:active { color: $secondary-1-1 !important; }</li> 
              <li>.bg-active-secondary-1-1:active { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-active-secondary-1-1:active { border-color: $secondary-1-1 !important; }</li> 
              <li>.checked-secondary-1-1:checked { color: $secondary-1-1 !important; }</li> 
              <li>.bg-checked-secondary-1-1:checked { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-checked-secondary-1-1:checked { border-color: $secondary-1-1 !important; }</li> 
              <li>.disabled-secondary-1-1:disabled { color: $secondary-1-1 !important; }</li> 
              <li>.bg-disabled-secondary-1-1:disabled { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-disabled-secondary-1-1:disabled { border-color: $secondary-1-1 !important; }</li> 
              <li>.empty-secondary-1-1:empty { color: $secondary-1-1 !important; }</li> 
              <li>.bg-empty-secondary-1-1:empty { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-empty-secondary-1-1:empty { border-color: $secondary-1-1 !important; }</li> 
              <li>.enabled-secondary-1-1:enabled { color: $secondary-1-1 !important; }</li> 
              <li>.bg-enabled-secondary-1-1:enabled { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-enabled-secondary-1-1:enabled { border-color: $secondary-1-1 !important; }</li> 
              <li>.first-child-secondary-1-1:first-child { color: $secondary-1-1 !important; }</li> 
              <li>.bg-first-child-secondary-1-1:first-child { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-first-child-secondary-1-1:first-child { border-color: $secondary-1-1 !important; }</li> 
              <li>.first-of-type-secondary-1-1:first-of-type { color: $secondary-1-1 !important; }</li> 
              <li>.bg-first-of-type-secondary-1-1:first-of-type { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-first-of-type-secondary-1-1:first-of-type { border-color: $secondary-1-1 !important; }</li> 
              <li>.focus-secondary-1-1:focus { color: $secondary-1-1 !important; }</li> 
              <li>.bg-focus-secondary-1-1:focus { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-focus-secondary-1-1:focus { border-color: $secondary-1-1 !important; }</li> 
              <li>.hover-secondary-1-1:hover { color: $secondary-1-1 !important; }</li> 
              <li>.bg-hover-secondary-1-1:hover { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-hover-secondary-1-1:hover { border-color: $secondary-1-1 !important; }</li> 
              <li>.in-range-secondary-1-1:in-range { color: $secondary-1-1 !important; }</li> 
              <li>.bg-in-range-secondary-1-1:in-range { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-in-range-secondary-1-1:in-range { border-color: $secondary-1-1 !important; }</li> 
              <li>.invalid-secondary-1-1:invalid { color: $secondary-1-1 !important; }</li> 
              <li>.bg-invalid-secondary-1-1:invalid { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-invalid-secondary-1-1:invalid { border-color: $secondary-1-1 !important; }</li> 
              <li>.last-child-secondary-1-1:last-child { color: $secondary-1-1 !important; }</li> 
              <li>.bg-last-child-secondary-1-1:last-child { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-last-child-secondary-1-1:last-child { border-color: $secondary-1-1 !important; }</li> 
              <li>.last-of-type-secondary-1-1:last-of-type { color: $secondary-1-1 !important; }</li> 
              <li>.bg-last-of-type-secondary-1-1:last-of-type { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-last-of-type-secondary-1-1:last-of-type { border-color: $secondary-1-1 !important; }</li> 
              <li>.link-secondary-1-1:link { color: $secondary-1-1 !important; }</li> 
              <li>.bg-link-secondary-1-1:link { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-link-secondary-1-1:link { border-color: $secondary-1-1 !important; }</li> 
              <li>.only-of-type-secondary-1-1:only-of-type { color: $secondary-1-1 !important; }</li> 
              <li>.bg-only-of-type-secondary-1-1:only-of-type { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-only-of-type-secondary-1-1:only-of-type { border-color: $secondary-1-1 !important; }</li> 
              <li>.only-child-secondary-1-1:only-child { color: $secondary-1-1 !important; }</li> 
              <li>.bg-only-child-secondary-1-1:only-child { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-only-child-secondary-1-1:only-child { border-color: $secondary-1-1 !important; }</li> 
              <li>.optional-secondary-1-1:optional { color: $secondary-1-1 !important; }</li> 
              <li>.bg-optional-secondary-1-1:optional { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-optional-secondary-1-1:optional { border-color: $secondary-1-1 !important; }</li> 
              <li>.out-of-range-secondary-1-1:out-of-range { color: $secondary-1-1 !important; }</li> 
              <li>.bg-out-of-range-secondary-1-1:out-of-range { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-out-of-range-secondary-1-1:out-of-range { border-color: $secondary-1-1 !important; }</li> 
              <li>.read-only-secondary-1-1:read-only { color: $secondary-1-1 !important; }</li> 
              <li>.bg-read-only-secondary-1-1:read-only { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-read-only-secondary-1-1:read-only { border-color: $secondary-1-1 !important; }</li> 
              <li>.read-write-secondary-1-1:read-write { color: $secondary-1-1 !important; }</li> 
              <li>.bg-read-write-secondary-1-1:read-write { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-read-write-secondary-1-1:read-write { border-color: $secondary-1-1 !important; }</li> 
              <li>.required-secondary-1-1:required { color: $secondary-1-1 !important; }</li> 
              <li>.bg-required-secondary-1-1:required { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-required-secondary-1-1:required { border-color: $secondary-1-1 !important; }</li> 
              <li>.root-secondary-1-1:root { color: $secondary-1-1 !important; }</li> 
              <li>.bg-root-secondary-1-1:root { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-root-secondary-1-1:root { border-color: $secondary-1-1 !important; }</li> 
              <li>.target-secondary-1-1:target { color: $secondary-1-1 !important; }</li> 
              <li>.bg-target-secondary-1-1:target { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-target-secondary-1-1:target { border-color: $secondary-1-1 !important; }</li> 
              <li>.valid-secondary-1-1:valid { color: $secondary-1-1 !important; }</li> 
              <li>.bg-valid-secondary-1-1:valid { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-valid-secondary-1-1:valid { border-color: $secondary-1-1 !important; }</li> 
              <li>.visited-secondary-1-1:visited { color: $secondary-1-1 !important; }</li> 
              <li>.bg-visited-secondary-1-1:visited { background-color: $secondary-1-1 !important; }</li> 
              <li>.border-visited-secondary-1-1:visited { border-color: $secondary-1-1 !important; }</li> 
              <li>.active-secondary-1-2:active { color: $secondary-1-2 !important; }</li> 
              <li>.bg-active-secondary-1-2:active { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-active-secondary-1-2:active { border-color: $secondary-1-2 !important; }</li> 
              <li>.checked-secondary-1-2:checked { color: $secondary-1-2 !important; }</li> 
              <li>.bg-checked-secondary-1-2:checked { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-checked-secondary-1-2:checked { border-color: $secondary-1-2 !important; }</li> 
              <li>.disabled-secondary-1-2:disabled { color: $secondary-1-2 !important; }</li> 
              <li>.bg-disabled-secondary-1-2:disabled { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-disabled-secondary-1-2:disabled { border-color: $secondary-1-2 !important; }</li> 
              <li>.empty-secondary-1-2:empty { color: $secondary-1-2 !important; }</li> 
              <li>.bg-empty-secondary-1-2:empty { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-empty-secondary-1-2:empty { border-color: $secondary-1-2 !important; }</li> 
              <li>.enabled-secondary-1-2:enabled { color: $secondary-1-2 !important; }</li> 
              <li>.bg-enabled-secondary-1-2:enabled { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-enabled-secondary-1-2:enabled { border-color: $secondary-1-2 !important; }</li> 
              <li>.first-child-secondary-1-2:first-child { color: $secondary-1-2 !important; }</li> 
              <li>.bg-first-child-secondary-1-2:first-child { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-first-child-secondary-1-2:first-child { border-color: $secondary-1-2 !important; }</li> 
              <li>.first-of-type-secondary-1-2:first-of-type { color: $secondary-1-2 !important; }</li> 
              <li>.bg-first-of-type-secondary-1-2:first-of-type { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-first-of-type-secondary-1-2:first-of-type { border-color: $secondary-1-2 !important; }</li> 
              <li>.focus-secondary-1-2:focus { color: $secondary-1-2 !important; }</li> 
              <li>.bg-focus-secondary-1-2:focus { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-focus-secondary-1-2:focus { border-color: $secondary-1-2 !important; }</li> 
              <li>.hover-secondary-1-2:hover { color: $secondary-1-2 !important; }</li> 
              <li>.bg-hover-secondary-1-2:hover { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-hover-secondary-1-2:hover { border-color: $secondary-1-2 !important; }</li> 
              <li>.in-range-secondary-1-2:in-range { color: $secondary-1-2 !important; }</li> 
              <li>.bg-in-range-secondary-1-2:in-range { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-in-range-secondary-1-2:in-range { border-color: $secondary-1-2 !important; }</li> 
              <li>.invalid-secondary-1-2:invalid { color: $secondary-1-2 !important; }</li> 
              <li>.bg-invalid-secondary-1-2:invalid { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-invalid-secondary-1-2:invalid { border-color: $secondary-1-2 !important; }</li> 
              <li>.last-child-secondary-1-2:last-child { color: $secondary-1-2 !important; }</li> 
              <li>.bg-last-child-secondary-1-2:last-child { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-last-child-secondary-1-2:last-child { border-color: $secondary-1-2 !important; }</li> 
              <li>.last-of-type-secondary-1-2:last-of-type { color: $secondary-1-2 !important; }</li> 
              <li>.bg-last-of-type-secondary-1-2:last-of-type { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-last-of-type-secondary-1-2:last-of-type { border-color: $secondary-1-2 !important; }</li> 
              <li>.link-secondary-1-2:link { color: $secondary-1-2 !important; }</li> 
              <li>.bg-link-secondary-1-2:link { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-link-secondary-1-2:link { border-color: $secondary-1-2 !important; }</li> 
              <li>.only-of-type-secondary-1-2:only-of-type { color: $secondary-1-2 !important; }</li> 
              <li>.bg-only-of-type-secondary-1-2:only-of-type { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-only-of-type-secondary-1-2:only-of-type { border-color: $secondary-1-2 !important; }</li> 
              <li>.only-child-secondary-1-2:only-child { color: $secondary-1-2 !important; }</li> 
              <li>.bg-only-child-secondary-1-2:only-child { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-only-child-secondary-1-2:only-child { border-color: $secondary-1-2 !important; }</li> 
              <li>.optional-secondary-1-2:optional { color: $secondary-1-2 !important; }</li> 
              <li>.bg-optional-secondary-1-2:optional { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-optional-secondary-1-2:optional { border-color: $secondary-1-2 !important; }</li> 
              <li>.out-of-range-secondary-1-2:out-of-range { color: $secondary-1-2 !important; }</li> 
              <li>.bg-out-of-range-secondary-1-2:out-of-range { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-out-of-range-secondary-1-2:out-of-range { border-color: $secondary-1-2 !important; }</li> 
              <li>.read-only-secondary-1-2:read-only { color: $secondary-1-2 !important; }</li> 
              <li>.bg-read-only-secondary-1-2:read-only { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-read-only-secondary-1-2:read-only { border-color: $secondary-1-2 !important; }</li> 
              <li>.read-write-secondary-1-2:read-write { color: $secondary-1-2 !important; }</li> 
              <li>.bg-read-write-secondary-1-2:read-write { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-read-write-secondary-1-2:read-write { border-color: $secondary-1-2 !important; }</li> 
              <li>.required-secondary-1-2:required { color: $secondary-1-2 !important; }</li> 
              <li>.bg-required-secondary-1-2:required { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-required-secondary-1-2:required { border-color: $secondary-1-2 !important; }</li> 
              <li>.root-secondary-1-2:root { color: $secondary-1-2 !important; }</li> 
              <li>.bg-root-secondary-1-2:root { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-root-secondary-1-2:root { border-color: $secondary-1-2 !important; }</li> 
              <li>.target-secondary-1-2:target { color: $secondary-1-2 !important; }</li> 
              <li>.bg-target-secondary-1-2:target { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-target-secondary-1-2:target { border-color: $secondary-1-2 !important; }</li> 
              <li>.valid-secondary-1-2:valid { color: $secondary-1-2 !important; }</li> 
              <li>.bg-valid-secondary-1-2:valid { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-valid-secondary-1-2:valid { border-color: $secondary-1-2 !important; }</li> 
              <li>.visited-secondary-1-2:visited { color: $secondary-1-2 !important; }</li> 
              <li>.bg-visited-secondary-1-2:visited { background-color: $secondary-1-2 !important; }</li> 
              <li>.border-visited-secondary-1-2:visited { border-color: $secondary-1-2 !important; }</li> 
              <li>.active-secondary-1-3:active { color: $secondary-1-3 !important; }</li> 
              <li>.bg-active-secondary-1-3:active { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-active-secondary-1-3:active { border-color: $secondary-1-3 !important; }</li> 
              <li>.checked-secondary-1-3:checked { color: $secondary-1-3 !important; }</li> 
              <li>.bg-checked-secondary-1-3:checked { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-checked-secondary-1-3:checked { border-color: $secondary-1-3 !important; }</li> 
              <li>.disabled-secondary-1-3:disabled { color: $secondary-1-3 !important; }</li> 
              <li>.bg-disabled-secondary-1-3:disabled { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-disabled-secondary-1-3:disabled { border-color: $secondary-1-3 !important; }</li> 
              <li>.empty-secondary-1-3:empty { color: $secondary-1-3 !important; }</li> 
              <li>.bg-empty-secondary-1-3:empty { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-empty-secondary-1-3:empty { border-color: $secondary-1-3 !important; }</li> 
              <li>.enabled-secondary-1-3:enabled { color: $secondary-1-3 !important; }</li> 
              <li>.bg-enabled-secondary-1-3:enabled { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-enabled-secondary-1-3:enabled { border-color: $secondary-1-3 !important; }</li> 
              <li>.first-child-secondary-1-3:first-child { color: $secondary-1-3 !important; }</li> 
              <li>.bg-first-child-secondary-1-3:first-child { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-first-child-secondary-1-3:first-child { border-color: $secondary-1-3 !important; }</li> 
              <li>.first-of-type-secondary-1-3:first-of-type { color: $secondary-1-3 !important; }</li> 
              <li>.bg-first-of-type-secondary-1-3:first-of-type { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-first-of-type-secondary-1-3:first-of-type { border-color: $secondary-1-3 !important; }</li> 
              <li>.focus-secondary-1-3:focus { color: $secondary-1-3 !important; }</li> 
              <li>.bg-focus-secondary-1-3:focus { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-focus-secondary-1-3:focus { border-color: $secondary-1-3 !important; }</li> 
              <li>.hover-secondary-1-3:hover { color: $secondary-1-3 !important; }</li> 
              <li>.bg-hover-secondary-1-3:hover { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-hover-secondary-1-3:hover { border-color: $secondary-1-3 !important; }</li> 
              <li>.in-range-secondary-1-3:in-range { color: $secondary-1-3 !important; }</li> 
              <li>.bg-in-range-secondary-1-3:in-range { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-in-range-secondary-1-3:in-range { border-color: $secondary-1-3 !important; }</li> 
              <li>.invalid-secondary-1-3:invalid { color: $secondary-1-3 !important; }</li> 
              <li>.bg-invalid-secondary-1-3:invalid { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-invalid-secondary-1-3:invalid { border-color: $secondary-1-3 !important; }</li> 
              <li>.last-child-secondary-1-3:last-child { color: $secondary-1-3 !important; }</li> 
              <li>.bg-last-child-secondary-1-3:last-child { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-last-child-secondary-1-3:last-child { border-color: $secondary-1-3 !important; }</li> 
              <li>.last-of-type-secondary-1-3:last-of-type { color: $secondary-1-3 !important; }</li> 
              <li>.bg-last-of-type-secondary-1-3:last-of-type { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-last-of-type-secondary-1-3:last-of-type { border-color: $secondary-1-3 !important; }</li> 
              <li>.link-secondary-1-3:link { color: $secondary-1-3 !important; }</li> 
              <li>.bg-link-secondary-1-3:link { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-link-secondary-1-3:link { border-color: $secondary-1-3 !important; }</li> 
              <li>.only-of-type-secondary-1-3:only-of-type { color: $secondary-1-3 !important; }</li> 
              <li>.bg-only-of-type-secondary-1-3:only-of-type { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-only-of-type-secondary-1-3:only-of-type { border-color: $secondary-1-3 !important; }</li> 
              <li>.only-child-secondary-1-3:only-child { color: $secondary-1-3 !important; }</li> 
              <li>.bg-only-child-secondary-1-3:only-child { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-only-child-secondary-1-3:only-child { border-color: $secondary-1-3 !important; }</li> 
              <li>.optional-secondary-1-3:optional { color: $secondary-1-3 !important; }</li> 
              <li>.bg-optional-secondary-1-3:optional { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-optional-secondary-1-3:optional { border-color: $secondary-1-3 !important; }</li> 
              <li>.out-of-range-secondary-1-3:out-of-range { color: $secondary-1-3 !important; }</li> 
              <li>.bg-out-of-range-secondary-1-3:out-of-range { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-out-of-range-secondary-1-3:out-of-range { border-color: $secondary-1-3 !important; }</li> 
              <li>.read-only-secondary-1-3:read-only { color: $secondary-1-3 !important; }</li> 
              <li>.bg-read-only-secondary-1-3:read-only { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-read-only-secondary-1-3:read-only { border-color: $secondary-1-3 !important; }</li> 
              <li>.read-write-secondary-1-3:read-write { color: $secondary-1-3 !important; }</li> 
              <li>.bg-read-write-secondary-1-3:read-write { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-read-write-secondary-1-3:read-write { border-color: $secondary-1-3 !important; }</li> 
              <li>.required-secondary-1-3:required { color: $secondary-1-3 !important; }</li> 
              <li>.bg-required-secondary-1-3:required { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-required-secondary-1-3:required { border-color: $secondary-1-3 !important; }</li> 
              <li>.root-secondary-1-3:root { color: $secondary-1-3 !important; }</li> 
              <li>.bg-root-secondary-1-3:root { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-root-secondary-1-3:root { border-color: $secondary-1-3 !important; }</li> 
              <li>.target-secondary-1-3:target { color: $secondary-1-3 !important; }</li> 
              <li>.bg-target-secondary-1-3:target { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-target-secondary-1-3:target { border-color: $secondary-1-3 !important; }</li> 
              <li>.valid-secondary-1-3:valid { color: $secondary-1-3 !important; }</li> 
              <li>.bg-valid-secondary-1-3:valid { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-valid-secondary-1-3:valid { border-color: $secondary-1-3 !important; }</li> 
              <li>.visited-secondary-1-3:visited { color: $secondary-1-3 !important; }</li> 
              <li>.bg-visited-secondary-1-3:visited { background-color: $secondary-1-3 !important; }</li> 
              <li>.border-visited-secondary-1-3:visited { border-color: $secondary-1-3 !important; }</li> 
              <li>.active-secondary-1-4:active { color: $secondary-1-4!important; }</li> 
              <li>.bg-active-secondary-1-4:active { background-color: $secondary-1-4!important; }</li> 
              <li>.border-active-secondary-1-4:active { border-color: $secondary-1-4!important; }</li> 
              <li>.checked-secondary-1-4:checked { color: $secondary-1-4!important; }</li> 
              <li>.bg-checked-secondary-1-4:checked { background-color: $secondary-1-4!important; }</li> 
              <li>.border-checked-secondary-1-4:checked { border-color: $secondary-1-4!important; }</li> 
              <li>.disabled-secondary-1-4:disabled { color: $secondary-1-4!important; }</li> 
              <li>.bg-disabled-secondary-1-4:disabled { background-color: $secondary-1-4!important; }</li> 
              <li>.border-disabled-secondary-1-4:disabled { border-color: $secondary-1-4!important; }</li> 
              <li>.empty-secondary-1-4:empty { color: $secondary-1-4!important; }</li> 
              <li>.bg-empty-secondary-1-4:empty { background-color: $secondary-1-4!important; }</li> 
              <li>.border-empty-secondary-1-4:empty { border-color: $secondary-1-4!important; }</li> 
              <li>.enabled-secondary-1-4:enabled { color: $secondary-1-4!important; }</li> 
              <li>.bg-enabled-secondary-1-4:enabled { background-color: $secondary-1-4!important; }</li> 
              <li>.border-enabled-secondary-1-4:enabled { border-color: $secondary-1-4!important; }</li> 
              <li>.first-child-secondary-1-4:first-child { color: $secondary-1-4!important; }</li> 
              <li>.bg-first-child-secondary-1-4:first-child { background-color: $secondary-1-4!important; }</li> 
              <li>.border-first-child-secondary-1-4:first-child { border-color: $secondary-1-4!important; }</li> 
              <li>.first-of-type-secondary-1-4:first-of-type { color: $secondary-1-4!important; }</li> 
              <li>.bg-first-of-type-secondary-1-4:first-of-type { background-color: $secondary-1-4!important; }</li> 
              <li>.border-first-of-type-secondary-1-4:first-of-type { border-color: $secondary-1-4!important; }</li> 
              <li>.focus-secondary-1-4:focus { color: $secondary-1-4!important; }</li> 
              <li>.bg-focus-secondary-1-4:focus { background-color: $secondary-1-4!important; }</li> 
              <li>.border-focus-secondary-1-4:focus { border-color: $secondary-1-4!important; }</li> 
              <li>.hover-secondary-1-4:hover { color: $secondary-1-4!important; }</li> 
              <li>.bg-hover-secondary-1-4:hover { background-color: $secondary-1-4!important; }</li> 
              <li>.border-hover-secondary-1-4:hover { border-color: $secondary-1-4!important; }</li> 
              <li>.in-range-secondary-1-4:in-range { color: $secondary-1-4!important; }</li> 
              <li>.bg-in-range-secondary-1-4:in-range { background-color: $secondary-1-4!important; }</li> 
              <li>.border-in-range-secondary-1-4:in-range { border-color: $secondary-1-4!important; }</li> 
              <li>.invalid-secondary-1-4:invalid { color: $secondary-1-4!important; }</li> 
              <li>.bg-invalid-secondary-1-4:invalid { background-color: $secondary-1-4!important; }</li> 
              <li>.border-invalid-secondary-1-4:invalid { border-color: $secondary-1-4!important; }</li> 
              <li>.last-child-secondary-1-4:last-child { color: $secondary-1-4!important; }</li> 
              <li>.bg-last-child-secondary-1-4:last-child { background-color: $secondary-1-4!important; }</li> 
              <li>.border-last-child-secondary-1-4:last-child { border-color: $secondary-1-4!important; }</li> 
              <li>.last-of-type-secondary-1-4:last-of-type { color: $secondary-1-4!important; }</li> 
              <li>.bg-last-of-type-secondary-1-4:last-of-type { background-color: $secondary-1-4!important; }</li> 
              <li>.border-last-of-type-secondary-1-4:last-of-type { border-color: $secondary-1-4!important; }</li> 
              <li>.link-secondary-1-4:link { color: $secondary-1-4!important; }</li> 
              <li>.bg-link-secondary-1-4:link { background-color: $secondary-1-4!important; }</li> 
              <li>.border-link-secondary-1-4:link { border-color: $secondary-1-4!important; }</li> 
              <li>.only-of-type-secondary-1-4:only-of-type { color: $secondary-1-4!important; }</li> 
              <li>.bg-only-of-type-secondary-1-4:only-of-type { background-color: $secondary-1-4!important; }</li> 
              <li>.border-only-of-type-secondary-1-4:only-of-type { border-color: $secondary-1-4!important; }</li> 
              <li>.only-child-secondary-1-4:only-child { color: $secondary-1-4!important; }</li> 
              <li>.bg-only-child-secondary-1-4:only-child { background-color: $secondary-1-4!important; }</li> 
              <li>.border-only-child-secondary-1-4:only-child { border-color: $secondary-1-4!important; }</li> 
              <li>.optional-secondary-1-4:optional { color: $secondary-1-4!important; }</li> 
              <li>.bg-optional-secondary-1-4:optional { background-color: $secondary-1-4!important; }</li> 
              <li>.border-optional-secondary-1-4:optional { border-color: $secondary-1-4!important; }</li> 
              <li>.out-of-range-secondary-1-4:out-of-range { color: $secondary-1-4!important; }</li> 
              <li>.bg-out-of-range-secondary-1-4:out-of-range { background-color: $secondary-1-4!important; }</li> 
              <li>.border-out-of-range-secondary-1-4:out-of-range { border-color: $secondary-1-4!important; }</li> 
              <li>.read-only-secondary-1-4:read-only { color: $secondary-1-4!important; }</li> 
              <li>.bg-read-only-secondary-1-4:read-only { background-color: $secondary-1-4!important; }</li> 
              <li>.border-read-only-secondary-1-4:read-only { border-color: $secondary-1-4!important; }</li> 
              <li>.read-write-secondary-1-4:read-write { color: $secondary-1-4!important; }</li> 
              <li>.bg-read-write-secondary-1-4:read-write { background-color: $secondary-1-4!important; }</li> 
              <li>.border-read-write-secondary-1-4:read-write { border-color: $secondary-1-4!important; }</li> 
              <li>.required-secondary-1-4:required { color: $secondary-1-4!important; }</li> 
              <li>.bg-required-secondary-1-4:required { background-color: $secondary-1-4!important; }</li> 
              <li>.border-required-secondary-1-4:required { border-color: $secondary-1-4!important; }</li> 
              <li>.root-secondary-1-4:root { color: $secondary-1-4!important; }</li> 
              <li>.bg-root-secondary-1-4:root { background-color: $secondary-1-4!important; }</li> 
              <li>.border-root-secondary-1-4:root { border-color: $secondary-1-4!important; }</li> 
              <li>.target-secondary-1-4:target { color: $secondary-1-4!important; }</li> 
              <li>.bg-target-secondary-1-4:target { background-color: $secondary-1-4!important; }</li> 
              <li>.border-target-secondary-1-4:target { border-color: $secondary-1-4!important; }</li> 
              <li>.valid-secondary-1-4:valid { color: $secondary-1-4!important; }</li> 
              <li>.bg-valid-secondary-1-4:valid { background-color: $secondary-1-4!important; }</li> 
              <li>.border-valid-secondary-1-4:valid { border-color: $secondary-1-4!important; }</li> 
              <li>.visited-secondary-1-4:visited { color: $secondary-1-4!important; }</li> 
              <li>.bg-visited-secondary-1-4:visited { background-color: $secondary-1-4!important; }</li> 
              <li>.border-visited-secondary-1-4:visited { border-color: $secondary-1-4!important; }</li> 
            </ul>
            <p>Secondary Color 2</p>
            <ul>
              <li>.active-secondary-2-0:active { color: $secondary-2-0 !important; }</li> 
              <li>.bg-active-secondary-2-0:active { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-active-secondary-2-0:active { border-color: $secondary-2-0 !important; }</li> 
              <li>.checked-secondary-2-0:checked { color: $secondary-2-0 !important; }</li> 
              <li>.bg-checked-secondary-2-0:checked { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-checked-secondary-2-0:checked { border-color: $secondary-2-0 !important; }</li> 
              <li>.disabled-secondary-2-0:disabled { color: $secondary-2-0 !important; }</li> 
              <li>.bg-disabled-secondary-2-0:disabled { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-disabled-secondary-2-0:disabled { border-color: $secondary-2-0 !important; }</li> 
              <li>.empty-secondary-2-0:empty { color: $secondary-2-0 !important; }</li> 
              <li>.bg-empty-secondary-2-0:empty { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-empty-secondary-2-0:empty { border-color: $secondary-2-0 !important; }</li> 
              <li>.enabled-secondary-2-0:enabled { color: $secondary-2-0 !important; }</li> 
              <li>.bg-enabled-secondary-2-0:enabled { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-enabled-secondary-2-0:enabled { border-color: $secondary-2-0 !important; }</li> 
              <li>.first-child-secondary-2-0:first-child { color: $secondary-2-0 !important; }</li> 
              <li>.bg-first-child-secondary-2-0:first-child { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-first-child-secondary-2-0:first-child { border-color: $secondary-2-0 !important; }</li> 
              <li>.first-of-type-secondary-2-0:first-of-type { color: $secondary-2-0 !important; }</li> 
              <li>.bg-first-of-type-secondary-2-0:first-of-type { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-first-of-type-secondary-2-0:first-of-type { border-color: $secondary-2-0 !important; }</li> 
              <li>.focus-secondary-2-0:focus { color: $secondary-2-0 !important; }</li> 
              <li>.bg-focus-secondary-2-0:focus { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-focus-secondary-2-0:focus { border-color: $secondary-2-0 !important; }</li> 
              <li>.hover-secondary-2-0:hover { color: $secondary-2-0 !important; }</li> 
              <li>.bg-hover-secondary-2-0:hover { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-hover-secondary-2-0:hover { border-color: $secondary-2-0 !important; }</li> 
              <li>.in-range-secondary-2-0:in-range { color: $secondary-2-0 !important; }</li> 
              <li>.bg-in-range-secondary-2-0:in-range { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-in-range-secondary-2-0:in-range { border-color: $secondary-2-0 !important; }</li> 
              <li>.invalid-secondary-2-0:invalid { color: $secondary-2-0 !important; }</li> 
              <li>.bg-invalid-secondary-2-0:invalid { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-invalid-secondary-2-0:invalid { border-color: $secondary-2-0 !important; }</li> 
              <li>.last-child-secondary-2-0:last-child { color: $secondary-2-0 !important; }</li> 
              <li>.bg-last-child-secondary-2-0:last-child { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-last-child-secondary-2-0:last-child { border-color: $secondary-2-0 !important; }</li> 
              <li>.last-of-type-secondary-2-0:last-of-type { color: $secondary-2-0 !important; }</li> 
              <li>.bg-last-of-type-secondary-2-0:last-of-type { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-last-of-type-secondary-2-0:last-of-type { border-color: $secondary-2-0 !important; }</li> 
              <li>.link-secondary-2-0:link { color: $secondary-2-0 !important; }</li> 
              <li>.bg-link-secondary-2-0:link { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-link-secondary-2-0:link { border-color: $secondary-2-0 !important; }</li> 
              <li>.only-of-type-secondary-2-0:only-of-type { color: $secondary-2-0 !important; }</li> 
              <li>.bg-only-of-type-secondary-2-0:only-of-type { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-only-of-type-secondary-2-0:only-of-type { border-color: $secondary-2-0 !important; }</li> 
              <li>.only-child-secondary-2-0:only-child { color: $secondary-2-0 !important; }</li> 
              <li>.bg-only-child-secondary-2-0:only-child { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-only-child-secondary-2-0:only-child { border-color: $secondary-2-0 !important; }</li> 
              <li>.optional-secondary-2-0:optional { color: $secondary-2-0 !important; }</li> 
              <li>.bg-optional-secondary-2-0:optional { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-optional-secondary-2-0:optional { border-color: $secondary-2-0 !important; }</li> 
              <li>.out-of-range-secondary-2-0:out-of-range { color: $secondary-2-0 !important; }</li> 
              <li>.bg-out-of-range-secondary-2-0:out-of-range { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-out-of-range-secondary-2-0:out-of-range { border-color: $secondary-2-0 !important; }</li> 
              <li>.read-only-secondary-2-0:read-only { color: $secondary-2-0 !important; }</li> 
              <li>.bg-read-only-secondary-2-0:read-only { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-read-only-secondary-2-0:read-only { border-color: $secondary-2-0 !important; }</li> 
              <li>.read-write-secondary-2-0:read-write { color: $secondary-2-0 !important; }</li> 
              <li>.bg-read-write-secondary-2-0:read-write { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-read-write-secondary-2-0:read-write { border-color: $secondary-2-0 !important; }</li> 
              <li>.required-secondary-2-0:required { color: $secondary-2-0 !important; }</li> 
              <li>.bg-required-secondary-2-0:required { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-required-secondary-2-0:required { border-color: $secondary-2-0 !important; }</li> 
              <li>.root-secondary-2-0:root { color: $secondary-2-0 !important; }</li> 
              <li>.bg-root-secondary-2-0:root { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-root-secondary-2-0:root { border-color: $secondary-2-0 !important; }</li> 
              <li>.target-secondary-2-0:target { color: $secondary-2-0 !important; }</li> 
              <li>.bg-target-secondary-2-0:target { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-target-secondary-2-0:target { border-color: $secondary-2-0 !important; }</li> 
              <li>.valid-secondary-2-0:valid { color: $secondary-2-0 !important; }</li> 
              <li>.bg-valid-secondary-2-0:valid { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-valid-secondary-2-0:valid { border-color: $secondary-2-0 !important; }</li> 
              <li>.visited-secondary-2-0:visited { color: $secondary-2-0 !important; }</li> 
              <li>.bg-visited-secondary-2-0:visited { background-color: $secondary-2-0 !important; }</li> 
              <li>.border-visited-secondary-2-0:visited { border-color: $secondary-2-0 !important; }</li> 
              <li>.active-secondary-2-1:active { color: $secondary-2-1 !important; }</li> 
              <li>.bg-active-secondary-2-1:active { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-active-secondary-2-1:active { border-color: $secondary-2-1 !important; }</li> 
              <li>.checked-secondary-2-1:checked { color: $secondary-2-1 !important; }</li> 
              <li>.bg-checked-secondary-2-1:checked { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-checked-secondary-2-1:checked { border-color: $secondary-2-1 !important; }</li> 
              <li>.disabled-secondary-2-1:disabled { color: $secondary-2-1 !important; }</li> 
              <li>.bg-disabled-secondary-2-1:disabled { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-disabled-secondary-2-1:disabled { border-color: $secondary-2-1 !important; }</li> 
              <li>.empty-secondary-2-1:empty { color: $secondary-2-1 !important; }</li> 
              <li>.bg-empty-secondary-2-1:empty { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-empty-secondary-2-1:empty { border-color: $secondary-2-1 !important; }</li> 
              <li>.enabled-secondary-2-1:enabled { color: $secondary-2-1 !important; }</li> 
              <li>.bg-enabled-secondary-2-1:enabled { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-enabled-secondary-2-1:enabled { border-color: $secondary-2-1 !important; }</li> 
              <li>.first-child-secondary-2-1:first-child { color: $secondary-2-1 !important; }</li> 
              <li>.bg-first-child-secondary-2-1:first-child { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-first-child-secondary-2-1:first-child { border-color: $secondary-2-1 !important; }</li> 
              <li>.first-of-type-secondary-2-1:first-of-type { color: $secondary-2-1 !important; }</li> 
              <li>.bg-first-of-type-secondary-2-1:first-of-type { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-first-of-type-secondary-2-1:first-of-type { border-color: $secondary-2-1 !important; }</li> 
              <li>.focus-secondary-2-1:focus { color: $secondary-2-1 !important; }</li> 
              <li>.bg-focus-secondary-2-1:focus { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-focus-secondary-2-1:focus { border-color: $secondary-2-1 !important; }</li> 
              <li>.hover-secondary-2-1:hover { color: $secondary-2-1 !important; }</li> 
              <li>.bg-hover-secondary-2-1:hover { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-hover-secondary-2-1:hover { border-color: $secondary-2-1 !important; }</li> 
              <li>.in-range-secondary-2-1:in-range { color: $secondary-2-1 !important; }</li> 
              <li>.bg-in-range-secondary-2-1:in-range { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-in-range-secondary-2-1:in-range { border-color: $secondary-2-1 !important; }</li> 
              <li>.invalid-secondary-2-1:invalid { color: $secondary-2-1 !important; }</li> 
              <li>.bg-invalid-secondary-2-1:invalid { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-invalid-secondary-2-1:invalid { border-color: $secondary-2-1 !important; }</li> 
              <li>.last-child-secondary-2-1:last-child { color: $secondary-2-1 !important; }</li> 
              <li>.bg-last-child-secondary-2-1:last-child { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-last-child-secondary-2-1:last-child { border-color: $secondary-2-1 !important; }</li> 
              <li>.last-of-type-secondary-2-1:last-of-type { color: $secondary-2-1 !important; }</li> 
              <li>.bg-last-of-type-secondary-2-1:last-of-type { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-last-of-type-secondary-2-1:last-of-type { border-color: $secondary-2-1 !important; }</li> 
              <li>.link-secondary-2-1:link { color: $secondary-2-1 !important; }</li> 
              <li>.bg-link-secondary-2-1:link { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-link-secondary-2-1:link { border-color: $secondary-2-1 !important; }</li> 
              <li>.only-of-type-secondary-2-1:only-of-type { color: $secondary-2-1 !important; }</li> 
              <li>.bg-only-of-type-secondary-2-1:only-of-type { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-only-of-type-secondary-2-1:only-of-type { border-color: $secondary-2-1 !important; }</li> 
              <li>.only-child-secondary-2-1:only-child { color: $secondary-2-1 !important; }</li> 
              <li>.bg-only-child-secondary-2-1:only-child { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-only-child-secondary-2-1:only-child { border-color: $secondary-2-1 !important; }</li> 
              <li>.optional-secondary-2-1:optional { color: $secondary-2-1 !important; }</li> 
              <li>.bg-optional-secondary-2-1:optional { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-optional-secondary-2-1:optional { border-color: $secondary-2-1 !important; }</li> 
              <li>.out-of-range-secondary-2-1:out-of-range { color: $secondary-2-1 !important; }</li> 
              <li>.bg-out-of-range-secondary-2-1:out-of-range { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-out-of-range-secondary-2-1:out-of-range { border-color: $secondary-2-1 !important; }</li> 
              <li>.read-only-secondary-2-1:read-only { color: $secondary-2-1 !important; }</li> 
              <li>.bg-read-only-secondary-2-1:read-only { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-read-only-secondary-2-1:read-only { border-color: $secondary-2-1 !important; }</li> 
              <li>.read-write-secondary-2-1:read-write { color: $secondary-2-1 !important; }</li> 
              <li>.bg-read-write-secondary-2-1:read-write { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-read-write-secondary-2-1:read-write { border-color: $secondary-2-1 !important; }</li> 
              <li>.required-secondary-2-1:required { color: $secondary-2-1 !important; }</li> 
              <li>.bg-required-secondary-2-1:required { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-required-secondary-2-1:required { border-color: $secondary-2-1 !important; }</li> 
              <li>.root-secondary-2-1:root { color: $secondary-2-1 !important; }</li> 
              <li>.bg-root-secondary-2-1:root { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-root-secondary-2-1:root { border-color: $secondary-2-1 !important; }</li> 
              <li>.target-secondary-2-1:target { color: $secondary-2-1 !important; }</li> 
              <li>.bg-target-secondary-2-1:target { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-target-secondary-2-1:target { border-color: $secondary-2-1 !important; }</li> 
              <li>.valid-secondary-2-1:valid { color: $secondary-2-1 !important; }</li> 
              <li>.bg-valid-secondary-2-1:valid { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-valid-secondary-2-1:valid { border-color: $secondary-2-1 !important; }</li> 
              <li>.visited-secondary-2-1:visited { color: $secondary-2-1 !important; }</li> 
              <li>.bg-visited-secondary-2-1:visited { background-color: $secondary-2-1 !important; }</li> 
              <li>.border-visited-secondary-2-1:visited { border-color: $secondary-2-1 !important; }</li> 
              <li>.active-secondary-2-2:active { color: $secondary-2-2 !important; }</li> 
              <li>.bg-active-secondary-2-2:active { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-active-secondary-2-2:active { border-color: $secondary-2-2 !important; }</li> 
              <li>.checked-secondary-2-2:checked { color: $secondary-2-2 !important; }</li> 
              <li>.bg-checked-secondary-2-2:checked { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-checked-secondary-2-2:checked { border-color: $secondary-2-2 !important; }</li> 
              <li>.disabled-secondary-2-2:disabled { color: $secondary-2-2 !important; }</li> 
              <li>.bg-disabled-secondary-2-2:disabled { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-disabled-secondary-2-2:disabled { border-color: $secondary-2-2 !important; }</li> 
              <li>.empty-secondary-2-2:empty { color: $secondary-2-2 !important; }</li> 
              <li>.bg-empty-secondary-2-2:empty { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-empty-secondary-2-2:empty { border-color: $secondary-2-2 !important; }</li> 
              <li>.enabled-secondary-2-2:enabled { color: $secondary-2-2 !important; }</li> 
              <li>.bg-enabled-secondary-2-2:enabled { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-enabled-secondary-2-2:enabled { border-color: $secondary-2-2 !important; }</li> 
              <li>.first-child-secondary-2-2:first-child { color: $secondary-2-2 !important; }</li> 
              <li>.bg-first-child-secondary-2-2:first-child { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-first-child-secondary-2-2:first-child { border-color: $secondary-2-2 !important; }</li> 
              <li>.first-of-type-secondary-2-2:first-of-type { color: $secondary-2-2 !important; }</li> 
              <li>.bg-first-of-type-secondary-2-2:first-of-type { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-first-of-type-secondary-2-2:first-of-type { border-color: $secondary-2-2 !important; }</li> 
              <li>.focus-secondary-2-2:focus { color: $secondary-2-2 !important; }</li> 
              <li>.bg-focus-secondary-2-2:focus { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-focus-secondary-2-2:focus { border-color: $secondary-2-2 !important; }</li> 
              <li>.hover-secondary-2-2:hover { color: $secondary-2-2 !important; }</li> 
              <li>.bg-hover-secondary-2-2:hover { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-hover-secondary-2-2:hover { border-color: $secondary-2-2 !important; }</li> 
              <li>.in-range-secondary-2-2:in-range { color: $secondary-2-2 !important; }</li> 
              <li>.bg-in-range-secondary-2-2:in-range { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-in-range-secondary-2-2:in-range { border-color: $secondary-2-2 !important; }</li> 
              <li>.invalid-secondary-2-2:invalid { color: $secondary-2-2 !important; }</li> 
              <li>.bg-invalid-secondary-2-2:invalid { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-invalid-secondary-2-2:invalid { border-color: $secondary-2-2 !important; }</li> 
              <li>.last-child-secondary-2-2:last-child { color: $secondary-2-2 !important; }</li> 
              <li>.bg-last-child-secondary-2-2:last-child { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-last-child-secondary-2-2:last-child { border-color: $secondary-2-2 !important; }</li> 
              <li>.last-of-type-secondary-2-2:last-of-type { color: $secondary-2-2 !important; }</li> 
              <li>.bg-last-of-type-secondary-2-2:last-of-type { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-last-of-type-secondary-2-2:last-of-type { border-color: $secondary-2-2 !important; }</li> 
              <li>.link-secondary-2-2:link { color: $secondary-2-2 !important; }</li> 
              <li>.bg-link-secondary-2-2:link { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-link-secondary-2-2:link { border-color: $secondary-2-2 !important; }</li> 
              <li>.only-of-type-secondary-2-2:only-of-type { color: $secondary-2-2 !important; }</li> 
              <li>.bg-only-of-type-secondary-2-2:only-of-type { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-only-of-type-secondary-2-2:only-of-type { border-color: $secondary-2-2 !important; }</li> 
              <li>.only-child-secondary-2-2:only-child { color: $secondary-2-2 !important; }</li> 
              <li>.bg-only-child-secondary-2-2:only-child { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-only-child-secondary-2-2:only-child { border-color: $secondary-2-2 !important; }</li> 
              <li>.optional-secondary-2-2:optional { color: $secondary-2-2 !important; }</li> 
              <li>.bg-optional-secondary-2-2:optional { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-optional-secondary-2-2:optional { border-color: $secondary-2-2 !important; }</li> 
              <li>.out-of-range-secondary-2-2:out-of-range { color: $secondary-2-2 !important; }</li> 
              <li>.bg-out-of-range-secondary-2-2:out-of-range { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-out-of-range-secondary-2-2:out-of-range { border-color: $secondary-2-2 !important; }</li> 
              <li>.read-only-secondary-2-2:read-only { color: $secondary-2-2 !important; }</li> 
              <li>.bg-read-only-secondary-2-2:read-only { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-read-only-secondary-2-2:read-only { border-color: $secondary-2-2 !important; }</li> 
              <li>.read-write-secondary-2-2:read-write { color: $secondary-2-2 !important; }</li> 
              <li>.bg-read-write-secondary-2-2:read-write { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-read-write-secondary-2-2:read-write { border-color: $secondary-2-2 !important; }</li> 
              <li>.required-secondary-2-2:required { color: $secondary-2-2 !important; }</li> 
              <li>.bg-required-secondary-2-2:required { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-required-secondary-2-2:required { border-color: $secondary-2-2 !important; }</li> 
              <li>.root-secondary-2-2:root { color: $secondary-2-2 !important; }</li> 
              <li>.bg-root-secondary-2-2:root { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-root-secondary-2-2:root { border-color: $secondary-2-2 !important; }</li> 
              <li>.target-secondary-2-2:target { color: $secondary-2-2 !important; }</li> 
              <li>.bg-target-secondary-2-2:target { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-target-secondary-2-2:target { border-color: $secondary-2-2 !important; }</li> 
              <li>.valid-secondary-2-2:valid { color: $secondary-2-2 !important; }</li> 
              <li>.bg-valid-secondary-2-2:valid { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-valid-secondary-2-2:valid { border-color: $secondary-2-2 !important; }</li> 
              <li>.visited-secondary-2-2:visited { color: $secondary-2-2 !important; }</li> 
              <li>.bg-visited-secondary-2-2:visited { background-color: $secondary-2-2 !important; }</li> 
              <li>.border-visited-secondary-2-2:visited { border-color: $secondary-2-2 !important; }</li> 
              <li>.active-secondary-2-3:active { color: $secondary-2-3 !important; }</li> 
              <li>.bg-active-secondary-2-3:active { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-active-secondary-2-3:active { border-color: $secondary-2-3 !important; }</li> 
              <li>.checked-secondary-2-3:checked { color: $secondary-2-3 !important; }</li> 
              <li>.bg-checked-secondary-2-3:checked { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-checked-secondary-2-3:checked { border-color: $secondary-2-3 !important; }</li> 
              <li>.disabled-secondary-2-3:disabled { color: $secondary-2-3 !important; }</li> 
              <li>.bg-disabled-secondary-2-3:disabled { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-disabled-secondary-2-3:disabled { border-color: $secondary-2-3 !important; }</li> 
              <li>.empty-secondary-2-3:empty { color: $secondary-2-3 !important; }</li> 
              <li>.bg-empty-secondary-2-3:empty { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-empty-secondary-2-3:empty { border-color: $secondary-2-3 !important; }</li> 
              <li>.enabled-secondary-2-3:enabled { color: $secondary-2-3 !important; }</li> 
              <li>.bg-enabled-secondary-2-3:enabled { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-enabled-secondary-2-3:enabled { border-color: $secondary-2-3 !important; }</li> 
              <li>.first-child-secondary-2-3:first-child { color: $secondary-2-3 !important; }</li> 
              <li>.bg-first-child-secondary-2-3:first-child { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-first-child-secondary-2-3:first-child { border-color: $secondary-2-3 !important; }</li> 
              <li>.first-of-type-secondary-2-3:first-of-type { color: $secondary-2-3 !important; }</li> 
              <li>.bg-first-of-type-secondary-2-3:first-of-type { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-first-of-type-secondary-2-3:first-of-type { border-color: $secondary-2-3 !important; }</li> 
              <li>.focus-secondary-2-3:focus { color: $secondary-2-3 !important; }</li> 
              <li>.bg-focus-secondary-2-3:focus { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-focus-secondary-2-3:focus { border-color: $secondary-2-3 !important; }</li> 
              <li>.hover-secondary-2-3:hover { color: $secondary-2-3 !important; }</li> 
              <li>.bg-hover-secondary-2-3:hover { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-hover-secondary-2-3:hover { border-color: $secondary-2-3 !important; }</li> 
              <li>.in-range-secondary-2-3:in-range { color: $secondary-2-3 !important; }</li> 
              <li>.bg-in-range-secondary-2-3:in-range { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-in-range-secondary-2-3:in-range { border-color: $secondary-2-3 !important; }</li> 
              <li>.invalid-secondary-2-3:invalid { color: $secondary-2-3 !important; }</li> 
              <li>.bg-invalid-secondary-2-3:invalid { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-invalid-secondary-2-3:invalid { border-color: $secondary-2-3 !important; }</li> 
              <li>.last-child-secondary-2-3:last-child { color: $secondary-2-3 !important; }</li> 
              <li>.bg-last-child-secondary-2-3:last-child { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-last-child-secondary-2-3:last-child { border-color: $secondary-2-3 !important; }</li> 
              <li>.last-of-type-secondary-2-3:last-of-type { color: $secondary-2-3 !important; }</li> 
              <li>.bg-last-of-type-secondary-2-3:last-of-type { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-last-of-type-secondary-2-3:last-of-type { border-color: $secondary-2-3 !important; }</li> 
              <li>.link-secondary-2-3:link { color: $secondary-2-3 !important; }</li> 
              <li>.bg-link-secondary-2-3:link { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-link-secondary-2-3:link { border-color: $secondary-2-3 !important; }</li> 
              <li>.only-of-type-secondary-2-3:only-of-type { color: $secondary-2-3 !important; }</li> 
              <li>.bg-only-of-type-secondary-2-3:only-of-type { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-only-of-type-secondary-2-3:only-of-type { border-color: $secondary-2-3 !important; }</li> 
              <li>.only-child-secondary-2-3:only-child { color: $secondary-2-3 !important; }</li> 
              <li>.bg-only-child-secondary-2-3:only-child { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-only-child-secondary-2-3:only-child { border-color: $secondary-2-3 !important; }</li> 
              <li>.optional-secondary-2-3:optional { color: $secondary-2-3 !important; }</li> 
              <li>.bg-optional-secondary-2-3:optional { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-optional-secondary-2-3:optional { border-color: $secondary-2-3 !important; }</li> 
              <li>.out-of-range-secondary-2-3:out-of-range { color: $secondary-2-3 !important; }</li> 
              <li>.bg-out-of-range-secondary-2-3:out-of-range { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-out-of-range-secondary-2-3:out-of-range { border-color: $secondary-2-3 !important; }</li> 
              <li>.read-only-secondary-2-3:read-only { color: $secondary-2-3 !important; }</li> 
              <li>.bg-read-only-secondary-2-3:read-only { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-read-only-secondary-2-3:read-only { border-color: $secondary-2-3 !important; }</li> 
              <li>.read-write-secondary-2-3:read-write { color: $secondary-2-3 !important; }</li> 
              <li>.bg-read-write-secondary-2-3:read-write { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-read-write-secondary-2-3:read-write { border-color: $secondary-2-3 !important; }</li> 
              <li>.required-secondary-2-3:required { color: $secondary-2-3 !important; }</li> 
              <li>.bg-required-secondary-2-3:required { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-required-secondary-2-3:required { border-color: $secondary-2-3 !important; }</li> 
              <li>.root-secondary-2-3:root { color: $secondary-2-3 !important; }</li> 
              <li>.bg-root-secondary-2-3:root { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-root-secondary-2-3:root { border-color: $secondary-2-3 !important; }</li> 
              <li>.target-secondary-2-3:target { color: $secondary-2-3 !important; }</li> 
              <li>.bg-target-secondary-2-3:target { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-target-secondary-2-3:target { border-color: $secondary-2-3 !important; }</li> 
              <li>.valid-secondary-2-3:valid { color: $secondary-2-3 !important; }</li> 
              <li>.bg-valid-secondary-2-3:valid { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-valid-secondary-2-3:valid { border-color: $secondary-2-3 !important; }</li> 
              <li>.visited-secondary-2-3:visited { color: $secondary-2-3 !important; }</li> 
              <li>.bg-visited-secondary-2-3:visited { background-color: $secondary-2-3 !important; }</li> 
              <li>.border-visited-secondary-2-3:visited { border-color: $secondary-2-3 !important; }</li> 
              <li>.active-secondary-2-4:active { color: $secondary-2-4 !important; }</li> 
              <li>.bg-active-secondary-2-4:active { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-active-secondary-2-4:active { border-color: $secondary-2-4 !important; }</li> 
              <li>.checked-secondary-2-4:checked { color: $secondary-2-4 !important; }</li> 
              <li>.bg-checked-secondary-2-4:checked { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-checked-secondary-2-4:checked { border-color: $secondary-2-4 !important; }</li> 
              <li>.disabled-secondary-2-4:disabled { color: $secondary-2-4 !important; }</li> 
              <li>.bg-disabled-secondary-2-4:disabled { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-disabled-secondary-2-4:disabled { border-color: $secondary-2-4 !important; }</li> 
              <li>.empty-secondary-2-4:empty { color: $secondary-2-4 !important; }</li> 
              <li>.bg-empty-secondary-2-4:empty { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-empty-secondary-2-4:empty { border-color: $secondary-2-4 !important; }</li> 
              <li>.enabled-secondary-2-4:enabled { color: $secondary-2-4 !important; }</li> 
              <li>.bg-enabled-secondary-2-4:enabled { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-enabled-secondary-2-4:enabled { border-color: $secondary-2-4 !important; }</li> 
              <li>.first-child-secondary-2-4:first-child { color: $secondary-2-4 !important; }</li> 
              <li>.bg-first-child-secondary-2-4:first-child { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-first-child-secondary-2-4:first-child { border-color: $secondary-2-4 !important; }</li> 
              <li>.first-of-type-secondary-2-4:first-of-type { color: $secondary-2-4 !important; }</li> 
              <li>.bg-first-of-type-secondary-2-4:first-of-type { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-first-of-type-secondary-2-4:first-of-type { border-color: $secondary-2-4 !important; }</li> 
              <li>.focus-secondary-2-4:focus { color: $secondary-2-4 !important; }</li> 
              <li>.bg-focus-secondary-2-4:focus { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-focus-secondary-2-4:focus { border-color: $secondary-2-4 !important; }</li> 
              <li>.hover-secondary-2-4:hover { color: $secondary-2-4 !important; }</li> 
              <li>.bg-hover-secondary-2-4:hover { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-hover-secondary-2-4:hover { border-color: $secondary-2-4 !important; }</li> 
              <li>.in-range-secondary-2-4:in-range { color: $secondary-2-4 !important; }</li> 
              <li>.bg-in-range-secondary-2-4:in-range { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-in-range-secondary-2-4:in-range { border-color: $secondary-2-4 !important; }</li> 
              <li>.invalid-secondary-2-4:invalid { color: $secondary-2-4 !important; }</li> 
              <li>.bg-invalid-secondary-2-4:invalid { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-invalid-secondary-2-4:invalid { border-color: $secondary-2-4 !important; }</li> 
              <li>.last-child-secondary-2-4:last-child { color: $secondary-2-4 !important; }</li> 
              <li>.bg-last-child-secondary-2-4:last-child { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-last-child-secondary-2-4:last-child { border-color: $secondary-2-4 !important; }</li> 
              <li>.last-of-type-secondary-2-4:last-of-type { color: $secondary-2-4 !important; }</li> 
              <li>.bg-last-of-type-secondary-2-4:last-of-type { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-last-of-type-secondary-2-4:last-of-type { border-color: $secondary-2-4 !important; }</li> 
              <li>.link-secondary-2-4:link { color: $secondary-2-4 !important; }</li> 
              <li>.bg-link-secondary-2-4:link { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-link-secondary-2-4:link { border-color: $secondary-2-4 !important; }</li> 
              <li>.only-of-type-secondary-2-4:only-of-type { color: $secondary-2-4 !important; }</li> 
              <li>.bg-only-of-type-secondary-2-4:only-of-type { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-only-of-type-secondary-2-4:only-of-type { border-color: $secondary-2-4 !important; }</li> 
              <li>.only-child-secondary-2-4:only-child { color: $secondary-2-4 !important; }</li> 
              <li>.bg-only-child-secondary-2-4:only-child { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-only-child-secondary-2-4:only-child { border-color: $secondary-2-4 !important; }</li> 
              <li>.optional-secondary-2-4:optional { color: $secondary-2-4 !important; }</li> 
              <li>.bg-optional-secondary-2-4:optional { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-optional-secondary-2-4:optional { border-color: $secondary-2-4 !important; }</li> 
              <li>.out-of-range-secondary-2-4:out-of-range { color: $secondary-2-4 !important; }</li> 
              <li>.bg-out-of-range-secondary-2-4:out-of-range { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-out-of-range-secondary-2-4:out-of-range { border-color: $secondary-2-4 !important; }</li> 
              <li>.read-only-secondary-2-4:read-only { color: $secondary-2-4 !important; }</li> 
              <li>.bg-read-only-secondary-2-4:read-only { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-read-only-secondary-2-4:read-only { border-color: $secondary-2-4 !important; }</li> 
              <li>.read-write-secondary-2-4:read-write { color: $secondary-2-4 !important; }</li> 
              <li>.bg-read-write-secondary-2-4:read-write { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-read-write-secondary-2-4:read-write { border-color: $secondary-2-4 !important; }</li> 
              <li>.required-secondary-2-4:required { color: $secondary-2-4 !important; }</li> 
              <li>.bg-required-secondary-2-4:required { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-required-secondary-2-4:required { border-color: $secondary-2-4 !important; }</li> 
              <li>.root-secondary-2-4:root { color: $secondary-2-4 !important; }</li> 
              <li>.bg-root-secondary-2-4:root { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-root-secondary-2-4:root { border-color: $secondary-2-4 !important; }</li> 
              <li>.target-secondary-2-4:target { color: $secondary-2-4 !important; }</li> 
              <li>.bg-target-secondary-2-4:target { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-target-secondary-2-4:target { border-color: $secondary-2-4 !important; }</li> 
              <li>.valid-secondary-2-4:valid { color: $secondary-2-4 !important; }</li> 
              <li>.bg-valid-secondary-2-4:valid { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-valid-secondary-2-4:valid { border-color: $secondary-2-4 !important; }</li> 
              <li>.visited-secondary-2-4:visited { color: $secondary-2-4 !important; }</li> 
              <li>.bg-visited-secondary-2-4:visited { background-color: $secondary-2-4 !important; }</li> 
              <li>.border-visited-secondary-2-4:visited { border-color: $secondary-2-4 !important; }</li> 
            </ul>
            <p>Complement Color</p>
            <ul>
              <li>.active-complement-0:active { color: $complement-0 !important; }</li> 
              <li>.bg-active-complement-0:active { background-color: $complement-0 !important; }</li> 
              <li>.border-active-complement-0:active { border-color: $complement-0 !important; }</li> 
              <li>.checked-complement-0:checked { color: $complement-0 !important; }</li> 
              <li>.bg-checked-complement-0:checked { background-color: $complement-0 !important; }</li> 
              <li>.border-checked-complement-0:checked { border-color: $complement-0 !important; }</li> 
              <li>.disabled-complement-0:disabled { color: $complement-0 !important; }</li> 
              <li>.bg-disabled-complement-0:disabled { background-color: $complement-0 !important; }</li> 
              <li>.border-disabled-complement-0:disabled { border-color: $complement-0 !important; }</li> 
              <li>.empty-complement-0:empty { color: $complement-0 !important; }</li> 
              <li>.bg-empty-complement-0:empty { background-color: $complement-0 !important; }</li> 
              <li>.border-empty-complement-0:empty { border-color: $complement-0 !important; }</li> 
              <li>.enabled-complement-0:enabled { color: $complement-0 !important; }</li> 
              <li>.bg-enabled-complement-0:enabled { background-color: $complement-0 !important; }</li> 
              <li>.border-enabled-complement-0:enabled { border-color: $complement-0 !important; }</li> 
              <li>.first-child-complement-0:first-child { color: $complement-0 !important; }</li> 
              <li>.bg-first-child-complement-0:first-child { background-color: $complement-0 !important; }</li> 
              <li>.border-first-child-complement-0:first-child { border-color: $complement-0 !important; }</li> 
              <li>.first-of-type-complement-0:first-of-type { color: $complement-0 !important; }</li> 
              <li>.bg-first-of-type-complement-0:first-of-type { background-color: $complement-0 !important; }</li> 
              <li>.border-first-of-type-complement-0:first-of-type { border-color: $complement-0 !important; }</li> 
              <li>.focus-complement-0:focus { color: $complement-0 !important; }</li> 
              <li>.bg-focus-complement-0:focus { background-color: $complement-0 !important; }</li> 
              <li>.border-focus-complement-0:focus { border-color: $complement-0 !important; }</li> 
              <li>.hover-complement-0:hover { color: $complement-0 !important; }</li> 
              <li>.bg-hover-complement-0:hover { background-color: $complement-0 !important; }</li> 
              <li>.border-hover-complement-0:hover { border-color: $complement-0 !important; }</li> 
              <li>.in-range-complement-0:in-range { color: $complement-0 !important; }</li> 
              <li>.bg-in-range-complement-0:in-range { background-color: $complement-0 !important; }</li> 
              <li>.border-in-range-complement-0:in-range { border-color: $complement-0 !important; }</li> 
              <li>.invalid-complement-0:invalid { color: $complement-0 !important; }</li> 
              <li>.bg-invalid-complement-0:invalid { background-color: $complement-0 !important; }</li> 
              <li>.border-invalid-complement-0:invalid { border-color: $complement-0 !important; }</li> 
              <li>.last-child-complement-0:last-child { color: $complement-0 !important; }</li> 
              <li>.bg-last-child-complement-0:last-child { background-color: $complement-0 !important; }</li> 
              <li>.border-last-child-complement-0:last-child { border-color: $complement-0 !important; }</li> 
              <li>.last-of-type-complement-0:last-of-type { color: $complement-0 !important; }</li> 
              <li>.bg-last-of-type-complement-0:last-of-type { background-color: $complement-0 !important; }</li> 
              <li>.border-last-of-type-complement-0:last-of-type { border-color: $complement-0 !important; }</li> 
              <li>.link-complement-0:link { color: $complement-0 !important; }</li> 
              <li>.bg-link-complement-0:link { background-color: $complement-0 !important; }</li> 
              <li>.border-link-complement-0:link { border-color: $complement-0 !important; }</li> 
              <li>.only-of-type-complement-0:only-of-type { color: $complement-0 !important; }</li> 
              <li>.bg-only-of-type-complement-0:only-of-type { background-color: $complement-0 !important; }</li> 
              <li>.border-only-of-type-complement-0:only-of-type { border-color: $complement-0 !important; }</li> 
              <li>.only-child-complement-0:only-child { color: $complement-0 !important; }</li> 
              <li>.bg-only-child-complement-0:only-child { background-color: $complement-0 !important; }</li> 
              <li>.border-only-child-complement-0:only-child { border-color: $complement-0 !important; }</li> 
              <li>.optional-complement-0:optional { color: $complement-0 !important; }</li> 
              <li>.bg-optional-complement-0:optional { background-color: $complement-0 !important; }</li> 
              <li>.border-optional-complement-0:optional { border-color: $complement-0 !important; }</li> 
              <li>.out-of-range-complement-0:out-of-range { color: $complement-0 !important; }</li> 
              <li>.bg-out-of-range-complement-0:out-of-range { background-color: $complement-0 !important; }</li> 
              <li>.border-out-of-range-complement-0:out-of-range { border-color: $complement-0 !important; }</li> 
              <li>.read-only-complement-0:read-only { color: $complement-0 !important; }</li> 
              <li>.bg-read-only-complement-0:read-only { background-color: $complement-0 !important; }</li> 
              <li>.border-read-only-complement-0:read-only { border-color: $complement-0 !important; }</li> 
              <li>.read-write-complement-0:read-write { color: $complement-0 !important; }</li> 
              <li>.bg-read-write-complement-0:read-write { background-color: $complement-0 !important; }</li> 
              <li>.border-read-write-complement-0:read-write { border-color: $complement-0 !important; }</li> 
              <li>.required-complement-0:required { color: $complement-0 !important; }</li> 
              <li>.bg-required-complement-0:required { background-color: $complement-0 !important; }</li> 
              <li>.border-required-complement-0:required { border-color: $complement-0 !important; }</li> 
              <li>.root-complement-0:root { color: $complement-0 !important; }</li> 
              <li>.bg-root-complement-0:root { background-color: $complement-0 !important; }</li> 
              <li>.border-root-complement-0:root { border-color: $complement-0 !important; }</li> 
              <li>.target-complement-0:target { color: $complement-0 !important; }</li> 
              <li>.bg-target-complement-0:target { background-color: $complement-0 !important; }</li> 
              <li>.border-target-complement-0:target { border-color: $complement-0 !important; }</li> 
              <li>.valid-complement-0:valid { color: $complement-0 !important; }</li> 
              <li>.bg-valid-complement-0:valid { background-color: $complement-0 !important; }</li> 
              <li>.border-valid-complement-0:valid { border-color: $complement-0 !important; }</li> 
              <li>.visited-complement-0:visited { color: $complement-0 !important; }</li> 
              <li>.bg-visited-complement-0:visited { background-color: $complement-0 !important; }</li> 
              <li>.border-visited-complement-0:visited { border-color: $complement-0 !important; }</li> 
              <li>.active-complement-1:active { color: $complement-1 !important; }</li> 
              <li>.bg-active-complement-1:active { background-color: $complement-1 !important; }</li> 
              <li>.border-active-complement-1:active { border-color: $complement-1 !important; }</li> 
              <li>.checked-complement-1:checked { color: $complement-1 !important; }</li> 
              <li>.bg-checked-complement-1:checked { background-color: $complement-1 !important; }</li> 
              <li>.border-checked-complement-1:checked { border-color: $complement-1 !important; }</li> 
              <li>.disabled-complement-1:disabled { color: $complement-1 !important; }</li> 
              <li>.bg-disabled-complement-1:disabled { background-color: $complement-1 !important; }</li> 
              <li>.border-disabled-complement-1:disabled { border-color: $complement-1 !important; }</li> 
              <li>.empty-complement-1:empty { color: $complement-1 !important; }</li> 
              <li>.bg-empty-complement-1:empty { background-color: $complement-1 !important; }</li> 
              <li>.border-empty-complement-1:empty { border-color: $complement-1 !important; }</li> 
              <li>.enabled-complement-1:enabled { color: $complement-1 !important; }</li> 
              <li>.bg-enabled-complement-1:enabled { background-color: $complement-1 !important; }</li> 
              <li>.border-enabled-complement-1:enabled { border-color: $complement-1 !important; }</li> 
              <li>.first-child-complement-1:first-child { color: $complement-1 !important; }</li> 
              <li>.bg-first-child-complement-1:first-child { background-color: $complement-1 !important; }</li> 
              <li>.border-first-child-complement-1:first-child { border-color: $complement-1 !important; }</li> 
              <li>.first-of-type-complement-1:first-of-type { color: $complement-1 !important; }</li> 
              <li>.bg-first-of-type-complement-1:first-of-type { background-color: $complement-1 !important; }</li> 
              <li>.border-first-of-type-complement-1:first-of-type { border-color: $complement-1 !important; }</li> 
              <li>.focus-complement-1:focus { color: $complement-1 !important; }</li> 
              <li>.bg-focus-complement-1:focus { background-color: $complement-1 !important; }</li> 
              <li>.border-focus-complement-1:focus { border-color: $complement-1 !important; }</li> 
              <li>.hover-complement-1:hover { color: $complement-1 !important; }</li> 
              <li>.bg-hover-complement-1:hover { background-color: $complement-1 !important; }</li> 
              <li>.border-hover-complement-1:hover { border-color: $complement-1 !important; }</li> 
              <li>.in-range-complement-1:in-range { color: $complement-1 !important; }</li> 
              <li>.bg-in-range-complement-1:in-range { background-color: $complement-1 !important; }</li> 
              <li>.border-in-range-complement-1:in-range { border-color: $complement-1 !important; }</li> 
              <li>.invalid-complement-1:invalid { color: $complement-1 !important; }</li> 
              <li>.bg-invalid-complement-1:invalid { background-color: $complement-1 !important; }</li> 
              <li>.border-invalid-complement-1:invalid { border-color: $complement-1 !important; }</li> 
              <li>.last-child-complement-1:last-child { color: $complement-1 !important; }</li> 
              <li>.bg-last-child-complement-1:last-child { background-color: $complement-1 !important; }</li> 
              <li>.border-last-child-complement-1:last-child { border-color: $complement-1 !important; }</li> 
              <li>.last-of-type-complement-1:last-of-type { color: $complement-1 !important; }</li> 
              <li>.bg-last-of-type-complement-1:last-of-type { background-color: $complement-1 !important; }</li> 
              <li>.border-last-of-type-complement-1:last-of-type { border-color: $complement-1 !important; }</li> 
              <li>.link-complement-1:link { color: $complement-1 !important; }</li> 
              <li>.bg-link-complement-1:link { background-color: $complement-1 !important; }</li> 
              <li>.border-link-complement-1:link { border-color: $complement-1 !important; }</li> 
              <li>.only-of-type-complement-1:only-of-type { color: $complement-1 !important; }</li> 
              <li>.bg-only-of-type-complement-1:only-of-type { background-color: $complement-1 !important; }</li> 
              <li>.border-only-of-type-complement-1:only-of-type { border-color: $complement-1 !important; }</li> 
              <li>.only-child-complement-1:only-child { color: $complement-1 !important; }</li> 
              <li>.bg-only-child-complement-1:only-child { background-color: $complement-1 !important; }</li> 
              <li>.border-only-child-complement-1:only-child { border-color: $complement-1 !important; }</li> 
              <li>.optional-complement-1:optional { color: $complement-1 !important; }</li> 
              <li>.bg-optional-complement-1:optional { background-color: $complement-1 !important; }</li> 
              <li>.border-optional-complement-1:optional { border-color: $complement-1 !important; }</li> 
              <li>.out-of-range-complement-1:out-of-range { color: $complement-1 !important; }</li> 
              <li>.bg-out-of-range-complement-1:out-of-range { background-color: $complement-1 !important; }</li> 
              <li>.border-out-of-range-complement-1:out-of-range { border-color: $complement-1 !important; }</li> 
              <li>.read-only-complement-1:read-only { color: $complement-1 !important; }</li> 
              <li>.bg-read-only-complement-1:read-only { background-color: $complement-1 !important; }</li> 
              <li>.border-read-only-complement-1:read-only { border-color: $complement-1 !important; }</li> 
              <li>.read-write-complement-1:read-write { color: $complement-1 !important; }</li> 
              <li>.bg-read-write-complement-1:read-write { background-color: $complement-1 !important; }</li> 
              <li>.border-read-write-complement-1:read-write { border-color: $complement-1 !important; }</li> 
              <li>.required-complement-1:required { color: $complement-1 !important; }</li> 
              <li>.bg-required-complement-1:required { background-color: $complement-1 !important; }</li> 
              <li>.border-required-complement-1:required { border-color: $complement-1 !important; }</li> 
              <li>.root-complement-1:root { color: $complement-1 !important; }</li> 
              <li>.bg-root-complement-1:root { background-color: $complement-1 !important; }</li> 
              <li>.border-root-complement-1:root { border-color: $complement-1 !important; }</li> 
              <li>.target-complement-1:target { color: $complement-1 !important; }</li> 
              <li>.bg-target-complement-1:target { background-color: $complement-1 !important; }</li> 
              <li>.border-target-complement-1:target { border-color: $complement-1 !important; }</li> 
              <li>.valid-complement-1:valid { color: $complement-1 !important; }</li> 
              <li>.bg-valid-complement-1:valid { background-color: $complement-1 !important; }</li> 
              <li>.border-valid-complement-1:valid { border-color: $complement-1 !important; }</li> 
              <li>.visited-complement-1:visited { color: $complement-1 !important; }</li> 
              <li>.bg-visited-complement-1:visited { background-color: $complement-1 !important; }</li> 
              <li>.border-visited-complement-1:visited { border-color: $complement-1 !important; }</li> 
              <li>.active-complement-2:active { color: $complement-2 !important; }</li> 
              <li>.bg-active-complement-2:active { background-color: $complement-2 !important; }</li> 
              <li>.border-active-complement-2:active { border-color: $complement-2 !important; }</li> 
              <li>.checked-complement-2:checked { color: $complement-2 !important; }</li> 
              <li>.bg-checked-complement-2:checked { background-color: $complement-2 !important; }</li> 
              <li>.border-checked-complement-2:checked { border-color: $complement-2 !important; }</li> 
              <li>.disabled-complement-2:disabled { color: $complement-2 !important; }</li> 
              <li>.bg-disabled-complement-2:disabled { background-color: $complement-2 !important; }</li> 
              <li>.border-disabled-complement-2:disabled { border-color: $complement-2 !important; }</li> 
              <li>.empty-complement-2:empty { color: $complement-2 !important; }</li> 
              <li>.bg-empty-complement-2:empty { background-color: $complement-2 !important; }</li> 
              <li>.border-empty-complement-2:empty { border-color: $complement-2 !important; }</li> 
              <li>.enabled-complement-2:enabled { color: $complement-2 !important; }</li> 
              <li>.bg-enabled-complement-2:enabled { background-color: $complement-2 !important; }</li> 
              <li>.border-enabled-complement-2:enabled { border-color: $complement-2 !important; }</li> 
              <li>.first-child-complement-2:first-child { color: $complement-2 !important; }</li> 
              <li>.bg-first-child-complement-2:first-child { background-color: $complement-2 !important; }</li> 
              <li>.border-first-child-complement-2:first-child { border-color: $complement-2 !important; }</li> 
              <li>.first-of-type-complement-2:first-of-type { color: $complement-2 !important; }</li> 
              <li>.bg-first-of-type-complement-2:first-of-type { background-color: $complement-2 !important; }</li> 
              <li>.border-first-of-type-complement-2:first-of-type { border-color: $complement-2 !important; }</li> 
              <li>.focus-complement-2:focus { color: $complement-2 !important; }</li> 
              <li>.bg-focus-complement-2:focus { background-color: $complement-2 !important; }</li> 
              <li>.border-focus-complement-2:focus { border-color: $complement-2 !important; }</li> 
              <li>.hover-complement-2:hover { color: $complement-2 !important; }</li> 
              <li>.bg-hover-complement-2:hover { background-color: $complement-2 !important; }</li> 
              <li>.border-hover-complement-2:hover { border-color: $complement-2 !important; }</li> 
              <li>.in-range-complement-2:in-range { color: $complement-2 !important; }</li> 
              <li>.bg-in-range-complement-2:in-range { background-color: $complement-2 !important; }</li> 
              <li>.border-in-range-complement-2:in-range { border-color: $complement-2 !important; }</li> 
              <li>.invalid-complement-2:invalid { color: $complement-2 !important; }</li> 
              <li>.bg-invalid-complement-2:invalid { background-color: $complement-2 !important; }</li> 
              <li>.border-invalid-complement-2:invalid { border-color: $complement-2 !important; }</li> 
              <li>.last-child-complement-2:last-child { color: $complement-2 !important; }</li> 
              <li>.bg-last-child-complement-2:last-child { background-color: $complement-2 !important; }</li> 
              <li>.border-last-child-complement-2:last-child { border-color: $complement-2 !important; }</li> 
              <li>.last-of-type-complement-2:last-of-type { color: $complement-2 !important; }</li> 
              <li>.bg-last-of-type-complement-2:last-of-type { background-color: $complement-2 !important; }</li> 
              <li>.border-last-of-type-complement-2:last-of-type { border-color: $complement-2 !important; }</li> 
              <li>.link-complement-2:link { color: $complement-2 !important; }</li> 
              <li>.bg-link-complement-2:link { background-color: $complement-2 !important; }</li> 
              <li>.border-link-complement-2:link { border-color: $complement-2 !important; }</li> 
              <li>.only-of-type-complement-2:only-of-type { color: $complement-2 !important; }</li> 
              <li>.bg-only-of-type-complement-2:only-of-type { background-color: $complement-2 !important; }</li> 
              <li>.border-only-of-type-complement-2:only-of-type { border-color: $complement-2 !important; }</li> 
              <li>.only-child-complement-2:only-child { color: $complement-2 !important; }</li> 
              <li>.bg-only-child-complement-2:only-child { background-color: $complement-2 !important; }</li> 
              <li>.border-only-child-complement-2:only-child { border-color: $complement-2 !important; }</li> 
              <li>.optional-complement-2:optional { color: $complement-2 !important; }</li> 
              <li>.bg-optional-complement-2:optional { background-color: $complement-2 !important; }</li> 
              <li>.border-optional-complement-2:optional { border-color: $complement-2 !important; }</li> 
              <li>.out-of-range-complement-2:out-of-range { color: $complement-2 !important; }</li> 
              <li>.bg-out-of-range-complement-2:out-of-range { background-color: $complement-2 !important; }</li> 
              <li>.border-out-of-range-complement-2:out-of-range { border-color: $complement-2 !important; }</li> 
              <li>.read-only-complement-2:read-only { color: $complement-2 !important; }</li> 
              <li>.bg-read-only-complement-2:read-only { background-color: $complement-2 !important; }</li> 
              <li>.border-read-only-complement-2:read-only { border-color: $complement-2 !important; }</li> 
              <li>.read-write-complement-2:read-write { color: $complement-2 !important; }</li> 
              <li>.bg-read-write-complement-2:read-write { background-color: $complement-2 !important; }</li> 
              <li>.border-read-write-complement-2:read-write { border-color: $complement-2 !important; }</li> 
              <li>.required-complement-2:required { color: $complement-2 !important; }</li> 
              <li>.bg-required-complement-2:required { background-color: $complement-2 !important; }</li> 
              <li>.border-required-complement-2:required { border-color: $complement-2 !important; }</li> 
              <li>.root-complement-2:root { color: $complement-2 !important; }</li> 
              <li>.bg-root-complement-2:root { background-color: $complement-2 !important; }</li> 
              <li>.border-root-complement-2:root { border-color: $complement-2 !important; }</li> 
              <li>.target-complement-2:target { color: $complement-2 !important; }</li> 
              <li>.bg-target-complement-2:target { background-color: $complement-2 !important; }</li> 
              <li>.border-target-complement-2:target { border-color: $complement-2 !important; }</li> 
              <li>.valid-complement-2:valid { color: $complement-2 !important; }</li> 
              <li>.bg-valid-complement-2:valid { background-color: $complement-2 !important; }</li> 
              <li>.border-valid-complement-2:valid { border-color: $complement-2 !important; }</li> 
              <li>.visited-complement-2:visited { color: $complement-2 !important; }</li> 
              <li>.bg-visited-complement-2:visited { background-color: $complement-2 !important; }</li> 
              <li>.border-visited-complement-2:visited { border-color: $complement-2 !important; }</li> 
              <li>.active-complement-3:active { color: $complement-3 !important; }</li> 
              <li>.bg-active-complement-3:active { background-color: $complement-3 !important; }</li> 
              <li>.border-active-complement-3:active { border-color: $complement-3 !important; }</li> 
              <li>.checked-complement-3:checked { color: $complement-3 !important; }</li> 
              <li>.bg-checked-complement-3:checked { background-color: $complement-3 !important; }</li> 
              <li>.border-checked-complement-3:checked { border-color: $complement-3 !important; }</li> 
              <li>.disabled-complement-3:disabled { color: $complement-3 !important; }</li> 
              <li>.bg-disabled-complement-3:disabled { background-color: $complement-3 !important; }</li> 
              <li>.border-disabled-complement-3:disabled { border-color: $complement-3 !important; }</li> 
              <li>.empty-complement-3:empty { color: $complement-3 !important; }</li> 
              <li>.bg-empty-complement-3:empty { background-color: $complement-3 !important; }</li> 
              <li>.border-empty-complement-3:empty { border-color: $complement-3 !important; }</li> 
              <li>.enabled-complement-3:enabled { color: $complement-3 !important; }</li> 
              <li>.bg-enabled-complement-3:enabled { background-color: $complement-3 !important; }</li> 
              <li>.border-enabled-complement-3:enabled { border-color: $complement-3 !important; }</li> 
              <li>.first-child-complement-3:first-child { color: $complement-3 !important; }</li> 
              <li>.bg-first-child-complement-3:first-child { background-color: $complement-3 !important; }</li> 
              <li>.border-first-child-complement-3:first-child { border-color: $complement-3 !important; }</li> 
              <li>.first-of-type-complement-3:first-of-type { color: $complement-3 !important; }</li> 
              <li>.bg-first-of-type-complement-3:first-of-type { background-color: $complement-3 !important; }</li> 
              <li>.border-first-of-type-complement-3:first-of-type { border-color: $complement-3 !important; }</li> 
              <li>.focus-complement-3:focus { color: $complement-3 !important; }</li> 
              <li>.bg-focus-complement-3:focus { background-color: $complement-3 !important; }</li> 
              <li>.border-focus-complement-3:focus { border-color: $complement-3 !important; }</li> 
              <li>.hover-complement-3:hover { color: $complement-3 !important; }</li> 
              <li>.bg-hover-complement-3:hover { background-color: $complement-3 !important; }</li> 
              <li>.border-hover-complement-3:hover { border-color: $complement-3 !important; }</li> 
              <li>.in-range-complement-3:in-range { color: $complement-3 !important; }</li> 
              <li>.bg-in-range-complement-3:in-range { background-color: $complement-3 !important; }</li> 
              <li>.border-in-range-complement-3:in-range { border-color: $complement-3 !important; }</li> 
              <li>.invalid-complement-3:invalid { color: $complement-3 !important; }</li> 
              <li>.bg-invalid-complement-3:invalid { background-color: $complement-3 !important; }</li> 
              <li>.border-invalid-complement-3:invalid { border-color: $complement-3 !important; }</li> 
              <li>.last-child-complement-3:last-child { color: $complement-3 !important; }</li> 
              <li>.bg-last-child-complement-3:last-child { background-color: $complement-3 !important; }</li> 
              <li>.border-last-child-complement-3:last-child { border-color: $complement-3 !important; }</li> 
              <li>.last-of-type-complement-3:last-of-type { color: $complement-3 !important; }</li> 
              <li>.bg-last-of-type-complement-3:last-of-type { background-color: $complement-3 !important; }</li> 
              <li>.border-last-of-type-complement-3:last-of-type { border-color: $complement-3 !important; }</li> 
              <li>.link-complement-3:link { color: $complement-3 !important; }</li> 
              <li>.bg-link-complement-3:link { background-color: $complement-3 !important; }</li> 
              <li>.border-link-complement-3:link { border-color: $complement-3 !important; }</li> 
              <li>.only-of-type-complement-3:only-of-type { color: $complement-3 !important; }</li> 
              <li>.bg-only-of-type-complement-3:only-of-type { background-color: $complement-3 !important; }</li> 
              <li>.border-only-of-type-complement-3:only-of-type { border-color: $complement-3 !important; }</li> 
              <li>.only-child-complement-3:only-child { color: $complement-3 !important; }</li> 
              <li>.bg-only-child-complement-3:only-child { background-color: $complement-3 !important; }</li> 
              <li>.border-only-child-complement-3:only-child { border-color: $complement-3 !important; }</li> 
              <li>.optional-complement-3:optional { color: $complement-3 !important; }</li> 
              <li>.bg-optional-complement-3:optional { background-color: $complement-3 !important; }</li> 
              <li>.border-optional-complement-3:optional { border-color: $complement-3 !important; }</li> 
              <li>.out-of-range-complement-3:out-of-range { color: $complement-3 !important; }</li> 
              <li>.bg-out-of-range-complement-3:out-of-range { background-color: $complement-3 !important; }</li> 
              <li>.border-out-of-range-complement-3:out-of-range { border-color: $complement-3 !important; }</li> 
              <li>.read-only-complement-3:read-only { color: $complement-3 !important; }</li> 
              <li>.bg-read-only-complement-3:read-only { background-color: $complement-3 !important; }</li> 
              <li>.border-read-only-complement-3:read-only { border-color: $complement-3 !important; }</li> 
              <li>.read-write-complement-3:read-write { color: $complement-3 !important; }</li> 
              <li>.bg-read-write-complement-3:read-write { background-color: $complement-3 !important; }</li> 
              <li>.border-read-write-complement-3:read-write { border-color: $complement-3 !important; }</li> 
              <li>.required-complement-3:required { color: $complement-3 !important; }</li> 
              <li>.bg-required-complement-3:required { background-color: $complement-3 !important; }</li> 
              <li>.border-required-complement-3:required { border-color: $complement-3 !important; }</li> 
              <li>.root-complement-3:root { color: $complement-3 !important; }</li> 
              <li>.bg-root-complement-3:root { background-color: $complement-3 !important; }</li> 
              <li>.border-root-complement-3:root { border-color: $complement-3 !important; }</li> 
              <li>.target-complement-3:target { color: $complement-3 !important; }</li> 
              <li>.bg-target-complement-3:target { background-color: $complement-3 !important; }</li> 
              <li>.border-target-complement-3:target { border-color: $complement-3 !important; }</li> 
              <li>.valid-complement-3:valid { color: $complement-3 !important; }</li> 
              <li>.bg-valid-complement-3:valid { background-color: $complement-3 !important; }</li> 
              <li>.border-valid-complement-3:valid { border-color: $complement-3 !important; }</li> 
              <li>.visited-complement-3:visited { color: $complement-3 !important; }</li> 
              <li>.bg-visited-complement-3:visited { background-color: $complement-3 !important; }</li> 
              <li>.border-visited-complement-3:visited { border-color: $complement-3 !important; }</li> 
              <li>.active-complement-4:active { color: $complement-4 !important; }</li> 
              <li>.bg-active-complement-4:active { background-color: $complement-4 !important; }</li> 
              <li>.border-active-complement-4:active { border-color: $complement-4 !important; }</li> 
              <li>.checked-complement-4:checked { color: $complement-4 !important; }</li> 
              <li>.bg-checked-complement-4:checked { background-color: $complement-4 !important; }</li> 
              <li>.border-checked-complement-4:checked { border-color: $complement-4 !important; }</li> 
              <li>.disabled-complement-4:disabled { color: $complement-4 !important; }</li> 
              <li>.bg-disabled-complement-4:disabled { background-color: $complement-4 !important; }</li> 
              <li>.border-disabled-complement-4:disabled { border-color: $complement-4 !important; }</li> 
              <li>.empty-complement-4:empty { color: $complement-4 !important; }</li> 
              <li>.bg-empty-complement-4:empty { background-color: $complement-4 !important; }</li> 
              <li>.border-empty-complement-4:empty { border-color: $complement-4 !important; }</li> 
              <li>.enabled-complement-4:enabled { color: $complement-4 !important; }</li> 
              <li>.bg-enabled-complement-4:enabled { background-color: $complement-4 !important; }</li> 
              <li>.border-enabled-complement-4:enabled { border-color: $complement-4 !important; }</li> 
              <li>.first-child-complement-4:first-child { color: $complement-4 !important; }</li> 
              <li>.bg-first-child-complement-4:first-child { background-color: $complement-4 !important; }</li> 
              <li>.border-first-child-complement-4:first-child { border-color: $complement-4 !important; }</li> 
              <li>.first-of-type-complement-4:first-of-type { color: $complement-4 !important; }</li> 
              <li>.bg-first-of-type-complement-4:first-of-type { background-color: $complement-4 !important; }</li> 
              <li>.border-first-of-type-complement-4:first-of-type { border-color: $complement-4 !important; }</li> 
              <li>.focus-complement-4:focus { color: $complement-4 !important; }</li> 
              <li>.bg-focus-complement-4:focus { background-color: $complement-4 !important; }</li> 
              <li>.border-focus-complement-4:focus { border-color: $complement-4 !important; }</li> 
              <li>.hover-complement-4:hover { color: $complement-4 !important; }</li> 
              <li>.bg-hover-complement-4:hover { background-color: $complement-4 !important; }</li> 
              <li>.border-hover-complement-4:hover { border-color: $complement-4 !important; }</li> 
              <li>.in-range-complement-4:in-range { color: $complement-4 !important; }</li> 
              <li>.bg-in-range-complement-4:in-range { background-color: $complement-4 !important; }</li> 
              <li>.border-in-range-complement-4:in-range { border-color: $complement-4 !important; }</li> 
              <li>.invalid-complement-4:invalid { color: $complement-4 !important; }</li> 
              <li>.bg-invalid-complement-4:invalid { background-color: $complement-4 !important; }</li> 
              <li>.border-invalid-complement-4:invalid { border-color: $complement-4 !important; }</li> 
              <li>.last-child-complement-4:last-child { color: $complement-4 !important; }</li> 
              <li>.bg-last-child-complement-4:last-child { background-color: $complement-4 !important; }</li> 
              <li>.border-last-child-complement-4:last-child { border-color: $complement-4 !important; }</li> 
              <li>.last-of-type-complement-4:last-of-type { color: $complement-4 !important; }</li> 
              <li>.bg-last-of-type-complement-4:last-of-type { background-color: $complement-4 !important; }</li> 
              <li>.border-last-of-type-complement-4:last-of-type { border-color: $complement-4 !important; }</li> 
              <li>.link-complement-4:link { color: $complement-4 !important; }</li> 
              <li>.bg-link-complement-4:link { background-color: $complement-4 !important; }</li> 
              <li>.border-link-complement-4:link { border-color: $complement-4 !important; }</li> 
              <li>.only-of-type-complement-4:only-of-type { color: $complement-4 !important; }</li> 
              <li>.bg-only-of-type-complement-4:only-of-type { background-color: $complement-4 !important; }</li> 
              <li>.border-only-of-type-complement-4:only-of-type { border-color: $complement-4 !important; }</li> 
              <li>.only-child-complement-4:only-child { color: $complement-4 !important; }</li> 
              <li>.bg-only-child-complement-4:only-child { background-color: $complement-4 !important; }</li> 
              <li>.border-only-child-complement-4:only-child { border-color: $complement-4 !important; }</li> 
              <li>.optional-complement-4:optional { color: $complement-4 !important; }</li> 
              <li>.bg-optional-complement-4:optional { background-color: $complement-4 !important; }</li> 
              <li>.border-optional-complement-4:optional { border-color: $complement-4 !important; }</li> 
              <li>.out-of-range-complement-4:out-of-range { color: $complement-4 !important; }</li> 
              <li>.bg-out-of-range-complement-4:out-of-range { background-color: $complement-4 !important; }</li> 
              <li>.border-out-of-range-complement-4:out-of-range { border-color: $complement-4 !important; }</li> 
              <li>.read-only-complement-4:read-only { color: $complement-4 !important; }</li> 
              <li>.bg-read-only-complement-4:read-only { background-color: $complement-4 !important; }</li> 
              <li>.border-read-only-complement-4:read-only { border-color: $complement-4 !important; }</li> 
              <li>.read-write-complement-4:read-write { color: $complement-4 !important; }</li> 
              <li>.bg-read-write-complement-4:read-write { background-color: $complement-4 !important; }</li> 
              <li>.border-read-write-complement-4:read-write { border-color: $complement-4 !important; }</li> 
              <li>.required-complement-4:required { color: $complement-4 !important; }</li> 
              <li>.bg-required-complement-4:required { background-color: $complement-4 !important; }</li> 
              <li>.border-required-complement-4:required { border-color: $complement-4 !important; }</li> 
              <li>.root-complement-4:root { color: $complement-4 !important; }</li> 
              <li>.bg-root-complement-4:root { background-color: $complement-4 !important; }</li> 
              <li>.border-root-complement-4:root { border-color: $complement-4 !important; }</li> 
              <li>.target-complement-4:target { color: $complement-4 !important; }</li> 
              <li>.bg-target-complement-4:target { background-color: $complement-4 !important; }</li> 
              <li>.border-target-complement-4:target { border-color: $complement-4 !important; }</li> 
              <li>.valid-complement-4:valid { color: $complement-4 !important; }</li> 
              <li>.bg-valid-complement-4:valid { background-color: $complement-4 !important; }</li> 
              <li>.border-valid-complement-4:valid { border-color: $complement-4 !important; }</li> 
              <li>.visited-complement-4:visited { color: $complement-4 !important; }</li> 
              <li>.bg-visited-complement-4:visited { background-color: $complement-4 !important; }</li> 
              <li>.border-visited-complement-4:visited { border-color: $complement-4 !important; }</li>
            </ul>
          </div>
