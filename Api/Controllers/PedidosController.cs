using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Helpers;
using Api.ViewModels;
using EFCore.BulkExtensions;
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
    public class PedidosController : Controller
    {
        private readonly DataContext db;
        private readonly IWebHostEnvironment _env;

        public PedidosController(IWebHostEnvironment env, DataContext dataContext)
        {
            db = dataContext;
            _env = env;
        }
        

        [HttpGet]
        [Route("Index")]
        public async Task<Response> Index()
        {
            try
            {

                var pedidos = from pedido in db.Pedidos
                              where pedido.FechaHoraPedido.Date >= DateTime.Now.Date.AddDays(-1) &&
                                    pedido.FechaHoraPedido.Date <= DateTime.Now.Date
                                    orderby pedido.FechaHoraPedido descending
                              select new VistaPedidos
                                        {
                                            IdPedido = pedido.IdPedido,
                                            Direccion = pedido.Direccion,
                                            Estados = pedido.Estados,
                                            FechaHoraPedido = pedido.FechaHoraPedido,
                                            IdEstado = pedido.IdEstado,
                                            Solicitante = pedido.Solicitante,
                                            Telefono = pedido.Telefono,
                                            Comentario = pedido.Comentario,
                                            TotalPedido = pedido.TotalPedido,
                                        };

         
                return new Response { IsSuccess = true, Message = " ", Result = pedidos };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }
        }


        [HttpGet]
        [Route("ObtenerPedidoCompleto/{id}")]
        public async Task<Response> ObtenerPedidoCompleto(int id)
        {
            try
            {

                var pedidoDetalles = await db.PedidoDetalles.Where(pd => pd.IdPedido== id).ToListAsync();

                var estados = await db.Estados.ToListAsync();

                var pedidos = from pedido in db.Pedidos
                              where pedido.IdPedido == id
                              select new VistaPedidos
                              {
                                  IdPedido = pedido.IdPedido,
                                  Direccion = pedido.Direccion,
                                  Estados = pedido.Estados,
                                  FechaHoraPedido = pedido.FechaHoraPedido,
                                  IdEstado = pedido.IdEstado,
                                  Solicitante = pedido.Solicitante,
                                  Telefono = pedido.Telefono,
                                  Comentario = pedido.Comentario,
                                  TotalPedido = pedido.TotalPedido,
                              };
                var p =  pedidos.FirstOrDefault() ;
                p.Estados1 = estados;
                p.PedidoDetalles = pedidoDetalles;
                return new Response { IsSuccess = true, Message = " ", Result = p };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }
        }


        [HttpPost]
        [Route("GrabarPedido")]
        public async Task<Response> GrabarPedido([FromBody]  VistaPedidos vista)
        {
            try
            {
                using (var transaction = db.Database.BeginTransaction())
                {
                    vista.IdEstado = 1;
                    vista.FechaHoraPedido = DateTime.Now;
                    db.Pedidos.Add(vista);
                    await db.SaveChangesAsync();

                    foreach (var item in vista.PedidoDetalles)
                    {
                        item.IdPedido = vista.IdPedido;
                        db.PedidoDetalles.Add(item);
                        await db.SaveChangesAsync();
                    }

                    transaction.Commit();
                    return new Response { IsSuccess = true, Message = "Pedido realizado ", Result = vista };
                }

            }
            catch (Exception ex)
            {
                System.Diagnostics.StackTrace trace = new System.Diagnostics.StackTrace(ex, true);
                return new Response { IsSuccess = false, Message = "Este pedido no se realizo", Result = null };
            }

       



            

        }


        [HttpPost]
        [Route("CambiarEstado/{id}/{idEstado}")]
        public async Task<Response> CambiarEstado(int id, int idEstado)
        {
            var pedido = await db.Pedidos.Where(pd => pd.IdPedido == id).ToListAsync();

            var p = pedido.FirstOrDefault();
            p.IdEstado = idEstado;
            try
            {
                db.Update(p);
                await db.SaveChangesAsync();
                return new Response { IsSuccess = true, Message = "Estado cambiado", Result = p };
            }
            catch (DbUpdateConcurrencyException ex)
            {
              
                    return new Response { IsSuccess = false, Message = ex.Message, Result = null };
              
            }

        }



        private VistaPedidos ToVistaPedido(Pedidos pedido)
        {
            return new VistaPedidos
            {
                IdPedido = pedido.IdPedido,
                Direccion = pedido.Direccion,
                Estados = pedido.Estados,
                FechaHoraPedido = pedido.FechaHoraPedido,
                IdEstado = pedido.IdEstado,
                Solicitante = pedido.Solicitante,
                Telefono = pedido.Telefono,
                Comentario = pedido.Comentario,
                TotalPedido = pedido.TotalPedido,
            };
        }

    }


  
}
