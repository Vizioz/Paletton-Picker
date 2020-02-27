// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Palette.cs" company="Vizioz Limited">
//   Copyright Vizioz Limited
// </copyright>
// <summary>
//   Defines the Palette type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Collections.Generic;
using System.Linq;

namespace Vizioz.PalettePicker.Core.V7.Models
{
    /// <summary>
    /// The palette.
    /// </summary>
    public class Palette
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Palette"/> class.
        /// </summary>
        public Palette()
        {
            this.ColorSets = new List<PaletteColorSet>();
        }

        /// <summary>
        /// Gets or sets the url.
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Gets or sets the color sets.
        /// </summary>
        public IEnumerable<PaletteColorSet> ColorSets { get; set; }

        /// <summary>
        /// The color set.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="PaletteColorSet"/>.
        /// </returns>
        public PaletteColorSet ColorSet(string id)
        {
            return this.ColorSets.FirstOrDefault(x => x.Id == id);
        }

        /// <summary>
        /// The color.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="PaletteColor"/>.
        /// </returns>
        public PaletteColor Color(string id)
        {
            return this.ColorSets.SelectMany(x => x.Colors).FirstOrDefault(c => c.Id == id);
        }

        /// <summary>
        /// The alpha.
        /// </summary>
        /// <param name="colorId">
        /// The color id.
        /// </param>
        /// <param name="alphaValue">
        /// The alpha value.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        public string Alpha(string colorId, decimal alphaValue)
        {
            var color = this.Color(colorId);

            return color.Alpha(alphaValue);
        }
    }
}