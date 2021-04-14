using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EsPizza",
                table: "ProductoTipoOpciones");

            migrationBuilder.AddColumn<bool>(
                name: "EsPizza",
                table: "Productos",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EsPizza",
                table: "Productos");

            migrationBuilder.AddColumn<bool>(
                name: "EsPizza",
                table: "ProductoTipoOpciones",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
