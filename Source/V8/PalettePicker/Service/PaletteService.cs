﻿// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PaletteService.cs" company="Vizioz Limited">
//   Copyright Vizioz Limited
// </copyright>
// <summary>
//   Defines the PaletteService type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Xml;
using Newtonsoft.Json.Linq;
using Umbraco.Core;
using Umbraco.Web;
using Vizioz.PalettePicker.Enumerations;
using Vizioz.PalettePicker.Models;

namespace Vizioz.PalettePicker.Service
{
    /// <summary>
    /// The palette service.
    /// </summary>
    internal class PaletteService : IPaletteService
    {
        /// <summary>
        /// The umbraco context factory.
        /// </summary>
        private readonly IUmbracoContextFactory _umbracoContextFactory;

        /// <summary>
        /// Initializes a new instance of the <see cref="PaletteService"/> class.
        /// </summary>
        /// <param name="umbracoContextFactory">
        /// The umbraco context factory.
        /// </param>
        public PaletteService(IUmbracoContextFactory umbracoContextFactory)
        {
            _umbracoContextFactory = umbracoContextFactory;
        }

        /// <summary>
        /// The get palette.
        /// </summary>
        /// <param name="jsonValue">
        /// The json value.
        /// </param>
        /// <returns>
        /// The <see cref="Palette"/>.
        /// </returns>
        public Palette GetPalette(JToken jsonValue)
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
        public string GetPaletteCssStyles(JToken jsonValue, bool includePseudoElements = false, bool includePseudoClasses = false)
        {
            if (jsonValue == null)
            {
                return string.Empty;
            }

            var type = jsonValue.Value<string>("type");
            var prefix = jsonValue.Value<string>("prefix");
            var parentClass = jsonValue.Value<string>("parentClass");
            var content = jsonValue.Value<string>("content");
            var styles = this.GetStylesFromXmlContent(content, prefix, parentClass, includePseudoElements, includePseudoClasses);

            return styles;
        }

        /// <summary>
        /// The get node palette.
        /// </summary>
        /// <param name="nodeUdi">
        /// The node udi.
        /// </param>
        /// <param name="propertyAlias">
        /// The property alias.
        /// </param>
        /// <returns>
        /// The <see cref="Palette"/>.
        /// </returns>
        public Palette GetNodePalette(string nodeUdi, string propertyAlias)
        {
            using (var cref = _umbracoContextFactory.EnsureUmbracoContext())
            {
                var cache = cref.UmbracoContext.ContentCache;
                var node = cache.GetById(Udi.Parse(nodeUdi));
                var nodePaletteJson = node?.Value<Newtonsoft.Json.Linq.JToken>(propertyAlias);

                return this.GetPalette(nodePaletteJson);
            }
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
                var url = xmlDoc.SelectSingleNode("//url")?.InnerText;
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

            var colorNodes = colorSetNode?.SelectNodes("//color");

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
        /// <param name="prefix">
        /// The prefix.
        /// </param>
        /// <param name="parentClass">
        /// The parent class.
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
        private string GetStylesFromXmlContent(string content, string prefix, string parentClass, bool includePseudoElements, bool includePseudoClasses)
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
                        var classes = this.CreateClassesForXmlColor(color, prefix, parentClass, includePseudoElements, includePseudoClasses);
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
        /// <param name="prefix">
        /// The prefix.
        /// </param>
        /// <param name="parentClass">
        /// The parent class.
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
        private string CreateClassesForXmlColor(XmlNode color, string prefix, string parentClass, bool includePseudoElements, bool includePseudoClasses)
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

            var classes = this.CreateClasses(id, rgb, prefix, parentClass);

            if (includePseudoElements)
            {
                foreach (var pseudoElement in Enum.GetValues(typeof(PseudoElement)))
                {
                    var element = (PseudoElement)pseudoElement;
                    var name = element.GetType()?.GetMember(element.ToString())?.First()?.GetCustomAttribute<DisplayAttribute>()?.Name;
                    var pseudoElementId = $"{name}-{id}::{name}";
                    classes += this.CreateClasses(pseudoElementId, rgb, prefix, parentClass);
                }
            }

            if (includePseudoClasses)
            {
                foreach (var pseudoClass in Enum.GetValues(typeof(PseudoClass)))
                {
                    var element = (PseudoClass)pseudoClass;
                    var name = element.GetType()?.GetMember(element.ToString())?.First()?.GetCustomAttribute<DisplayAttribute>()?.Name;
                    var pseudoClassId = $"{name}-{id}:{name}";
                    classes += this.CreateClasses(pseudoClassId, rgb, prefix, parentClass);
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
        /// <param name="prefix">
        /// The prefix.
        /// </param>
        /// <param name="parentClass">
        /// The parent class.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        private string CreateClasses(string id, string color, string prefix, string parentClass)
        {
            var parent = !string.IsNullOrEmpty(parentClass) ? $".{parentClass} " : string.Empty;
            var pre = !string.IsNullOrEmpty(prefix) ? $".{prefix}-" : ".";

            return
                $"{parent}{pre}{id}{{color:#{color} !important;}}\r\n" +
                $"{parent}{pre}bg-{id}{{background-color:#{color} !important;}}\r\n" +
                $"{parent}{pre}border-{id}{{border-color:#{color} !important;}}\r\n";
        }
    }
}
