using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
   public class Estados
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdEstado")]
        public int IdEstado { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(50, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [Display(Name = "Nombre")]
        [JsonProperty(PropertyName = "Nombre")]
        public string Nombre { get; set; }
        [JsonProperty(PropertyName = "Pedidos")]
        public virtual ICollection<Pedidos> Pedidos { get; set; }

    }
}
