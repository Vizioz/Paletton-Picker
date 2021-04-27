// --------------------------------------------------------------------------------------------------------------------
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

            var url = jsonValue.Value<string>("url");
            var paletteValue = jsonValue.Value<JArray>("palette");
            var paletteColorSets = paletteValue.ToObject<IEnumerable<PaletteColorSet>>();

            var palette = new Palette
            {
                ColorSets = paletteColorSets,
                Url = url
            };

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

            var prefix = jsonValue.Value<string>("prefix");
            var parentClass = jsonValue.Value<string>("parentClass");
            var paletteValue = jsonValue.Value<JArray>("palette");
            var paletteColorSets = paletteValue.ToObject<IEnumerable<PaletteColorSet>>();

            var styles = this.GetStylesFromArray(paletteColorSets, prefix, parentClass, includePseudoElements, includePseudoClasses);

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
        /// The get styles from array.
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
        private string GetStylesFromArray(IEnumerable<PaletteColorSet> colorsets, string prefix, string parentClass, bool includePseudoElements, bool includePseudoClasses)
        {
            if (colorsets == null || !colorsets.Any())
            {
                return string.Empty;
            }

            try
            {
                var styles = string.Empty;

                foreach (var colorset in colorsets)
                {
                    foreach (var color in colorset.Colors)
                    {
                        var classes = this.CreateClassesForColor(color, prefix, parentClass, includePseudoElements, includePseudoClasses);
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
        /// The create classes for color.
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
        private string CreateClassesForColor(PaletteColor color, string prefix, string parentClass, bool includePseudoElements, bool includePseudoClasses)
        {
            if (color == null)
            {
                return string.Empty;
            }

            var id = color.Id;
            var rgb = color.Rgb;

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
