using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
   public class Pedidos
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdPedido")]
        public int IdPedido { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "Descripcion")]
        public string Descripcion { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(150, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [JsonProperty(PropertyName = "Solicitante")]
        public string Solicitante { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(30,ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [JsonProperty(PropertyName = "Direccion")]
        public string Direccion { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(16, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [JsonProperty(PropertyName = "Telefono")]
        public string Telefono { get; set; }
        [DataType(DataType.DateTime)]
        [JsonProperty(PropertyName = "FechaHoraPedido")]
        public DateTime FechaHoraPedido { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "TotalPedido")]
        public decimal TotalPedido { get; set; }
       
        [JsonProperty(PropertyName = "ProductoOpciones")]
        public virtual ICollection<PedidoDetalles> PedidoDetalles { get; set; }

        [Display(Name = "Estado")]
        [JsonProperty(PropertyName = "IdEstado")]
        public int? IdEstado { get; set; }

        [ForeignKey("IdEstado")]
        [JsonProperty(PropertyName = "Estados")]
        public virtual Estados Estados { get; set; }
    }
}
