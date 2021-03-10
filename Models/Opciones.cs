using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
  public  class Opciones
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdOpcion")]
        public int IdOpcion { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(100, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Nombre")]
        [JsonProperty(PropertyName = "Nombre")]
        public string Nombre { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(100, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "NombreAlias")]
        [JsonProperty(PropertyName = "NombreAlias")]
        public string NombreAlias { get; set; }
        [Display(Name = "Precio")]
        [DisplayFormat(DataFormatString = "{0:F0}", ApplyFormatInEditMode = true)]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "Precio")]
        public decimal Precio { get; set; }
        [Display(Name = "TipoOpcion")]
        [JsonProperty(PropertyName = "IdTipoOpcion")]
        public int IdTipoOpcion { get; set; }
     
        [ForeignKey("IdTipoOpcion")]
        [JsonProperty(PropertyName = "TipoOpcion")]
        public virtual TipoOpciones TipoOpcion { get; set; }
        [JsonIgnore]
        [JsonProperty(PropertyName = "ProductoOpciones")]
        public virtual ICollection<ProductoOpciones> ProductoOpciones { get; set; }

    }
}
