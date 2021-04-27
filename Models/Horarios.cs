using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    public class Horarios
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdHorario")]
        public int IdHorario { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(20, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [JsonProperty(PropertyName = "Dia")]
        [Display(Name = "Dia")]
        public string Dia { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(100, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [JsonProperty(PropertyName = "HoraInicial")]
        [Display(Name = "HoraInicial")]
        public DateTime HoraInicial { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(100, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [JsonProperty(PropertyName = "HoraFinal")]
        [Display(Name = "HoraFinal")]
        public DateTime HoraFinal { get; set; }
    }
}
