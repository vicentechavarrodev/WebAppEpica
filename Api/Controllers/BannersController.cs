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

namespace Api.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class BannersController : Controller
    {
        private readonly DataContext db;
        private readonly IWebHostEnvironment _env;


        public BannersController(IWebHostEnvironment env, DataContext context)
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
                var banners = await db.Banners.ToListAsync();


                return new Response { IsSuccess = true, Message = " ", Result = banners };
            }
            catch (Exception ex)
            {

                return new Response { IsSuccess = false, Message = ex.Message, Result = null };
            }


        }

        [HttpPost]
        [Route("Crear")]
        public async Task<Response> Crear()
        {
            var files = HttpContext.Request.Form.Files;

            var postedFile = Request.Form.Files[0];

            var ruta = Path.Combine(_env.ContentRootPath, "images/banners");
            var form = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            var n = form["Nombre"];

            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    string FileName = Guid.NewGuid().ToString() + ".jpg";
                    var imagenGuardada = await FilesHelper.UploadPhotoAsync(ruta, files, FileName);
                    if (imagenGuardada)
                    {
                        var banners = new Banners
                        {
                            Nombre = form["Nombre"],
                            UrlImagen = "banners/" + FileName,
                            Descripcion = form["Descripcion"],


                        };

                        db.Banners.Add(banners);
                        await db.SaveChangesAsync();
                        transacction.Commit();
                        return new Response { IsSuccess = true, Message = "Banner creado correctamente", Result = banners };
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
            public async Task<Response> Editar(int? id)
            {

                if (id == null)
                {
                    return new Response { IsSuccess = false, Message = "Debes enviar un id", Result = null };
                }

                var banners = await db.Banners.FindAsync(id);

                if (banners == null)
                {
                    return new Response { IsSuccess = false, Message = "No existe un banner", Result = null };
                }

                return new Response { IsSuccess = true, Message = "", Result = banners };
            }

        [HttpPost]
        [Route("Editar")]
        public async Task<Response> Edit()
        {



            var files = HttpContext.Request.Form.Files;
            if (files.Count != 0)
            {
                var postedFile = Request.Form.Files[0];
            }

            var ruta = Path.Combine(_env.ContentRootPath, "images/banners");

            var form = Request.Form.ToDictionary(x => x.Key, x => x.Value.ToString());
            var n = form["Nombre"];

            using (var transacction = db.Database.BeginTransaction())
            {
                try
                {
                    string FileName = Guid.NewGuid().ToString() + ".jpg";

                    var imagenGuardada = await FilesHelper.UploadPhotoAsync(ruta, files, FileName);
                    var IdBanner = int.Parse(form["IdBanner"]);
                    var banners = await db.Banners.FindAsync(IdBanner);
                    if (imagenGuardada)
                    {
                        banners.Nombre = form["Nombre"];
                        banners.UrlImagen = form["UrlImagen"];
                        banners.Descripcion = form["Descripcion"];


                        if (files.Count > 0)
                        {
                            banners.UrlImagen = "banners/" + FileName;
                        }

                        db.Update(banners);
                        await db.SaveChangesAsync();
                        transacction.Commit();
                        return new Response { IsSuccess = true, Message = "Banner actualizado correctamente", Result = banners };
                    }
                    else
                    {

                        return new Response { IsSuccess = false, Message = "No se logro actualizar la imagen ", Result = null };
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
                    var banners = await db.Banners.FindAsync(id);
                    db.Banners.Remove(banners);
                    await db.SaveChangesAsync();
                    return new Response { IsSuccess = true, Message = "Banner eliminado correctamente", Result = null };
                }
                catch (Exception ex)
                {
                    return new Response { IsSuccess = false, Message = ex.Message, Result = null };

                }




            }

          
        }
    }
