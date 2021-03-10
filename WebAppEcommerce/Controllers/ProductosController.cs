using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebAppEcommerce.Helpers;

namespace WebAppEcommerce.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProductosController : Controller
    {
        private readonly DataContext db;
        private readonly IWebHostEnvironment _env;

        public ProductosController(IWebHostEnvironment env, DataContext dataContext)
        {
            db = dataContext;
            _env = env;
        }


    }
    }
