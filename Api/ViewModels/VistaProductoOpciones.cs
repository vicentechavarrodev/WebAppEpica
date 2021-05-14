using Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Api.ViewModels
{
    public class VistaProductoOpciones: ProductoOpciones
    {

        [JsonProperty(PropertyName = "ProductoOpcionTipoOpciones")]
        public List<VistaProductoOpcionTipoOpciones> ProductoOpcionTipoOpciones { get; set; }


        [JsonProperty(PropertyName = "ProductoTipoOpcion")]
        public ProductoTipoOpciones ProductoTipoOpcion { get; set; }


        [JsonProperty(PropertyName = "ProductoTipoOpcionCambio")]
        public ProductoTipoOpciones ProductoTipoOpcionCambio { get; set; }
    }
}