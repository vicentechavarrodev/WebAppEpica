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

        [Display(Name = "HoraInicial")]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [DataType(DataType.DateTime)]
        [JsonProperty(PropertyName = "HoraInicial")]
        public DateTime HoraInicial { get; set; }

        [Display(Name = "HoraFinal")]
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [DataType(DataType.DateTime)]
        [JsonProperty(PropertyName = "HoraFinal")]
        public DateTime HoraFinal { get; set; }

        [Required(ErrorMessage = "El dato {0} es necesario")]
        [JsonProperty(PropertyName = "FraseDia")]
        [Display(Name = "FraseDia")]
        public string FraseDia { get; set; }


    }
}
