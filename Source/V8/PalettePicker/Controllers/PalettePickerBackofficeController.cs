using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Umbraco.Core;
using Umbraco.Web;
using Umbraco.Web.Mvc;
using Umbraco.Web.WebApi;

namespace Vizioz.PalettePicker.Controllers
{
    [PluginController("PalettePicker")]
    public class PalettePickerController : UmbracoAuthorizedApiController
    {
        [HttpGet]
        public IEnumerable<string> GetPalettePickerPropertiesInDocumentType(string alias)
        {
            var contentType = this.Services.ContentTypeService.Get(alias);

            var properties = contentType.PropertyTypes.Where(x => x.PropertyEditorAlias == "Vizioz.PalettePicker")
                .Select(x => x.Alias);

            return properties;
        }

        [HttpGet]
        public string GetPaletteValue(Udi id, string query, string propertyAlias)
        {
            var content = !string.IsNullOrEmpty(query) ? this.Umbraco.ContentSingleAtXPath(query) : this.Umbraco.Content(id);
            var paletteValue = content?.Value<string>(propertyAlias);

            return paletteValue;
        }
    }
}
