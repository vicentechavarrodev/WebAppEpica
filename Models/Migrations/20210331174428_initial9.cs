using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdTipoSeleccion",
                table: "ProductoTipoOpciones",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TipoSelecciones",
                columns: table => new
                {
                    IdTipoSeleccion = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoSelecciones", x => x.IdTipoSeleccion);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductoTipoOpciones_IdTipoSeleccion",
                table: "ProductoTipoOpciones",
                column: "IdTipoSeleccion");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductoTipoOpciones_TipoSelecciones_IdTipoSeleccion",
                table: "ProductoTipoOpciones",
                column: "IdTipoSeleccion",
                principalTable: "TipoSelecciones",
                principalColumn: "IdTipoSeleccion",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductoTipoOpciones_TipoSelecciones_IdTipoSeleccion",
                table: "ProductoTipoOpciones");

            migrationBuilder.DropTable(
                name: "TipoSelecciones");

            migrationBuilder.DropIndex(
                name: "IX_ProductoTipoOpciones_IdTipoSeleccion",
                table: "ProductoTipoOpciones");

            migrationBuilder.DropColumn(
                name: "IdTipoSeleccion",
                table: "ProductoTipoOpciones");
        }
    }
}
