using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public ProductosController(DataContext context)
        {
            db = context;
        }

        [HttpGet]
        [Route("ProductosPorCategoria/{Id}")]
        public IEnumerable<Productos> Index(int Id)
        {
            return db.Productos.Where(p => p.IdCategoria == Id).ToList();
        }

        [HttpGet]
        [Route("Index")]
        public IEnumerable<Productos> Index()
        {
            return  db.Productos.ToList();
        }

        [HttpGet]
        [Route("ProductosOpciones/{Id}")]
        public IEnumerable<ProductoOpciones> GetProductosOpcion(int Id)
        {
            return db.ProductoOpciones.Where(p => p.IdProducto == Id).ToList();
        }

        [HttpPost]
        [Route("CreateProductoOpcion")]
        public async Task<IActionResult> CreateProductoOpcion([Bind("IdProductoOpciones,IdOpcion,IdProducto")] ProductoOpciones productOpcion)
        {
            if (ModelState.IsValid)
            {
                db.Add(productOpcion);
                await db.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(productOpcion);
        }



        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> Create([Bind("IdProducto,Nombre,UrlImagen,Precio,IdCategoria")] Productos productos)
        {
            if (ModelState.IsValid)
            {
                db.Add(productos);
                await db.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(productos);
        }

        [HttpGet]
        [Route("Edit")]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var productos = await db.Productos.FindAsync(id);
            if (productos == null)
            {
                return NotFound();
            }
            return View(productos);
        }

        [HttpPost]
        [Route("Edit/{id}")]
        public async Task<IActionResult> Edit(int id, [Bind("IdProducto,Nombre,UrlImagen,Precio,IdCategoria")] Productos productos)
        {
            if (id != productos.IdProducto)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    db.Update(productos);
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProductosExists(productos.IdProducto))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(productos);
        }


        [HttpPost, ActionName("Delete")]
        [Route("Delete/{id}")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var productos = await db.Productos.FindAsync(id);
            db.Productos.Remove(productos);
            await db.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        [HttpPost, ActionName("DeleteProductoOpcion")]
        [Route("DeleteProductoOpcion/{id}")]
        public async Task<IActionResult> DeleteProductoOpcion(int id)
        {
            var productoOpcion = await db.ProductoOpciones.FindAsync(id);
            db.ProductoOpciones.Remove(productoOpcion);
            await db.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ProductosExists(int id)
        {
            return db.Productos.Any(e => e.IdProducto == id);
        }
    }
}
