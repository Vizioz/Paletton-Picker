using System.Collections.Generic;

namespace Vizioz.PalettePicker.Models
{
    internal class PaletteProvider
    {
        public PaletteProvider(string name, string path, string view, string controller, string[] styleSheets)
        {
            this.Name = name;
            this.Path = path;
            this.View = view;
            this.Controller = controller;
            this.StyleSheets = styleSheets;
        }

        public string Path { get; set; }

        public string Name { get; set; }

        public string View { get; set; }

        public string Controller { get; set; }

        public string[] StyleSheets { get; set; }
    }
}
