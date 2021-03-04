using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppEcommerce.ViewModels
{
    public class VistaLogin
    {
        [JsonProperty(PropertyName = "Codigo")]
        public string Codigo { get; set; }
        [JsonProperty(PropertyName = "Contrasena")]
        public string Contrasena { get; set; }

        
    }
}
