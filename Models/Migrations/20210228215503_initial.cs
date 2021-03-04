using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categorias",
                columns: table => new
                {
                    IdCategoria = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorias", x => x.IdCategoria);
                });

            migrationBuilder.CreateTable(
                name: "Pedidos",
                columns: table => new
                {
                    IdPedido = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(nullable: false),
                    Solicitante = table.Column<string>(maxLength: 150, nullable: false),
                    Direccion = table.Column<string>(maxLength: 30, nullable: false),
                    Telefono = table.Column<string>(maxLength: 16, nullable: false),
                    FechaHoraPedido = table.Column<DateTime>(nullable: false),
                    TotalPedido = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pedidos", x => x.IdPedido);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    IdRole = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Codigo = table.Column<string>(maxLength: 12, nullable: false),
                    Nombre = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.IdRole);
                });

            migrationBuilder.CreateTable(
                name: "TipoOpciones",
                columns: table => new
                {
                    IdTipoOpcion = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoOpciones", x => x.IdTipoOpcion);
                });

            migrationBuilder.CreateTable(
                name: "Productos",
                columns: table => new
                {
                    IdProducto = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(maxLength: 100, nullable: false),
                    UrlImagen = table.Column<string>(nullable: false),
                    Precio = table.Column<decimal>(nullable: false),
                    IdCategoria = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Productos", x => x.IdProducto);
                    table.ForeignKey(
                        name: "FK_Productos_Categorias_IdCategoria",
                        column: x => x.IdCategoria,
                        principalTable: "Categorias",
                        principalColumn: "IdCategoria",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PedidoDetalles",
                columns: table => new
                {
                    IdPedidoDetalle = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descripcion = table.Column<string>(nullable: false),
                    Cantidad = table.Column<int>(nullable: false),
                    Subtotal = table.Column<decimal>(nullable: false),
                    IdPedido = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PedidoDetalles", x => x.IdPedidoDetalle);
                    table.ForeignKey(
                        name: "FK_PedidoDetalles_Pedidos_IdPedido",
                        column: x => x.IdPedido,
                        principalTable: "Pedidos",
                        principalColumn: "IdPedido",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    IdUsuario = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Codigo = table.Column<string>(maxLength: 12, nullable: false),
                    Identificacion = table.Column<string>(maxLength: 12, nullable: false),
                    Nombres = table.Column<string>(maxLength: 30, nullable: true),
                    Apellidos = table.Column<string>(maxLength: 30, nullable: true),
                    Celular = table.Column<string>(maxLength: 10, nullable: true),
                    Correo = table.Column<string>(maxLength: 50, nullable: true),
                    Contrasena = table.Column<string>(nullable: true),
                    Activo = table.Column<bool>(nullable: false),
                    FechaRegistro = table.Column<DateTime>(nullable: false),
                    IdRole = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.IdUsuario);
                    table.ForeignKey(
                        name: "FK_Usuarios_Roles_IdRole",
                        column: x => x.IdRole,
                        principalTable: "Roles",
                        principalColumn: "IdRole",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Opciones",
                columns: table => new
                {
                    IdOpcion = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(maxLength: 100, nullable: false),
                    NombreAlias = table.Column<string>(maxLength: 100, nullable: false),
                    Precio = table.Column<decimal>(nullable: false),
                    IdTipoOpcion = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Opciones", x => x.IdOpcion);
                    table.ForeignKey(
                        name: "FK_Opciones_TipoOpciones_IdTipoOpcion",
                        column: x => x.IdTipoOpcion,
                        principalTable: "TipoOpciones",
                        principalColumn: "IdTipoOpcion",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProductoOpciones",
                columns: table => new
                {
                    IdProductoOpciones = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdProducto = table.Column<int>(nullable: false),
                    IdOpcion = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductoOpciones", x => x.IdProductoOpciones);
                    table.ForeignKey(
                        name: "FK_ProductoOpciones_Opciones_IdOpcion",
                        column: x => x.IdOpcion,
                        principalTable: "Opciones",
                        principalColumn: "IdOpcion",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProductoOpciones_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Opciones_IdTipoOpcion",
                table: "Opciones",
                column: "IdTipoOpcion");

            migrationBuilder.CreateIndex(
                name: "IX_PedidoDetalles_IdPedido",
                table: "PedidoDetalles",
                column: "IdPedido");

            migrationBuilder.CreateIndex(
                name: "IX_ProductoOpciones_IdOpcion",
                table: "ProductoOpciones",
                column: "IdOpcion");

            migrationBuilder.CreateIndex(
                name: "IX_ProductoOpciones_IdProducto",
                table: "ProductoOpciones",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_Productos_IdCategoria",
                table: "Productos",
                column: "IdCategoria");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_IdRole",
                table: "Usuarios",
                column: "IdRole");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PedidoDetalles");

            migrationBuilder.DropTable(
                name: "ProductoOpciones");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Pedidos");

            migrationBuilder.DropTable(
                name: "Opciones");

            migrationBuilder.DropTable(
                name: "Productos");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "TipoOpciones");

            migrationBuilder.DropTable(
                name: "Categorias");
        }
    }
}
