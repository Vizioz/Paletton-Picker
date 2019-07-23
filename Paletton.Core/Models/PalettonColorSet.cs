// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PalettonColorSet.cs" company="Vizioz Limited">
//   Copyright Vizioz Limited
// </copyright>
// <summary>
//   Defines the PalettonColorSet type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Paletton.Core.Models
{
    using System.Collections.Generic;

    /// <summary>
    /// The color set.
    /// </summary>
    public class PalettonColorSet
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="PalettonColorSet"/> class.
        /// </summary>
        public PalettonColorSet()
        {
            this.Colors = new List<PalettonColor>();
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
        public IEnumerable<PalettonColor> Colors { get; set; }
    }
}
