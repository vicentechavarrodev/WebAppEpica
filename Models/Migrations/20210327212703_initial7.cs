using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductoOpcionTipoOpciones_TipoOpciones_IdTipoOpcion",
                table: "ProductoOpcionTipoOpciones");

            migrationBuilder.DropIndex(
                name: "IX_ProductoOpcionTipoOpciones_IdTipoOpcion",
                table: "ProductoOpcionTipoOpciones");

            migrationBuilder.DropColumn(
                name: "IdTipoOpcion",
                table: "ProductoOpcionTipoOpciones");

            migrationBuilder.AddColumn<int>(
                name: "IdProductoTipoOpcion",
                table: "ProductoOpcionTipoOpciones",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ProductoTipoOpciones",
                columns: table => new
                {
                    IdProductoTipoOpcion = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdProducto = table.Column<int>(nullable: false),
                    IdOpcion = table.Column<int>(nullable: false),
                    Encabezado = table.Column<string>(nullable: false),
                    MostrarInicio = table.Column<bool>(nullable: false),
                    IdTipoOpcion = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductoTipoOpciones", x => x.IdProductoTipoOpcion);
                    table.ForeignKey(
                        name: "FK_ProductoTipoOpciones_Productos_IdProducto",
                        column: x => x.IdProducto,
                        principalTable: "Productos",
                        principalColumn: "IdProducto",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProductoTipoOpciones_TipoOpciones_IdTipoOpcion",
                        column: x => x.IdTipoOpcion,
                        principalTable: "TipoOpciones",
                        principalColumn: "IdTipoOpcion",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductoOpcionTipoOpciones_IdProductoTipoOpcion",
                table: "ProductoOpcionTipoOpciones",
                column: "IdProductoTipoOpcion");

            migrationBuilder.CreateIndex(
                name: "IX_ProductoTipoOpciones_IdProducto",
                table: "ProductoTipoOpciones",
                column: "IdProducto");

            migrationBuilder.CreateIndex(
                name: "IX_ProductoTipoOpciones_IdTipoOpcion",
                table: "ProductoTipoOpciones",
                column: "IdTipoOpcion");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductoOpcionTipoOpciones_ProductoTipoOpciones_IdProductoTipoOpcion",
                table: "ProductoOpcionTipoOpciones",
                column: "IdProductoTipoOpcion",
                principalTable: "ProductoTipoOpciones",
                principalColumn: "IdProductoTipoOpcion",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductoOpcionTipoOpciones_ProductoTipoOpciones_IdProductoTipoOpcion",
                table: "ProductoOpcionTipoOpciones");

            migrationBuilder.DropTable(
                name: "ProductoTipoOpciones");

            migrationBuilder.DropIndex(
                name: "IX_ProductoOpcionTipoOpciones_IdProductoTipoOpcion",
                table: "ProductoOpcionTipoOpciones");

            migrationBuilder.DropColumn(
                name: "IdProductoTipoOpcion",
                table: "ProductoOpcionTipoOpciones");

            migrationBuilder.AddColumn<int>(
                name: "IdTipoOpcion",
                table: "ProductoOpcionTipoOpciones",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProductoOpcionTipoOpciones_IdTipoOpcion",
                table: "ProductoOpcionTipoOpciones",
                column: "IdTipoOpcion");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductoOpcionTipoOpciones_TipoOpciones_IdTipoOpcion",
                table: "ProductoOpcionTipoOpciones",
                column: "IdTipoOpcion",
                principalTable: "TipoOpciones",
                principalColumn: "IdTipoOpcion",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
