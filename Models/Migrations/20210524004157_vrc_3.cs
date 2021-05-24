using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class vrc_3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FraseDia",
                table: "Horarios",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FraseDia",
                table: "Horarios");
        }
    }
}
