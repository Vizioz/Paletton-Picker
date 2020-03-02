// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PaletteColor.cs" company="Vizioz Limited">
//   Copyright Vizioz Limited
// </copyright>
// <summary>
//   Defines the PaletteColor type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

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
        /// Gets or sets the hex.
        /// </summary>
        public string Hex { get; set; }

        /// <summary>
        /// Gets or sets the red.
        /// </summary>
        public int Red { get; set; }

        /// <summary>
        /// Gets or sets the green.
        /// </summary>
        public int Green { get; set; }

        /// <summary>
        /// Gets or sets the blue.
        /// </summary>
        public int Blue { get; set; }

        /// <summary>
        /// The hex value.
        /// </summary>
        public string HexColor => $"#{this.Hex}";

        /// <summary>
        /// The RGB value.
        /// </summary>
        public string RgbColor => $"rgb({this.Red}, {this.Green}, {this.Blue})";

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

            return $"rgb({this.Red}, {this.Green}, {this.Blue}, {alphaValue})";
        }
    }
}
