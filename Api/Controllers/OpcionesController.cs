using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Helpers;
using Api.ViewModels;
using EFCore.BulkExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Api.Controllers

{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OpcionesController : Controller
    {
        private readonly DataContext db;



        public OpcionesController(DataContext context)
        {
            db = context;
        }



        [HttpGet]
        [Route("ObtenerTipoOpciones/{Id}")]
        public async Task<Response> ObtenerTipoOpciones(int Id)
        {
            try
            {
                var ProductoTipoOpciones = await db.ProductoTipoOpciones.Where(p => p.IdProducto == Id).ToListAsync();
                var TipoOpciones = new HashSet<int>(ProductoTipoOpciones.Select(x => x.IdTipoOpcion));
                var TipoOpcionesFiltradas = await db.TipoOpciones.Where(x => !TipoOpciones.Contains(x.IdTipoOpcion)).ToListAsync();
                return new Response { IsSuccess = true, Message = " ", Result = TipoOpcionesFiltradas };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }

        }


        [HttpGet]
        [Route("ObtenerTipoOpcionesProductoAgregadas/{Id}")]
        public async Task<Response> ObtenerTipoOpcionesProductoAgregadas(int Id)
        {
            try
            {
                var ProductoTipoOpciones = await db.ProductoTipoOpciones.Include(pop => pop.TipoOpcion).Where(p => p.IdProducto == Id).OrderBy(p => p.Orden).ToListAsync();

                return new Response { IsSuccess = true, Message = " ", Result = ProductoTipoOpciones };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }

        }

        [HttpGet]
        [Route("ProductoOpciones/{Id}")]
        public async Task<Response> ProductoOpciones(int Id)
        {
            try
            {
                var productosOpciones = await db.ProductoOpciones.Where(p => p.IdProducto == Id).ToListAsync();
                var opciones = new HashSet<int>(productosOpciones.Select(x => x.IdOpcion));
                var opcionesFiltradas = await db.Opciones.Include(o => o.TipoOpcion).Where(x => !opciones.Contains(x.IdOpcion)).ToListAsync();

                var productosTipoOpciones = await db.ProductoTipoOpciones.Where(p => p.IdProducto == Id).ToListAsync();
                var tipoOpciones = new HashSet<int>(productosTipoOpciones.Select(x => x.IdTipoOpcion));

                 opcionesFiltradas =  opcionesFiltradas.Where(x => tipoOpciones.Contains(x.IdTipoOpcion)).ToList();

                return new Response { IsSuccess = true, Message = " ", Result = opcionesFiltradas };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }

        }
        [HttpGet]
        [Route("Index")]
        public async Task<Response> Index()
        {
            try
            {
                var opciones = await db.Opciones.Include(u => u.TipoOpcion).ToListAsync();
               
                return new Response { IsSuccess = true, Message = "", Result = opciones };
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
                var tiposOpcion = await db.TipoOpciones.OrderBy(u => u.Nombre).ToListAsync();

                return new Response { IsSuccess = true, Message = string.Empty, Result = new VistaOpciones { TipoOpciones = tiposOpcion } };
            }
            catch (Exception ex)
            {
                return new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = new VistaOpciones { TipoOpciones = null } };
            }

        }

        [HttpPost]
        [Route("CrearOpcionesProducto/{id}")]
        public Response CrearOpcionesProducto( int id, List<Opciones> opciones)
        {

            try
            {
                using (var transaction = db.Database.BeginTransaction())
                {
                    var elementos = (from op in opciones
                                     select new ProductoOpciones
                                     {
                                         IdOpcion = op.IdOpcion,
                                         IdProducto = id
                                     }).ToList();

                     db.BulkInsert(elementos);
                    transaction.Commit();
                    return new Response { IsSuccess = true, Message = "Opcions agregadas correctamente", Result = opciones };
                }

            }
            catch (Exception ex)
            {
                System.Diagnostics.StackTrace trace = new System.Diagnostics.StackTrace(ex, true);
                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }


        }


        [HttpPost]
        [Route("Crear")]
        public async Task<Response> Crear([Bind("IdOpcion,Nombre,NombreAlias,Precio,IdTipoOpcion")] Opciones opciones)
        {

            try
            {
                db.Add(opciones);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Opcion creada correctamente", Result = opciones };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }


           
        }

        [HttpGet]
        [Route("Editar/{id}")]
        public async Task<Response> Editar(int? id)
        {
            if (id == null)
            {
                return new Response { IsSuccess = false, Message = "Debes enviar un id", Result = null };
            }

            var opciones = await db.Opciones.FindAsync(id);

            var vista = ToVistaOpcion(opciones);

            var tiposOpcion = await db.TipoOpciones.OrderBy(u => u.Nombre).ToListAsync();
            vista.TipoOpciones = tiposOpcion;

            if (opciones == null)
            {
                return new Response { IsSuccess = false, Message = "No existe una opcion", Result = null };
            }

            return new Response { IsSuccess = true, Message = "", Result = vista };
        }

        [HttpPost]
        [Route("Editar/{id}")]
        public async Task<Response> Editar(int id, [Bind("IdOpcion,Nombre,NombreAlias,Precio,IdTipoOpcion")] Opciones opciones)
        {
            if (id != opciones.IdOpcion)
            {
                return new Response { IsSuccess = false, Message = "Debes enviar un id", Result = null };
            }


            try
            {
                db.Update(opciones);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Opcion actualizada correctamente", Result = opciones };
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!OpcionesExists(opciones.IdOpcion))
                {
                    return new Response { IsSuccess = false, Message = ex.Message, Result = null };
                }
                else
                {
                    throw;
                }
            }

        }


        [HttpPost, ActionName("Eliminar")]
        [Route("Eliminar/{id}")]
        public async Task<Response> DeleteConfirmed(int id)
        {
            try
            {
                var opcion = await db.Opciones.FindAsync(id);
                db.Opciones.Remove(opcion);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Opción eliminada correctamente", Result = null };
            }
            catch (Exception ex)
            {
                return new Response { IsSuccess = false, Message = ex.Message, Result = null };

            }

        }

        [HttpPost, ActionName("EliminarOpcionProducto")]
        [Route("EliminarOpcionProducto/{id}")]
        public async Task<Response> EliminarOpcionProducto(int id)
        {
            try
            {
                var opcion = await db.ProductoOpciones.FindAsync(id);
                db.ProductoOpciones.Remove(opcion);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Opción eliminada correctamente del producto", Result = opcion };
            }
            catch (Exception ex)
            {
                return new Response { IsSuccess = false, Message = ex.Message, Result = null };

            }

        }

        private VistaOpciones ToVistaOpcion(Opciones opcion)
        {
            return new VistaOpciones
            {
                IdOpcion = opcion.IdOpcion,
                Nombre = opcion.Nombre,
                NombreAlias = opcion.NombreAlias,
                IdTipoOpcion = opcion.IdTipoOpcion,
                Precio = opcion.Precio,
                Activa = opcion.Activa
            };
        }

        private bool OpcionesExists(int id)
        {
            return db.Opciones.Any(e => e.IdOpcion == id);
        }
    }
}
