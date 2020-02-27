// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PseudoElement.cs" company="Vizioz Limited">
//   Copyright Vizioz Limited
// </copyright>
// <summary>
//   Defines the PseudoElement type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.ComponentModel.DataAnnotations;

namespace Vizioz.PalettePicker.Core.V7.Enumerations
{
    /// <summary>
    /// The source type.
    /// </summary>
    internal enum PseudoElement
    {
        /// <summary>
        /// The after.
        /// </summary>
        [Display(Name = "after")]
        After,

        /// <summary>
        /// The before.
        /// </summary>
        [Display(Name = "before")]
        Before,

        /// <summary>
        /// The first letter.
        /// </summary>
        [Display(Name = "first-letter")]
        FirstLetter,

        /// <summary>
        /// The first line.
        /// </summary>
        [Display(Name = "first-line")]
        FirstLine,

        /// <summary>
        /// The selection.
        /// </summary>
        [Display(Name = "selection")]
        Selection
    }
}
