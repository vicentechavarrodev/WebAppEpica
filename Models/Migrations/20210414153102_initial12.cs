using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EsPrincipal",
                table: "ProductoTipoOpciones");

            migrationBuilder.AddColumn<bool>(
                name: "EsObligatoria",
                table: "ProductoTipoOpciones",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EsObligatoria",
                table: "ProductoTipoOpciones");

            migrationBuilder.AddColumn<bool>(
                name: "EsPrincipal",
                table: "ProductoTipoOpciones",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
