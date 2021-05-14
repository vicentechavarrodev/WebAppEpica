using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class vrc_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Precio",
                table: "ProductoOpciones",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Precio",
                table: "ProductoOpciones");
        }
    }
}
