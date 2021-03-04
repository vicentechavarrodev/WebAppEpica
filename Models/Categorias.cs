using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
   public class Categorias
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdCategoria")]
        public int IdCategoria { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(100, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Nombre")]
        [JsonProperty(PropertyName = "Nombre")]
        public string Nombre { get; set; }
        [JsonProperty(PropertyName = "Productos")]
        public virtual ICollection<Productos> Productos { get; set; }

    }
}
