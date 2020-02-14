// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PaletteService.cs" company="Vizioz Limited">
//   Copyright Vizioz Limited
// </copyright>
// <summary>
//   Defines the PaletteService type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace PalettePicker.Core.V7.Service
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Reflection;
    using System.Xml;
    using Newtonsoft.Json.Linq;
    using PalettePicker.Core.V7.Enumerations;
    using PalettePicker.Core.V7.Models;

    /// <summary>
    /// The palette service.
    /// </summary>
    internal class PaletteService
    {
        /// <summary>
        /// The get palette.
        /// </summary>
        /// <param name="jsonValue">
        /// The json value.
        /// </param>
        /// <returns>
        /// The <see cref="Palette"/>.
        /// </returns>
        internal Palette GetPalette(JToken jsonValue)
        {
            if (jsonValue == null)
            {
                return new Palette();
            }

            var type = jsonValue.Value<string>("type");
            var content = jsonValue.Value<string>("content");
            var palette = this.GetPaletteFromXmlContent(content);

            return palette;
        }

        /// <summary>
        /// The get palette CSS styles.
        /// </summary>
        /// <param name="jsonValue">
        /// The json value.
        /// </param>
        /// <param name="includePseudoElements">
        /// The include Pseudo Elements.
        /// </param>
        /// <param name="includePseudoClasses">
        /// The include Pseudo Classes.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        internal string GetPaletteCssStyles(JToken jsonValue, bool includePseudoElements = false, bool includePseudoClasses = false)
        {
            if (jsonValue == null)
            {
                return string.Empty;
            }

            var type = jsonValue.Value<string>("type");
            var content = jsonValue.Value<string>("content");
            var styles = this.GetStylesFromXmlContent(content, includePseudoElements, includePseudoClasses);

            return styles;
        }

        /// <summary>
        /// The get palette from xml content.
        /// </summary>
        /// <param name="content">
        /// The content.
        /// </param>
        /// <returns>
        /// The <see cref="Palette"/>.
        /// </returns>
        private Palette GetPaletteFromXmlContent(string content)
        {
            if (string.IsNullOrEmpty(content))
            {
                return new Palette();
            }

            try
            {
                var palette = new Palette();
                var colorSets = new List<PaletteColorSet>();

                var xmlDoc = new XmlDocument();
                xmlDoc.LoadXml(content);
                var url = xmlDoc.SelectSingleNode("//url")?.Value;
                var colorSetNodes = xmlDoc.SelectNodes("//colorset");

                if (colorSetNodes != null)
                {
                    foreach (XmlNode colorSetNode in colorSetNodes)
                    {
                        colorSets.Add(this.GetColorSet(colorSetNode));
                    }
                }

                palette.Url = url;
                palette.ColorSets = colorSets;

                return palette;
            }
            catch (Exception)
            {
                return new Palette();
            }
        }

        /// <summary>
        /// The get color set.
        /// </summary>
        /// <param name="colorSetNode">
        /// The color set node.
        /// </param>
        /// <returns>
        /// The <see cref="PaletteColorSet"/>.
        /// </returns>
        private PaletteColorSet GetColorSet(XmlNode colorSetNode)
        {
            var colors = new List<PaletteColor>();
            var setId = string.Empty;
            var setTitle = string.Empty;

            if (colorSetNode?.Attributes != null)
            {
                setId = colorSetNode.Attributes["id"]?.Value;
                setTitle = colorSetNode.Attributes["title"]?.Value;
            }

            var colorNodes = colorSetNode?.SelectNodes("//colorset");

            if (colorNodes != null)
            {
                foreach (XmlNode colorNode in colorNodes)
                {
                    var color = this.GetColor(colorNode);

                    if (color != null)
                    {
                        colors.Add(color);
                    }
                }
            }

            return new PaletteColorSet { Id = setId, Title = setTitle, Colors = colors };
        }

        /// <summary>
        /// The get color.
        /// </summary>
        /// <param name="colorNode">
        /// The color node.
        /// </param>
        /// <returns>
        /// The <see cref="PaletteColor"/>.
        /// </returns>
        private PaletteColor GetColor(XmlNode colorNode)
        {
            if (colorNode?.Attributes != null)
            {
                var id = colorNode.Attributes["id"]?.Value;
                var rgb = colorNode.Attributes["rgb"]?.Value;
                int.TryParse(colorNode.Attributes["r"]?.Value, out var red);
                int.TryParse(colorNode.Attributes["g"]?.Value, out var green);
                int.TryParse(colorNode.Attributes["b"]?.Value, out var blue);

                return new PaletteColor { Id = id, Hex = rgb, Red = red, Green = green, Blue = blue };
            }

            return null;
        }

        /// <summary>
        /// The get styles from xml content.
        /// </summary>
        /// <param name="content">
        /// The content.
        /// </param>
        /// <param name="includePseudoElements">
        /// The include Pseudo Elements.
        /// </param>
        /// <param name="includePseudoClasses">
        /// The include Pseudo Classes.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        private string GetStylesFromXmlContent(string content, bool includePseudoElements, bool includePseudoClasses)
        {
            if (string.IsNullOrEmpty(content))
            {
                return string.Empty;
            }

            try
            {
                var styles = string.Empty;
                var xmlDoc = new XmlDocument();
                xmlDoc.LoadXml(content);
                var colors = xmlDoc.SelectNodes("//color");

                if (colors != null)
                {
                    foreach (XmlNode color in colors)
                    {
                        var classes = this.CreateClassesForXmlColor(color, includePseudoElements, includePseudoClasses);
                        styles += classes;
                    }
                }

                return styles;
            }
            catch (Exception)
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// The create classes for xml color.
        /// </summary>
        /// <param name="color">
        /// The color.
        /// </param>
        /// <param name="includePseudoElements">
        /// The include Pseudo Elements.
        /// </param>
        /// <param name="includePseudoClasses">
        /// The include Pseudo Classes.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        private string CreateClassesForXmlColor(XmlNode color, bool includePseudoElements, bool includePseudoClasses)
        {
            if (color.Attributes == null)
            {
                return string.Empty;
            }

            var id = color.Attributes["id"]?.Value;
            var rgb = color.Attributes["rgb"]?.Value;

            if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(rgb))
            {
                return string.Empty;
            }

            var classes = this.CreateClasses(id, rgb);

            if (includePseudoElements)
            {
                foreach (var pseudoElement in Enum.GetValues(typeof(PseudoElement)))
                {
                    var element = (PseudoElement)pseudoElement;
                    var name = element.GetType()?.GetMember(element.ToString())?.First()?.GetCustomAttribute<DisplayAttribute>()?.Name;
                    var pseudoElementId = $"{name}-{id}::{name}";
                    classes += this.CreateClasses(pseudoElementId, rgb);
                }
            }

            if (includePseudoClasses)
            {
                foreach (var pseudoClass in Enum.GetValues(typeof(PseudoClass)))
                {
                    var element = (PseudoClass)pseudoClass;
                    var name = element.GetType()?.GetMember(element.ToString())?.First()?.GetCustomAttribute<DisplayAttribute>()?.Name;
                    var pseudoClassId = $"{name}-{id}:{name}";
                    classes += this.CreateClasses(pseudoClassId, rgb);
                }
            }

            return classes;
        }

        /// <summary>
        /// The create classes.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <param name="color">
        /// The color.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        private string CreateClasses(string id, string color)
        {
            return
                $".{id}{{color:#{color} !important;}}\r\n" +
                $".bg-{id}{{background-color:#{color} !important;}}\r\n" +
                $".border-{id}{{border-color:#{color} !important;}}\r\n";
        }
    }
}
