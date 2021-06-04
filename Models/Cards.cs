using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    public class Cards
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdCard")]
        public int IdCard { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(200, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [JsonProperty(PropertyName = "Titulo")]
        [Display(Name = "Titulo")]
        public string Titulo { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(1000, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [JsonProperty(PropertyName = "Descripcion")]
        [Display(Name = "Descripcion")]
        public string Descripcion { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "Enlace")]
        [JsonProperty(PropertyName = "Enlace")]
        public string Enlace { get; set; }

    }
}

