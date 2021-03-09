using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Api.Helpers;
using Api.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : Controller
    {

        private readonly DataContext db;
        private readonly IWebHostEnvironment _env;

        public ProductosController(IWebHostEnvironment env, DataContext dataContext)
        {
            db = dataContext;
            _env = env;
        }

        [HttpGet]
        [Route("ProductoOpciones/{Id}")]
        public async Task<Response> ProductoOpciones(int Id)
        {
            try
            {
                var producto = await db.Productos.FindAsync(Id);
                var vista = ToVistaProducto(producto);
                var productosOpciones = await db.ProductoOpciones.Include(po => po.Opcion).Include(po => po.Opcion.TipoOpcion).Where(p => p.IdProducto == Id).ToListAsync();
                vista.VistaProductoOpciones = productosOpciones;

                return new Response { IsSuccess = true, Message = " ", Result = vista };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }

         }

        [HttpGet]
        [Route("ProductosPorCategoria/{Id}")]
        public async Task<Response> Index(int Id)
        {
            try
            {
                var productos = await db.Productos.Where(p => p.IdCategoria == Id).ToListAsync();


                return new Response { IsSuccess = true, Message = " ", Result = productos };
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
                var productos = await db.Productos.ToListAsync();


                return new Response { IsSuccess = true, Message = " ", Result = productos };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }
        }

        [HttpGet]
        [Route("ProductosOpciones/{Id}")]
        public async Task<Response> GetProductosOpcion(int Id)
        {
            try
            {
                var productos = await db.ProductoOpciones.Where(p => p.IdProducto == Id).ToListAsync();
                return new Response { IsSuccess = true, Message = " ", Result = productos };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }

           
        }

        [HttpPost]
        [Route("CrearProductoOpcion")]
        public async Task<Response> CrearProductoOpcion([Bind("IdProductoOpciones,IdOpcion,IdProducto")] ProductoOpciones productOpcion)
        {

            try
            {
                db.Add(productOpcion);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Producto creado correctamente", Result = productOpcion };
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
                var categorias = await db.Categorias.OrderBy(u => u.Nombre).ToListAsync();

                return new Response { IsSuccess = true, Message = string.Empty, Result = new VistaProductos { Categorias  = categorias } };
            }
            catch (Exception ex)
            {
                return new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = new VistaProductos { Categorias = null } };
            }

        }



        [HttpPost, DisableRequestSizeLimit]
        [Route("Crear")]
        public async Task<Response> Create()
        {

            var files = HttpContext.Request.Form.Files;

            var postedFile = Request.Form.Files[0];

            var ruta = Path.Combine(_env.ContentRootPath, "images/productos");
            var form = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            var n = form["Nombre"];

            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    string FileName = Guid.NewGuid().ToString() + ".png";
                    var imagenGuardada = await FilesHelper.UploadPhotoAsync(ruta, files, FileName);
                    if (imagenGuardada)
                    {
                        var producto = new Productos
                        {
                            Nombre = form["Nombre"],
                            UrlImagen = "productos/" + FileName,
                            Precio = decimal.Parse(form["Precio"]),
                            IdCategoria = int.Parse(form["IdCategoria"])

                        };

                        db.Productos.Add(producto);
                        await db.SaveChangesAsync();
                        transacction.Commit();
                        return new Response { IsSuccess = true, Message = "Producto creado correctamente", Result = producto };
                    }
                    else
                    {

                        return new Response { IsSuccess = false, Message = "No se logro guardar la imagen " + postedFile.Length, Result = null };
                    }
               

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
        public async Task<Response> Edit(int? id)
        {
            if (id == null)
            {
                return new Response { IsSuccess = false, Message = "Debes enviar un id", Result = null };
            }

            try
            {
                var producto = await db.Productos.FindAsync(id);
                var elemento = ToVistaProducto(producto);
                var categorias = await db.Categorias.OrderBy(u => u.Nombre).ToListAsync();
                elemento.Categorias = categorias;
                return new Response { IsSuccess = true, Message = string.Empty, Result = elemento };
            }
            catch (Exception ex)
            {
                return new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = new VistaProductos { Categorias = null } };
            }
            
        }

        [HttpPost]
        [Route("Editar")]
        public async Task<Response> Edit()
        {



            var files = HttpContext.Request.Form.Files;
            if(files.Count != 0)
            {
                var postedFile = Request.Form.Files[0];
            }

            var ruta = Path.Combine(_env.ContentRootPath, "images/productos");

            var form = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            var n = form["Nombre"];

            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    string FileName = Guid.NewGuid().ToString() + ".png";

                    var imagenGuardada = await FilesHelper.UploadPhotoAsync(ruta, files, FileName);
                    var IdProducto = int.Parse(form["IdProducto"]);
                    var producto = await db.Productos.FindAsync(IdProducto);
                    if (imagenGuardada)
                    {
                        producto.Nombre = form["Nombre"];
                        producto.Precio = decimal.Parse(form["Precio"]);
                        producto.IdCategoria = int.Parse(form["IdCategoria"]);
                        producto.UrlImagen = form["UrlImagen"];

                        if (files.Count > 0)
                        {
                            producto.UrlImagen = "productos/" + FileName;
                        }
                     
                        db.Update(producto);
                        await db.SaveChangesAsync();
                        transacction.Commit();
                        return new Response { IsSuccess = true, Message = "Producto actualizado correctamente", Result = producto };
                    }
                    else
                    {

                        return new Response { IsSuccess = false, Message = "No se logro actualizar la imagen " , Result = null };
                    }


                }
                catch (Exception ex)
                {
                    transacction.Rollback();
                    return new Response { IsSuccess = false, Message = ex.Message, Result = null };
                }

            }
        }


        [HttpPost, ActionName("Eliminar")]
        [Route("Eliminar/{id}")]
        public async Task<Response> Eliminar(int id)
        {
            try
            {
                var producto = await db.Productos.FindAsync(id);
                db.Productos.Remove(producto);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Producto eliminado correctamente", Result = null };
            }
            catch (Exception ex)
            {
                return new Response { IsSuccess = false, Message = ex.Message, Result = null };

            }
        }

        [HttpPost, ActionName("EliminarProductoOpcion")]
        [Route("EliminarProductoOpcion/{id}")]
        public async Task<Response> EliminarProductoOpcion(int id)
        {
            try
            {
                var productoOpcion = await db.ProductoOpciones.FindAsync(id);
                db.ProductoOpciones.Remove(productoOpcion);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Producto eliminado correctamente de la opción", Result = null };
            }
            catch (Exception ex)
            {
                return new Response { IsSuccess = false, Message = ex.Message, Result = null };

            }
        }

        private bool ProductosExists(int id)
        {
            return db.Productos.Any(e => e.IdProducto == id);
        }

        private VistaProductos ToVistaProducto(Productos producto)
        {
            return new VistaProductos
            {
                IdProducto = producto.IdProducto,
                Nombre = producto.Nombre,
                UrlImagen = producto.UrlImagen,
                IdCategoria = producto.IdCategoria,
                Precio = producto.Precio
            };
        }
    }
}
