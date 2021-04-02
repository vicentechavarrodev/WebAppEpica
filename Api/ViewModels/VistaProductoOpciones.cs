using Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Api.ViewModels
{
    public class VistaProductoOpciones: ProductoOpciones
    {

        [JsonProperty(PropertyName = "ProductoOpcionTipoOpciones")]
        public List<VistaProductoOpcionTipoOpciones> ProductoOpcionTipoOpciones { get; set; }
    }
}