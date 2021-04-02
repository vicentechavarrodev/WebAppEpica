using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductoOpcionTipoOpciones",
                columns: table => new
                {
                    IdProductoOpcionTipoOpcion = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdProductoOpciones = table.Column<int>(nullable: false),
                    IdTipoOpcion = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductoOpcionTipoOpciones", x => x.IdProductoOpcionTipoOpcion);
                    table.ForeignKey(
                        name: "FK_ProductoOpcionTipoOpciones_ProductoOpciones_IdProductoOpciones",
                        column: x => x.IdProductoOpciones,
                        principalTable: "ProductoOpciones",
                        principalColumn: "IdProductoOpciones",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProductoOpcionTipoOpciones_TipoOpciones_IdTipoOpcion",
                        column: x => x.IdTipoOpcion,
                        principalTable: "TipoOpciones",
                        principalColumn: "IdTipoOpcion",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductoOpcionTipoOpciones_IdProductoOpciones",
                table: "ProductoOpcionTipoOpciones",
                column: "IdProductoOpciones");

            migrationBuilder.CreateIndex(
                name: "IX_ProductoOpcionTipoOpciones_IdTipoOpcion",
                table: "ProductoOpcionTipoOpciones",
                column: "IdTipoOpcion");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductoOpcionTipoOpciones");
        }
    }
}
