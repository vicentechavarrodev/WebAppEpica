using Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.ViewModels
{
    public class VistaOpciones:Opciones
    {
        [JsonProperty(PropertyName = "TipoOpciones")]
        public List<TipoOpciones> TipoOpciones { get; set; }
    }
}
