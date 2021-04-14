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


        [JsonProperty(PropertyName = "Categoria")]
        public override Categorias Categoria { get; set; }

   

        [JsonProperty(PropertyName = "Categorias")]
        public List<Categorias> Categorias { get; set; }


        [JsonProperty(PropertyName = "VistaProductoOpcionesGroup")]
        public List<IGrouping <int, VistaProductoOpciones>> VistaProductoOpcionesGroup { get; set; }




        [JsonProperty(PropertyName = "VistaProductoOpciones")]
        public List<VistaProductoOpciones> VistaProductoOpciones { get; set; }

        
    }
}
