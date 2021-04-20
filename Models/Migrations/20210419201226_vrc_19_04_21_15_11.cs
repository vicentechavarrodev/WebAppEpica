using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class vrc_19_04_21_15_11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }
    }
}
