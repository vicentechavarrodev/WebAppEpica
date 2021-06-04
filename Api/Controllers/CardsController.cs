using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CardsController : Controller
    {
        private readonly DataContext db;
        private readonly IWebHostEnvironment _env;


        public CardsController(IWebHostEnvironment env, DataContext context)
        {
            db = context;
            _env = env;
        }

        [HttpGet]
        [Route("Index")]
        public async Task<Response> Index()
        {
            try
            {
                var cards = await db.Cards.ToListAsync();


                return new Response { IsSuccess = true, Message = " ", Result = cards };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }


        }

        [HttpPost]
        [Route("Crear")]
        public async Task<Response> Crear([FromBody] Cards cards)
        {



            try
            {
                db.Add(cards);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Card creado correctamente", Result = cards };
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

            var cards = await db.Cards.FindAsync(id);

            if (cards == null)
            {
                return new Response { IsSuccess = false, Message = "No existe un card", Result = null };
            }

            return new Response { IsSuccess = true, Message = "", Result = cards };
        }

        [HttpPost]
        [Route("Editar/{id}")]
        public async Task<Response> Editar(int id, [FromBody] Cards cards)
        {
            if (id != cards.IdCard)
            {
                return new Response { IsSuccess = false, Message = "Debes enviar un id", Result = null };
            }


            try
            {
                db.Update(cards);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Card actualizado correctamente", Result = cards };
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!CardsExists(cards.IdCard))
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
                var cards = await db.Cards.FindAsync(id);
                db.Cards.Remove(cards);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Card eliminado correctamente", Result = null };
            }
            catch (Exception ex)
            {
                return new Response { IsSuccess = false, Message = ex.Message, Result = null };

            }




        }
        private bool CardsExists(int id)
        {
            return db.Cards.Any(e => e.IdCard == id);
        }
       


    }
}
