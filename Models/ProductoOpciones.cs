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
        [Display(Name = "CambiaPrecio")]
        [JsonProperty(PropertyName = "CambiaPrecio")]
        public bool CambiaPrecio { get; set; }
        [Display(Name = "IdProductoTipoOpcion")]
        [JsonProperty(PropertyName = "IdProductoTipoOpcion")]
        public int? IdProductoTipoOpcion { get; set; }
        [Display(Name = "Precio")]
        [DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "Precio")]
        public decimal Precio { get; set; }

        [ForeignKey("IdProductoTipoOpcion")]
        [JsonProperty(PropertyName = "ProductoTipoOpciones")]
        public virtual ProductoTipoOpciones ProductoTipoOpciones { get; set; }

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
