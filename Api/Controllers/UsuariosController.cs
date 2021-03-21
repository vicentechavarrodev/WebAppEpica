using Api.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppEcommerce.ViewModels;

namespace Api.Controllers
{

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController
    {
        private readonly DataContext db;

        public UsuariosController(DataContext dataContext)
        {
            db = dataContext;
        }


        [HttpGet]
        [Route("Index")]
        public async Task<Response> Index()
        {
            try
            {
                var usuarios = await (from u in db.Usuarios
                                      select new VistaUsuarios()
                                      {
                                          Identificacion = u.Identificacion,
                                          IdUsuario = u.IdUsuario,
                                          Nombres = u.Nombres,
                                          Apellidos = u.Apellidos,
                                          EsActivo = u.Activo ? "SI" : "NO",
                                          Contrasena = u.Contrasena,
                                          Codigo = u.Codigo,
                                          Celular = u.Celular,
                                          Correo = u.Correo,
                                         
                                          IdRole = u.IdRole,
                                      

                                      }).OrderBy(u => u.Nombres).ToListAsync();

                return new Response { IsSuccess = true, Message = "", Result = usuarios };

            }
            catch (Exception ex)
            {
                return new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null };
            }

        }

        [HttpPost]
        [Route("Login")]
        public async Task<Response> Login([FromBody] VistaLogin vista)
        {


            try
            {
                Usuarios user = null;
             

                user = await db.Set<Usuarios>().Where(u => u.Codigo.ToLower() == vista.Codigo.ToLower() ).FirstOrDefaultAsync();
                


                if (user == null)
                {
                    return new Response { IsSuccess = false, Message = "Este usuario no existe.", Result = null };

                }

                user = ToVistaUsuario(user);

                if (!(vista.Contrasena == user.Contrasena))
                {
                    return new Response { IsSuccess = false, Message = "Contraseña incorrecta", Result = null };

                }

                if (!user.Activo)
                {
                    return new Response { IsSuccess = false, Message = "Usuario inactivo", Result = null };
                }
                user.Contrasena = "";

                return new Response { IsSuccess = true, Message = string.Empty, Result = user };
            }
            catch (Exception ex)
            {
                return new Response { IsSuccess = false, Message = ex.Message, Result = null };

            }

        }


        [HttpGet]
        [Route("Crear")]
        public async Task<Response> Crear()
        {
            try
            {
                var roles = await (from r in db.Roles
                                   select new VistaRole() { IdRole = r.IdRole, Nombre = r.Nombre, Codigo = r.Codigo }
                              ).OrderBy(u => u.Nombre).ToListAsync();
                return new Response { IsSuccess = true, Message = string.Empty, Result = new VistaUsuarios { Roles = roles } };
            }
            catch (Exception ex)
            {
                return new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = new VistaUsuarios { Roles = null } };
            }

        }

        [HttpPost]
        [Route("Crear")]
        public async Task<Response> Crear([FromBody] Usuarios usuario)
        {
            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    usuario.Activo = true;
                    usuario.FechaRegistro = DateTime.Now;
                    usuario.Contrasena = EncryptHash.Hash(usuario.Contrasena);
                    db.Usuarios.Add(usuario);
                    await db.SaveChangesAsync();
                    transacction.Commit();
                    return new Response { IsSuccess = true, Message = "Usuario creado correctamente", Result = usuario };

                }
                catch (Exception ex)
                {
                    transacction.Rollback();
                    return new Response { IsSuccess = false, Message = ex.Message, Result = null };
                }

            }

        }

        [HttpGet]
        [Route("Editar/{id}")]
        public async Task<Response> Editar([FromRoute] int id)
        {
            try
            {
                var roles = await (from r in db.Usuarios
                                   select new VistaRole() { IdRole = r.IdRole, Nombre = r.Nombres, Codigo = r.Codigo }
                             ).OrderBy(u => u.Nombre).ToListAsync();

                var usuario = await db.Usuarios.Where(u => u.IdUsuario == id).FirstOrDefaultAsync();
                var vistaUsuario = ToVistaUsuario(usuario);
                vistaUsuario.Roles = roles;

                return new Response { IsSuccess = true, Message = string.Empty, Result = vistaUsuario };
            }
            catch (Exception ex)
            {
                return new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = null };
            }
        }


        [HttpPost]
        [Route("Editar")]
        public async Task<Response> Editar([FromBody] Usuarios usuario)
        {
            try
            {
                usuario.Contrasena = EncryptHash.Hash(usuario.Contrasena);

                db.Entry(usuario).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Usuario actualizado correctamente", Result = usuario };
            }
            catch (Exception ex)
            {
                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }
        }


        private VistaUsuarios ToVistaUsuario(Usuarios usuario)
        {
            return new VistaUsuarios
            {
                Identificacion = usuario.Identificacion,
                IdUsuario = usuario.IdUsuario,
                Nombres = usuario.Nombres,
                Activo = usuario.Activo,
                Contrasena = usuario.Contrasena,
                Codigo = usuario.Codigo,
                IdRole = usuario.IdRole,
                Celular = usuario.Celular,
                Correo = usuario.Correo,
                Apellidos = usuario.Apellidos,
                FechaRegistro = usuario.FechaRegistro,
            };
        }
    }



}
