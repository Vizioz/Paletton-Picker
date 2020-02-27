// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PaletteColorSet.cs" company="Vizioz Limited">
//   Copyright Vizioz Limited
// </copyright>
// <summary>
//   Defines the PaletteColorSet type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Collections.Generic;

namespace Vizioz.PalettePicker.Core.V8.Models
{
    /// <summary>
    /// The color set.
    /// </summary>
    public class PaletteColorSet
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PaletteColorSet"/> class.
        /// </summary>
        public PaletteColorSet()
        {
            this.Colors = new List<PaletteColor>();
        }

        /// <summary>
        /// Gets or sets the id.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Gets or sets the title.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// Gets or sets the colors.
        /// </summary>
        public IEnumerable<PaletteColor> Colors { get; set; }
    }
}
