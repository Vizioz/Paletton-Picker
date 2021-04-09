using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Umbraco.Core;
using Umbraco.Web;
using Vizioz.PalettePicker.Models;

namespace Vizioz.PalettePicker.Service
{
    internal interface IPaletteService
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
        Palette GetPalette(JToken jsonValue);

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
        string GetPaletteCssStyles(JToken jsonValue, bool includePseudoElements = false,
            bool includePseudoClasses = false);

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
        Palette GetNodePalette(string nodeUdi, string propertyAlias);
    }
}
