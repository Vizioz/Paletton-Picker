namespace Vizioz.PalettePicker.Models
{
    internal class PaletteProvider
    {
        public PaletteProvider(string name, string path, string view, string controller)
        {
            this.Name = name;
            this.Path = path;
            this.View = view;
            this.Controller = controller;
        }

        public string Path { get; set; }

        public string Name { get; set; }

        public string View { get; set; }

        public string Controller { get; set; }
    }
}
