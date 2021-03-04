using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class initial1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "TienePrecio",
                table: "TipoOpciones",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TienePrecio",
                table: "TipoOpciones");
        }
    }
}
