using Api.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{

    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class HorariosController : Controller
    {
        private readonly DataContext db;
        private readonly IWebHostEnvironment _env;


        public HorariosController(IWebHostEnvironment env, DataContext context)
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
                var horarios = await db.Horarios.ToListAsync();


                return new Response { IsSuccess = true, Message = " ", Result = horarios };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }


        }
        [HttpPost]
        [Route("Crear")]
        public async Task<Response> Crear([FromBody] Horarios horarios)
        {

            try
            {
                db.Add(horarios);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Horario creado correctamente", Result = horarios };
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

            var horarios = await db.Horarios.FindAsync(id);

            if (horarios == null)
            {
                return new Response { IsSuccess = false, Message = "No existe un Horario", Result = null };
            }

            return new Response { IsSuccess = true, Message = "", Result = horarios };
        }

        [HttpPost]
        [Route("Editar")]
        public async Task<Response> Edit()
        {


            var form = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            var n = form["Dia"];

            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                   

                    var IdHorario = int.Parse(form["IdHorario"]);
                    var horarios = await db.Horarios.FindAsync(IdHorario);
                   
                        horarios.Dia = form["Dia"];
                        horarios.HoraInicial = DateTime.Parse(form["HoraInicial"]);
                        horarios.HoraFinal = DateTime.Parse(form["HoraFinal"]);


                        db.Update(horarios);
                        await db.SaveChangesAsync();
                        transacction.Commit();
                        return new Response { IsSuccess = true, Message = "Horario actualizado correctamente", Result = horarios };
                  

                      


                }
                catch (Exception ex)
                {
                    transacction.Rollback();
                    return new Response { IsSuccess = false, Message = ex.Message, Result = null };
                }

            }
        }


    }
}
