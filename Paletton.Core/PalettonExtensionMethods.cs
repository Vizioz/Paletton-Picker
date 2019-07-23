// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PalettonExtensionMethods.cs" company="Vizioz Limited">
//   Copyright Vizioz Limited
// </copyright>
// <summary>
//   Defines the PalettonExtensionMethods type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Paletton.Core
{
    using System.Web;

    using Paletton.Core.Models;
    using Paletton.Core.Service;

    using Umbraco.Core.Models.PublishedContent;
    using Umbraco.Web;

    /// <summary>
    /// The paletton extension methods.
    /// </summary>
    public static class PalettonExtensionMethods
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
            var service = new PalettonService();
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
        /// The <see cref="PalettonPalette"/>.
        /// </returns>
        public static PalettonPalette GetPalette(IPublishedContent content, string propertyAlias)
        {
            var service = new PalettonService();
            var jsonValue = content.Value<Newtonsoft.Json.Linq.JToken>(propertyAlias);

            return service.GetPalette(jsonValue);
        }
    }
}
