using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : Controller
    {
        private readonly DataContext db;

        public CategoriasController(DataContext context)
        {
            db = context;
        }

        [HttpGet]
        [Route("Index")]
        public async Task<Response> Index()
        {
            try
            {
                var categorias = await db.Categorias.ToListAsync();


                return new Response { IsSuccess = true, Message = " ", Result = categorias };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }
           
          
        }

        [HttpPost]
        [Route("Crear")]
        public async Task<Response> Crear([Bind("IdCategoria,Nombre")] Categorias categorias)
        {
            try
            {
                db.Add(categorias);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Categoría creada correctamente", Result = categorias };
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

            var categorias = await db.Categorias.FindAsync(id);

            if (categorias == null)
            {
                return new Response { IsSuccess = false, Message = "No existe una categoría", Result = null };
            }

            return new Response { IsSuccess = true, Message = "", Result = categorias };
        }

        [HttpPost]
        [Route("Editar/{id}")]
        public async Task<Response> Editar(int id, [Bind("IdCategoria,Nombre")] Categorias categorias)
        {
            if (id != categorias.IdCategoria)
            {
                return new Response { IsSuccess = false, Message = "Debes enviar un id", Result = null };
            }

           
                try
                {
                    db.Update(categorias);
                    await db.SaveChangesAsync();
                    return new Response { IsSuccess = true, Message = "Categoría actualizada correctamente", Result = categorias };
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    if (!CategoriasExists(categorias.IdCategoria))
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
        public async Task<Response> Eliminar(int id)
        {

            try
            {
                var categorias = await db.Categorias.FindAsync(id);
                db.Categorias.Remove(categorias);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Categoría eliminada correctamente", Result = null };
            }
            catch (Exception ex)
            {
               return new Response { IsSuccess = false, Message = ex.Message, Result = null };
              
            }


          
        
        }

        private bool CategoriasExists(int id)
        {
            return db.Categorias.Any(e => e.IdCategoria == id);
        }
    }
}
