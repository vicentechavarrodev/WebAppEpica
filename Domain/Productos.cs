using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain
{
  public  class Productos
    {
            [Key]
            [DatabaseGenerated(DatabaseGeneratedOption.None)]
            public int IdProducto { get; set; }
            [Required(ErrorMessage = "El dato {0} es necesario")]
            [MaxLength(100, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
            [Display(Name = "Nombre")]
            public string Nombre { get; set; }
            [Required(ErrorMessage = "El dato {0} es necesario")]
            [Display(Name = "UrlImagen")]
            [JsonProperty(PropertyName = "UrlImagen")]
            public string UrlImagen { get; set; }
            [Display(Name = "Precio")]
            [DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
            [Required(ErrorMessage = "El dato {0} es necesario")]
            public decimal Precio { get; set; }
            [Display(Name = "Categoría")]
            public int IdCategoria { get; set; }
            [JsonIgnore]
            public virtual Categorias Categoria { get; set; }




    }
}
