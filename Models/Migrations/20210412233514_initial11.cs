using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EsPizza",
                table: "ProductoTipoOpciones",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "EsPrincipal",
                table: "ProductoTipoOpciones",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Orden",
                table: "ProductoTipoOpciones",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EsPizza",
                table: "ProductoTipoOpciones");

            migrationBuilder.DropColumn(
                name: "EsPrincipal",
                table: "ProductoTipoOpciones");

            migrationBuilder.DropColumn(
                name: "Orden",
                table: "ProductoTipoOpciones");
        }
    }
}
