using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Models
{
  public  class ProductoOpcionTipoOpciones
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "IdProductoOpcionTipoOpcion")]
        public int IdProductoOpcionTipoOpcion { get; set; }

        [JsonProperty(PropertyName = "IdProductoOpciones")]
        public int IdProductoOpciones { get; set; }
        [JsonProperty(PropertyName = "IdProductoTipoOpcion")]
        public int IdProductoTipoOpcion { get; set; }


        [ForeignKey("IdProductoTipoOpcion")]
        [JsonProperty(PropertyName = "ProductoTipoOpcion")]
        public virtual ProductoTipoOpciones ProductoTipoOpcion { get; set; }
        [JsonIgnore]
        [ForeignKey("IdProductoOpciones")]
        [JsonProperty(PropertyName = "ProductoOpciones")]
        public virtual ProductoOpciones ProductoOpciones { get; set; }

    }
}
