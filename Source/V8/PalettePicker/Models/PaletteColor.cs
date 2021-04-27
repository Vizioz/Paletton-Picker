// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PaletteColor.cs" company="Vizioz Limited">
//   Copyright Vizioz Limited
// </copyright>
// <summary>
//   Defines the PaletteColor type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Linq;

namespace Vizioz.PalettePicker.Models
{
    /// <summary>
    /// The color.
    /// </summary>
    public class PaletteColor
    {
        /// <summary>
        /// Gets or sets the id.
        /// </summary>
        public string Id { get; set; }

        /// <summary>
        /// Gets or sets the RGB.
        /// </summary>
        public string Rgb { get; set; }

        /// <summary>
        /// Gets or sets the red.
        /// </summary>
        public int Red => this.DecomposedColors().ElementAt(0);

        /// <summary>
        /// Gets or sets the green.
        /// </summary>
        public int Green => this.DecomposedColors().ElementAt(1);

        /// <summary>
        /// Gets or sets the blue.
        /// </summary>
        public int Blue => this.DecomposedColors().ElementAt(2);

        /// <summary>
        /// The RGB absolute value.
        /// </summary>
        public string RgbAbsolute
        {
            get
            {
                var intColors = this.DecomposedColors();

                return $"rgb({intColors.ElementAt(0)}, {intColors.ElementAt(1)}, {intColors.ElementAt(2)})";
            }
        }

        /// <summary>
        /// The alpha.
        /// </summary>
        /// <param name="alphaValue">
        /// The alpha value.
        /// </param>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        public string Alpha(decimal alphaValue)
        {
            if (alphaValue < 0)
            {
                alphaValue = 0;
            }

            if (alphaValue > 1)
            {
                alphaValue = 1;
            }

            var intColors = this.DecomposedColors();

            return $"rgb({intColors.ElementAt(0)}, {intColors.ElementAt(1)}, {intColors.ElementAt(2)}, {alphaValue})";
        }

        private List<int> DecomposedColors()
        {
            if (string.IsNullOrEmpty(this.Rgb))
            {
                return new List<int>{ 0, 0, 0 };
            }

            var rgb = this.Rgb.StartsWith("#") ? this.Rgb.Substring(1) : this.Rgb;

            if (rgb.Length == 3)
            {
                return new List<int>
                {
                    Convert.ToInt32(rgb.Substring(0,1), 16),
                    Convert.ToInt32(rgb.Substring(1,1), 16),
                    Convert.ToInt32(rgb.Substring(2,1), 16)
                };
            } 
            else if (rgb.Length == 6)
            {
                return new List<int>
                {
                    Convert.ToInt32(rgb.Substring(0,2), 16),
                    Convert.ToInt32(rgb.Substring(2,2), 16),
                    Convert.ToInt32(rgb.Substring(4,2), 16)
                };
            }
            else
            {
                return new List<int> { 0, 0, 0 };
            }
        }
    }
}
