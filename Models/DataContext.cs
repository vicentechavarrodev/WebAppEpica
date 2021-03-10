using EfCore.Shaman;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Models
{
    public class DataContext : DbContext
    {
        const string connectionString = "Data Source=.;Initial Catalog=Ecommerce1;Integrated Security=False;User Id=sa; Password=dosantos62333;";
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
            //this.FixOnModelCreating(modelBuilder);
        }



        public DbSet<Usuarios> Usuarios { get; set; }

        public DbSet<Opciones> Opciones { get; set; }

        public DbSet<Categorias> Categorias { get; set; }

        public DbSet<TipoOpciones> TipoOpciones { get; set; }

        public DbSet<Models.Productos> Productos { get; set; }

        public DbSet<Roles> Roles { get; set; }

        public DbSet<Pedidos> Pedidos { get; set; }

        public DbSet<ProductoOpciones> ProductoOpciones { get; set; }



    }
}
