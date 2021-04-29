// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PalettePickerExtensionMethods.cs" company="Vizioz Limited">
//   Copyright Vizioz Limited
// </copyright>
// <summary>
//   Defines the PalettePickerExtensionMethods type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json.Linq;
using Umbraco.Core;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Web;
using Vizioz.PalettePicker.Models;
using Vizioz.PalettePicker.Service;

namespace Vizioz.PalettePicker
{
    /// <summary>
    /// The palette picker extension methods.
    /// </summary>
    public static class PalettePickerExtensionMethods
    {
        /// <summary>
        /// The get css styles.
        /// </summary>
        /// <param name="content">
        /// The content.
        /// </param>
        /// <param name="propertyAlias">
        /// The property alias.
        /// </param>
        /// <param name="addStyleTag">
        /// The style add tag.
        /// </param>
        /// <param name="includePseudoElements">
        /// The include Pseudo Elements.
        /// </param>
        /// <param name="includePseudoClasses">
        /// The include Pseudo Classes.
        /// </param>
        /// <returns>
        /// The <see cref="IHtmlString"/>.
        /// </returns>
        public static IHtmlString GetCssStyles(
            this IPublishedContent content,
            string propertyAlias,
            bool addStyleTag = true,
            bool includePseudoElements = false,
            bool includePseudoClasses = false)
        {
            var service = Umbraco.Web.Composing.Current.Factory.GetInstance<IPaletteService>();
            var jsonValue = content.Value<JToken>(propertyAlias);
            var styles = service.GetPaletteCssStyles(jsonValue, includePseudoElements, includePseudoClasses);

            if (addStyleTag)
            {
                styles = $"<style type=\"text/css\">\r\n{styles}</style>";
            }

            return new HtmlString(styles);
        }

        /// <summary>
        /// The get css styles.
        /// </summary>
        /// <param name="value">
        /// The value.
        /// </param>
        /// <param name="addStyleTag">
        /// The style add tag.
        /// </param>
        /// <param name="includePseudoElements">
        /// The include Pseudo Elements.
        /// </param>
        /// <param name="includePseudoClasses">
        /// The include Pseudo Classes.
        /// </param>
        /// <returns>
        /// The <see cref="IHtmlString"/>.
        /// </returns>
        public static IHtmlString GetCssStyles(
            this JToken value,
            bool addStyleTag = true,
            bool includePseudoElements = false,
            bool includePseudoClasses = false)
        {
            var service = Umbraco.Web.Composing.Current.Factory.GetInstance<IPaletteService>();
            var styles = service.GetPaletteCssStyles(value, includePseudoElements, includePseudoClasses);

            if (addStyleTag)
            {
                styles = $"<style type=\"text/css\">\r\n{styles}</style>";
            }

            return new HtmlString(styles);
        }

        /// <summary>
        /// The get css styles.
        /// </summary>
        /// <param name="html">
        /// The HTML helper.
        /// </param>
        /// <param name="content">
        /// The content.
        /// </param>
        /// <param name="propertyAlias">
        /// The property alias.
        /// </param>
        /// <param name="addStyleTag">
        /// The style add tag.
        /// </param>
        /// <param name="includePseudoElements">
        /// The include Pseudo Elements.
        /// </param>
        /// <param name="includePseudoClasses">
        /// The include Pseudo Classes.
        /// </param>
        /// <returns>
        /// The <see cref="IHtmlString"/>.
        /// </returns>
        public static IHtmlString GetCssStyles(
            this HtmlHelper html, 
            IPublishedContent content, 
            string propertyAlias, 
            bool addStyleTag = true,
            bool includePseudoElements = false,
            bool includePseudoClasses = false)
        {
            if (propertyAlias == null)
            {
                throw new ArgumentNullException(nameof(propertyAlias));
            }

            if (string.IsNullOrWhiteSpace(propertyAlias))
            {
                throw new ArgumentException("Value can't be empty or consist only of white-space characters.", nameof(propertyAlias));
            }

            var service = Umbraco.Web.Composing.Current.Factory.GetInstance<IPaletteService>();
            var jsonValue = content.Value<Newtonsoft.Json.Linq.JToken>(propertyAlias);
            var styles = service.GetPaletteCssStyles(jsonValue, includePseudoElements, includePseudoClasses);

            if (addStyleTag)
            {
                styles = $"<style type=\"text/css\">\r\n{styles}</style>";
            }

            return new HtmlString(styles);
        }

        /// <summary>
        /// The get palette.
        /// </summary>
        /// <param name="content">
        /// The content.
        /// </param>
        /// <param name="propertyAlias">
        /// The property alias.
        /// </param>
        /// <returns>
        /// The <see cref="Palette"/>.
        /// </returns>
        public static Palette GetPalette(this IPublishedContent content, string propertyAlias)
        {
            var service = Umbraco.Web.Composing.Current.Factory.GetInstance<IPaletteService>();
            var jsonValue = content.Value<JToken>(propertyAlias);

            return service.GetPalette(jsonValue);
        }

        /// <summary>
        /// The get palette.
        /// </summary>
        /// <param name="value">
        /// The value.
        /// </param>
        /// <returns>
        /// The <see cref="Palette"/>.
        /// </returns>
        public static Palette GetPalette(this JToken value)
        {
            var service = Umbraco.Web.Composing.Current.Factory.GetInstance<IPaletteService>();

            return service.GetPalette(value);
        }

        public static string GetPaletteColorSelector(this IPublishedContent content, string propertyAlias)
        {
            var service = Umbraco.Web.Composing.Current.Factory.GetInstance<IPaletteService>();
            var jsonValue = content.Value<JToken>(propertyAlias);

            var nodeId = jsonValue.Value<string>("nodeId");
            var paletteAlias = jsonValue.Value<string>("propertyAlias");
            var colorId = jsonValue.Value<string>("colorId");

            var palette = service.GetPalette(nodeId, paletteAlias);
            var color = palette.Color(colorId);

            return color?.Rgb;
        }

        public static string GetPaletteColorSelector(this JToken value)
        {
            var service = Umbraco.Web.Composing.Current.Factory.GetInstance<IPaletteService>();

            var nodeId = value.Value<string>("nodeId");
            var paletteAlias = value.Value<string>("propertyAlias");
            var colorId = value.Value<string>("colorId");

            var palette = service.GetPalette(nodeId, paletteAlias);
            var color = palette?.Color(colorId);

            return color?.Rgb;
        }
    }
}
