using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
    public class Banners
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdBanner")]
        public int IdBanner { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(100, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [JsonProperty(PropertyName = "Nombre")]
        [Display(Name = "Nombre")]
        public string Nombre { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [MaxLength(200, ErrorMessage = "El tamaño maximo de el {0} is {1} caracteres")]
        [JsonProperty(PropertyName = "Descripcion")]
        [Display(Name = "Descripcion")]
        public string Descripcion { get; set; }
        [Required(ErrorMessage = "El dato {0} es necesario")]
        [Display(Name = "UrlImagen")]
        [JsonProperty(PropertyName = "UrlImagen")]
        public string UrlImagen { get; set; }
       
    }
}
