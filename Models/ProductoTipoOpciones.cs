using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
   public class ProductoTipoOpciones
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdProductoTipoOpcion")]
        public int IdProductoTipoOpcion { get; set; }

        [Display(Name = "Producto")]
        [JsonProperty(PropertyName = "IdProducto")]
        public int IdProducto { get; set; }
        [Display(Name = "IdTipoOpcion")]
        [JsonProperty(PropertyName = "IdTipoOpcion")]
        public int IdTipoOpcion { get; set; }
        [Display(Name = "IdTipoSeleccion")]
        [JsonProperty(PropertyName = "IdTipoSeleccion")]
        public int IdTipoSeleccion { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "Encabezado")]
        [Display(Name = "Encabezado")]
        public string Encabezado { get; set; }
        [Display(Name = "EsPrincipal")]
        [JsonProperty(PropertyName = "EsPrincipal")]
        public bool EsPrincipal { get; set; }
        [Display(Name = "MostrarInicio")]
        [JsonProperty(PropertyName = "MostrarInicio")]
        public bool MostrarInicio { get; set; }
      
        [Display(Name = "Orden")]
        [JsonProperty(PropertyName = "Orden")]
        public int Orden { get; set; }
        [JsonIgnore]
        [ForeignKey("IdTipoSeleccion")]
        [JsonProperty(PropertyName = "TipoSeleccion")]
        public virtual TipoSelecciones TipoSeleccion { get; set; }

        [ForeignKey("IdTipoOpcion")]
        [JsonProperty(PropertyName = "TipoOpcion")]
        public virtual TipoOpciones TipoOpcion { get; set; }
        [JsonIgnore]
        [ForeignKey("IdProducto")]
        [JsonProperty(PropertyName = "Producto")]
        public virtual Productos Producto { get; set; }

        [JsonProperty(PropertyName = "ProductoOpcionTipoOpciones")]
        [JsonIgnore]
        public virtual ICollection<ProductoOpcionTipoOpciones> ProductoOpcionTipoOpciones { get; set; }
    }
}
