using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MuestraSecundario",
                table: "Opciones");

            migrationBuilder.AddColumn<bool>(
                name: "MuestraSecundario",
                table: "ProductoOpciones",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MuestraSecundario",
                table: "ProductoOpciones");

            migrationBuilder.AddColumn<bool>(
                name: "MuestraSecundario",
                table: "Opciones",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
