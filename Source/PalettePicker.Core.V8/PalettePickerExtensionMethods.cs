// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PalettePickerExtensionMethods.cs" company="Vizioz Limited">
//   Copyright Vizioz Limited
// </copyright>
// <summary>
//   Defines the PalettePickerExtensionMethods type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Web;
using Newtonsoft.Json.Linq;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Web;
using Vizioz.PalettePicker.Core.V8.Models;
using Vizioz.PalettePicker.Core.V8.Service;

namespace Vizioz.PalettePicker.Core.V8
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
            var service = new PaletteService();
            var jsonValue = content.Value<Newtonsoft.Json.Linq.JToken>(propertyAlias);
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
            var service = new PaletteService();
            var styles = service.GetPaletteCssStyles(value, includePseudoElements, includePseudoClasses);

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
            var service = new PaletteService();
            var jsonValue = content.Value<Newtonsoft.Json.Linq.JToken>(propertyAlias);

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
            var service = new PaletteService();

            return service.GetPalette(value);
        }
    }
}
