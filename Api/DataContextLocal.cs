using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api
{
    public class DataContextLocal : IDesignTimeDbContextFactory<DataContext>
    {


        //DataContext IDesignTimeDbContextFactory<DataContext>.CreateDbContext(string[] args)
        //{
        //    IConfigurationRoot configuration = new ConfigurationBuilder()
        //    .SetBasePath(System.IO.Directory.GetCurrentDirectory())
        //    .AddJsonFile("appsettings.json")
        //    .Build();
        //    var builder = new DbContextOptionsBuilder<DataContext>();
        //    var connectionString = configuration.GetConnectionString("PazziOrderConnectionString");
        //    builder.UseSqlServer(connectionString);
        //    return new DataContext(builder.Options);
        //}


        public DataContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(System.IO.Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

            var builder = new DbContextOptionsBuilder<DataContext>();
            var connectionString = configuration.GetConnectionString("EcommerceConnectionString");
            builder.UseSqlServer(connectionString);
            return new DataContext(builder.Options);
        }
    }
}
