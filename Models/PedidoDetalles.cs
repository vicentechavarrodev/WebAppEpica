using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
   public class PedidoDetalles
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdPedidoDetalle")]
        public int IdPedidoDetalle { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "Descripcion")]
        public string Descripcion { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "Cantidad")]
        public int Cantidad { get; set; }
        [Display(Name = "Subtotal")]
        [DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "Subtotal")]
        public decimal Subtotal { get; set; }
        [Display(Name = "IdPedido")]
        [JsonProperty(PropertyName = "IdPedido")]
        public int IdPedido { get; set; }
        [JsonIgnore]
        [ForeignKey("IdPedido")]
        public virtual Pedidos Pedido { get; set; }
    }
}
