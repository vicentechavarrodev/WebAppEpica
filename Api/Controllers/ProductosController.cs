using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Api.Helpers;
using Api.ViewModels;
using Microsoft.AspNetCore.Authorization;
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
    [Authorize]

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
        [Route("TipoSelecciones")]
        public async Task<Response> TipoSelecciones()
        {
            try
            {
                var tipoSelecciones = await db.TipoSelecciones.ToListAsync();


                return new Response { IsSuccess = true, Message = " ", Result = tipoSelecciones };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }


        }

        [HttpGet]
        [Route("ProductoOpciones/{Id}/{Agrupado}")]
        public async Task<Response> ProductoOpciones(int Id,bool Agrupado)
        {
            try
            {
               
                var producto = await db.Productos.FindAsync(Id);
                var vista = ToVistaProducto(producto);
              
                if (Agrupado)
                {



                    var productosOpciones = await db.ProductoOpciones.Include(po => po.Opcion).Include(pot => pot.ProductoOpcionTipoOpciones).Include(po => po.Opcion.TipoOpcion).Where(p => p.IdProducto == Id).ToListAsync();

                    var grouping = (from p in productosOpciones
                                    join pot in db.ProductoTipoOpciones on p.Opcion.IdTipoOpcion equals pot.IdTipoOpcion
                                  
                                    where pot.IdProducto == Id
                                    select new VistaProductoOpciones
                                    {
                                        ProductoTipoOpcion= pot,
                                        CambiaPrecio=p.CambiaPrecio,
                                        ProductoTipoOpcionCambio= p.ProductoTipoOpciones,
                                        Precio=p.Precio,
                                        IdProductoTipoOpcion= p.IdProductoTipoOpcion,
                                        IdProductoOpciones = p.IdProductoOpciones,
                                        IdOpcion = p.IdOpcion,
                                        Opcion = p.Opcion,
                                        IdProducto = p.IdProducto,
                                        MuestraSecundario = p.MuestraSecundario,
                                        ProductoOpcionTipoOpciones = (from o in  p.ProductoOpcionTipoOpciones  
                                                                       select new VistaProductoOpcionTipoOpciones
                                                                       {
                                                                           IdProductoOpciones= o.IdProductoOpciones,
                                                                           IdProductoTipoOpcion= o.IdProductoTipoOpcion,
                                                                           ProductoTipoOpcion = db.ProductoTipoOpciones.Include(p => p.TipoOpcion).First(p =>p.IdProductoTipoOpcion== o.IdProductoTipoOpcion)
                                                                       }
                                                                      
                                                                      ).ToList()
                                    }).ToList().OrderBy(x => x.ProductoTipoOpcion.Orden).GroupBy(x => x.Opcion.IdTipoOpcion);




                     vista.VistaProductoOpcionesGroup = grouping.ToList();
                }
                else
                {

                    var productosOpciones = await db.ProductoOpciones.Include(po => po.Opcion).Include(pot => pot.ProductoOpcionTipoOpciones).Include(po => po.Opcion.TipoOpcion).Where(p => p.IdProducto == Id).ToListAsync();
                   
                    vista.VistaProductoOpciones = (from p in productosOpciones
                                                   
                                                   //orderby pot.Orden descending
                                                   select new VistaProductoOpciones
                                                   {
                                                       CambiaPrecio = p.CambiaPrecio,
                                                       Precio = p.Precio,
                                                       IdProductoTipoOpcion = p.IdProductoTipoOpcion,
                                                       IdProductoOpciones = p.IdProductoOpciones,
                                                       IdOpcion = p.IdOpcion,
                                                       Opcion = p.Opcion,
                                                       IdProducto = p.IdProducto,
                                                       MuestraSecundario = p.MuestraSecundario,
                                                       //ProductoTipoOpcion = pot,
                                                       ProductoOpcionTipoOpciones = (from o in p.ProductoOpcionTipoOpciones
                                                                                     select new VistaProductoOpcionTipoOpciones
                                                                                     {
                                                                                         IdProductoOpciones = o.IdProductoOpciones,
                                                                                         IdProductoTipoOpcion = o.IdProductoTipoOpcion,
                                                                                         ProductoTipoOpcion = db.ProductoTipoOpciones.Include(p => p.TipoOpcion).First(p => p.IdProductoTipoOpcion == o.IdProductoTipoOpcion)
                                                                                     }

                                                                                     ).ToList()
                                                   }).ToList();
                }
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
                var productos = await db.Productos.Include(p => p.Categoria).ToListAsync();


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

 


        [HttpPost]
        [Route("CrearProductoTipoOpcion")]
        public async Task<Response> CrearProductoTipoOpcion([Bind("Encabezado,IdProducto,IdTipoOpcion,MostrarInicio,Orden,EsPrincipal")] ProductoTipoOpciones productTipoOpcion)
        {

            try
            {
                db.Add(productTipoOpcion);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Agregado  correctamente", Result = productTipoOpcion };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }

        }

        [HttpGet]
        [Route("CrearOpcionSecundaria/{id}")]
        public async Task<Response> CrearOpcionSecundaria(int id)
        {
            try
            {
                var opcion = await db.ProductoOpciones.Include(p => p.Opcion).Include(p => p.ProductoOpcionTipoOpciones).FirstAsync(p => p.IdProductoOpciones == id);

                var tipoOpcionesProducto = await db.ProductoTipoOpciones.Where(p => p.IdTipoOpcion != opcion.Opcion.IdTipoOpcion && p.IdProducto == opcion.IdProducto).Include(p => p.TipoOpcion).OrderBy(u => u).ToListAsync();

              
                var opcionSecundaria = new VistaOpcionSecundaria();
                if ( opcion.ProductoOpcionTipoOpciones.Count > 0)
                {
                    opcionSecundaria.IdProductoOpciones = opcion.ProductoOpcionTipoOpciones.First().IdProductoOpciones;
                    opcionSecundaria.IdProductoTipoOpcionSecundaria = opcion.ProductoOpcionTipoOpciones.First().IdProductoTipoOpcion;

                }
                opcionSecundaria.IdProductoTipoOpcion = opcion.IdProductoTipoOpcion == null ? 0 : (int)opcion.IdProductoTipoOpcion;
                opcionSecundaria.CambiaPrecio = opcion.CambiaPrecio;
                opcionSecundaria.Precio = opcion.Precio;
                opcionSecundaria.ProductoTipoOpciones = tipoOpcionesProducto;
                opcionSecundaria.MuestraSecundario = opcion.MuestraSecundario;

                return new Response { IsSuccess = true, Message = string.Empty, Result = opcionSecundaria };
            }
            catch (Exception ex)
            {
                return new Response { IsSuccess = false, Message = ex.InnerException.Message, Result = new VistaProductos { Categorias = null } };
            }

        }

        [HttpPost]
        [Route("CrearOpcionSecundaria")]
        public async Task<Response> CrearOpcionSecundaria(VistaOpcionSecundaria vista)
        {


            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    var opcionSecundaria = await db.ProductoOpcionTipoOpciones.Where(po => po.IdProductoOpciones== vista.IdProductoOpciones).ToListAsync();
                    //var opcionCambio = await db.ProductoOpcionTipoOpciones.Where(po => po.IdProductoOpciones == vista.IdProductoTipoOpcion).ToListAsync();
                    var productoOpcion = await db.ProductoOpciones.FindAsync(vista.IdProductoOpciones);


                    if (vista.MuestraSecundario )
                    {

                        if (opcionSecundaria.Count > 0 )
                        {
                            opcionSecundaria.First().IdProductoTipoOpcion = vista.IdProductoTipoOpcionSecundaria;
                            db.Update(opcionSecundaria.First());
                        }
                        else
                        {
                            db.Add(new ProductoOpcionTipoOpciones { 
                              IdProductoOpciones= vista.IdProductoOpciones,
                              IdProductoTipoOpcion= vista.IdProductoTipoOpcionSecundaria
                            });
                        }
                      
                    }
                    else
                    {
                        if(opcionSecundaria != null && opcionSecundaria.Count > 0 )
                        {
                            db.Remove(opcionSecundaria.First());
                        }
                    }


                    if (vista.CambiaPrecio)
                    {

                        productoOpcion.IdProductoTipoOpcion = vista.IdProductoTipoOpcion;
                        productoOpcion.Precio = vista.Precio;
                    }
                    else
                    {
                        productoOpcion.IdProductoTipoOpcion = null;
                        productoOpcion.Precio = 0;
                    }

                    productoOpcion.CambiaPrecio = vista.CambiaPrecio;
                    productoOpcion.MuestraSecundario = vista.MuestraSecundario;
                    db.Update(productoOpcion);
                    await db.SaveChangesAsync();
                    transacction.Commit();
                    return new Response { IsSuccess = true, Message = "Agregada correctamente", Result = productoOpcion };


                }
                catch (Exception ex)
                {
                    transacction.Rollback();
                    return new Response { IsSuccess = false, Message = ex.Message, Result = null };
                }
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
                            Descripcion = form["Descripcion"],
                            Precio = decimal.Parse(form["Precio"]),
                            IdCategoria = int.Parse(form["IdCategoria"]),
                            Activo = bool.Parse(form["Activo"]),
                            PrecioVariable = bool.Parse(form["PrecioVariable"]),
                            TieneOpciones = bool.Parse(form["TieneOpciones"])

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
                        producto.Activo = bool.Parse(form["Activo"]);
                        producto.UrlImagen = form["UrlImagen"];
                        producto.Descripcion = form["Descripcion"];
                        producto.PrecioVariable = bool.Parse(form["PrecioVariable"]);
                        producto.TieneOpciones = bool.Parse(form["TieneOpciones"]);

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


        [HttpGet]
        [Route("EditarTipoOpcionProducto/{id}")]
        public async Task<Response> EditarTipoOpcionProducto(int? id)
        {
            if (id == null)
            {
                return new Response { IsSuccess = false, Message = "Debes enviar un id", Result = null };
            }

            var tipoOpcionesProducto = await db.ProductoTipoOpciones.FindAsync(id);
            var cantidad =  db.ProductoTipoOpciones.Where(p => p.IdProducto == tipoOpcionesProducto.IdProducto).Count();
            var tipoOpciones =  db.TipoOpciones.ToList();
            var vista = ToVistaTipoOpcionProducto(tipoOpcionesProducto);
            vista.TipoOpciones = tipoOpciones;
            return new Response { IsSuccess = true, Message = "", Result = vista };
        }

        [HttpPost]
        [Route("EditarTipoOpcionProducto")]
        public async Task<Response> EditarTipoOpcionProducto(VistaTipoOpcionProducto productoTipoOpciones)
        {
          
            try
            {
                db.Update(productoTipoOpciones);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Opcion actualizada correctamente", Result = productoTipoOpciones };
            }
            catch (DbUpdateConcurrencyException ex)
            {
                
                    return new Response { IsSuccess = false, Message = ex.Message, Result = null };
               
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
                return new Response { IsSuccess = true, Message = "Producto eliminado correctamente", Result = producto };
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
                using (var transaction = db.Database.BeginTransaction())
                {
                    var productoOpcion = await  db.ProductoOpciones.Include( p=> p.ProductoOpcionTipoOpciones).FirstAsync(p => p.IdProductoOpciones == id);
                    if (productoOpcion.ProductoOpcionTipoOpciones.Count > 0)
                    {
                        foreach (var item in productoOpcion.ProductoOpcionTipoOpciones)
                        {
                            db.ProductoOpcionTipoOpciones.Remove(item);
                        }
                      
                    }

                    db.ProductoOpciones.Remove(productoOpcion);
                    await db.SaveChangesAsync();
                    transaction.Commit();
                    return new Response { IsSuccess = true, Message = "Opción eliminada correctamente del producto", Result = productoOpcion };
                }

              
            }
            catch (Exception ex)
            {
                
                return new Response { IsSuccess = false, Message = ex.Message, Result = null };

            }
        }

        [HttpPost, ActionName("EliminarProductoTipoOpcion")]
        [Route("EliminarProductoTipoOpcion/{id}")]
        public async Task<Response> EliminarProductoTipoOpcion(int id)
        {
            try
            {

                using (var transaction = db.Database.BeginTransaction())
                {

                    var ProductoTipoOpcion = await db.ProductoTipoOpciones.FindAsync(id);

                    var opcionesProducto =  db.ProductoOpciones.Include(p => p.ProductoOpcionTipoOpciones).Where(pt => pt.Opcion.IdTipoOpcion == ProductoTipoOpcion.IdTipoOpcion).ToList();
                   

                    if(opcionesProducto.Count > 0)
                    {
                        foreach (var item in opcionesProducto)
                        {
                          
                            if(item.ProductoOpcionTipoOpciones.Count > 0)
                            {
                                db.ProductoOpcionTipoOpciones.Remove(item.ProductoOpcionTipoOpciones.First());
                                await db.SaveChangesAsync();
                            }

                            db.ProductoOpciones.Remove(item);
                            await db.SaveChangesAsync();
                        }
                    }

                    db.ProductoTipoOpciones.Remove(ProductoTipoOpcion);
                    await db.SaveChangesAsync();
                    transaction.Commit();
                    return new Response { IsSuccess = true, Message = "Tipo de Opción eliminada correctamente del producto", Result = ProductoTipoOpcion };
                 
                }


               

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
                Precio = producto.Precio,
                Descripcion = producto.Descripcion,
                Activo = producto.Activo,
                PrecioVariable= producto.PrecioVariable,
                TieneOpciones = producto.TieneOpciones
            };
        }

        private VistaTipoOpcionProducto ToVistaTipoOpcionProducto(ProductoTipoOpciones productoTipoOpcion)
        {
            return new VistaTipoOpcionProducto
            {
               
                Orden = productoTipoOpcion.Orden,
                IdTipoOpcion = productoTipoOpcion.IdTipoOpcion,
                IdProducto = productoTipoOpcion.IdProducto,
                Encabezado = productoTipoOpcion.Encabezado,
                MostrarInicio = productoTipoOpcion.MostrarInicio,
                IdProductoTipoOpcion = productoTipoOpcion.IdProductoTipoOpcion,
                IdTipoSeleccion= productoTipoOpcion.IdTipoSeleccion,
                EsObligatoria= productoTipoOpcion.EsObligatoria,
                MostrarPartes = productoTipoOpcion.MostrarPartes,


            };
        }
    }
}
