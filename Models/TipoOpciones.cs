using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
   public class TipoOpciones
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdTipoOpcion")]
        public int IdTipoOpcion { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(100, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Nombre")]
        [JsonProperty(PropertyName = "Nombre")]
        public string Nombre { get; set; }
        [Display(Name = "TienePrecio")]
        [JsonProperty(PropertyName = "TienePrecio")]
        public bool TienePrecio { get; set; }
        [JsonProperty(PropertyName = "Opciones")]
        [JsonIgnore]
        public virtual ICollection<Opciones> Opciones { get; set; }

    }
}
