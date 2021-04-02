using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
  public  class Productos
    {
            [Key]
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            [JsonProperty(PropertyName = "IdProducto")]
            public int IdProducto { get; set; }
            [Required(ErrorMessage = "El dato {0} es necesario")]
            [MaxLength(100, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
            [JsonProperty(PropertyName = "Nombre")]
            [Display(Name = "Nombre")]
            public string Nombre { get; set; }
            [Display(Name = "Activo")]
            [JsonProperty(PropertyName = "Activo")]
            public bool Activo { get; set; }
            [Required(ErrorMessage = "El dato {0} es necesario")]
            [JsonProperty(PropertyName = "Descripcion")]
            [Display(Name = "Descripcion")]
            public string Descripcion { get; set; }
            [Required(ErrorMessage = "El dato {0} es necesario")]
            [Display(Name = "UrlImagen")]
            [JsonProperty(PropertyName = "UrlImagen")]
            public string UrlImagen { get; set; }
            [Display(Name = "Precio")]
            [DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
            [Required(ErrorMessage = "El dato {0} es necesario")]
            [JsonProperty(PropertyName = "Precio")]
            public decimal Precio { get; set; }
            [Display(Name = "Categoría")]
            [JsonProperty(PropertyName = "IdCategoria")]
            public int IdCategoria { get; set; }
            [ForeignKey("IdCategoria")]
            [JsonProperty(PropertyName = "Categorias")]
            public virtual Categorias Categoria { get; set; }
            [JsonProperty(PropertyName = "ProductoOpciones")]
            public virtual ICollection<ProductoOpciones> ProductoOpciones { get; set; }
            [JsonProperty(PropertyName = "ProductoTipoOpciones")]
            [JsonIgnore]
            public virtual ICollection<ProductoTipoOpciones> ProductoTipoOpciones { get; set; }




    }
}
