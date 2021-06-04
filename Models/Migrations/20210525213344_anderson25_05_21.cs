using Microsoft.EntityFrameworkCore.Migrations;

namespace Models.Migrations
{
    public partial class anderson25_05_21 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    IdCard = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titulo = table.Column<string>(maxLength: 200, nullable: false),
                    Descripcion = table.Column<string>(maxLength: 1000, nullable: false),
                    Enlace = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => x.IdCard);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cards");
        }
    }
}
