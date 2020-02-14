// --------------------------------------------------------------------------------------------------------------------
// <copyright file="PseudoClass.cs" company="Vizioz Limited">
//   Copyright Vizioz Limited
// </copyright>
// <summary>
//   Defines the PseudoClass type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace PalettePicker.Core.V7.Enumerations
{
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// The source type.
    /// </summary>
    internal enum PseudoClass
    {
        /// <summary>
        /// The active.
        /// </summary>
        [Display(Name = "active")]
        Active,

        /// <summary>
        /// The checked.
        /// </summary>
        [Display(Name = "checked")]
        Checked,

        /// <summary>
        /// The disabled.
        /// </summary>
        [Display(Name = "disabled")]
        Disabled,

        /// <summary>
        /// The empty.
        /// </summary>
        [Display(Name = "empty")]
        Empty,

        /// <summary>
        /// The enabled.
        /// </summary>
        [Display(Name = "enabled")]
        Enabled,

        /// <summary>
        /// The first child.
        /// </summary>
        [Display(Name = "first-child")]
        FirstChild,

        /// <summary>
        /// The first of type.
        /// </summary>
        [Display(Name = "first-of-type")]
        FirstOfType,

        /// <summary>
        /// The focus.
        /// </summary>
        [Display(Name = "focus")]
        Focus,

        /// <summary>
        /// The hover.
        /// </summary>
        [Display(Name = "hover")]
        Hover,

        /// <summary>
        /// The in range.
        /// </summary>
        [Display(Name = "in-range")]
        InRange,

        /// <summary>
        /// The invalid.
        /// </summary>
        [Display(Name = "invalid")]
        Invalid,

        /// <summary>
        /// The last child.
        /// </summary>
        [Display(Name = "last-child")]
        LastChild,

        /// <summary>
        /// The last of type.
        /// </summary>
        [Display(Name = "last-of-type")]
        LastOfType,

        /// <summary>
        /// The link.
        /// </summary>
        [Display(Name = "link")]
        Link,

        /// <summary>
        /// The only of type.
        /// </summary>
        [Display(Name = "only-of-type")]
        OnlyOfType,

        /// <summary>
        /// The only child.
        /// </summary>
        [Display(Name = "only-child")]
        OnlyChild,

        /// <summary>
        /// The optional.
        /// </summary>
        [Display(Name = "optional")]
        Optional,

        /// <summary>
        /// The out of range.
        /// </summary>
        [Display(Name = "out-of-range")]
        OutOfRange,

        /// <summary>
        /// The read only.
        /// </summary>
        [Display(Name = "read-only")]
        ReadOnly,

        /// <summary>
        /// The read write.
        /// </summary>
        [Display(Name = "read-write")]
        ReadWrite,

        /// <summary>
        /// The required.
        /// </summary>
        [Display(Name = "required")]
        Required,

        /// <summary>
        /// The root.
        /// </summary>
        [Display(Name = "root")]
        Root,

        /// <summary>
        /// The target.
        /// </summary>
        [Display(Name = "target")]
        Target,

        /// <summary>
        /// The valid.
        /// </summary>
        [Display(Name = "valid")]
        Valid,

        /// <summary>
        /// The visited.
        /// </summary>
        [Display(Name = "visited")]
        Visited
    }
}
