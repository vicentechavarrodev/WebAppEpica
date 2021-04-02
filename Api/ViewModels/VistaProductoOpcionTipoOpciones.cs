using Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Api.ViewModels
{
    public class VistaProductoOpcionTipoOpciones: ProductoOpcionTipoOpciones
    {

        [JsonProperty(PropertyName = "ProductoTipoOpciones")]
        public ProductoTipoOpciones VistaProductoTipoOpciones { get; set; }
    }
}