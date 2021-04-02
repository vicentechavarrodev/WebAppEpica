using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Models;

namespace Api.ViewModels
{
    public class VistaOpcionSecundaria
    {

        [JsonProperty(PropertyName = "IdProductoOpciones")]
        public int IdProductoOpciones { get; set; }

        [JsonProperty(PropertyName = "IdProductoTipoOpcion")]
        public int IdProductoTipoOpcion { get; set; }

        [JsonProperty(PropertyName = "MuestraSecundario")]
        public bool MuestraSecundario { get; set; }

        [JsonProperty(PropertyName = "ProductoTipoOpciones")]
        public List<ProductoTipoOpciones> ProductoTipoOpciones { get; set; }


    }
}
