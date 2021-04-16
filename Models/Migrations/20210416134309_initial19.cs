using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial19 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           

            migrationBuilder.AddColumn<int>(
                name: "Ordens",
                table: "ProductoTipoOpciones",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ordens",
                table: "ProductoTipoOpciones");

            migrationBuilder.AddColumn<int>(
                name: "Orden",
                table: "ProductoTipoOpciones",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
