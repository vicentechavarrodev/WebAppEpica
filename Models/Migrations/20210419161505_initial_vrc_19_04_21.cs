using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial_vrc_19_04_21 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EsPizza",
                table: "Productos");

            migrationBuilder.AddColumn<bool>(
                name: "MostrarPartes",
                table: "ProductoTipoOpciones",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "PrecioVariable",
                table: "Productos",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MostrarPartes",
                table: "ProductoTipoOpciones");

            migrationBuilder.DropColumn(
                name: "PrecioVariable",
                table: "Productos");

            migrationBuilder.AddColumn<bool>(
                name: "EsPizza",
                table: "Productos",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
