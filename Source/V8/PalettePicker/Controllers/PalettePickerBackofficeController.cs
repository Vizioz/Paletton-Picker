using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using Umbraco.Core;
using Umbraco.Web;
using Umbraco.Web.Composing;
using Umbraco.Web.Mvc;
using Umbraco.Web.WebApi;
using Vizioz.PalettePicker.Models;
using Vizioz.PalettePicker.Service;

namespace Vizioz.PalettePicker.Controllers
{
    [PluginController("PalettePicker")]
    public class PalettePickerController : UmbracoAuthorizedApiController
    {
        public PalettePickerController()
        {
            HttpConfiguration config = new HttpConfiguration();
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            this.FormatterConfiguration = config;
        }

        protected HttpConfiguration FormatterConfiguration { get; private set; }

        [System.Web.Http.HttpGet]
        public HttpResponseMessage GetPalettePickerPropertiesInDocumentType(string alias)
        {
            var contentType = this.Services.ContentTypeService.Get(alias);

            var properties = contentType.PropertyTypes.Where(x => x.PropertyEditorAlias == "Vizioz.PalettePicker")
                .Select(x => x.Alias);

            return this.Request.CreateResponse(HttpStatusCode.OK, properties, this.FormatterConfiguration);
        }

        [System.Web.Http.HttpGet]
        public HttpResponseMessage GetPaletteValue(Udi id, string propertyAlias)
        {
            var service = Current.Factory.GetInstance<IPaletteService>();
            var palette = service.GetPalette(id.ToString(), propertyAlias);

            return this.Request.CreateResponse(HttpStatusCode.OK, palette, this.FormatterConfiguration);
        }

        [System.Web.Http.HttpGet]
        public HttpResponseMessage GetProviderOptions()
        {
            var providers = new List<PaletteProvider>();

            var virtualPath = "/App_Plugins/Vizioz.PalettePicker/Providers";
            var dir = new System.IO.DirectoryInfo(HttpContext.Current.Server.MapPath(virtualPath));
            var providersFolders = dir.GetDirectories();

            foreach (var providerFolder in providersFolders)
            {
                var controller = providerFolder.GetFiles("*.js").FirstOrDefault();
                var view = providerFolder.GetFiles("*.html").FirstOrDefault();
                var styles = providerFolder.GetFiles("*.css");
                var styleSheets = styles.Select(x => x.Name).ToArray();
                var folderPath = $"{virtualPath}/{providerFolder.Name}";

                providers.Add(new PaletteProvider(providerFolder.Name, folderPath, view?.Name,
                    controller?.Name, styles.Select(x => x.Name).ToArray()));
            }

            return this.Request.CreateResponse(HttpStatusCode.OK, providers, this.FormatterConfiguration);
        }
    }
}
