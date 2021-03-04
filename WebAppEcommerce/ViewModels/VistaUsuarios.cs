using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppEcommerce.ViewModels
{
    public class VistaUsuarios : Usuarios
    {

        public List<VistaRole> Roles { get; set; }

        public string NombreRole { get; set; }


        public string EsActivo { get; set; }


        public List<string> NombreEmpresa { get; set; }


        public string NombreSede { get; set; }

        public string NombreCompletoUsuario
        {
            get
            {
                return this.Nombres + ' ' + this.Apellidos;
            }
            set
            {

                this.Nombres = value; ;
            }

        }



        public string RepetirContrasena
        {
            get
            {
                if (this.Contrasena != null)
                {
                    return this.Contrasena;
                }

                return "";
            }

            set
            {

                this.RepetirContrasena = value; ;
            }
        }






    }
}
