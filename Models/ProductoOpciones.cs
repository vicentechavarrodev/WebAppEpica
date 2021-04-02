using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
   public class ProductoOpciones
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdProductoOpciones")]
        public int IdProductoOpciones { get; set; }

        [Display(Name = "Producto")]
        [JsonProperty(PropertyName = "IdProducto")]
        public int IdProducto { get; set; }
        [Display(Name = "TipoOpcion")]
        [JsonProperty(PropertyName = "IdOpcion")]
        public int IdOpcion { get; set; }
        [Display(Name = "MuestraSecundario")]
        [JsonProperty(PropertyName = "MuestraSecundario")]
        public bool MuestraSecundario { get; set; }

        [ForeignKey("IdOpcion")]
        [JsonProperty(PropertyName = "Opcion")]
        public virtual Opciones Opcion { get; set; }
        [JsonIgnore]
        [ForeignKey("IdProducto")]
        [JsonProperty(PropertyName = "Producto")]
        public virtual Productos Producto { get; set; }

     
        [JsonProperty(PropertyName = "ProductoOpcionTipoOpciones")]
        public virtual ICollection<ProductoOpcionTipoOpciones> ProductoOpcionTipoOpciones { get; set; }

    }
}
