// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PalettonPalette.cs" company="Vizioz Limited">
//   Copyright Vizioz Limited
// </copyright>
// <summary>
//   Defines the PalettonPalette type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Paletton.Core.Models
{
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// The palette.
    /// </summary>
    public class PalettonPalette
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PalettonPalette"/> class.
        /// </summary>
        public PalettonPalette()
        {
            this.ColorSets = new List<PalettonColorSet>();
        }

        /// <summary>
        /// Gets or sets the url.
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// Gets or sets the color sets.
        /// </summary>
        public IEnumerable<PalettonColorSet> ColorSets { get; set; }

        /// <summary>
        /// The color set.
        /// </summary>
        /// <param name="id">
        /// The id.
        /// </param>
        /// <returns>
        /// The <see cref="PalettonColorSet"/>.
        /// </returns>
        public PalettonColorSet ColorSet(string id)
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
        /// The <see cref="PalettonColor"/>.
        /// </returns>
        public PalettonColor Color(string id)
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