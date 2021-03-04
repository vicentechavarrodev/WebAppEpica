using EfCore.Shaman;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Domain
{
    public class DataContext : DbContext
    {
        const string connectionString = "Data Source=DESKTOP-S8K9CMA;Initial Catalog=Ecommerce1;Integrated Security=False;User Id=sa;Password=PazziSoftware*";
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DataContext() : base() { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(connectionString);
            base.OnConfiguring(optionsBuilder);
        }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var cascadeFKs = modelBuilder.Model.GetEntityTypes()
            .SelectMany(t => t.GetForeignKeys())
            .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var fk in cascadeFKs)
                fk.DeleteBehavior = DeleteBehavior.Restrict;

            base.OnModelCreating(modelBuilder);
            this.FixOnModelCreating(modelBuilder);
        }
    }
}
