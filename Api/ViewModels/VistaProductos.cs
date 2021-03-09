using Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.ViewModels
{
    public class VistaProductos:Productos
    {

        [JsonProperty(PropertyName = "Categorias")]
        public List<Categorias> Categorias { get; set; }


        [JsonProperty(PropertyName = "VistaProductoOpciones")]
        public List<ProductoOpciones> VistaProductoOpciones { get; set; }
    }
}
