using Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.ViewModels
{
    public class VistaPedidos:Pedidos
    {
        [JsonProperty(PropertyName = "Estado")]
        public  List<Estados> Estado { get; set; }

        [JsonProperty(PropertyName = "PedidoDetalles")]
        public  List<PedidoDetalles> PedidoDetalles { get; set; }

        [JsonProperty(PropertyName = "Estados1")]
        public List<Estados> Estados1 { get; set; }

    }
}
