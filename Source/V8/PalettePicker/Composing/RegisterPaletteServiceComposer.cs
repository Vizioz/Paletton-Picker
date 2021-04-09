using Umbraco.Core;
using Umbraco.Core.Composing;
using Vizioz.PalettePicker.Service;

namespace Vizioz.PalettePicker.Composing
{
    [RuntimeLevel(MinLevel = RuntimeLevel.Run)]
    public class RegisterPaletteServiceComposer : IUserComposer
    {
        public void Compose(Composition composition)
        {
            composition.Register<IPaletteService, PaletteService>();
        }
    }
}
